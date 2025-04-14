<?php

namespace App\Services\User;

use App\Http\Helpers\ResponseHelpers;
use LaravelEasyRepository\Service;
use App\Repositories\User\UserRepository;
use App\Repositories\Vendor\VendorRepository;
use Illuminate\Support\Facades\DB;

class UserServiceImplement extends Service implements UserService
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

  public function getAllUser()
  {
    try {
      $users = $this->mainRepository->getAllUser();

      if (is_null($users)) {
        return ResponseHelpers::sendError('Users not found', [], 404);
      }

      return ResponseHelpers::sendSuccess('Users fetched successfully', $users, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e->getMessage()], 500);
    }
  }

  public function updateStatus($id, $data)
  {
    DB::beginTransaction();

    try {
      $vendor = $this->vendorRepository->find($id);

      if (!$vendor) {
        return ResponseHelpers::sendError('Vendor not found', [], 404);
      }

      if ($vendor->status == $data['status']) {
        return ResponseHelpers::sendError('Vendor status already updated', [], 400);
      }

      $data['approved_at'] = now();

      $updateData = $this->vendorRepository->update($id, $data);

      DB::commit();

      return ResponseHelpers::sendSuccess('Vendor status updated successfully', $updateData, 200);
    } catch (\Exception $e) {
      return ResponseHelpers::sendError('Something went wrong', [$e->getMessage()], 500);
    }
  }
}
