<?php

namespace App\Repositories;

use App\Interfaces\UserProfileRepositoryInterface;
use App\Models\User;
use App\Models\UserProfile;

class EloquentUserProfileRepository implements UserProfileRepositoryInterface
{
    public function createOrUpdate(User $user, array $data)
    {
        return $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $data
        );
    }
}
