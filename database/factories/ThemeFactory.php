<?php

namespace Database\Factories;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ThemeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Theme::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'type' => $this->faker->randomElement(['preset', 'custom']),
            'slug' => $this->faker->slug(),
            'styles' => [
            ],
            'is_custom' => $this->faker->boolean(),
            'is_active' => true,
            'user_id' => null,
            'order' => $this->faker->numberBetween(1, 100)
        ];
    }
}