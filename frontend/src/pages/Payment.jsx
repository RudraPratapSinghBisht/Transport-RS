import { useState } from "react";
import { useCart } from "../context/CartContext";

function Payment() {
  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

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
              color: "#fff",
              padding: "12px 30px",
              borderRadius: "12px",
              fontSize: "2rem",
              fontWeight: "700",
              boxShadow:
                "0 4px 15px rgba(212,175,55,0.3)",
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
                border: "1px solid #D4AF37",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                }}
              >
                Payment Method
              </h3>

              <div className="form-check mt-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={
                    paymentMethod === "UPI"
                  }
                  onChange={() =>
                    setPaymentMethod("UPI")
                  }
                />

                <label className="ms-2">
                  UPI
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={
                    paymentMethod ===
                    "Credit / Debit Card"
                  }
                  onChange={() =>
                    setPaymentMethod(
                      "Credit / Debit Card"
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
                  name="paymentMethod"
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
                  name="paymentMethod"
                  checked={
                    paymentMethod ===
                    "QR Code"
                  }
                  onChange={() =>
                    setPaymentMethod(
                      "QR Code"
                    )
                  }
                />

                <label className="ms-2">
                  QR Code
                </label>
              </div>

              <hr
                style={{
                  borderColor: "#D4AF37",
                }}
              />

              {/* UPI */}

              {paymentMethod ===
                "UPI" && (
                <div className="mt-4">

                  <label className="mb-2">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="example@upi"
                  />

                </div>
              )}

              {/* CARD */}

              {paymentMethod ===
                "Credit / Debit Card" && (
                <div className="mt-4">

                  <input
                    className="form-control mb-3"
                    placeholder="Card Number"
                  />

                  <div className="row">

                    <div className="col">

                      <input
                        className="form-control"
                        placeholder="MM/YY"
                      />

                    </div>

                    <div className="col">

                      <input
                        className="form-control"
                        placeholder="CVV"
                      />

                    </div>

                  </div>

                  <input
                    className="form-control mt-3"
                    placeholder="Card Holder Name"
                  />

                </div>
              )}

              {/* NET BANKING */}

              {paymentMethod ===
                "Net Banking" && (
                <div className="mt-4">

                  <select className="form-control">

                    <option>
                      Select Bank
                    </option>

                    <option>
                      SBI
                    </option>

                    <option>
                      HDFC
                    </option>

                    <option>
                      ICICI
                    </option>

                    <option>
                      Axis Bank
                    </option>

                  </select>

                </div>
              )}

              {/* QR */}

              {paymentMethod ===
                "QR Code" && (
                <div className="mt-4 text-center">

                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HorizonCompass"
                    alt="QR Code"
                    style={{
                      borderRadius: "10px",
                    }}
                  />

                  <p className="mt-3">
                    Scan QR using any
                    UPI app
                  </p>

                </div>
              )}

              <div className="mt-4">

                <strong>
                  Selected Method:
                </strong>{" "}

                <span
                  style={{
                    color: "#D4AF37",
                  }}
                >
                  {paymentMethod}
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="col-md-4">

            <div
              className="p-4"
              style={{
                border: "1px solid #D4AF37",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                }}
              >
                Amount Payable
              </h3>

              <h1>
                ₹{total.toLocaleString()}
              </h1>

              <button
                className="btn w-100 mt-4"
                style={{
                  backgroundColor:
                    "#D4AF37",
                  color: "#000",
                  fontWeight: "700",
                }}
              >
                Pay Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Payment;