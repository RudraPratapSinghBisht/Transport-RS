import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

import compassLogo from "../assets/compass.png";
import HeroImage from "../assets/HeroImage.jpg";

// KEEP ALL YOUR OTHER IMAGE IMPORTS
// I am not touching images as requested

function Home() {
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const isLoggedIn =
    localStorage.getItem("token");

  const userName =
    localStorage.getItem("name");

  const [location, setLocation] =
    useState("");

  const [hoveredCard, setHoveredCard] =
    useState(null);

  const [featuredPackages,
    setFeaturedPackages] =
    useState([]);

  const [stays, setStays] =
    useState([]);

  const [stayStart,
    setStayStart] =
    useState(0);

  const [packageStart,
    setPackageStart] =
    useState(0);

  useEffect(() => {
    fetchFeaturedPackages();
    fetchStays();
  }, []);

  const visibleStays =
    Array.isArray(stays)
      ? stays.slice(stayStart, stayStart + 3)
      : [];

  const visiblePackages = [
    featuredPackages[
      packageStart %
        Math.max(featuredPackages.length, 1)
    ],
    featuredPackages[
      (packageStart + 1) %
        Math.max(featuredPackages.length, 1)
    ],
    featuredPackages[
      (packageStart + 2) %
        Math.max(featuredPackages.length, 1)
    ],
  ].filter(Boolean);

  const nextStay = () => {
    if (stayStart >= stays.length - 3) {
      setStayStart(0);
    } else {
      setStayStart(stayStart + 1);
    }
  };

  const prevStay = () => {
    if (stayStart === 0) {
      setStayStart(
        Math.max(stays.length - 3, 0)
      );
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
        Math.max(
          featuredPackages.length - 3,
          0
        )
      );
    } else {
      setPackageStart(packageStart - 1);
    }
  };

  const fetchFeaturedPackages =
    async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/packages`
        );

        setFeaturedPackages(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchStays = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/stays`
      );

      setStays(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "transparent",
          padding: "20px 0",
        }}
      >
        <div className="container">

          <Link
            to="/"
            className="navbar-brand fw-bold d-flex align-items-center"
            style={{
              color: "#D4AF37",
              fontSize: "1.8rem",
              gap: "10px",
            }}
          >
            <img
              src={compassLogo}
              alt="JOURNEY MATE"
              style={{
                width: "115px",
                height: "70px",
                objectFit: "contain",
              }}
            />

            <span>
              JOURNEY MATE
            </span>
          </Link>

          <div className="d-flex gap-4">

            <Link
              to="/"
              className="text-white text-decoration-none"
            >
              Home
            </Link>

            <Link
              to="/stays"
              className="text-white text-decoration-none"
            >
              Cars
            </Link>

            <Link
              to="/packages"
              className="text-white text-decoration-none"
            >
              Bikes
            </Link>

            <Link
              to="/blog"
              className="text-white text-decoration-none"
            >
              Offers
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
                  }}
                >
                  Welcome, {userName}
                </span>

                <Link
                  to="/my-bookings"
                  className="btn btn-outline-light"
                >
                  My Rentals
                </Link>

                <button
                  className="btn"
                  style={{
                    backgroundColor:
                      "#DC3545",
                    color: "#fff",
                  }}
                  onClick={() => {
                    localStorage.clear();
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
                    backgroundColor:
                      "#D4AF37",
                    color: "#000",
                  }}
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      </nav>

      <section
        style={{
          width: "100%",
          height: "104.5vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={HeroImage}
          alt="Hero"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.55)",
          }}
        />

        <div
          className="text-center text-white"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent:
              "center",
            alignItems:
              "center",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "700",
            }}
          >
            Rent Your Perfect Ride
          </h1>

          <p
            style={{
              fontSize: "1.3rem",
              marginTop: "20px",
            }}
          >
            Premium Cars &
            Bikes Available
            Across India
          </p>

          <button
            className="btn mt-4"
            style={{
              backgroundColor:
                "#D4AF37",
              color: "#000",
              fontWeight: "600",
            }}
            onClick={() =>
              navigate("/packages")
            }
          >
            Browse Vehicles
          </button>
        </div>
      </section>
            {/* Search Vehicles */}

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
                  Location
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City"
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="col-md-3">

                <label className="form-label fw-bold">
                  Vehicle Type
                </label>

                <select className="form-select">

                  <option>
                    Select Vehicle
                  </option>

                  <option>
                    Car
                  </option>

                  <option>
                    Bike
                  </option>

                  <option>
                    SUV
                  </option>

                  <option>
                    Sports Bike
                  </option>

                </select>

              </div>

              <div className="col-md-3">

                <label className="form-label fw-bold">
                  Budget
                </label>

                <select className="form-select">

                  <option>
                    Select Budget
                  </option>

                  <option>
                    ₹500 - ₹1,500
                  </option>

                  <option>
                    ₹1,500 - ₹3,000
                  </option>

                  <option>
                    ₹3,000+
                  </option>

                </select>

              </div>

              <div className="col-md-3">

                <label className="form-label fw-bold">
                  Search
                </label>

                <button
                  className="btn w-100"
                  style={{
                    backgroundColor:
                      "#D4AF37",
                    color: "#000",
                    fontWeight: "600",
                  }}
                  onClick={() =>
                    navigate(
                      `/packages?city=${location}`
                    )
                  }
                >
                  Search Vehicles
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Featured Bikes */}

      <section
        className="container-fluid pt-3 pb-5"
        style={{
          backgroundColor: "#000000",
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
              backgroundColor:
                "#D4AF37",
              color: "#000000",
              padding:
                "12px 30px",
              borderRadius:
                "12px",
              fontSize: "2rem",
              fontWeight: "700",
              display:
                "inline-block",
              boxShadow:
                "0 4px 15px rgba(212,175,55,0.3)",
            }}
          >
            Featured Bikes
          </span>

          <div
            style={{
              position:
                "absolute",
              right: "0",
              top: "50%",
              transform:
                "translateY(-50%)",
              display: "flex",
              gap: "10px",
            }}
          >

            <button
              className="btn"
              onClick={
                prevPackage
              }
              style={{
                backgroundColor:
                  "#000",
                color: "#fff",
                border: "none",
                fontSize:
                  "40px",
              }}
            >
              ❮
            </button>

            <button
              className="btn"
              onClick={
                nextPackage
              }
              style={{
                backgroundColor:
                  "#000",
                color: "#fff",
                border: "none",
                fontSize:
                  "40px",
              }}
            >
              ❯
            </button>

          </div>

        </div>

        <div className="row g-4">

          {visiblePackages.map(
            (pkg) => (

              <div
                className="col-md-4 mb-4"
                key={pkg._id}
              >

                <div
                  className="card shadow h-100"
                  style={{
                    backgroundColor:
                      "#000",
                    color:
                      "white",
                    border:
                      "1px solid #D4AF37",
                  }}
                >

                  <img
                    src={pkg.image}
                    alt={
                      pkg.title
                    }
                    className="card-img-top"
                    style={{
                      height:
                        "300px",
                      objectFit:
                        "cover",
                    }}
                  />

                  <div className="card-body">

                    <h4>
                      {pkg.title}
                    </h4>

                    <p>
                      Available
                      for Daily
                      Rental
                    </p>

                    <h4
                      style={{
                        color:
                          "#D4AF37",
                      }}
                    >
                      ₹
                      {pkg.price}
                      /day
                    </h4>

                    <p>
                      {
                        pkg.description
                      }
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        backgroundColor:
                          "#D4AF37",
                        color:
                          "#000",
                        fontWeight:
                          "600",
                      }}
                      onClick={() =>
                        navigate(
                          `/packages/${pkg._id}`
                        )
                      }
                    >
                      Rent Now
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>
            {/* Featured Cars */}

      <section
        className="container-fluid py-5"
        style={{
          backgroundColor: "#000000",
        }}
      >

        <div className="text-center mb-5">

          <span
            style={{
              backgroundColor:
                "#D4AF37",
              color: "#000000",
              padding:
                "12px 30px",
              borderRadius:
                "12px",
              fontSize: "2rem",
              fontWeight: "700",
              display:
                "inline-block",
            }}
          >
            Featured Cars
          </span>

        </div>

        <div className="row g-4">

          {visibleStays.map(
            (stay) => (

              <div
                className="col-md-4"
                key={stay._id}
              >

                <div
                  className="card h-100 shadow"
                  style={{
                    backgroundColor:
                      "#000",
                    color:
                      "#fff",
                    border:
                      "1px solid #D4AF37",
                  }}
                  onMouseEnter={() =>
                    setHoveredCard(
                      stay._id
                    )
                  }
                  onMouseLeave={() =>
                    setHoveredCard(
                      null
                    )
                  }
                >

                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="card-img-top"
                    style={{
                      height:
                        "250px",
                      objectFit:
                        "cover",
                    }}
                  />

                  <div className="card-body">

                    <h4>
                      {stay.title}
                    </h4>

                    <p>
                      {stay.city}
                    </p>

                    <h5
                      style={{
                        color:
                          "#D4AF37",
                      }}
                    >
                      ₹
                      {stay.price}
                      /day
                    </h5>

                    <p>
                      {
                        stay.description
                      }
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        backgroundColor:
                          hoveredCard ===
                          stay._id
                            ? "#fff"
                            : "#D4AF37",
                        color:
                          "#000",
                        fontWeight:
                          "600",
                      }}
                      onClick={() =>
                        navigate(
                          `/stays/${stay._id}`
                        )
                      }
                    >
                      Rent Car
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        <div className="text-center mt-4">

          <button
            className="btn me-3"
            style={{
              backgroundColor:
                "#D4AF37",
              color: "#000",
            }}
            onClick={prevStay}
          >
            ❮
          </button>

          <button
            className="btn"
            style={{
              backgroundColor:
                "#D4AF37",
              color: "#000",
            }}
            onClick={nextStay}
          >
            ❯
          </button>

        </div>

      </section>

      {/* Vehicle Categories */}

      <section
        className="container-fluid py-5"
        style={{
          backgroundColor: "#000000",
        }}
      >

        <div className="text-center mb-5">

          <span
            style={{
              backgroundColor:
                "#D4AF37",
              color: "#000000",
              padding:
                "12px 30px",
              borderRadius:
                "12px",
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            Browse By Category
          </span>

        </div>

        <div className="row g-4">

          <div className="col-md-3">

            <div
              className="card text-center p-4"
              style={{
                backgroundColor:
                  "#000000",
                color:
                  "#fff",
                border:
                  "1px solid #D4AF37",
              }}
            >
              <h3>🚗</h3>

              <h5>Sedan</h5>

              <p>
                Comfortable
                city rides
              </p>
            </div>

          </div>

          <div className="col-md-3">

            <div
              className="card text-center p-4"
              style={{
                backgroundColor:
                  "#000000",
                color:
                  "#fff",
                border:
                  "1px solid #D4AF37",
              }}
            >
              <h3>🚙</h3>

              <h5>SUV</h5>

              <p>
                Family trips
                and tours
              </p>
            </div>

          </div>

          <div className="col-md-3">

            <div
              className="card text-center p-4"
              style={{
                backgroundColor:
                  "#000000",
                color:
                  "#fff",
                border:
                  "1px solid #D4AF37",
              }}
            >
              <h3>🏍️</h3>

              <h5>Sports Bike</h5>

              <p>
                High performance
                rides
              </p>
            </div>

          </div>

          <div className="col-md-3">

            <div
              className="card text-center p-4"
              style={{
                backgroundColor:
                  "#000000",
                color:
                  "#fff",
                border:
                  "1px solid #D4AF37",
              }}
            >
              <h3>🛵</h3>

              <h5>Scooter</h5>

              <p>
                Easy urban
                commuting
              </p>
            </div>

          </div>

        </div>

      </section>
            {/* Why Choose Us */}

      <section
        className="container-fluid py-5"
        style={{
          backgroundColor: "#000000",
        }}
      >

        <div className="container">

          <div className="text-center mb-5">

            <span
              style={{
                backgroundColor:
                  "#D4AF37",
                color: "#000000",
                padding:
                  "12px 30px",
                borderRadius:
                  "12px",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Why Choose JOURNEY MATE
            </span>

          </div>

          <div className="row text-center">

            <div className="col-md-3">

              <div
                className="card p-4 h-100"
                style={{
                  backgroundColor:
                    "#000",
                  color: "#fff",
                  border:
                    "1px solid #D4AF37",
                }}
              >
                <h1>🚘</h1>

                <h4>
                  Premium Fleet
                </h4>

                <p>
                  Well maintained
                  cars and bikes.
                </p>
              </div>

            </div>

            <div className="col-md-3">

              <div
                className="card p-4 h-100"
                style={{
                  backgroundColor:
                    "#000",
                  color: "#fff",
                  border:
                    "1px solid #D4AF37",
                }}
              >
                <h1>💰</h1>

                <h4>
                  Best Pricing
                </h4>

                <p>
                  Affordable daily
                  and weekly rentals.
                </p>
              </div>

            </div>

            <div className="col-md-3">

              <div
                className="card p-4 h-100"
                style={{
                  backgroundColor:
                    "#000",
                  color: "#fff",
                  border:
                    "1px solid #D4AF37",
                }}
              >
                <h1>🛡️</h1>

                <h4>
                  Fully Insured
                </h4>

                <p>
                  Safe and secure
                  vehicle rentals.
                </p>
              </div>

            </div>

            <div className="col-md-3">

              <div
                className="card p-4 h-100"
                style={{
                  backgroundColor:
                    "#000",
                  color: "#fff",
                  border:
                    "1px solid #D4AF37",
                }}
              >
                <h1>⚡</h1>

                <h4>
                  Instant Booking
                </h4>

                <p>
                  Book your ride
                  in minutes.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Reviews */}

      <section
        className="container-fluid py-5"
        style={{
          backgroundColor: "#000",
        }}
      >

        <div className="container">

          <div className="text-center mb-5">

            <span
              style={{
                backgroundColor:
                  "#D4AF37",
                color: "#000000",
                padding:
                  "12px 30px",
                borderRadius:
                  "12px",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Customer Reviews
            </span>

          </div>

          <div className="row">

            <div className="col-md-4">

              <div
                className="card p-4 h-100"
                style={{
                  backgroundColor:
                    "#000000",
                  color: "#fff",
                  border:
                    "1px solid #D4AF37",
                }}
              >
                <h4>
                  ⭐⭐⭐⭐⭐
                </h4>

                <p>
                  Excellent service.
                  The car was clean
                  and delivered on
                  time.
                </p>

                <strong>
                  - Rahul Sharma
                </strong>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="card p-4 h-100"
                style={{
                  backgroundColor:
                    "#000000",
                  color: "#fff",
                  border:
                    "1px solid #D4AF37",
                }}
              >
                <h4>
                  ⭐⭐⭐⭐⭐
                </h4>

                <p>
                  Booked a bike
                  for a weekend trip.
                  Smooth experience.
                </p>

                <strong>
                  - Priya Verma
                </strong>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="card p-4 h-100"
                style={{
                  backgroundColor:
                    "#000000",
                  color: "#fff",
                  border:
                    "1px solid #D4AF37",
                }}
              >
                <h4>
                  ⭐⭐⭐⭐⭐
                </h4>

                <p>
                  Affordable prices
                  and professional
                  support team.
                </p>

                <strong>
                  - Arjun Singh
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section
        className="container-fluid py-5"
        style={{
          backgroundColor:
            "#000000",
        }}
      >

        <div className="container text-center">

          <h1
            style={{
              color: "#d3a826",
              fontWeight: "700",
            }}
          >
            Ready To Ride?
          </h1>

          <p
            style={{
              color: "#d4a91c",
              fontSize: "1.2rem",
            }}
          >
            Explore our premium
            collection of cars
            and bikes.
          </p>

          <button
            className="btn btn-dark btn-lg"
            onClick={() =>
              navigate("/packages")
            }
          >
            Browse Vehicles
          </button>

        </div>

      </section>

      {/* Footer */}

      <footer
        style={{
          backgroundColor:
            "#000",
          color: "#fff",
          padding: "40px 0",
        }}
      >

        <div className="container">

          <div className="row">

            <div className="col-md-4">

              <h3
                style={{
                  color:
                    "#D4AF37",
                }}
              >
                JOURNEY MATE
              </h3>

              <p>
                Premium Car &
                Bike Rental
                Platform.
              </p>

            </div>

            <div className="col-md-4">

              <h5>
                Quick Links
              </h5>

              <ul
                className="list-unstyled"
              >
                <li>Home</li>
                <li>Cars</li>
                <li>Bikes</li>
                <li>Cart</li>
              </ul>

            </div>

            <div className="col-md-4">

              <h5>
                Contact
              </h5>

              <p>
                📧 support@journeymate.com
              </p>

              <p>
                📞 +91 9876543210
              </p>

            </div>

          </div>

          <hr
            style={{
              borderColor:
                "#D4AF37",
            }}
          />

          <p
            className="text-center"
          >
            © 2026 JOURNEY MATE.
            All Rights Reserved.
          </p>

        </div>

      </footer>

    </>
  );
}

export default Home;