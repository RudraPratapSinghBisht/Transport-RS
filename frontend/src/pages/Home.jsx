import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import baliImg from "../assets/bali.png";
import kyotoImg from "../assets/kyoto.png";
import swissImg from "../assets/swiss.png";
import compassLogo from "../assets/compass.png";
import heroVideo from "../assets/herovideo.mp4";
import japan from "../assets/japan.jpg";
import switzerland from "../assets/switzerland.jpg";
import turkiye from "../assets/turkiye.jpg";
import beachImg from "../assets/beach.jpg";
import adventureImg from "../assets/adventure.jpg";
import historicalImg from "../assets/historical.jpg";
import luxuryImg from "../assets/luxury.jpg";
function Home() {
  const navigate = useNavigate();
  const isLoggedIn =
  localStorage.getItem("token");

const userName =
  localStorage.getItem("name");

const [destination, setDestination] =
  useState("");
  const [hoveredCard, setHoveredCard] =
  useState(null);
  const [featuredPackages, setFeaturedPackages] =
  useState([]);
  useEffect(() => {
  fetchFeaturedPackages();
}, []);

const fetchFeaturedPackages = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/packages"
    );

    setFeaturedPackages(
      res.data.slice(0, 3)
    );
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "#111",
          padding: "12px 0",
        }}
      >
        <div className="container">
         <a
  className="navbar-brand fw-bold d-flex align-items-center"
  href="#"
  style={{
    color: "#D4AF37",
    fontSize: "1.8rem",
    gap: "10px",
  }}
>
  <img
    src={compassLogo}
    alt="Compass"
    style={{
      width: "30px",
      height: "30px",
      objectFit: "contain",
    }}
  />

  <span>Horizon Compass</span>
</a>

          <div className="d-flex gap-4">

  <Link
    to="/"
    className="text-white text-decoration-none"
  >
    Home
  </Link>

  <Link
    to="/Stays"
    className="text-white text-decoration-none"
  >
    Stays
  </Link>

  <Link
    to="/packages"
    className="text-white text-decoration-none"
  >
    Packages
  </Link>

  <Link
    to="/blog"
    className="text-white text-decoration-none"
  >
    Blog
  </Link>

</div>

<div className="d-flex align-items-center gap-2">

  {isLoggedIn ? (
   <>
  <span
    style={{
      color: "#D4AF37",
      fontWeight: "600",
      marginRight: "10px",
    }}
  >
    Welcome, {userName}
  </span>

  <Link
    to="/my-bookings"
    className="btn btn-outline-light"
  >
    My Bookings
  </Link>

  <button
    className="btn"
    style={{
      backgroundColor: "#DC3545",
      color: "white",
      fontWeight: "600",
    }}
    onClick={() => {
      localStorage.clear();
      window.location.reload();
    }}
  >
    Logout
  </button>
</>
  ) : (
    <>
      <Link
        to="/login"
        className="btn btn-outline-light"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="btn"
        style={{
          backgroundColor: "#D4AF37",
          color: "#000",
          fontWeight: "600",
        }}
      >
        Register
      </Link>
    </>
  )}

</div>
        </div>
      </nav>

      {/* Hero Section */}
     {/* Hero Section */}
<section
  style={{
    width: "100%",
    height: "90vh",
    position: "relative",
    overflow: "hidden",
  }}
>
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
    }}
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

  {/* Dark Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      zIndex: 1,
    }}
  ></div>

  {/* Hero Content */}
  <div
    className="text-center text-white"
    style={{
      position: "relative",
      zIndex: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1
      style={{
        fontSize: "4rem",
        fontWeight: "700",
      }}
    >
      Discover Your Next Adventure
    </h1>

    <p
      style={{
        fontSize: "1.3rem",
        marginTop: "20px",
        marginBottom: "30px",
      }}
    >
      Explore breathtaking destinations around the world.
    </p>

   <button
  className="btn"
  style={{
    backgroundColor: "#D4AF37",
    color: "#000",
    fontWeight: "600",
  }}
  onClick={() => navigate("/packages")}
>
  Explore Tours
</button>
  </div>
</section>
      {/* Search Bar */}
<section
  style={{
    marginTop: "-40px",
    position: "relative",
    zIndex: "10",
  }}
>
  <div className="container">
    <div
      className="shadow-lg rounded-4 p-4"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        backgroundColor: "#f8f8f8",
        borderTop: "4px solid #D4AF37",
      }}
    >
      <div className="row g-3 align-items-center">

        <div className="col-md-3">
          <label className="form-label fw-bold">
            Destination
          </label>

        <input
  type="text"
  className="form-control"
  placeholder="Where to?"
  value={destination}
  onChange={(e) =>
    setDestination(e.target.value)
  }
/>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">
            Duration
          </label>

          <select className="form-select">
            <option>Select Duration</option>
            <option>3-5 Days</option>
            <option>6-10 Days</option>
            <option>10+ Days</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">
            Budget
          </label>

          <select className="form-select">
            <option>Select Budget</option>
            <option>₹20,000 - ₹50,000</option>
            <option>₹50,000 - ₹1,00,000</option>
            <option>₹1,00,000+</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">
            Search
          </label>

         <button
  className="btn w-100"
  style={{
    backgroundColor: "#D4AF37",
    color: "#000",
    fontWeight: "600",
  }}
  onClick={() =>
    navigate(
      `/packages?city=${destination}`
    )
  }
>
  Search Tours
</button>
        </div>

      </div>
    </div>
  </div>
