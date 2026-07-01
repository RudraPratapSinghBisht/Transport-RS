import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { apiUrl } from "../services/api";

function ManageStays() {
  const [stays, setStays] = useState([]);
  const { addToCart } = useCart();
  const [showForm, setShowForm] =
  useState(false);

const [title, setTitle] =
  useState("");

const [category, setCategory] =
  useState("");

const [location, setLocation] =
  useState("");

const [price, setPrice] =
  useState("");

const [image, setImage] =
  useState("");

const [description, setDescription] =
  useState("");

  useEffect(() => {
    fetchStays();
  }, []);

  const fetchStays = async () => {
    try {
      const response = await axios.get(
        apiUrl("stays")
      );

      setStays(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addStay = async () => {
  try {
    await axios.post(
      apiUrl("stays"),
      {
        title,
        category,
        location,
        price,
        image,
        description,
      }
    );

    setTitle("");
    setCategory("");
    setLocation("");
    setPrice("");
    setImage("");
    setDescription("");

    fetchStays();

    setShowForm(false);
  } catch (error) {
    console.log(error);
  }
};
const handleAddToCart = () => {
  addToCart({
    _id: stay._id,
    title: stay.title,
    price: stay.price,
    image: stay.image,
    type: "stay",
  });

  alert("Stay added to cart!");
};

  return (
    <div
      className="container-fluid p-5"
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        color: "white",
      }}
    >
<div className="d-flex justify-content-between mb-4">

  <h1
    style={{
      color: "#D4AF37",
      fontWeight: "bold",
    }}
  >
    Manage Stays
  </h1>

  <button
    className="btn"
    style={{
      backgroundColor: "#D4AF37",
      color: "#000",
      fontWeight: "bold",
    }}
    onClick={() =>
      setShowForm(!showForm)
    }
  >
    + Add Stay
  </button>

</div>
  {showForm && (
  <div
    className="card p-4 mb-4"
    style={{
      backgroundColor: "#000000",
      border: "2px solid #144ba4",
      color: "white",
    }}
  >
    <h2
      className="mb-4"
      style={{
        color: "#D4AF37",
        fontWeight: "bold",
      }}
    >
      Add New Stay
    </h2>

    <div className="row">

      {/* Stay Title */}
      <div className="col-md-6 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Stay Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      {/* Category */}
      <div className="col-md-6 mb-3">
        <select
          className="form-control"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

          <option value="Hostel">
            Hostel
          </option>

          <option value="Budget Hotel">
            Budget Hotel
          </option>

          <option value="5 Star Hotel">
            5 Star Hotel
          </option>

          <option value="Luxury Resort">
            Luxury Resort
          </option>

          <option value="Villa">
            Villa
          </option>

          <option value="Homestay">
            Homestay
          </option>
        </select>
      </div>

      {/* Location */}
      <div className="col-md-6 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />
      </div>

      {/* Price */}
      <div className="col-md-6 mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Price Per Night"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />
      </div>

      {/* Image URL */}
      <div className="col-12 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />
      </div>
            {/* Description */}
      <div className="col-12 mb-3">
        <textarea
          className="form-control"
          rows="5"
          placeholder="Stay Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />
      </div>

      {/* Save Button */}
      <div className="col-12">
        <button
          className="btn"
          style={{
            backgroundColor: "#D4AF37",
            color: "#000",
            fontWeight: "bold",
          }}
          onClick={addStay}
        >
          Save Stay
        </button>
      </div>

    </div>
  </div>
)}
{/* Stay List */}

<div className="row g-4">
  {stays.map((stay) => (
    <div
      className="col-md-4"
      key={stay._id}
    >
      <div
        className="card h-100"
        style={{
          backgroundColor: "#000000",
          color: "white",
          border: "3px solid #1a50a8",
        }}
      >
        <img
          src={stay.image}
          alt={stay.title}
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">
          <h4>{stay.title}</h4>

          <p>
            <strong>Category:</strong>{" "}
            {stay.category}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {stay.location}
          </p>

          <p
            style={{
              color: "#D4AF37",
              fontWeight: "bold",
            }}
          >
            ₹{stay.price}/night
          </p>

          <p>{stay.description}</p>

          <button
            className="btn btn-danger"
            onClick={() =>
              deleteStay(stay._id)
            }
          >
            Delete
          </button>
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

export default ManageStays;
