<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Http\Helpers\ResponseHelpers;
use App\Http\Requests\Auth\RequestLogin;
use App\Http\Requests\Auth\RequestRegister;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(RequestLogin $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return ResponseHelpers::sendError("We can't find this user. Please register instead.", [], 404);
            }

            if (!Hash::check($request->password, $user->password)) {
                return ResponseHelpers::sendError('The provided credentials are incorrect.', [], 401);
            }

            $token = $user->createToken('authToken')->plainTextToken;

            return ResponseHelpers::sendSuccess('Login Successful', [
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ], 200);
        } catch (\Exception $e) {
            Log::error('Login failed: ' . $e->getMessage());
            return ResponseHelpers::sendError('Something went wrong during login', [$e->getMessage()], 500);
        }
    }

    public function register(RequestRegister $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'customer'
            ]);

            DB::commit();

            $token = $user->createToken('authToken')->plainTextToken;

            return ResponseHelpers::sendSuccess('Registration Successful', [
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Register failed: ' . $e->getMessage());
            return ResponseHelpers::sendError('Something went wrong during Register', [$e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return ResponseHelpers::sendSuccess('Logout successful', [], 200);
        } catch (\Exception $e) {
            Log::error('Logout failed: ' . $e->getMessage());
            return ResponseHelpers::sendError('Something went wrong while logging out', [$e->getMessage()], 500);
        }
    }

    public function profile(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return ResponseHelpers::sendError('User not found', [], 404);
            }

            return ResponseHelpers::sendSuccess('Profile fetched successfully', [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ], 200);
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong while fetching profile', [$e->getMessage()], 500);
        }
    }
}
