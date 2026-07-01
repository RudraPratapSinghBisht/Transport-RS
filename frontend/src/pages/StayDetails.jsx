import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../services/api";

function StayDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [stay, setStay] =
    useState(null);

  useEffect(() => {
    fetchStay();
  }, []);

  const fetchStay = async () => {
    try {
      const res = await axios.get(
        apiUrl(`stays/${id}`)
      );

      setStay(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stay) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <img
        src={stay.image}
        alt={stay.title}
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
      />

      <div className="container py-5">

        <h1
          style={{
            color: "#D4AF37",
          }}
        >
          {stay.title}
        </h1>

        <h4>{stay.location}</h4>

        <h3
          style={{
            color: "#D4AF37",
          }}
        >
          ₹{stay.price}/night
        </h3>

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
          Description
        </h3>

        <p>{stay.description}</p>
        <div className="mt-4 d-flex gap-3">

          <button
            className="btn"
            style={{
              backgroundColor: "#D4AF37",
              color: "#000",
              fontWeight: "600",
              padding: "10px 25px",
            }}
            onClick={() => {
              addToCart({
                ...stay,
                type: "stay",
              });

              toast.success(`${stay.title} added to cart`);
            }}
          >
            Add To Cart
          </button>

          <button
            className="btn btn-outline-warning"
            style={{
              padding: "10px 25px",
              fontWeight: "600",
            }}
            onClick={() => {
              addToCart({
                ...stay,
                type: "stay",
              });

              navigate("/cart");
            }}
          >
            Book Now
          </button>

        </div>
<button
  onClick={() => navigate("/")}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "40px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#000000",
    border: "none",
    fontSize: "24px",
    fontWeight: "bold",
    zIndex: "9999",
  }}
>
  🏠
</button>
      </div>
    </div>
  );
}

export default StayDetails;
