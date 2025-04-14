<?php

namespace App\Repositories\Vendor;

use LaravelEasyRepository\Repository;

interface VendorRepository extends Repository
{
    public function all();
    public function create($data);
    public function find($id);
    public function update($id, $data);
    public function delete($id);

    public function checkVendorStatus($id);
    public function getVendorByUserId($userId);
}
