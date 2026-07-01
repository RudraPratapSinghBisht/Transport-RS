import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { apiUrl } from "../services/api";

function Stays() {
  const [stays, setStays] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchStays();
  }, []);

  const fetchStays = async () => {
    try {
      const res = await axios.get(
        apiUrl("stays")
      );

      setStays(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStays = stays.filter(
    (stay) =>
      stay.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      stay.location
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      stay.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "50px",
      }}
    >
      <div className="text-center mb-5">
        <span
          style={{
            backgroundColor: "#D4AF37",
            color: "#000000",
            padding: "12px 30px",
            borderRadius: "12px",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Stays
        </span>
      </div>

      <input
        type="text"
        placeholder="Search stays..."
        className="form-control mb-5"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="row g-4">
        {filteredStays.map((stay) => (
          <div
            className="col-md-4"
            key={stay._id}
          >
            <div
              className="card h-100"
              style={{
                backgroundColor: "#000",
                color: "white",
                border:
                  "1px solid #D4AF37",
              }}
            >
              <img
                src={stay.image}
                alt={stay.title}
                style={{
                  height: "280px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">

                <h3>{stay.title}</h3>

                <p
                  style={{
                    color: "#D4AF37",
                  }}
                >
                  {stay.category}
                </p>

                <p>{stay.location}</p>

                <h4>
                  ₹{stay.price}/night
                </h4>

                <div className="d-flex gap-2">

                  <button
                    className="btn"
                    style={{
                      backgroundColor:
                        "#D4AF37",
                      color: "#000",
                    }}
                    onClick={() =>
                      navigate(
                        `/stays/${stay._id}`
                      )
                    }
                  >
                    Explore
                  </button>
                  

                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      addToCart({
                        ...stay,
                        type: "stay",
                      })
                    }
                  >
                    Add To Cart
                  </button>

                </div>

              </div>
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
    backgroundColor: "#00000000",
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

export default Stays;
