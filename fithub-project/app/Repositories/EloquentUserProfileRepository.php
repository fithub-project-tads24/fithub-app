<?php

namespace App\Repositories;

use App\Interfaces\UserProfileRepositoryInterface;
use App\Models\User;
use App\Models\UserProfile;

class EloquentUserProfileRepository implements UserProfileRepositoryInterface
{
    public function createOrUpdate(User $user, array $data)
    {
        $profile = $user->profile;
        if ($profile) {
            $profile->fill($data);
            $profile->save();
            return $profile;
        }

        $profile = UserProfile::create($data);
        $user->user_profiles_id = $profile->id;
        $user->save();
        return $profile;
    }
}
