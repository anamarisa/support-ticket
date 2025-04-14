<?php

namespace App\Services\Vendor;

use LaravelEasyRepository\BaseService;

interface VendorService extends BaseService
{
    public function getAllVendor();
    public function getVendorById($id);
    public function createVendor($data);
    public function updateVendor($id, $data);
}
