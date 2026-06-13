import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManagePackages() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [packageData, setPackageData] = useState({
    title: "",
    city: "",
    duration: "",
    price: "",
    image: "",
    description: "",
  });

  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/packages"
      );

      setPackages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }

    fetchPackages();
  }, [navigate]);

  const handleSavePackage = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/packages/${editingId}`,
          packageData
        );

        alert("Package Updated Successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/packages",
          packageData
        );

        alert("Package Added Successfully!");
      }

      setPackageData({
        title: "",
        city: "",
        duration: "",
        price: "",
        image: "",
        description: "",
      });

      setEditingId(null);
      setShowForm(false);

      fetchPackages();
    } catch (error) {
      console.error(error);
      alert("Failed to save package");
    }
  };

  const handleEditPackage = (pkg) => {
    setPackageData({
      title: pkg.title,
      city: pkg.city,
      duration: pkg.duration,
      price: pkg.price,
      image: pkg.image,
      description: pkg.description,
    });

    setEditingId(pkg._id);
    setShowForm(true);
  };

  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/packages/${id}`
      );

      alert("Package Deleted Successfully!");

      fetchPackages();
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1
          style={{
            color: "#D4AF37",
            fontWeight: "bold",
          }}
        >
          Manage Packages
        </h1>

        <button
          className="btn"
          style={{
            backgroundColor: "#D4AF37",
            color: "#000",
            fontWeight: "bold",
          }}
          onClick={() => {
            setEditingId(null);

            setPackageData({
              title: "",
              city: "",
              duration: "",
              price: "",
              image: "",
              description: "",
            });

            setShowForm(!showForm);
          }}
        >
          + Add Package
        </button>
      </div>

      {showForm && (
        <div
          className="card p-4 mb-4"
          style={{
            backgroundColor: "#1F2937",
            color: "white",
            border: "1px solid #374151",
          }}
        >
          <h3
            className="mb-3"
            style={{ color: "#D4AF37" }}
          >
            {editingId
              ? "Edit Package"
              : "Add New Package"}
          </h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Package Title"
                value={packageData.title}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6 mb-3">
                            <input
                type="text"
                className="form-control"
                placeholder="City"
                value={packageData.city}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    city: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Duration"
                value={packageData.duration}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    duration: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={packageData.price}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    price: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-12 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                value={packageData.image}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    image: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-12 mb-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Description"
                value={packageData.description}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-12">
              <button
                className="btn"
                style={{
                  backgroundColor: "#D4AF37",
                  color: "#000",
                  fontWeight: "bold",
                }}
                onClick={handleSavePackage}
              >
                {editingId
                  ? "Update Package"
                  : "Save Package"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="col-md-4 mb-4"
          >
            <div
              className="card h-100"
              style={{
                backgroundColor: "#1F2937",
                color: "white",
                border: "1px solid #374151",
              }}
            >
              <img
                src={pkg.image}
                alt={pkg.title}
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
                  {pkg.title}
                </h4>

                <p>
                  <strong>City:</strong> {pkg.city}
                </p>

                <p>
                  <strong>Duration:</strong> {pkg.duration}
                </p>

                <p>
                  <strong>Price:</strong> ₹{pkg.price}
                </p>

                <p>{pkg.description}</p>

                <button
                  className="btn btn-warning w-100 mb-2"
                  onClick={() =>
                    handleEditPackage(pkg)
                  }
                >
                  Edit Package
                </button>

                <button
                  className="btn btn-danger w-100"
                  onClick={() =>
                    handleDeletePackage(pkg._id)
                  }
                >
                  Delete Package
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