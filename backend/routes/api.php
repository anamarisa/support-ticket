<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;

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

        Route::middleware(['role:customer'])->group(function () {
            Route::get('/tickets', [TicketController::class, 'index']);
            Route::get('/tickets/{id}', [TicketController::class, 'show']);
            Route::post('/tickets', [TicketController::class, 'store']);
        });

        Route::middleware(['role:agent'])->group(function () {
            Route::get('/all-tickets', [TicketController::class, 'getAllTickets']);
            Route::put('/tickets/{id}', [TicketController::class, 'updateStatus']);
        });
    });
});
