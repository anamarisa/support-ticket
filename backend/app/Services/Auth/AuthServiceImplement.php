<?php

namespace App\Services\Auth;

use LaravelEasyRepository\Service;
use Illuminate\Support\Facades\Hash;
use App\Http\Helpers\ResponseHelpers;
use App\Repositories\User\UserRepository;
use App\Repositories\Vendor\VendorRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class AuthServiceImplement extends Service implements AuthService
{

    /**
     * don't change $this->mainRepository variable name
     * because used in extends service class
     */
    protected $mainRepository;
    protected $vendorRepository;

    public function __construct(UserRepository $mainRepository, VendorRepository $vendorRepository)
    {
        $this->mainRepository = $mainRepository;
        $this->vendorRepository = $vendorRepository;
    }

    public function LoginServices($request)
    {
        try {
            // Find user by email
            $user = $this->mainRepository->findByEmail($request->email);

            if (is_null($user)) {
                return ResponseHelpers::sendError("We can't find this user. Please register instead.", [], 404);
            }

            // Check password
            if (!Hash::check($request->password, $user->password)) {
                return ResponseHelpers::sendError('The provided credentials are incorrect.', [], 401);
            }

            // Generate token using Sanctum
            $token = $user->createToken('authToken')->plainTextToken;

            return ResponseHelpers::sendSuccess('Login Successful', [
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role
                ],
                'vendor' => $user->role === 'vendor' ? [
                    'id' => $user->vendor->id,
                    'status' => $user->vendor->status
                ] : null
            ], 200);
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            Log::error('Login failed: ' . $e->getMessage(), ['exception' => $e]);
            return ResponseHelpers::sendError('Something went wrong during login', [$e->getMessage()], 500);
        }
    }

    public function RegisterServices($request)
    {
        DB::beginTransaction();
        try {
            $hashedPassword = Hash::make($request->password);

            $user = $this->mainRepository->create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $hashedPassword,
                'role' => $request->role ?? 'vendor',
            ]);

            // Vendor
            $vendor = $this->vendorRepository->create([
                'user_id' => $user->id,
                'company_name' => $request->company_name,
                'address' => $request->address,
                'phone' => $request->phone,
                'status' => 'pending',
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
                'vendor' => [
                    'id' => $vendor->id,
                    'company_name' => $vendor->company_name,
                    'address' => $vendor->address,
                    'phone' => $vendor->phone,
                    'status' => $vendor->status,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Register failed: ' . $e->getMessage(), ['exception' => $e]);

            return ResponseHelpers::sendError('Something went wrong during Register', [$e], 500);
        }
    }

    // Log out the user by revoking token
    public function LogOutServices($request)
    {
        try {
            Auth::user();

            $request->user()->currentAccessToken()->delete();

            return ResponseHelpers::sendSuccess('Logout successful', [], 200);
        } catch (\Exception $e) {
            Log::error('Logout failed: ' . $e->getMessage(), ['exception' => $e]);
            return ResponseHelpers::sendError('Something went wrong while logging out', [$e->getMessage()], 500);
        }
    }

    // Get the profile details of the authenticated user
    public function ProfileServices($request)
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
