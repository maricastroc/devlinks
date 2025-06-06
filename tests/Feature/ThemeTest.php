<?php

use App\Models\Platform;
use App\Models\User;
use App\Models\Theme;
use App\Models\UserLink;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->user = User::factory()->create(); 

    $this->actingAs($this->user);
    });

test('I should be able to update my profile theme', function () {
    $theme = Theme::factory()->create(['is_custom' => false]);

    $response = $this->putJson('/api/profile/theme', [
        'theme_id' => $theme->id,
    ]);

    $response->assertOk()
        ->assertJson([
            'theme_id' => $theme->id,
            'message' => 'Theme updated successfully',
        ]);

    $this->assertEquals($theme->id, $this->user->fresh()->theme_id);
});

test('I should have my custom fields cleared when setting non custom theme', function () {
    $user = User::factory()->create([
        'custom_bg_type' => 'color',
        'custom_bg_color' => '#ffffff',
    ]);

    $this->actingAs($user);

    $theme = Theme::factory()->create(['name' => 'theme', 'is_custom' => false]);

    $response = $this->putJson('api/profile/theme', [
        'theme_id' => $theme->id,
    ]);

    $response->assertOk();

    $user->refresh();
    $this->assertNull($user->custom_bg_type);
    $this->assertNull($user->custom_bg_color);
});

test('I should be able to update my custom font', function () {
    $response = $this->putJson('api/profile/theme', [
        'custom_font' => 'Roboto',
    ]);

    $response->assertOk()
        ->assertJson([
            'custom_font' => 'Roboto',
            'message' => 'Theme updated successfully',
        ]);

    $this->assertEquals('Roboto', $this->user->fresh()->custom_font);
});

test('I should be able to create a custom theme', function () {
    $customStyles = [
        "primary_text" => [
            'color' => "#7cb20d",
        ],
        "secondary_text" => [
            'color' => "#0ef0de",
        ],
        'link_card' => [
            'borderRadius' => '10px',
            'backgroundColor' => '#ffffff',
        ],
        'icon' => [
            'filter' => 'brightness(0.8)',
        ],
    ];

    $response = $this->putJson('api/profile/theme', [
        'custom_styles' => $customStyles,
    ]);

    $response->assertOk()
        ->assertJsonStructure([
            'theme',
            'theme_id',
            'custom_styles',
            'message',
        ]);

    $theme = Theme::where('user_id', $this->user->id)->first();

    $this->assertNotNull($theme);
    $this->assertTrue($theme->is_custom === 1);
    $this->assertEquals($customStyles, $theme->styles);
    $this->assertEquals($theme->id, $this->user->fresh()->theme_id);
});

test('I should be able to merge existing styles when updating custom theme', function () {
    $initialTheme = Theme::factory()->create([
        'user_id' => $this->user->id,
        'is_custom' => true,
        'styles' => [
            'link_card' => ['borderRadius' => '10px', 'color' => '#FFFFFF'],
            'icon' => ['filter' => 'brightness(0.8)'],
        ],
    ]);

    $this->user->update(['theme_id' => $initialTheme->id]);

    $updatedStyles = [
        'link_card' => ['backgroundColor' => '#ffffff'],
        'primary_text' => ['color' => '#000000'],
    ];

    $response = $this->putJson('/api/profile/theme', [
        'custom_styles' => $updatedStyles,
    ]);

    $response->assertOk();

    $expectedStyles = [
        'link_card' => [
            'borderRadius' => '10px',
            'color' => '#FFFFFF',
            'backgroundColor' => '#ffffff',
        ],
        'icon' => ['filter' => 'brightness(0.8)'],
        'primary_text' => ['color' => '#000000'],
    ];
    
    $this->assertEquals(
        $expectedStyles,
        $this->user->fresh()->theme->styles
    );
});

test('I should be able to update custom background properties', function () {
    $response = $this->putJson('/api/profile/theme', [
        'custom_bg_type' => 'gradient',
        'custom_bg_color' => '#123456',
    ]);

    $response->assertOk()
        ->assertJson([
            'custom_bg_type' => 'gradient',
            'custom_bg_color' => '#123456',
            'message' => 'Theme updated successfully',
        ]);

    $this->assertEquals('gradient', $this->user->fresh()->custom_bg_type);
    $this->assertEquals('#123456', $this->user->fresh()->custom_bg_color);
});

test('I should be able to update only custom_bg_type without affecting other fields', function () {
    $this->user->update([
        'custom_bg_color' => '#123456',
        'custom_font' => 'Arial'
    ]);

    $response = $this->putJson('/api/profile/theme', [
        'custom_bg_type' => 'image',
    ]);

    $response->assertOk();

    $user = $this->user->fresh();
    $this->assertEquals('image', $user->custom_bg_type);
    $this->assertEquals('#123456', $user->custom_bg_color);
    $this->assertEquals('Arial', $user->custom_font);
});

test('I should be able to perform a deep merge of nested custom styles', function () {
    $initialTheme = Theme::factory()->create([
        'user_id' => $this->user->id,
        'is_custom' => true,
        'styles' => [
            'link_card' => [
                'borderRadius' => '10px',
                'color' => '#FFFFFF',
                'nested' => ['level1' => 'value1']
            ],
        ],
    ]);

    $this->user->update(['theme_id' => $initialTheme->id]);

    $updatedStyles = [
        'link_card' => [
            'backgroundColor' => '#ffffff',
            'nested' => ['level2' => 'value2']
        ],
    ];

    $response = $this->putJson('/api/profile/theme', [
        'custom_styles' => $updatedStyles,
    ]);

    $expectedStyles = [
        'link_card' => [
            'borderRadius' => '10px',
            'color' => '#FFFFFF',
            'backgroundColor' => '#ffffff',
            'nested' => [
                'level1' => 'value1',
                'level2' => 'value2'
            ]
        ],
    ];
    
    $this->assertEquals(
        $expectedStyles,
        $this->user->fresh()->theme->styles
    );
});