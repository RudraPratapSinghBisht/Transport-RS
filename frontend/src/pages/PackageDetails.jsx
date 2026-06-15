import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const { addToCart } = useCart();

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
const handleAddToCart = () => {
  addToCart({
    ...pkg,
    type: "package",
  });
toast.success(
  `${pkg.title} added to cart`
);
  
};

const handleBooking = () => {
  addToCart({
    ...pkg,
    type: "package",
  });

  navigate("/cart");
};

 return (
  <div
    style={{
      backgroundColor: "#000",
      color: "#fff",
      minHeight: "100vh",
    }}
  >
    <img
      src={pkg.image}
      alt={pkg.title}
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
          fontWeight: "700",
        }}
      >
        {pkg.title}
      </h1>

      <h4>{pkg.city}</h4>

      <div className="mt-4 mb-4">

        <span
          style={{
            color: "#D4AF37",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          ₹{pkg.price}
        </span>

        <span className="ms-4">
          {pkg.duration}
        </span>

      </div>

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
        About This Tour
      </h3>

      <p>{pkg.description}</p>

      <h3
        className="mt-5"
        style={{
          color: "#D4AF37",
        }}
      >
        What's Included
      </h3>

     <ul>
  {pkg.includes?.map((item, index) => (
    <li key={index}>
      {item}
    </li>
  ))}
</ul>

<div className="d-flex gap-3 mt-4">

  <button
    className="btn"
    style={{
      backgroundColor: "#D4AF37",
      color: "#000",
      fontWeight: "700",
      padding: "12px 30px",
    }}
    onClick={handleAddToCart}
  >
    Add To Cart
  </button>

  <button
    className="btn btn-outline-warning"
    style={{
      padding: "10px 25px",
      fontWeight: "600",
    }}
    onClick={handleBooking}
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
    width: "50px",
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

export default PackageDetails;