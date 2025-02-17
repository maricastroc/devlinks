<?php

use App\Models\Platform;
use App\Models\User;
use App\Models\UserLink;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->user = User::factory()->create(); 

    $this->actingAs($this->user);
    });

    test('I should be able to create user links', function () {
    $platform = Platform::factory()->create();

    $response = $this->postJson(route('user-links.store'), [
        'links' => [
            [
                'platform_id' => $platform->id,
                'url' => 'https://example.com'
            ]
        ]
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('user_links', [
        'user_id' => $this->user->id,
        'platform_id' => $platform->id,
        'url' => 'https://example.com'
    ]);
});

test('I should be able to update existing user link', function () {
    $platform = Platform::factory()->create();

    UserLink::create([
        'user_id' => $this->user->id,
        'platform_id' => $platform->id,
        'url' => 'https://old-link.com'
    ]);

    $response = $this->postJson(route('user-links.store'), [
        'links' => [
            [
                'platform_id' => $platform->id,
                'url' => 'https://new-link.com'
            ]
        ]
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('user_links', [
        'user_id' => $this->user->id,
        'platform_id' => $platform->id,
        'url' => 'https://new-link.com'
    ]);

    $this->assertDatabaseMissing('user_links', [
        'user_id' => $this->user->id,
        'platform_id' => $platform->id,
        'url' => 'https://old-link.com'
    ]);
});

test('I should get a validation error when links data is invalid', function () {
    $platform = Platform::factory()->create();

    $response = $this->postJson(route('user-links.store'), [
        'links' => [
            [
                'platform_id' => $platform->id,
                'url' => 'invalid-url'
            ]
        ]
    ]);

    $response->assertStatus(422);

    $response->assertJsonValidationErrors(['links.0.url']);
});

test('I should get a validation error if platform does not exist', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->postJson(route('user-links.store'), [
        'links' => [
            [
                'platform_id' => 999,
                'url' => 'https://example.com'
            ]
        ]
    ]);

    $response->assertStatus(422);

    $response->assertJsonValidationErrors(['links.0.platform_id']);
});

test('Unauthenticated users should be able to view user links', function () {
    $platform = Platform::factory()->create();

    UserLink::create([
        'user_id' => $this->user->id,
        'platform_id' => $platform->id,
        'url' => 'https://example.com'
    ]);

    $response = $this->getJson(route('shared', ['user' => $this->user->id]));

    $response->assertStatus(200);

    $response->assertJsonFragment([
        'platform_id' => $platform->id,
        'url' => 'https://example.com',
    ]);
});

test('It should redirect to error page when userId is not numeric', function () {
    $response = $this->get(route('shared', ['user' => 'invalid-id']));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('ErrorPage'));
});

test('It should redirect to error page when user is not found', function () {
    $nonExistentUserId = 99999;

    $response = $this->get(route('shared', ['user' => $nonExistentUserId]));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('ErrorPage'));
});