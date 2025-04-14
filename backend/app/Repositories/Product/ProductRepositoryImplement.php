<?php

namespace App\Repositories\Product;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Product;

class ProductRepositoryImplement extends Eloquent implements ProductRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function all($perPage = 10)
    {
        return $this->model->paginate($perPage);
    }

    public function search($keyword = null, $perPage = 10)
    {
        return $this->model
            ->where(function ($query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%")
                    ->orWhere('description', 'like', "%$keyword%");
            })
            ->paginate($perPage);
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
        $product = $this->model->find($id);

        if (is_null($product)) {
            return null;
        }

        return $product->update($data);
    }

    public function delete($id)
    {
        return $this->model->where('id', $id)->delete();
    }

    public function getProductsUser($vendorId, $perPage = 10)
    {
        return $this->model->where('vendor_id', $vendorId)->paginate($perPage);
    }
}
