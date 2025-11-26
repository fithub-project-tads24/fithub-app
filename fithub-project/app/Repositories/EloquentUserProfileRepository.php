<?php

namespace App\Repositories;

use App\Interfaces\UserProfileRepositoryInterface;
use App\Models\User;
use App\Models\UserProfile;

class EloquentUserProfileRepository implements UserProfileRepositoryInterface
{
    public function createOrUpdate(User $user, array $data)
    {
        // 1. Tenta pegar o perfil pelo relacionamento OU pelo ID direto na tabela users
        $profileId = $user->user_profiles_id;
        $profile = null;

        if ($profileId) {
            $profile = UserProfile::find($profileId);
        }

        // 2. Se existe, atualiza
        if ($profile) {
            $profile->fill($data);
            $profile->save();
        } else {
            // 3. Se não existe, cria um novo
            $profile = UserProfile::create($data);

            // 4. VÍNCULO CRÍTICO: Atualiza a FK na tabela users
            $user->user_profiles_id = $profile->id;
            $user->saveQuietly(); // saveQuietly evita disparar eventos extras se houver
        }

        return $profile;
    }
}
