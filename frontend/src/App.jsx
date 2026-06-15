import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stays from "./pages/Stays";
import Packages from "./pages/Packages";
import Blog from "./pages/Blog";
import AdminDashboard from "./pages/AdminDashboard";
import ManagePackages from "./pages/ManagePackages";
import PackageDetails from "./pages/PackageDetails";
import AdminBookings from "./pages/AdminBookings";
import MyBookings from "./pages/MyBookings";
import ManageUsers from "./pages/ManageUsers";
import ManageStays from "./pages/ManageStays";
import Cart from "./pages/Cart";
import StayDetails from "./pages/StayDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/:id" element={<StayDetails />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/blog" element={<Blog />} />
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
       <Route
  path="/admin/packages"
  element={
    <AdminRoute>
      <ManagePackages />
    </AdminRoute>
  }
/>
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route
  path="/admin/bookings"
  element={
    <AdminRoute>
      <AdminBookings />
    </AdminRoute>
  }
/>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route
  path="/admin/stays"
  element={
    <AdminRoute>
      <ManageStays />
    </AdminRoute>
  }
/>
        <Route
  path="/admin/users"
  element={
    <AdminRoute>
      <ManageUsers />
    </AdminRoute>
  }
/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/stays/:id" element={<StayDetails />} />
        <Route
  path="/checkout"
  element={<Checkout />}
/>
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;