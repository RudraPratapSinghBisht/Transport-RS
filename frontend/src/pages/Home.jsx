import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
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

  const { cartItems } = useCart();
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
  fetchStays();
}, []);
const [stays, setStays] = useState([]);
const [stayStart, setStayStart] = useState(0);
const visibleStays = stays.slice(
  stayStart,
  stayStart + 3
);
const [packageStart, setPackageStart] =
  useState(0);
const visiblePackages = [
  featuredPackages[packageStart % featuredPackages.length],
  featuredPackages[(packageStart + 1) % featuredPackages.length],
  featuredPackages[(packageStart + 2) % featuredPackages.length],
].filter(Boolean);
console.log("Packages:", featuredPackages);
console.log("Count:", featuredPackages.length);
console.log("Start:", packageStart);
const nextStay = () => {
  if (stayStart >= stays.length - 3) {
    setStayStart(0);
  } else {
    setStayStart(stayStart + 1);
  }
};
const prevStay = () => {
  if (stayStart === 0) {
    setStayStart(stays.length - 3);
  } else {
    setStayStart(stayStart - 1);
  }
};
const nextPackage = () => {
  if (
    packageStart >=
    featuredPackages.length - 3
  ) {
    setPackageStart(0);
  } else {
    setPackageStart(packageStart + 1);
  }
};

const prevPackage = () => {
  if (packageStart === 0) {
    setPackageStart(
      featuredPackages.length - 3
    );
  } else {
    setPackageStart(packageStart - 1);
  }
};

const fetchFeaturedPackages = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/packages"
    );

    setFeaturedPackages(
      res.data
    );
  } catch (error) {
    console.error(error);
  }
};
const fetchStays = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/stays"
    );

    setStays(res.data);
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
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: "1000",
    background: "transparent",
    padding: "20px 0",
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
      width: "115px",
      height: "70px",
      objectFit: "contain",
    }}
  />

  <span>𝐇𝐨𝐫𝐢𝐳𝐨𝐧 𝐂𝐨𝐦𝐩𝐚𝐬𝐬</span>
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
  
  <Link
  to="/cart"
  className="text-white text-decoration-none"
>
  Cart ({cartItems.length})
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");

      window.location.href = "/";
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
    height: "105vh",
    position: "relative",
    overflow: "hidden",
    marginTop: "0",
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
    marginTop: "-35px",
    position: "relative",
    zIndex: "10",
    backgroundColor: "#000",
    paddingBottom: "20px",
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
{/* Featured Tour Packages */}
<section
  className="container-fluid pt-3 pb-5"
  style={{
    backgroundColor: "#000",
  }}
>
<div
  style={{
    position: "relative",
    marginBottom: "40px",
    textAlign: "center",
  }}
>
  <span
    style={{
      backgroundColor: "#D4AF37",
      color: "#ffffff",
      padding: "12px 30px",
      borderRadius: "12px",
      fontSize: "2rem",
      fontWeight: "700",
      display: "inline-block",
      boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
    }}
  >
    Featured Tour Packages
  </span>

  <div
    style={{
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      gap: "10px",
    }}
  >
    <button
      className="btn"
      onClick={prevPackage}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        fontSize: "40px",
      }}
    >
      ❮
    </button>

    <button
      className="btn"
      onClick={nextPackage}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        fontSize: "40px",
      }}
    >
      ❯
    </button>
  </div>
</div>

  <div className="row g-4">
{visiblePackages.map((pkg) => (
  <div
    className="col-md-4 mb-4"
    key={pkg._id}
  >
   <div
  className="card shadow h-100 premium-card"
  style={{
    backgroundColor: "#000000",
    color: "white",
    border: "1px solid #D4AF37",
  }}
>

      <img
        src={pkg.image}
        alt={pkg.title}
        className="card-img-top"
        style={{
          height: "300px",
          objectFit: "cover",
        }}
      />

     <div
  className="card-body"
  style={{
    backgroundColor: "#000000",
    color: "white",
  }}
>
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

<section
  className="container-fluid pt-3 pb-5"
  style={{
    background:
      "linear-gradient(to right, #000, #000000)",
  }}
>
  <div className="px-3">

<div
  style={{
    position: "relative",
    marginBottom: "30px",
    textAlign: "center",
  }}
>

  <h2
    className="text-center fw-bold"
    style={{
      backgroundColor: "#d4a822",
      color: "#ffffff",
      margin: 2,
      padding: "12px 30px",
      borderRadius: "12px",
      fontSize: "2rem",
      display: "inline-block",
      boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
    }}
  >
    Choose Your Stay
  </h2>

  <div
    style={{
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      gap: "10px",
    }}
  >

    <button
      className="btn"
      onClick={prevStay}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        fontSize: "40px",
        transition: "0.3s"
      }}
    >
      ❮
    </button>

    <button
      className="btn"
      onClick={nextStay}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        fontSize: "40px",
        transition: "0.3s"
      }}
    >
      ❯
    </button>

  </div>

