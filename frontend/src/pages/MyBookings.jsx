import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const email =
        localStorage.getItem("email");

      const res = await axios.get(
        `http://localhost:5000/api/bookings/user/${email}`
      );

      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "white",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#D4AF37",
          fontWeight: "bold",
        }}
      >
        My Bookings
      </h1>

      <div className="row mt-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="col-md-4 mb-4"
          >
            <div
              className="card p-3"
              style={{
                backgroundColor: "#000000",
                border: "3px solid #121bcf",
                color: "white",
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
<p>
  <strong>Booked By:</strong>{" "}
  {booking.userName}
</p>

<p>
  <strong>Email:</strong>{" "}
  {booking.email}
</p>

<p>
  <strong>Phone:</strong>{" "}
  {booking.phone}
</p>

             <p>
  <strong>Amount:</strong> ₹
  {booking.price?.toLocaleString()}
</p>

<p>
  <strong>Date:</strong>{" "}
  {new Date(
    booking.bookingDate
  ).toLocaleDateString()}
</p>

       <p>
  <strong>Status:</strong>{" "}

  <span
    style={{
      color:
        booking.status ===
        "Approved"
          ? "#28a745"
          : booking.status ===
            "Rejected"
          ? "#dc3545"
          : "#a037d4",

      fontWeight: "bold",
    }}
  >
    {booking.status}
  </span>
</p>
            </div>
          </div>
        ))}
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

export default MyBookings;