</section>

      {/* Popular Destinations */}
  <section className="container py-5">
  <h2 className="text-center mb-5">
    Popular Destinations
  </h2>

  <div className="row">

    {/* Turkey */}
    <div className="col-md-4 mb-4">
      <div
        className="card shadow h-100"
        style={{
          cursor: "pointer",
          transform:
            hoveredCard === "turkey"
              ? "scale(1.03)"
              : "scale(1)",
          transition: "0.3s ease",
        }}
        onMouseEnter={() =>
          setHoveredCard("turkey")
        }
        onMouseLeave={() =>
          setHoveredCard(null)
        }
        onClick={() =>
          navigate("/packages?city=Turkey")
        }
      >
        <img
          src={turkiye}
          alt="Turkey"
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">
          <h5>Turkey</h5>
          <p>
            Hot air balloon adventures and
            stunning landscapes.
          </p>
        </div>
      </div>
    </div>

    {/* Japan */}
    <div className="col-md-4 mb-4">
      <div
        className="card shadow h-100"
        style={{
          cursor: "pointer",
          transform:
            hoveredCard === "japan"
              ? "scale(1.03)"
              : "scale(1)",
          transition: "0.3s ease",
        }}
        onMouseEnter={() =>
          setHoveredCard("japan")
        }
        onMouseLeave={() =>
          setHoveredCard(null)
        }
        onClick={() =>
          navigate("/packages?city=Tokyo")
        }
      >
        <img
          src={japan}
          alt="Japan"
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">
          <h5>Japan</h5>
          <p>
            Experience cherry blossoms,
            vibrant cities, and rich culture.
          </p>
        </div>
      </div>
    </div>

    {/* Switzerland */}
    <div className="col-md-4 mb-4">
      <div
        className="card shadow h-100"
        style={{
          cursor: "pointer",
          transform:
            hoveredCard === "switzerland"
              ? "scale(1.03)"
              : "scale(1)",
          transition: "0.3s ease",
        }}
        onMouseEnter={() =>
          setHoveredCard("switzerland")
        }
        onMouseLeave={() =>
          setHoveredCard(null)
        }
        onClick={() =>
          navigate("/packages?city=Zurich")
        }
      >
        <img
          src={switzerland}
          alt="Switzerland"
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">
          <h5>Switzerland</h5>
          <p>
            Snowy mountains and breathtaking
            scenery.
          </p>
        </div>
      </div>
    </div>

  </div>
</section>

{/* Featured Tour Packages */}
<section className="container py-5">
  <h2
    className="text-center fw-bold mb-5"
    style={{
      color: "#111",
    }}
  >
    Featured Tour Packages
  </h2>

  <div className="row g-4">
{featuredPackages.map((pkg) => (
  <div
    className="col-md-4 mb-4"
    key={pkg._id}
  >
    <div className="card shadow h-100">

      <img
        src={pkg.image}
        alt={pkg.title}
        className="card-img-top"
        style={{
          height: "300px",
          objectFit: "cover",
        }}
      />

      <div className="card-body">
        <h4>{pkg.title}</h4>

        <p>{pkg.duration}</p>

        <h4
          style={{
            color: "#D4AF37",
          }}
        >
          ₹{pkg.price}
        </h4>

        <p>
          {pkg.description}
        </p>

        <button
          className="btn w-100"
          style={{
            backgroundColor: "#D4AF37",
            color: "#000",
            fontWeight: "600",
          }}
          onClick={() =>
            navigate(
              `/packages/${pkg._id}`
            )
          }
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
))}
  </div>
</section>
{/* Testimonials */}
<section className="container py-5">

  <h2
    className="text-center fw-bold mb-5"
    style={{
      color: "#111",
    }}
  >
    What Our Travelers Say
  </h2>

  <div className="row g-4">

    {/* Review 1 */}
    <div className="col-md-4">
      <div
        className="card border-0 shadow-sm h-100"
        style={{
          padding: "25px",
        }}
      >
        <h4>★★★★★</h4>

        <p>
          "The Kyoto Cultural Tour was unforgettable. Everything was perfectly organized."
        </p>

        <h6 className="mt-3">
          — Rahul Sharma
        </h6>
      </div>
    </div>

    {/* Review 2 */}
    <div className="col-md-4">
      <div
        className="card border-0 shadow-sm h-100"
        style={{
          padding: "25px",
        }}
      >
        <h4>★★★★★</h4>

        <p>
          "Excellent customer support and amazing destinations. Highly recommended."
        </p>

        <h6 className="mt-3">
          — Priya Verma
        </h6>
      </div>
    </div>

    {/* Review 3 */}
    <div className="col-md-4">
      <div
        className="card border-0 shadow-sm h-100"
        style={{
          padding: "25px",
        }}
      >
        <h4>★★★★★</h4>

        <p>
          "The Switzerland package exceeded all expectations. Truly a premium experience."
        </p>

        <h6 className="mt-3">
          — Arjun Singh
        </h6>
      </div>
    </div>

  </div>

</section>

{/* Footer */}
<footer
  style={{
    backgroundColor: "#000",
    color: "#fff",
    padding: "25px 0",
    marginTop: "30px",
  }}
>
  <div className="container">
    <div className="row">

      <div className="col-md-4">
        <h3 style={{ color: "#D4AF37" }}>
          Horizon Compass
        </h3>

        <p>
          Explore the world with unforgettable travel experiences.
        </p>
      </div>

      <div className="col-md-4">
        <h5>Quick Links</h5>

        <ul className="list-unstyled">
          <li>Home</li>
          <li>Destinations</li>
          <li>Packages</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="col-md-4">
        <h5>Contact</h5>

        <p>📧 info@horizoncompass.com</p>
        <p>📞 +91 9876543210</p>
      </div>

    </div>

    <hr style={{ borderColor: "#444" }} />

    <p
      className="text-center"
      style={{
        marginBottom: "0",
      }}
    >
      © 2026 Horizon Compass. All Rights Reserved.
    </p>
  </div>
</footer>

</>
  );
}


export default Home;