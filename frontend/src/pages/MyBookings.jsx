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
                backgroundColor: "#1F2937",
                color: "white",
              }}
            >
              <h4>{booking.packageTitle}</h4>

              <p>
                Price: ₹
                {booking.price?.toLocaleString()}
              </p>

              <p>
                Status:
                {" "}
                <strong>
                  {booking.status}
                </strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;