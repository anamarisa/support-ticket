<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelpers;
use App\Http\Requests\RequestProduct;
use App\Services\Product\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    private $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        try {
            return $this->productService->getAllProduct();
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }

    public function search(Request $request)
    {
        try {
            $keyword = $request->query('keyword');

            return $this->productService->searchProduct(['keyword' => $keyword]);
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }

    public function store(RequestProduct $request)
    {
        try {
            $image = $request->file('img');
            return $this->productService->createProduct($request->all(), $image);
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }

    public function show($id)
    {
        try {
            return $this->productService->getProductById($id);
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }

    public function update(RequestProduct $request, $id)
    {
        try {
            return $this->productService->updateProduct($id, $request->all());
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', $e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            return $this->productService->deleteProduct($id);
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }

    public function getProductsUser()
    {
        try {
            return $this->productService->getProductsUser();
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }
}
