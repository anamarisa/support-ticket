<?php

namespace App\Repositories\Vendor;

use App\Http\Helpers\ResponseHelpers;
use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Vendor;

class VendorRepositoryImplement extends Eloquent implements VendorRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(Vendor $model)
    {
        $this->model = $model;
    }

    public function all($perPage = 10)
    {
        return $this->model->get();
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function update($id, $data)
    {
        $vendor = $this->model->find($id);
        if (!$vendor) return null;

        $vendor->update($data);

        return $vendor;
    }

    public function delete($id)
    {
        return $this->model->where('id', $id)->delete();
    }

    public function checkVendorStatus($id)
    {
        $vendor = $this->model->find($id);

        if (is_null($vendor)) {
            return null;
        }

        return $vendor->status;
    }

    public function getVendorByUserId($userId)
    {
        return $this->model->where('user_id', $userId)->first();
    }
}
