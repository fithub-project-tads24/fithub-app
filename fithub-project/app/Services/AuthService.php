<?php

namespace App\Services;

use App\Interfaces\UserRepositoryInterface;
use App\Interfaces\UserProfileRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;

class AuthService
{
    protected $userRepository;
        protected $profileRepository;

        public function __construct(UserRepositoryInterface $userRepository, UserProfileRepositoryInterface $profileRepository)
    {
        $this->userRepository = $userRepository;
            $this->profileRepository = $profileRepository;
    }

    public function register(array $data)
    {
        $payload = [
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
            'password_hash' => isset($data['password']) ? Hash::make($data['password']) : null,
        ];
        $user = $this->userRepository->create($payload);

        $defaultRole = Role::where('name', 'Student')->first();
        if ($defaultRole && ! $user->roles_id) {
            $user->roles_id = $defaultRole->id;
            $user->save();
        }

        return $user;
    }

    public function login(array $credentials): ?string
    {
        $email = $credentials['email'] ?? null;
        $password = $credentials['password'] ?? null;

        if (! $email || ! $password) {
            return null;
        }

    $user = $this->userRepository->findByEmail($email);

        if (! $user) {
            return null;
        }

        if (! Hash::check($password, $user->password_hash)) {
            return null;
        }

        return $user->createToken('auth_token')->plainTextToken;
    }

    public function deleteAccount(User $user): bool
    {
        if (method_exists($user, 'tokens')) {
            $user->tokens()->delete();
        }
        return $this->userRepository->delete($user);
    }

    public function updateUser(User $user, array $data): User
    {
        $updates = [];
        if (isset($data['name'])) $updates['name'] = $data['name'];
        if (isset($data['email'])) $updates['email'] = $data['email'];
        if (isset($data['password'])) $updates['password_hash'] = Hash::make($data['password']);
        if (!empty($updates)) {
            $user->fill($updates);
            $user->save();
        }

        $profileKeys = ['age','weight','height','sex','objective','activity_level'];
        $profileData = array_intersect_key($data, array_flip($profileKeys));
        if (!empty($profileData)) {
            $this->profileRepository->createOrUpdate($user, $profileData);
        }

        return $user->fresh(['profile','role']);
    }
}
