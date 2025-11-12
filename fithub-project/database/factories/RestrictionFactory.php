<?php

namespace Database\Factories;

use App\Models\Restriction;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restriction>
 */
class RestrictionFactory extends Factory
{
    protected $model = Restriction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reason' => fake()->optional()->sentence(),
            'expiration_date' => fake()->dateTimeBetween('now', '+1 year'),
            'created_at' => fake()->optional()->dateTimeBetween('-1 year', 'now'),
            'users_id' => User::factory(),
            'users_user_profiles_id' => UserProfile::factory(),
            'users_roles_id' => Role::factory(),
        ];
    }
}
