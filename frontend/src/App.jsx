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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/packages" element={<ManagePackages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route
  path="/admin/users"
  element={<ManageUsers />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;