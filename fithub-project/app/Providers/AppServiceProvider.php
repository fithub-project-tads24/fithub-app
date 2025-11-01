<?php

namespace App\Providers;

use App\Interfaces\UserRepositoryInterface;
use App\Repositories\EloquentUserRepository;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\UserProfileRepositoryInterface;
use App\Repositories\EloquentUserProfileRepository;
use App\Interfaces\RoleRepositoryInterface;
use App\Repositories\EloquentRoleRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            EloquentUserRepository::class
        );
        $this->app->bind(
            UserProfileRepositoryInterface::class,
            EloquentUserProfileRepository::class
        );
        $this->app->bind(
            RoleRepositoryInterface::class,
            EloquentRoleRepository::class
        );
    }
}
