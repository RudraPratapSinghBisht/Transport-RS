import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const {
  cartItems,
  clearCart,
} = useCart();

const navigate = useNavigate();

const [formData, setFormData] = useState({
  userName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  nationality: "",
  state: "",
});

  const total = cartItems.reduce(
  (sum, item) =>
    sum +
    Number(item.pricePerDay || 0),
  0
);
const handlePayment = async () => {
  try {

    const firstItem = cartItems[0];

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/bookings`,
     {
  packageId: firstItem?._id || "cart",

  packageTitle:
    cartItems.map(
      (item) => item.name
    ).join(", "),

  price: total,

  userName: formData.userName,

  email: formData.email,

  phone: formData.phone,

  age: formData.age,

  gender: formData.gender,

  nationality: formData.nationality,

  state: formData.state,
}
    );

   clearCart();

toast.success(
  "Booking Submitted Successfully!"
);

navigate(
"/my-bookings"
);

  } catch (error) {

    console.log(error);

   toast.error(
  "Booking Failed"
);

  }
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

        <div className="text-center mb-5">
          <span
            style={{
              backgroundColor: "#D4AF37",
              color: "#fff",
              padding: "12px 30px",
              borderRadius: "12px",
              fontSize: "2rem",
              fontWeight: "700",
              display: "inline-block",
              boxShadow:
                "0 4px 15px rgba(212,175,55,0.3)",
            }}
          >
            Checkout
          </span>
        </div>

        <div className="row">

          {/* Customer Details */}

          <div className="col-md-7">

            <div
              className="p-4"
              style={{
                border:
                  "1px solid #D4AF37",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                }}
              >
                Personal Details
              </h3>

            <input
  className="form-control mb-3"
  placeholder="Full Name"
  value={formData.userName}
  onChange={(e) =>
    setFormData({
      ...formData,
      userName: e.target.value,
    })
  }
/>
          <input
  className="form-control mb-3"
  placeholder="Email"
  value={formData.email}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }
/>

             <input
  className="form-control mb-3"
  placeholder="Mobile Number"
  value={formData.phone}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value,
    })
  }
/>
<input
  className="form-control mb-3"
  placeholder="Age"
  value={formData.age}
  onChange={(e) =>
    setFormData({
      ...formData,
      age: e.target.value,
    })
  }
/>
<select
  className="form-control mb-3"
  value={formData.gender}
  onChange={(e) =>
    setFormData({
      ...formData,
      gender: e.target.value,
    })
  }
>
                <option>
                  Select Gender
                </option>

                <option>Male</option>

                <option>Female</option>

                <option>Other</option>
              </select>

           <input
  className="form-control mb-3"
  placeholder="Nationality"
  value={formData.nationality}
  onChange={(e) =>
    setFormData({
      ...formData,
      nationality: e.target.value,
    })
  }
/>

             <input
  className="form-control"
  placeholder="State"
  value={formData.state}
  onChange={(e) =>
    setFormData({
      ...formData,
      state: e.target.value,
    })
  }
/>
            </div>
          </div>

          {/* Order Summary */}

          <div className="col-md-5">

            <div
              className="p-4"
              style={{
                border:
                  "1px solid #D4AF37",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{
                  color: "#D4AF37",
                }}
              >
                Order Summary
              </h3>

              {cartItems.map(
                (item, index) => (
                  <div
                    key={index}
                    className="mb-3"
                  >
                   <strong>
  {item.name}
</strong>

<br />

₹{item.pricePerDay}/day

<br />

<span
  style={{
    color: "#D4AF37",
  }}
>
  {item.brand}
</span>
                  </div>
                )
              )}

              <hr />

              <h2>
                Total:
                <span
                  style={{
                    color:
                      "#D4AF37",
                  }}
                >
                  {" "}
                  ₹{total}
                </span>
              </h2>
<button
  className="btn w-100 mt-4"
  style={{
    backgroundColor:"#D4AF37",
    color:"#000",
    fontWeight:"700"
  }}
  onClick={() => navigate("/payment")}
>
  Proceed To Payment
</button>
            </div>

          </div>

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

export default Checkout;