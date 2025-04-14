<?php

namespace App\Services\Product;

use App\Http\Helpers\FileStorageLocal;
use App\Http\Helpers\ResponseHelpers;
use LaravelEasyRepository\Service;
use App\Repositories\Product\ProductRepository;
use App\Repositories\Vendor\VendorRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductServiceImplement extends Service implements ProductService
{

  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;
  protected $vendorRepository;

  public function __construct(ProductRepository $mainRepository, VendorRepository $vendorRepository)
  {
    $this->mainRepository = $mainRepository;
    $this->vendorRepository = $vendorRepository;
  }

  public function getAllProduct()
  {
    try {
      $products = $this->mainRepository->all();

      if (is_null($products)) {
        return ResponseHelpers::sendError('No data was found', [], 404);
      }

      return ResponseHelpers::sendSuccess('Products fetched successfully', $products, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }

  public function getProductsUser()
  {
    try {
      $user = auth()->user();

      // Check if user is a vendor
      if ($user->role !== 'vendor') {
        return ResponseHelpers::sendError('Only vendors can access products', [], 403);
      }

      // Check if vendor is approved
      $vendor = $user->vendor;
      if (!$vendor || $vendor->status !== 'approved') {
        return ResponseHelpers::sendError('Vendor not approved', [], 403);
      }

      $products = $this->mainRepository->getProductsUser($vendor->id);

      if (is_null($products)) {
        return ResponseHelpers::sendError('No data was found', [], 404);
      }

      return ResponseHelpers::sendSuccess('Products fetched successfully', $products, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }

  public function searchProduct($data)
  {
    try {
      $keyword = $data['keyword'] ?? null;
    
      $searchProduct = $this->mainRepository->search($keyword);

      if ($searchProduct->isEmpty()) {
        return ResponseHelpers::sendError('No data was found.', [], 200);
      }

      return ResponseHelpers::sendSuccess('Products fetched successfully', $searchProduct, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e->getMessage()], 500);
    }
  }

  public function getProductById($id)
  {
    try {
      $product = $this->mainRepository->find($id);

      if (is_null($product)) {
        return ResponseHelpers::sendError('No data was found', [], 404);
      }

      return ResponseHelpers::sendSuccess('Product fetched successfully', $product, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }

  public function createProduct($data, $image = null)
  {
    DB::beginTransaction();
    try {
      $user = auth()->user();

      $vendor = $this->vendorRepository->getVendorByUserId($user->id);

      // Check status
      if ($vendor->status === 'pending' || $vendor->status === 'rejected') {
        return ResponseHelpers::sendError('Your account is not approved yet', [], 401);
      }

      $imageUrl = null;

      if ($image) {
        $imageUrl = FileStorageLocal::storeFile($image, 'product', $data['name']);
      }

      $productData = [
        'vendor_id' => $vendor->id,
        'name' => $data['name'],
        'price' => $data['price'],
        'stock' => $data['stock'],
        'description' => $data['description'],
        'img' => $imageUrl,
      ];

      $product = $this->mainRepository->create($productData);

      DB::commit();

      return ResponseHelpers::sendSuccess('Product created successfully', $product, 201);
    } catch (\Exception $e) {
      DB::rollBack();

      Log::info("message: {$e->getMessage()}");
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }

  public function updateProduct($id, $data)
  {
    DB::beginTransaction();
    try {
      $existingProduct = $this->mainRepository->find($id);

      if (is_null($existingProduct)) {
        return ResponseHelpers::sendError('Product not found', [], 404);
      }

      if (!empty($data['img'])) {
        // Delete old image if it exists
        if ($existingProduct->img && Storage::exists('public/' . $existingProduct->img)) {
          Storage::delete('public/' . $existingProduct->img);
        }

        // Store new image
        $imageUrl = FilestorageLocal::updateFile($existingProduct->img, $data['img'], 'product', $data['name']);
        $data['img'] = $imageUrl;
      } else {
        unset($data['img']);
      }

      $updated = $this->mainRepository->update($id, $data);

      if (!$updated) {
        DB::rollBack();
        return ResponseHelpers::sendError('Failed to update product', [], 404);
      }

      DB::commit();

      $product = $this->mainRepository->find($id);

      return ResponseHelpers::sendSuccess('Product updated successfully', $product, 200);
    } catch (\Exception $e) {
      Log::error('Failed to update product: ' . $e->getMessage(), ['exception' => $e]);
      DB::rollBack();

      return ResponseHelpers::sendError('Something went wrong', [$e->getMessage()], 500);
    }
  }

  public function deleteProduct($id)
  {
    DB::beginTransaction();
    try {
      $product = $this->mainRepository->find($id);

      if (!$product) {
        DB::rollBack();
        return ResponseHelpers::sendError('Product not found', [], 404);
      }

      if ($product->img) {
        Storage::disk('public')->delete($product->img);
      }

      $product = $this->mainRepository->delete($id);

      DB::commit();

      return ResponseHelpers::sendSuccess('Product deleted successfully', [], 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }
}
