<?php

namespace App\Providers;

use App\Services\Auth\AuthService;
use App\Services\Auth\AuthServiceImplement;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Auth\AuthRepository;
use App\Repositories\Auth\AuthRepositoryImplement;
use App\Repositories\Product\ProductRepository;
use App\Repositories\Product\ProductRepositoryImplement;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryImplement;
use App\Repositories\Vendor\VendorRepository;
use App\Repositories\Vendor\VendorRepositoryImplement;
use App\Services\Product\ProductService;
use App\Services\Product\ProductServiceImplement;
use App\Services\User\UserService;
use App\Services\User\UserServiceImplement;
use App\Services\Vendor\VendorService;
use App\Services\Vendor\VendorServiceImplement;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Auth Services
        $this->app->bind(
            AuthService::class,
            AuthServiceImplement::class
        );

        // User Repository
        $this->app->bind(
            UserRepository::class,
            UserRepositoryImplement::class
        );

        $this->app->bind(
            UserService::class,
            UserServiceImplement::class
        );

        $this->app->bind(
            VendorRepository::class,
            VendorRepositoryImplement::class
        );

        $this->app->bind(
            VendorService::class,
            VendorServiceImplement::class
        );

        $this->app->bind(
            ProductRepository::class,
            ProductRepositoryImplement::class
        );

        $this->app->bind(
            ProductService::class,
            ProductServiceImplement::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
