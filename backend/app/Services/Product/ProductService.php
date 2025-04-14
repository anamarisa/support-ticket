<?php

namespace App\Services\Product;

use LaravelEasyRepository\BaseService;

interface ProductService extends BaseService
{
    public function getAllProduct();
    public function searchProduct($data);
    public function getProductById($id);
    public function createProduct($data);
    public function updateProduct($id, $data);
    public function deleteProduct($id);
    public function getProductsUser();
}
