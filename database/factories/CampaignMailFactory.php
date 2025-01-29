<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\EmailList;
use App\Models\Subscriber;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Campaign>
 */
class CampaignMailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'campaign_id' => Campaign::factory(),
            'subscriber_id' => Subscriber::factory(),
            'send_at' => fake()->dateTime,
            'opens' => fake()->numberBetween(1, 10),
            'clicks' => fake()->numberBetween(1, 10),
        ];
    }
}
