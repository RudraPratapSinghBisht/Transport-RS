import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Payment() {
  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const {
    cartItems,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.pricePerDay || 0),
    0
  );

const handlePayment = async () => {
  try {

    const bookingId =
      "JM" + Date.now();

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/bookings`,
      {
        packageId:
          cartItems[0]?._id || "cart",

        packageTitle:
          cartItems
            .map(item => item.name)
            .join(", "),

        price: total,

        userName:
          localStorage.getItem("name"),

        email:
          localStorage.getItem("email"),

        paymentMethod:
          paymentMethod,

        paymentStatus:
          "Paid",

        bookingId:
          bookingId,
      }
    );

    toast.success(
      `Payment Successful! Booking ID: ${bookingId}`
    );

    clearCart();

    setTimeout(() => {
      navigate("/my-bookings");
    }, 1500);

  } catch (error) {

    console.error(error);

    toast.error(
      "Booking Failed"
    );

  }
};

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div className="container py-5">

        <div className="text-center mb-5">
          <span
            style={{
              backgroundColor: "#D4AF37",
              color: "#000",
              padding: "12px 30px",
              borderRadius: "12px",
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            Payment
          </span>
        </div>

        <div className="row">

          {/* LEFT SECTION */}

          <div className="col-md-8">

            <div
              className="p-4"
              style={{
                border:
                  "1px solid #D4AF37",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                }}
              >
                Select Payment Method
              </h3>

              <div className="form-check mt-4">
                <input
                  type="radio"
                  checked={
                    paymentMethod ===
                    "UPI"
                  }
                  onChange={() =>
                    setPaymentMethod(
                      "UPI"
                    )
                  }
                />
                <label className="ms-2">
                  UPI
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  checked={
                    paymentMethod ===
                    "Card"
                  }
                  onChange={() =>
                    setPaymentMethod(
                      "Card"
                    )
                  }
                />
                <label className="ms-2">
                  Credit / Debit Card
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  checked={
                    paymentMethod ===
                    "Net Banking"
                  }
                  onChange={() =>
                    setPaymentMethod(
                      "Net Banking"
                    )
                  }
                />
                <label className="ms-2">
                  Net Banking
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  checked={
                    paymentMethod ===
                    "Cash"
                  }
                  onChange={() =>
                    setPaymentMethod(
                      "Cash"
                    )
                  }
                />
                <label className="ms-2">
                  Pay At Pickup
                </label>
              </div>

              <hr
                style={{
                  borderColor:
                    "#D4AF37",
                }}
              />

              <h5>
                Selected Method:
                <span
                  style={{
                    color:
                      "#D4AF37",
                    marginLeft:
                      "10px",
                  }}
                >
                  {paymentMethod}
                </span>
              </h5>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="col-md-4">

            <div
              className="p-4"
              style={{
                border:
                  "1px solid #D4AF37",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                }}
              >
                Booking Summary
              </h3>

              <hr />

              {cartItems.map(
                (item) => (
                  <div
                    key={item._id}
                    className="mb-3"
                  >
                    <strong>
                      {item.name}
                    </strong>

                    <br />

                    {item.brand}

                    <br />

                    ₹
                    {
                      item.pricePerDay
                    }
                    /day
                  </div>
                )
              )}

              <hr />

              <h2>
                ₹
                {total.toLocaleString()}
              </h2>

              <button
                className="btn w-100 mt-4"
                style={{
                  backgroundColor:
                    "#D4AF37",
                  color: "#000",
                  fontWeight: "700",
                }}
                onClick={
                  handlePayment
                }
              >
                Pay Now
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
            backgroundColor:
              "#000",
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

export default Payment;