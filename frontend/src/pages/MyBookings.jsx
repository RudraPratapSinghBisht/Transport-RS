import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyBookings() {
const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {
fetchBookings();
}, []);

const fetchBookings = async () => {
try {
const email =
localStorage.getItem("email");


  if (!email) {
    setLoading(false);
    return;
  }

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/bookings/user/${email}`
  );

  setBookings(res.data);
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}


};

return (
<div
style={{
minHeight: "100vh",
backgroundColor: "#000",
color: "white",
padding: "30px",
}}
>
<h1
style={{
color: "#D4AF37",
fontWeight: "700",
}}
>
My Bookings </h1>

  {loading ? (
    <h3 className="mt-5">
      Loading Bookings...
    </h3>
  ) : bookings.length === 0 ? (
    <div className="text-center mt-5">
      <h3>No Bookings Found</h3>

      <button
        className="btn mt-3"
        style={{
          backgroundColor: "#D4AF37",
          color: "#000",
          fontWeight: "700",
        }}
        onClick={() => navigate("/")}
      >
        Browse Vehicles
      </button>
    </div>
  ) : (
    <div className="row mt-4">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="col-md-4 mb-4"
        >
          <div
            className="card p-3 h-100"
            style={{
              backgroundColor: "#000",
              border:
                "2px solid #D4AF37",
              color: "white",
              borderRadius: "15px",
            }}
          >
            <h4
              style={{
                color: "#D4AF37",
                fontWeight: "700",
              }}
            >
              {booking.packageTitle}
            </h4>

            <hr
              style={{
                borderColor:
                  "#D4AF37",
              }}
            />

            <p>
              <strong>
                Booked By:
              </strong>{" "}
              {booking.userName}
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {booking.email}
            </p>

            <p>
              <strong>
                Phone:
              </strong>{" "}
              {booking.phone}
            </p>

            <p>
              <strong>
                Amount:
              </strong>{" "}
              ₹
              {booking.price?.toLocaleString()}
            </p>
<p>
  <strong>Booking ID:</strong>{" "}
  {booking.bookingId}
</p>

<p>
  <strong>Payment Method:</strong>{" "}
  {booking.paymentMethod}
</p>
            <p>
              <strong>
                Date:
              </strong>{" "}
              {booking.bookingDate
                ? new Date(
                    booking.bookingDate
                  ).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              <span
                style={{
                  color:
                    booking.status ===
                    "Approved"
                      ? "#28a745"
                      : booking.status ===
                        "Rejected"
                      ? "#dc3545"
                      : "#D4AF37",
                  fontWeight:
                    "700",
                }}
              >
                {booking.status ||
                  "Pending"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )}

  <button
    onClick={() => navigate("/")}
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

);
}

export default MyBookings;
