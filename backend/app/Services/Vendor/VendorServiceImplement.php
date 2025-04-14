<?php

namespace App\Services\Vendor;

use LaravelEasyRepository\Service;
use App\Repositories\Vendor\VendorRepository;
use Illuminate\Support\Facades\DB;
use App\Http\Helpers\ResponseHelpers;

class VendorServiceImplement extends Service implements VendorService
{

  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;

  public function __construct(VendorRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  public function getAllVendor()
  {
    try {
      $vendors = $this->mainRepository->all();

      if (is_null($vendors)) {
        return ResponseHelpers::sendError('No data was found', [], 404);
      }

      return ResponseHelpers::sendSuccess('Vendors fetched successfully', $vendors, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }

  public function getVendorById($id)
  {
    try {
      $vendor = $this->mainRepository->find($id);

      if (is_null($vendor)) {
        return ResponseHelpers::sendError('No data was found', [], 404);
      }

      return ResponseHelpers::sendSuccess('Vendor fetched successfully', $vendor, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }

  public function createVendor($data)
  {
    DB::beginTransaction();
    try {
      $user = auth()->user();
      $data['user_id'] = $user->id;
      $data['status'] = 'pending';

      $vendor = $this->mainRepository->create($data);

      DB::commit();

      return ResponseHelpers::sendSuccess('Vendor created successfully', $vendor, 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return ResponseHelpers::sendError('Something went wrong', [$e], 500);
    }
  }

  public function updateVendor($id, $data)
  {
    DB::beginTransaction();
    try {
      $updated = $this->mainRepository->update($id, $data);

      if (!$updated) {
        DB::rollBack();
        return ResponseHelpers::sendError('Failed to update vendor', [], 404);
      }

      DB::commit();

      $vendor = $this->mainRepository->find($id);

      return ResponseHelpers::sendSuccess('Vendor updated successfully', $vendor, 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return ResponseHelpers::sendError('Something went wrong', [$e->getMessage()], 500);
    }
  }
}
