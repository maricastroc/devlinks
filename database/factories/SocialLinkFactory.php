<?php

namespace Database\Factories;

use App\Models\Platform;
use App\Models\User;
use App\Models\SocialLink;
use Illuminate\Database\Eloquent\Factories\Factory;

class SocialLinkFactory extends Factory
{
    protected $model = SocialLink::class;

    public function definition()
    {
        $platform = Platform::factory()->create();

        return [
            'user_id' => User::factory(),
            'platform_id' => $platform->id,
            'username' => $this->faker->userName,
            'url' => $platform->base_url . '/' . $this->faker->userName,
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}