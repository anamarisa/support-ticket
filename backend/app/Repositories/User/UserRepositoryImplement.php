<?php

namespace App\Repositories\User;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\User;
use App\Http\Helpers\ResponseHelpers;
use App\Models\Vendor;

class UserRepositoryImplement extends Eloquent implements UserRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function findByEmail($email)
    {
        try {
            return $this->model->where('email', $email)->first();
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong during Register', [$e], 500);
        }
    }

    public function create($data)
    {
        try {
            // Create User
            $user = new User();

            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = $data['password'];

            $user->save();

            return $user;
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong during Register', [$e], 500);
        }
    }

    // Function to get all users
    public function getAllUser()
    {
        try {
            return $this->model->all();
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong while fetching users', [$e], 500);
        }
    }

    // Function to get paginated users
    public function getPaginatedUser($perPage = 10)
    {
        try {
            return $this->model->paginate($perPage);
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong while fetching paginated users', [$e], 500);
        }
    }

    // Function to get a user by their ID
    public function getUserById($id)
    {
        try {
            $user = $this->model->find($id); // Retrieve user by ID
            if (!$user) {
                return ResponseHelpers::sendError('User not found', [], 404);
            }
            return $user;
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong while fetching the user', [$e], 500);
        }
    }
}
