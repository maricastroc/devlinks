<?php

use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('I should be able to create a user', function () {
    $this->withoutExceptionHandling();

    $response = $this->post(route('register'), [
        'email' => 'jondoe@gmail.com',
        'password' => '12345678',
        'password_confirmation' => '12345678'
    ]);

    $response->assertRedirect(route('web.dashboard.index'));

    $this->assertDatabaseHas('users', [
        'email' => 'jondoe@gmail.com',
    ]);

    $this->assertAuthenticated();
});

test('I should not be able to create an user with a password with less than eight characters', function () {
    $response = $this->post(route('register'), [
        'email' => 'jondoe@gmail.com',
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
        'password' => '12345678',
        'password_confirmation' => '12345678',
    ]);

    $response->assertRedirect();

    $response->assertSessionHasErrors(['email']);

    $this->assertDatabaseCount('users', 1);
});

test('I should not be able to create a user if password and password_confirmation do not match', function () {
    $response = $this->post(route('register'), [
        'email' => 'jondoe@gmail.com',
        'password' => '12345678',
        'password_confirmation' => '87654321',
    ]);

    $response->assertRedirect();

    $response->assertSessionHasErrors(['password']);

    $this->assertDatabaseMissing('users', [
        'email' => 'jondoe@gmail.com',
    ]);
});

test('I should be able to update my profile details', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $avatar = UploadedFile::fake()->image('avatar.jpg');

    $response = $this->putJson(route('profile.update'), [
        'avatar_url' => $avatar,
        'name' => 'Jon',
    ]);
    
    $response->assertStatus(Response::HTTP_OK);

    $this->assertDatabaseHas('users', [
        'name' => 'Jon',
    ]);
});

test('I should not be able to update my profile with invalid data', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->putJson(route('profile.update'), [
        'name' => 'Jon',
    ]);

    $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
        ->assertJsonValidationErrors(['public_email']);
});