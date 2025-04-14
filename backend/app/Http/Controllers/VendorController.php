<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelpers;
use App\Http\Requests\RequestVendor;
use App\Services\Vendor\VendorService;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    private $vendorService;

    public function __construct(VendorService $vendorService)
    {
        $this->vendorService = $vendorService;
    }

    public function index()
    {
        try {
            return $this->vendorService->getAllVendor();
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }

    public function store(RequestVendor $request)
    {
        try {
            return $this->vendorService->createVendor($request->all());
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [$e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            return $this->vendorService->getVendorById($id);
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', [], 500);
        }
    }

    public function update(RequestVendor $request, $id)
    {
        try {
            return $this->vendorService->updateVendor($id, $request->validated());
        } catch (\Exception $e) {
            return ResponseHelpers::sendError('Something went wrong', $e->getMessage(), 500);
        }
    }

    public function getStatus(Request $request)
    {
        $vendorStatus = $request->user()->vendor->status;
        return response()->json(['status' => $vendorStatus]);
    }
}
