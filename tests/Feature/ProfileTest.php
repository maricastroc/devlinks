<?php

use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\UploadedFile as SymfonyUploadedFile;

test('I should be able to create a user', function () {
    $response = $this->post('/register', [
        'email' => 'test@example.com',
        'username' => 'testuser',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!'
    ]);

    $response->assertRedirect(route('web.dashboard.index'));

    $this->assertDatabaseHas('users', [
        'email' => 'test@example.com',
        'username' => 'testuser',
    ]);

    $this->assertAuthenticated();
});

test('I should not be able to create an user with a password with less than eight characters', function () {
    $response = $this->post('/register', [
        'email' => 'test@example.com',
        'username' => 'testuser',
        'password' => '12345',
        'password_confirmation' => '12345',
    ]);

    $response->assertSessionHasErrors(['password']);

    $this->assertDatabaseMissing('users', [
        'email' => 'jondoe@gmail.com',
    ]);
});

test('I should not be able to create an user with an existing email', function () {
    User::factory()->create([
        'email' => 'jondoe@gmail.com',
    ]);

    $response = $this->post(route('register'), [
        'email' => 'jondoe@gmail.com',
        'username' => 'jondoe',
        'password' => '12345678',
        'password_confirmation' => '12345678',
    ]);

    $response->assertRedirect();

    $response->assertSessionHasErrors(['email']);

    $this->assertDatabaseCount('users', 1);
});

test('I should not be able to create an user with an existing username', function () {
    User::factory()->create([
        'username' => 'jondoe',
    ]);

    $response = $this->post(route('register'), [
        'email' => 'jondoe@gmail.com',
        'username' => 'jondoe',
        'password' => '12345678',
        'password_confirmation' => '12345678',
    ]);

    $response->assertRedirect();

    $response->assertSessionHasErrors(['username']);

    $this->assertDatabaseCount('users', 1);
});

test('I should be able to update my profile details with photo', function () {
    $user = User::factory()->create(['username' => 'jondoe']);
    $this->actingAs($user);

    $testDirectory = public_path('assets/users');
    if (!file_exists($testDirectory)) {
        mkdir($testDirectory, 0755, true);
    }

    $fileName = 'test_avatar_' . time() . '.jpg';
    $file = UploadedFile::fake()->image($fileName, 100, 100)->size(100);

    $response = $this->put('api/profile/update', [
        'avatar_url' => $file,
        'username' => 'jondoe_updated',
        'email' => 'updated@email.com',
        'name' => 'Jon Updated',
        'bio' => 'New updated bio',
    ]);

    $response->assertStatus(Response::HTTP_OK)
        ->assertJson([
            'message' => 'Profile successfully updated!',
            'status' => 'success',
        ]);

    $user->refresh();


    $expectedFilePath = public_path('assets/users/' . basename($user->avatar_url)); 
    $this->assertFileExists($expectedFilePath, 'The avatar file was not moved to the expected location');

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'username' => 'jondoe_updated',
        'email' => 'updated@email.com',
        'name' => 'Jon Updated',
        'bio' => 'New updated bio',
    ]);
});

test('I should be able to update my password', function () {
    $user = User::factory()->create(['password' => bcrypt('OldPassword123!')]);
    $this->actingAs($user);

    $response = $this->put('api/profile/update', [
        'name' => 'Jon Doe',
        'username' => 'jondoe',
        'old_password' => 'OldPassword123!',
        'new_password' => 'NewPassword123!',
    ]);

    $response->assertStatus(Response::HTTP_OK)
        ->assertJson([
            'message' => 'Profile successfully updated!',
            'status' => 'success',
        ]);

    $this->assertTrue(
        Hash::check('NewPassword123!', $user->fresh()->password),
        'The password was not updated correctly'
    );
});

test('I should not be able to update password with wrong current password', function () {
    $user = User::factory()->create(['password' => bcrypt('OldPassword123!')]);
    $this->actingAs($user);

    $response = $this->put('api/profile/update', [
        'name' => 'Jon Doe',
        'username' => 'jondoe',
        'old_password' => 'WrongPassword123!',
        'new_password' => 'NewPassword123!',
        'new_password_confirmation' => 'NewPassword123!',
    ]);

    $response->assertStatus(302);
    $response->assertSessionHasErrors(['old_password']);
});
