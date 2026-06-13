import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings"
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
      `http://localhost:5000/api/bookings/${id}`,
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
        backgroundColor: "#111827",
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
    backgroundColor: "#1F2937",
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
    <strong>Status:</strong>
    {booking.status}
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