<?php

namespace App\Interfaces;


use App\Models\User;

interface UserProfileRepositoryInterface
{
    public function createOrUpdate(User $user, array $data);
}
