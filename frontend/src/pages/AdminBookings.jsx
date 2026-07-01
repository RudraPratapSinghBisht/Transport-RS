import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        apiUrl("bookings")
      );

      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const updateStatus = async (
  id,
  status
) => {
  try {
    await axios.put(
      apiUrl(`bookings/${id}`),
      {
        status,
      }
    );

    fetchBookings();
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
        Manage Bookings
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
    border: "3px solid #cf1212",
    color: "white",
  }}
>
  <h4>{booking.packageTitle}</h4>

  <p>
    <strong>User:</strong>
    {booking.userName}
  </p>

  <p>
    <strong>Email:</strong>
    {booking.email}
  </p>
  <p>
  <strong>Phone:</strong>{" "}
  {booking.phone || "N/A"}
</p>

<p>
  <strong>Age:</strong>{" "}
  {booking.age || "N/A"}
</p>

<p>
  <strong>Gender:</strong>{" "}
  {booking.gender || "N/A"}
</p>

<p>
  <strong>Nationality:</strong>{" "}
  {booking.nationality || "N/A"}
</p>

<p>
  <strong>State:</strong>{" "}
  {booking.state || "N/A"}
</p>

<p>
  <strong>Amount:</strong> ₹
  {booking.price?.toLocaleString()}
</p>

<p>
  <strong>Booking Date:</strong>{" "}
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
          : "#D4AF37",
      fontWeight: "bold",
    }}
  >
    {booking.status}
  </span>
</p>

  <div className="d-flex gap-2 mt-3">
    <button
      className="btn btn-success"
      onClick={() =>
        updateStatus(
          booking._id,
          "Approved"
        )
      }
    >
      Approve
    </button>

    <button
      className="btn btn-danger"
      onClick={() =>
        updateStatus(
          booking._id,
          "Rejected"
        )
      }
    >
      Reject
    </button>
  </div>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookings;
