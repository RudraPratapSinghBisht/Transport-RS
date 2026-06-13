import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
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

      alert("Registration Successful");

      navigate("/login");
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
          Horizon Compass
        </h2>

        <h4 className="text-center mb-4">
          Register
        </h4>

        <div className="mb-3">
          <label className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email
          </label>

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
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?

          <Link
            to="/login"
            style={{
              color: "#D4AF37",
              marginLeft: "5px",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;