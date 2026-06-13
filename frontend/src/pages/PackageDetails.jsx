import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PackageDetails() {
  const { id } = useParams();

  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    fetchPackage();
  }, []);

  const fetchPackage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/packages/${id}`
      );

      setPkg(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!pkg) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }
  const handleBooking = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/bookings",
      {
        userId: user._id,
        userName: user.name,
        email: user.email,

        packageId: pkg._id,
        packageTitle: pkg.title,
        price: pkg.price,
      }
    );

    alert(
      "Package booked successfully!"
    );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container py-5">
      <div className="card shadow border-0">
        <img
          src={pkg.image}
          alt={pkg.title}
          style={{
            height: "500px",
            objectFit: "cover",
          }}
        />

        <div className="card-body p-4">
          <h1
            style={{
              color: "#D4AF37",
            }}
          >
            {pkg.title}
          </h1>

          <h4>{pkg.city}</h4>

          <p>
            Duration: {pkg.duration}
          </p>

          <h3>
            ₹{pkg.price}
          </h3>

          <p>
            {pkg.description}
          </p>

          <button
  className="btn"
  style={{
    backgroundColor: "#D4AF37",
    color: "#000",
    fontWeight: "bold",
  }}
  onClick={handleBooking}
>
  Book Now
</button>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;