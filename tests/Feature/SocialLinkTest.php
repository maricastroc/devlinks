<?php

use App\Models\User;
use App\Models\Platform;
use App\Models\SocialLink;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('I should be able to list my social links', function () {
    $user = User::factory()->create();

    $platform = Platform::factory()->create();

    $user->socialLinks()->create([
        'platform_id' => $platform->id,
        'username' => 'testuser',
        'url' => 'https://test.com/testuser',
        'order' => 1
    ]);

    $this->actingAs($user)
        ->getJson('/api/social-links')
        ->assertStatus(Response::HTTP_OK)
        ->assertJsonStructure([
            'data' => ['socialLinks' => [['id', 'platform_id', 'username', 'url', 'order', 'platform']]]
        ]);
});

test('I can create a new social link', function () {
    $user = User::factory()->create();

    $platform = Platform::factory()->create(['base_url' => 'https://example.com']);

    $this->actingAs($user)
        ->postJson('/api/social-links', [
            'platform_id' => $platform->id,
            'username' => 'newuser'
        ])
        ->assertStatus(Response::HTTP_CREATED)
        ->assertJsonFragment([
            'message' => 'Link added successfully!',
        ]);
});

test('I should not be able to create duplicate social link for same platform', function () {
    $user = User::factory()->create();

    $platform = Platform::factory()->create();

    $user->socialLinks()->create([
        'platform_id' => $platform->id,
        'username' => 'exists',
        'url' => 'https://example.com/exists',
        'order' => 1,
    ]);

    $this->actingAs($user)
        ->postJson('/api/social-links', [
            'platform_id' => $platform->id,
            'username' => 'newuser'
        ])
        ->assertStatus(Response::HTTP_CONFLICT)
        ->assertJsonFragment([
            'message' => 'You already have a link for this platform'
        ]);
});

test('I should be able to update an existing social link', function () {
    $user = User::factory()->create();

    $platform = Platform::factory()->create(['base_url' => 'https://platform.com']);

    $link = $user->socialLinks()->create([
        'platform_id' => $platform->id,
        'username' => 'olduser',
        'url' => 'https://platform.com/olduser',
        'order' => 1,
    ]);

    $this->actingAs($user)
        ->putJson("/api/social-links/{$link->id}", [
            'username' => 'updateduser',
        ])
        ->assertStatus(Response::HTTP_OK)
        ->assertJsonFragment([
            'message' => 'Link updated successfully!',
        ]);
});

test('I should be able to delete a social link', function () {
    $user = User::factory()->create();
    
    $platform = Platform::factory()->create();

    $link = $user->socialLinks()->create([
        'platform_id' => $platform->id,
        'username' => 'tobedeleted',
        'url' => 'https://example.com/tobedeleted',
        'order' => 1,
    ]);

    $this->actingAs($user)
        ->deleteJson("/api/social-links/{$link->id}")
        ->assertStatus(Response::HTTP_OK)
        ->assertJsonFragment([
            'message' => 'Link removed successfully!',
        ]);

    $this->assertDatabaseMissing('social_links', [
        'id' => $link->id
    ]);
});

test('It should handle url construction correctly', function () {
    $user = User::factory()->create();

    $this->actingAs($user); 

    $platformWithBaseUrl = Platform::factory()->create(['base_url' => 'https://example.com']);

    $platformWithoutBaseUrl = Platform::factory()->create(['base_url' => null]);

    $platformWithEmptyBaseUrl = Platform::factory()->create(['base_url' => '']);

    $platformWithFullUrl = Platform::factory()->create(['base_url' => 'https://anotherplatform.com']);

    $this->postJson('/api/social-links', [
        'platform_id' => $platformWithBaseUrl->id,
        'username' => 'testuser',
        'order' => 1
    ])->assertStatus(201);

    $this->postJson('/api/social-links', [
        'platform_id' => $platformWithoutBaseUrl->id,
        'username' => 'directurl',
        'order' => 2
    ])->assertStatus(201);

    $this->postJson('/api/social-links', [
        'platform_id' => $platformWithEmptyBaseUrl->id,
        'username' => 'emptybase',
        'order' => 3
    ])->assertStatus(201);

    $this->postJson('/api/social-links', [
        'platform_id' => $platformWithFullUrl->id,
        'username' => 'https://fullurl.com',
        'order' => 4
    ])->assertStatus(201);

    $this->assertDatabaseHas('social_links', [
        'platform_id' => $platformWithBaseUrl->id,
        'url' => 'https://example.com/testuser'
    ]);

    $this->assertDatabaseHas('social_links', [
        'platform_id' => $platformWithoutBaseUrl->id,
        'url' => 'directurl'
    ]);

    $this->assertDatabaseHas('social_links', [
        'platform_id' => $platformWithEmptyBaseUrl->id,
        'url' => 'emptybase'
    ]);

    $this->assertDatabaseHas('social_links', [
        'platform_id' => $platformWithFullUrl->id,
        'url' => 'https://fullurl.com'
    ]);
});
