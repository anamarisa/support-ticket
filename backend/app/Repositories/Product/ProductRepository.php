<?php

namespace App\Repositories\Product;

use LaravelEasyRepository\Repository;

interface ProductRepository extends Repository
{
    public function all();
    public function search($search, $perPage = 10);
    public function create($data);
    public function find($id);
    public function update($id, $data);
    public function delete($id);
    public function getProductsUser($vendorId);
}
