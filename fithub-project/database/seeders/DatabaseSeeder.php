<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach (['Admin', 'Student'] as $r) {
            Role::firstOrCreate(['name' => $r]);
        }

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $student = Role::where('name', 'Student')->first();
        if ($student && ! $user->roles_id) {
            $user->roles_id = $student->id;
            $user->save();
        }
    }
}
