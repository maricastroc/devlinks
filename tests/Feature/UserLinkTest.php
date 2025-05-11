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
        $platform = Platform::factory()->create(['base_url' => 'https://platform.com']);

        $response = $this->postJson('/api/user-links', [
            'links' => [
                [
                    'platform_id' => $platform->id,
                    'username' => 'testuser',
                    'order' => 1,
                    'custom_name' => 'My Custom Link'
                ]
            ]
        ]);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'Links saved successfully']);

        $this->assertDatabaseHas('user_links', [
            'user_id' => $this->user->id,
            'platform_id' => $platform->id,
            'username' => 'testuser',
            'url' => 'https://platform.com/testuser',
            'order' => 1,
            'custom_name' => 'My Custom Link'
        ]);
});

test('I should be able to update existing user link', function () {
$platform = Platform::factory()->create(['base_url' => 'https://platform.com']);

        $response = $this->postJson('/api/user-links', [
            'links' => [
                [
                    'platform_id' => $platform->id,
                    'username' => 'testuser',
                    'order' => 1,
                    'custom_name' => 'My Custom Link'
                ]
            ]
        ]);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'Links saved successfully']);

        $this->assertDatabaseHas('user_links', [
            'user_id' => $this->user->id,
            'platform_id' => $platform->id,
            'username' => 'testuser',
            'url' => 'https://platform.com/testuser',
            'order' => 1,
            'custom_name' => 'My Custom Link'
        ]);
});

test('I should be able to update existing link with new data', function () {
    $platform = Platform::factory()->create(['base_url' => 'https://platform.com']);
    $existingLink = UserLink::factory()->create([
        'user_id' => $this->user->id,
        'platform_id' => $platform->id,
        'username' => 'oldusername',
        'order' => 1
    ]);

    $response = $this->postJson('/api/user-links', [
        'links' => [
            [
                'platform_id' => $platform->id,
                'username' => 'newusername',
                'order' => 2,
                'custom_name' => 'Updated'
            ]
        ]
    ]);

    $response->assertStatus(201);
    $this->assertDatabaseHas('user_links', [
        'id' => $existingLink->id,
        'username' => 'newusername',
        'order' => 2,
        'custom_name' => 'Updated'
    ]);
});

