<?php

namespace Database\Factories;

use App\Models\EmailList;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmailList>
 */
class EmailListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake('en_US')->words(3, true),
            'user_id' => User::factory(),
        ];
    }
}
