import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPackages: 0,
    totalBookings: 0,
    revenue: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }

    fetchDashboardStats();
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background:
            "linear-gradient(to bottom, #000000, #000000)",
          color: "white",
          padding: "20px",
        }}
      >
        <h2
          style={{
            color: "#D4AF37",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          Horizon Compass
        </h2>

        <div className="d-flex flex-column gap-3">
          <button
            className="btn text-start"
            style={{
              backgroundColor: "#113d79",
              color: "white",
              border: "none",
            }}
          >
            Dashboard
          </button>

          <button
            className="btn text-start"
            style={{
              backgroundColor: "#113d79",
              color: "white",
              border: "none",
            }}
            onClick={() =>
              navigate("/admin/packages")
            }
          >
            Packages
          </button>

        <button
  className="btn text-start"
  style={{
    backgroundColor: "#113d79",
    color: "white",
    border: "none",
  }}
  onClick={() =>
    navigate("/admin/stays")
  }
>
  Stays
</button>

         <button
  className="btn text-start"
  style={{
    backgroundColor: "#113d79",
    color: "white",
    border: "none",
  }}
  onClick={() =>
    navigate("/admin/users")
  }
>
  Users
</button>

          <button
            className="btn text-start"
            style={{
              backgroundColor: "#113d79",
              color: "white",
              border: "none",
            }}
            onClick={() =>
              navigate("/admin/bookings")
            }
          >
            Bookings
          </button>

          <button
            className="btn mt-4"
            style={{
              backgroundColor: "#DC3545",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "#000000",
          color: "white",
        }}
      >
        <h1
          className="mb-4"
          style={{
            color: "#D4AF37",
            fontWeight: "bold",
          }}
        >
          Admin Dashboard
        </h1>
                <div className="row g-4">
          {/* Users */}
          <div className="col-md-3">
            <div
              className="card p-4 shadow-sm text-center"
              style={{
                backgroundColor: "#113d79",
                color: "white",
                border: "4px solid #c99f15",
              }}
            >
              <h5>Total Users</h5>

              <h2
                style={{
                  color: "#D4AF37",
                  fontWeight: "bold",
                }}
              >
                {stats.totalUsers}
              </h2>
            </div>
          </div>

          {/* Bookings */}
          <div className="col-md-3">
            <div
              className="card p-4 shadow-sm text-center"
              style={{
                backgroundColor: "#113d79",
                color: "white",
                border: "4px solid #c99f15",
              }}
            >
              <h5>Total Bookings</h5>

              <h2
                style={{
                  color: "#D4AF37",
                  fontWeight: "bold",
                }}
              >
                {stats.totalBookings}
              </h2>
            </div>
          </div>

          {/* Packages */}
          <div className="col-md-3">
            <div
              className="card p-4 shadow-sm text-center"
              style={{
                backgroundColor: "#113d79",
                color: "white",
                border: "4px solid #c99f15",
              }}
            >
              <h5>Total Packages</h5>

              <h2
                style={{
                  color: "#D4AF37",
                  fontWeight: "bold",
                }}
              >
                {stats.totalPackages}
              </h2>
            </div>
          </div>

          {/* Revenue */}
          <div className="col-md-3">
            <div
              className="card p-4 shadow-sm text-center"
              style={{
                backgroundColor: "#113d79",
                color: "white",
                border: "4px solid #c99f15",
              }}
            >
              <h5>Revenue</h5>

              <h2
                style={{
                  color: "#D4AF37",
                  fontWeight: "bold",
                }}
              >
                ₹{stats.revenue.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div
          className="card mt-5 p-4"
          style={{
            backgroundColor: "#113d79",
            border: "4px solid #c99f15",
            color: "white",
          }}
        >
          <h3 style={{ color: "#D4AF37" }}>
            Welcome, {localStorage.getItem("name")}
          </h3>

          <p className="mb-0">
            Manage packages, stays, bookings, and users from
            this dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;