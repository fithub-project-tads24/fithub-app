<?php

namespace App\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function create(array $data);
    public function findByEmail(string $email);
    public function delete(User $user): bool;
}