</div>

    <div className="row g-4">

      {visibleStays.map((stay) => (
        <div
          className="col-md-4"
          key={stay._id}
        >
          <div
            className="card shadow stay-card"
            style={{
              backgroundColor: "#000000",
              color: "white",
              border:
                "2px solid #c8b613",
                boxShadow: "0 0 10px rgba(212,175,55,0.3)",
            }}
          >
            <img
              src={stay.image}
              alt={stay.title}
              className="card-img-top"
              style={{
                height: "230px",
                objectFit: "cover",
              }}
            />

            <div className="card-body">

              <h3>{stay.title}</h3>

              <p
                style={{
                  color: "#D4AF37",
                  fontWeight: "600",
                }}
              >
                {stay.category}
              </p>

              <p>
                {stay.location}
              </p>

              <h5>
                ₹{stay.price}/night
              </h5>

              <button
                className="btn mt-2"
                style={{
                  backgroundColor:
                    "#D4AF37",
                  color: "#000",
                  fontWeight: "600",
                }}
                onClick={() =>
                  navigate(
                    `/stays/${stay._id}`
                  )
                }
              >
                Explore
              </button>

            </div>
          </div>
        </div>
      ))}

    </div>

  </div>
</section>
     {/* Popular Destinations */}
 <section
  className="py-5"
  style={{
    backgroundColor: "#000",
    position: "relative",
    textAlign: "center",
  }}
>
  <div className="container"></div>
  <h2
  className="text-center mb-5 fw-bold"
  style={{
      backgroundColor: "#D4AF37",
      margin: 2,
      color: "#ffffff",
      padding: "10px 25px",
      borderRadius: "12px",
      fontSize: "2rem",
      fontWeight: "700",
      display: "inline-block",
      boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
  }}
>
  Trending Destinations
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
            backgroundColor: "#000000",
    color: "white",
    border: "1px solid #D4AF37"
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
            backgroundColor: "#000000",
    color: "white",
    border: "1px solid #D4AF37"
        }}
        onMouseEnter={() =>
          setHoveredCard("japan")
        }
        onMouseLeave={() =>
          setHoveredCard(null)
        }
        onClick={() =>
          navigate("/packages?city=Japan")
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
            backgroundColor: "#000000",
    color: "white",
    border: "1px solid #D4AF37"
        }}
        onMouseEnter={() =>
          setHoveredCard("switzerland")
        }
        onMouseLeave={() =>
          setHoveredCard(null)
        }
        onClick={() =>
          navigate("/packages?city=Switzerland")
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

{/* Testimonials */}
<section
  className="pt-1 pb-5"
  style={{
    backgroundColor: "#000",
  }}
>
  <div className="container"></div>

  <h2
    className="text-center fw-bold mb-5"
    style={{
      color: "#D4AF37",
    }}
  >
    What Our Travelers Say
  </h2>

  <div className="row g-4">

    {/* Review 1 */}
    <div className="col-md-4">
      <div
  className="card h-100 premium-card"
style={{
  backgroundColor: "#000000",
  color: "white",
  padding: "25px",
  border: "1px solid #D4AF37",
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
  className="card h-100 premium-card"
style={{
  backgroundColor: "#000000",
  color: "white",
  padding: "25px",
  border: "1px solid #D4AF37",
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
      className="card h-100"
style={{
  backgroundColor: "#000000",
  color: "white",
  padding: "25px",
  border: "1px solid #D4AF37",
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
    padding: "5px 0",
    marginTop: "0px",
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

    <hr style={{ borderColor: "#d2a211" }} />

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