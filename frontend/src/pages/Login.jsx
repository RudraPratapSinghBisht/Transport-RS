import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
     const response = await fetch(
  apiUrl("auth/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

localStorage.setItem(
  "role",
  data.user.role
);

localStorage.setItem(
  "name",
  data.user.name
);

localStorage.setItem(
  "email",
  data.user.email
);

      alert("Login Successful");

if (data.user.role === "admin") {

  localStorage.setItem(
    "isAdmin",
    "true"
  );

  navigate("/admin");

} else {

  localStorage.setItem(
    "isAdmin",
    "false"
  );

  window.location.href = "/";
}
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          borderRadius: "15px",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#D4AF37",
            fontWeight: "bold",
          }}
        >
          Welcome Back!
        </h2>

        <h4 className="text-center mb-4">Login</h4>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button
          className="btn w-100"
          style={{
            backgroundColor: "#D4AF37",
            color: "#000",
            fontWeight: "bold",
          }}
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account?

          <Link
            to="/register"
            style={{
              color: "#D4AF37",
              marginLeft: "5px",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
