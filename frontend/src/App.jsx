import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Dashboard from "./components/dashboard/dashboard";
import Tickets from "./pages/tickets";
import TicketsPage from "./pages/ticket-page";
import AllTicket from "./pages/all-ticket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute restricted />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard-customer"
            element={<Dashboard userRole="customer" />}
          >
            <Route index element={<TicketsPage />} />
            <Route path="create-ticket" element={<Tickets />} />
          </Route>

          <Route
            path="/dashboard-agent"
            element={<Dashboard userRole="agent" />}
          >
            {/* Agent specific routes or same nested routes if any */}
            <Route index element={<AllTicket />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
