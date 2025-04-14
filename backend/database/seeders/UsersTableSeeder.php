<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $vendorUser = User::create([
            'name' => 'Vendor User',
            'email' => 'vendor@example.com',
            'password' => Hash::make('password123'),
            'role' => 'vendor',
        ]);

        Vendor::create([
            'user_id' => $vendorUser->id,
            'company_name' => 'Vendor Company Ltd.',
            'address' => '123 Vendor Street',
            'phone' => '08123456789',
            'status' => 'approved',
            'approved_at' => now(),
        ]);
    }
}
