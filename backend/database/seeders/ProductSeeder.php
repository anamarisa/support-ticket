<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 30; $i++) {
            Product::create([
                'vendor_id'   => 1,
                'name'        => 'Product ' . $i,
                'description' => 'Description for Product ' . $i,
                'price'       => rand(100, 10000) / 100,
                'stock'       => rand(1, 100),
                'img'         => NULL,
                'status'      => rand(0, 1) ? 'available' : 'unavailable',
            ]);
        }
    }
}
