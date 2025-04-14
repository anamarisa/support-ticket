<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'v1'], function () {
    // Auth
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Admin Approval
        Route::put('/update-status/{id}', [UserController::class, 'update']);

        // Vendor Status
        Route::get('/vendor/status', [VendorController::class, 'getStatus']);

        Route::group(['prefix' => 'vendors'], function () {
            Route::get('/', [VendorController::class, 'index']);
            Route::post('/', [VendorController::class, 'store']);
            Route::get('/{id}', [VendorController::class, 'show']);
            Route::put('/{id}/update', [VendorController::class, 'update']);
        });

        Route::group(['prefix' => 'products'], function () {
            Route::get('/', [ProductController::class, 'index']);
            Route::get('/user', [ProductController::class, 'getProductsUser']);
            Route::get('/search', [ProductController::class, 'search']);
            Route::post('/store', [ProductController::class, 'store']);
            Route::get('/{id}', [ProductController::class, 'show']);
            Route::put('/{id}/update', [ProductController::class, 'update']);
            Route::delete('/{id}', [ProductController::class, 'destroy']);
        });
    });

    Route::middleware('auth:api')->get('/auth/me', function (Request $request) {
        return $request->user()->load('vendor'); // Eager load vendor relationship
    });
});