test('Custom name should be optional', function () {
    $platform = Platform::factory()->create();
    
    $response = $this->postJson('/api/user-links', [
        'links' => [
            [
                'platform_id' => $platform->id,
                'username' => 'testuser',
                'order' => 1
            ]
        ]
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('user_links', [
        'user_id' => $this->user->id,
        'platform_id' => $platform->id,
        'custom_name' => null
    ]);
});

test('Order should be respected when saving links', function () {
    $platforms = Platform::factory()->count(3)->create();
    
    $response = $this->postJson('/api/user-links', [
        'links' => [
            [
                'platform_id' => $platforms[0]->id,
                'username' => 'user1',
                'order' => 3
            ],
            [
                'platform_id' => $platforms[1]->id,
                'username' => 'user2',
                'order' => 1
            ],
            [
                'platform_id' => $platforms[2]->id,
                'username' => 'user3',
                'order' => 2
            ]
        ]
    ]);

    $response->assertStatus(201);
    
    $links = UserLink::where('user_id', $this->user->id)
        ->orderBy('order')
        ->get();
    
    $this->assertEquals($platforms[1]->id, $links[0]->platform_id);
    $this->assertEquals($platforms[2]->id, $links[1]->platform_id);
    $this->assertEquals($platforms[0]->id, $links[2]->platform_id);
});

test('I should be able to remove existing user links', function () {
 $platform1 = Platform::factory()->create(['base_url' => 'https://platform1.com']);
    $platform2 = Platform::factory()->create(['base_url' => 'https://platform2.com']);

    $link1 = UserLink::factory()->create([
        'user_id' => $this->user->id,
        'platform_id' => $platform1->id,
        'username' => 'user1'
    ]);

    $link2 = UserLink::factory()->create([
        'user_id' => $this->user->id,
        'platform_id' => $platform2->id,
        'username' => 'user2'
    ]);


        $response = $this->postJson('/api/user-links', [
            'links' => [
                [
                    'platform_id' => $platform1->id,
                    'username' => 'updateduser',
                    'order' => 1
                ]
            ]
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('user_links', [
            'user_id' => $this->user->id,
            'platform_id' => $platform1->id,
            'username' => 'updateduser'
        ]);

        $this->assertDatabaseMissing('user_links', [
            'user_id' => $this->user->id,
            'platform_id' => $platform2->id
        ]);
});

test('It should handle url construction correctly', function () {
    $platformWithBaseUrl = Platform::factory()->create(['base_url' => 'https://example.com']);

    $platformWithoutBaseUrl = Platform::factory()->create(['base_url' => null]);

    $platformWithEmptyBaseUrl = Platform::factory()->create(['base_url' => '']);
    
    $platformWithFullUrl = Platform::factory()->create(['base_url' => 'https://anotherplatform.com']);

    $response = $this->postJson('/api/user-links', [
        'links' => [
            [
                'platform_id' => $platformWithBaseUrl->id,
                'username' => 'testuser',
                'order' => 1
            ],
            [
                'platform_id' => $platformWithoutBaseUrl->id,
                'username' => 'directurl',
                'order' => 2
            ],
            [
                'platform_id' => $platformWithEmptyBaseUrl->id,
                'username' => 'emptybase',
                'order' => 3
            ],
            [
                'platform_id' => $platformWithFullUrl->id,
                'username' => 'https://fullurl.com',
                'order' => 4
            ]
        ]
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('user_links', [
        'platform_id' => $platformWithBaseUrl->id,
        'url' => 'https://example.com/testuser'
    ]);

    $this->assertDatabaseHas('user_links', [
        'platform_id' => $platformWithoutBaseUrl->id,
        'url' => 'directurl'
    ]);

    $this->assertDatabaseHas('user_links', [
        'platform_id' => $platformWithEmptyBaseUrl->id,
        'url' => 'emptybase'
    ]);

    $this->assertDatabaseHas('user_links', [
        'platform_id' => $platformWithFullUrl->id,
        'url' => 'https://fullurl.com'
    ]);
});

test('I should be able to delete all links by sending empty array', function () {
    $platforms = Platform::factory()->count(2)->create();

    foreach ($platforms as $platform) {
        UserLink::factory()->create([
            'user_id' => $this->user->id,
            'platform_id' => $platform->id
        ]);
    }

    $response = $this->postJson('/api/user-links', [
        'links' => []
    ]);

    $response->assertStatus(201);
    $response->assertJson(['message' => 'Links saved successfully']);
    
    $this->assertCount(0, UserLink::where('user_id', $this->user->id)->get());
});

test('Validation passes with empty links array', function () {
    $response = $this->postJson('/api/user-links', [
        'links' => []
    ]);
    
    $response->assertStatus(201);
});

test('Validation fails when links is missing completely', function () {
    $response = $this->postJson('/api/user-links', []);
    
    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['links']);
});

test('I should not be able to create links with invalid platform_id', function () {
    $response = $this->postJson('/api/user-links', [
        'links' => [
            [
                'platform_id' => 9999,
                'username' => 'test',
                'order' => 1
            ]
        ]
    ]);
    
    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['links.0.platform_id']);
});

test('I should not be able to update another user links', function () {
    $otherUser = User::factory()->create();

    $platform = Platform::factory()->create();

    $otherUserLink = UserLink::factory()->create([
        'user_id' => $otherUser->id,
        'platform_id' => $platform->id
    ]);

    $response = $this->postJson('/api/user-links', [
        'links' => [
            [
                'platform_id' => $platform->id,
                'username' => 'hacked',
                'order' => 1
            ]
        ]
    ]);

    $response->assertStatus(201);
    
    $this->assertDatabaseHas('user_links', [
        'id' => $otherUserLink->id,
        'username' => $otherUserLink->username 
    ]);
});