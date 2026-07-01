import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { apiUrl } from "../services/api";

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] =
    useState(null);

  const { addToCart } =
    useCart();

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle =
    async () => {
      try {
        const res =
          await axios.get(
            apiUrl(`packages/${id}`)
          );

        setVehicle(
          res.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (!vehicle) {
    return (
      <h2
        className="text-center mt-5"
      >
        Loading...
      </h2>
    );
  }

  const handleAddToCart =
    () => {
      addToCart({
        ...vehicle,
        type:
          "vehicle",
      });

      toast.success(
        `${vehicle.name} added to cart`
      );
    };

  const handleBooking =
    () => {
      addToCart({
        ...vehicle,
        type:
          "vehicle",
      });

      navigate("/cart");
    };

  return (

  <div
    style={{
      backgroundColor: "#000",
      color: "#fff",
      minHeight: "100vh",
    }}
  >
    <div className="container py-5">

  <div className="row g-5 align-items-start">

    {/* LEFT SIDE IMAGE */}

    <div className="col-lg-5">

      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="img-fluid"
        style={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
          borderRadius: "15px",
          border: "2px solid #D4AF37",
          boxShadow:
            "0 0 20px rgba(212,175,55,0.35)",
        }}
      />

    </div>

    {/* RIGHT SIDE DETAILS */}

    <div className="col-lg-7">

      <h1
        style={{
          color: "#D4AF37",
          fontWeight: "700",
        }}
      >
        {vehicle.name}
      </h1>

      <h4 className="mb-3">
         {vehicle.city}
      </h4>

      <h2
        style={{
          color: "#D4AF37",
          fontWeight: "700",
        }}
      >
        ₹{vehicle.pricePerDay}/day
      </h2>

      <hr
        style={{
          borderColor: "#D4AF37",
        }}
      />

      <h3
        style={{
          color: "#D4AF37",
        }}
      >
        Vehicle Description
      </h3>

      <p
        style={{
          fontSize: "1.05rem",
          lineHeight: "1.8",
        }}
      >
        {vehicle.description}
      </p>

      <hr
        style={{
          borderColor: "#D4AF37",
        }}
      />

      <h3
        style={{
          color: "#D4AF37",
        }}
      >
        Vehicle Details
      </h3>

      <div className="row mt-3">

        <div className="col-md-6">

          <p>
            <strong>Brand:</strong>{" "}
            {vehicle.brand}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {vehicle.type}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {vehicle.category}
          </p>

        </div>

        <div className="col-md-6">

          <p>
            <strong>Fuel Type:</strong>{" "}
            {vehicle.fuelType}
          </p>

          <p>
            <strong>Transmission:</strong>{" "}
            {vehicle.transmission}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {vehicle.city}
          </p>

        </div>

      </div>

      <div className="d-flex gap-3 mt-4">

        <button
          className="btn"
          style={{
            backgroundColor:
              "#D4AF37",
            color: "#000",
            fontWeight: "700",
            padding:
              "12px 35px",
          }}
          onClick={
            handleAddToCart
          }
        >
          Add To Cart
        </button>

        <button
          className="btn btn-outline-warning"
          style={{
            padding:
              "12px 35px",
            fontWeight:
              "700",
          }}
          onClick={
            handleBooking
          }
        >
          Book Now
        </button>

      </div>

    </div>

  </div>

  <button
    onClick={() =>
      navigate("/")
    }
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "55px",
      height: "55px",
      borderRadius: "50%",
      backgroundColor: "#000",
      border:
        "2px solid #D4AF37",
      fontSize: "24px",
      zIndex: "9999",
    }}
  >
    🏠
  </button>

</div>

  </div>
);
}

export default PackageDetails;
