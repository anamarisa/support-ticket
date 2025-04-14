import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import BuyerCatalog from "./pages/User/BuyerCatalog";
import Dashboard from "./layout/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VendorApproval from "./pages/Admin/VendorApproval";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";
import ProductTable from "./pages/Product/ProductList";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Unauthorized from "./pages/Errors/Unauthorized";
import VendorPending from "./pages/Vendor/VendorPending";
import VendorRejected from "./pages/Vendor/VendorRejected";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute restricted />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/products" element={<BuyerCatalog />} />

        {/* Vendor routes - now with approval check */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["vendor", "admin"]}
              requireApproval={true}
            />
          }
        >
          <Route element={<Dashboard />}>
            <Route index element={<ProductTable />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
        </Route>

        <Route path="/vendor-pending" element={<VendorPending />} />
        <Route path="/vendor-rejected" element={<VendorRejected />} />

        {/* Admin-only routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<Dashboard />}>
            <Route index element={<VendorApproval />} />
            <Route path="vendor-approval" element={<VendorApproval />} />
          </Route>
        </Route>
        {/* Error pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
