import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        apiUrl("auth/register"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            age,
            gender,
            city,
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
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "450px",
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
          JourneyMate
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

        <div className="mb-3">
          <label className="form-label">
            Age
          </label>

          <input
            type="number"
            className="form-control"
            placeholder="Enter your age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Gender
          </label>

          <select
            className="form-control"
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            City
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your city"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
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
