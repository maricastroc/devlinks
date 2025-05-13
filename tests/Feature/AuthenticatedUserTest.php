<?php

use App\Models\User;
use App\Models\Theme;
use App\Models\UserLink;
use App\Models\Platform;
use App\Models\SocialLink;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('It returns authenticated user with theme, user links and social links', function () {
    $user = User::factory()->create();

    $theme = Theme::factory()->create();
    $user->theme()->associate($theme)->save();

    $platform1 = Platform::factory()->create();
    $platform2 = Platform::factory()->create();

    UserLink::factory()->create([
        'user_id' => $user->id,
        'platform_id' => $platform1->id,
        'order' => 2,
    ]);

    UserLink::factory()->create([
        'user_id' => $user->id,
        'platform_id' => $platform2->id,
        'order' => 1,
    ]);

    SocialLink::factory()->create([
        'user_id' => $user->id,
        'platform_id' => $platform1->id,
    ]);

    $this->actingAs($user);

    $response = $this->getJson('/api/auth/user');

    $response->assertStatus(200);

    $response->assertJsonStructure([
        'data' => [
            'user' => [
                'id',
                'username',
                'theme',
                'user_links' => [
                    ['id', 'platform_id', 'order', 'platform'],
                ],
                'social_links' => [
                    ['id', 'platform_id', 'platform'],
                ],
            ],
        ],
        'meta' => [
            'timestamp',
            'status',
        ],
    ]);

    $responseData = $response->json('data.user.user_links');

    expect($responseData[0]['order'])->toBeLessThanOrEqual($responseData[1]['order']);
});
