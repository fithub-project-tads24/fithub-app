<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Criar Roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $studentRole = Role::firstOrCreate(['name' => 'Student']);

        if (!User::where('email', 'admin@fithub.com')->exists()) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@fithub.com',
                'password_hash' => Hash::make('12345678'),
                'roles_id' => $adminRole->id,
            ]);
        }
    }
}
