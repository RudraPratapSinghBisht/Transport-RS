import { useEffect, useState } from "react";
import axios from "axios";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/users`
      );

      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const makeAdmin = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/make-admin/${id}`
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "white",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#D4AF37",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        Manage Users
      </h1>

      <div className="row">
        {users.map((user) => (
          <div
            key={user._id}
            className="col-lg-4 col-md-6 mb-4"
          >
            <div
              className="card p-4 h-100"
              style={{
                backgroundColor: "#000000",
                color: "white",
                border:
                  user.role === "admin"
                    ? "3px solid #dc3545"
                    : "3px solid #D4AF37",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  color:
                    user.role === "admin"
                      ? "#ff4d4d"
                      : "#ffffff",
                  fontWeight: "bold",
                }}
              >
                {user.name}
              </h3>

              <hr
                style={{
                  borderColor: "#444",
                }}
              />

              <p>
                <strong>Email:</strong>{" "}
                {user.email}
              </p>

              <p>
                <strong>City:</strong>{" "}
                {user.city || "Not Added"}
              </p>

              <p>
                <strong>Age:</strong>{" "}
                {user.age || "Not Added"}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {user.gender || "Not Added"}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                <span
                  style={{
                    color:
                      user.role === "admin"
                        ? "#ff4d4d"
                        : "#D4AF37",
                    fontWeight: "bold",
                  }}
                >
                  {user.role}
                </span>
              </p>

              {user.role !== "admin" && (
                <button
                  className="btn mt-2"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    makeAdmin(user._id)
                  }
                >
                  Make Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;