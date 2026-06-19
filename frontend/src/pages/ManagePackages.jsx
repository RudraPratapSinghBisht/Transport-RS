import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManagePackages() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Car",
    category: "",
    city: "",
    brand: "",
    pricePerDay: "",
    fuelType: "",
    transmission: "",
    image: "",
    description: "",
    featured: false,
  });

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/packages`
      );

      setVehicles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }

    fetchVehicles();
  }, [navigate]);

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Car",
      category: "",
      city: "",
      brand: "",
      pricePerDay: "",
      fuelType: "",
      transmission: "",
      image: "",
      description: "",
      featured: false,
    });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/packages/${editingId}`,
          formData
        );

        alert("Vehicle Updated Successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/packages`,
          formData
        );

        alert("Vehicle Added Successfully");
      }

      fetchVehicles();

      resetForm();

      setEditingId(null);

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed To Save Vehicle");
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);

    setFormData({
      name: vehicle.name || "",
      type: vehicle.type || "Car",
      category: vehicle.category || "",
      city: vehicle.city || "",
      brand: vehicle.brand || "",
      pricePerDay: vehicle.pricePerDay || "",
      fuelType: vehicle.fuelType || "",
      transmission: vehicle.transmission || "",
      image: vehicle.image || "",
      description: vehicle.description || "",
      featured: vehicle.featured || false,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/packages/${id}`
      );

      alert("Vehicle Deleted");

      fetchVehicles();
    } catch (error) {
      console.error(error);
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
  <div className="d-flex justify-content-between align-items-center mb-4">

    <h1
      style={{
        color: "#D4AF37",
        fontWeight: "bold",
      }}
    >
      Manage Vehicles
    </h1>

    <button
      className="btn"
      style={{
        backgroundColor: "#D4AF37",
        color: "#000",
        fontWeight: "bold",
      }}
      onClick={() => {
        resetForm();
        setEditingId(null);
        setShowForm(!showForm);
      }}
    >
      + Add Vehicle
    </button>

  </div>

  {showForm && (

    <div
      className="card p-4 mb-4"
      style={{
        backgroundColor: "#194084",
        border: "2px solid #D4AF37",
      }}
    >

      <h3
        className="mb-4"
        style={{
          color: "#D4AF37",
        }}
      >
        {editingId
          ? "Edit Vehicle"
          : "Add New Vehicle"}
      </h3>

      <div className="row">

        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Vehicle Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <select
            className="form-control"
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value,
              })
            }
          >
            <option value="Car">
              Car
            </option>

            <option value="Bike">
              Bike
            </option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Brand"
            value={formData.brand}
            onChange={(e) =>
              setFormData({
                ...formData,
                brand: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price Per Day"
            value={formData.pricePerDay}
            onChange={(e) =>
              setFormData({
                ...formData,
                pricePerDay: e.target.value,
              })
            }
          />
        </div>
                <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Fuel Type"
            value={formData.fuelType}
            onChange={(e) =>
              setFormData({
                ...formData,
                fuelType: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            className="form-control"
            placeholder="Transmission"
            value={formData.transmission}
            onChange={(e) =>
              setFormData({
                ...formData,
                transmission: e.target.value,
              })
            }
          />
        </div>

        <div className="col-12 mb-3">
          <input
            className="form-control"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value,
              })
            }
          />
        </div>

        <div className="col-12 mb-3">
          <textarea
            rows="4"
            className="form-control"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="col-12 mb-3">
          <label>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featured: e.target.checked,
                })
              }
            />
            {" "}Featured Vehicle
          </label>
        </div>

        <div className="col-12">
          <button
            className="btn"
            style={{
              backgroundColor: "#D4AF37",
              color: "#000",
              fontWeight: "bold",
            }}
            onClick={handleSave}
          >
            {editingId
              ? "Update Vehicle"
              : "Save Vehicle"}
          </button>
        </div>

      </div>
    </div>
  )}

  <div className="row">

    {vehicles.map((vehicle) => (

      <div
        key={vehicle._id}
        className="col-md-4 mb-4"
      >
        <div
          className="card h-100"
          style={{
            backgroundColor: "#000",
            color: "white",
            border: "2px solid #194084",
          }}
        >

          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{
              height: "220px",
              objectFit: "cover",
            }}
          />

          <div className="card-body">

            <h4
              style={{
                color: "#D4AF37",
              }}
            >
              {vehicle.name}
            </h4>

            <p>
              <strong>Type:</strong>{" "}
              {vehicle.type}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {vehicle.category}
            </p>

            <p>
              <strong>City:</strong>{" "}
              {vehicle.city}
            </p>

            <p>
              <strong>Brand:</strong>{" "}
              {vehicle.brand}
            </p>

            <p>
              ₹{vehicle.pricePerDay}/day
            </p>

            <p>
              {vehicle.description}
            </p>

            <button
              className="btn btn-warning w-100 mb-2"
              onClick={() =>
                handleEdit(vehicle)
              }
            >
              Edit Vehicle
            </button>

            <button
              className="btn btn-danger w-100"
              onClick={() =>
                handleDelete(vehicle._id)
              }
            >
              Delete Vehicle
            </button>

          </div>
        </div>
      </div>

    ))}

  </div>

</div>
  );
}

export default ManagePackages;