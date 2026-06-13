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
        "http://localhost:5000/api/auth/users"
      );

      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const makeAdmin = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/auth/make-admin/${id}`
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
        backgroundColor: "#111827",
        color: "white",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#D4AF37",
          fontWeight: "bold",
        }}
      >
        Manage Users
      </h1>

      <div className="row mt-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="col-md-4 mb-4"
          >
            <div
              className="card p-3"
              style={{
                backgroundColor: "#1F2937",
                color: "white",
                border: "1px solid #374151",
              }}
            >
              <h4>{user.name}</h4>

              <p>
                <strong>Email:</strong>{" "}
                {user.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {user.role}
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
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;