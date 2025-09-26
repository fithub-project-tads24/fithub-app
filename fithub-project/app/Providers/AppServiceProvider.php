<?php

namespace App\Providers;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use App\Repositories\EloquentUserRepository;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\UserProfileRepositoryInterface;
use App\Repositories\EloquentUserProfileRepository;

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
    }
}
