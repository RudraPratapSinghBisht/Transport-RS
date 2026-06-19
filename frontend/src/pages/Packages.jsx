import { useEffect, useState } from "react";
import {
useNavigate,
useLocation,
} from "react-router-dom";
import axios from "axios";

function Packages() {
const navigate = useNavigate();
const location = useLocation();

const queryParams =
new URLSearchParams(
location.search
);

const vehicleType =
queryParams.get("type") || "";

const category =
queryParams.get("category") || "";

const cityFilter =
queryParams.get("city") || "";

const budgetFilter =
queryParams.get("budget") || "";

const [vehicles, setVehicles] =
useState([]);

const [loading, setLoading] =
useState(true);

const [search, setSearch] =
useState("");

const [sortOption, setSortOption] =
useState("");

const fetchVehicles = async () => {
  try {
    setLoading(true);

    let url =
      `${import.meta.env.VITE_API_URL}/api/packages`;

    console.log("Fetching:", url);

    const res = await axios.get(url);

    console.log("SUCCESS");
    console.log(res.data);

    setVehicles(res.data);

  } catch (error) {

    console.log("API ERROR:");
    console.log(error);

    if (error.response) {
      console.log(error.response.data);
    }

  } finally {

    setLoading(false);

  }
};

useEffect(() => {
fetchVehicles();
}, [vehicleType]);

let filteredVehicles =
[...vehicles];
if (vehicleType) {

  filteredVehicles =
    filteredVehicles.filter(
      (vehicle) =>
        vehicle.type
          ?.toLowerCase() ===
        vehicleType.toLowerCase()
    );

}

if (category) {

  filteredVehicles =
    filteredVehicles.filter(
      (vehicle) =>
        vehicle.category
          ?.toLowerCase() ===
        category.toLowerCase()
    );

}

if (cityFilter) {

  filteredVehicles =
    filteredVehicles.filter(
      (vehicle) =>
        vehicle.city
          ?.toLowerCase()
          .includes(
            cityFilter.toLowerCase()
          )
    );

}

if (budgetFilter) {

  filteredVehicles =
    filteredVehicles.filter(
      (vehicle) =>
        vehicle.pricePerDay <=
        Number(budgetFilter)
    );

}

if (search) {


const s =
  search.toLowerCase();

filteredVehicles =
  filteredVehicles.filter(
    (vehicle) =>
      vehicle.name
        ?.toLowerCase()
        .includes(s) ||

      vehicle.brand
        ?.toLowerCase()
        .includes(s) ||

      vehicle.city
        ?.toLowerCase()
        .includes(s) ||

      vehicle.category
        ?.toLowerCase()
        .includes(s)
  );

}

if (
sortOption ===
"low-high"
) {
filteredVehicles.sort(
(a, b) =>
a.pricePerDay -
b.pricePerDay
);
}

if (
sortOption ===
"high-low"
) {
filteredVehicles.sort(
(a, b) =>
b.pricePerDay -
a.pricePerDay
);
}

if (
sortOption === "a-z"
) {
filteredVehicles.sort(
(a, b) =>
a.name.localeCompare(
b.name
)
);
}

return (
<div
className="container-fluid py-5 px-4"
style={{
backgroundColor:
"#000",
minHeight:
"100vh",
color: "white",
}}
> <div className="text-center mb-5">

    <span
      style={{
        backgroundColor:
          "#D4AF37",
        color: "#000",
        padding:
          "12px 25px",
        borderRadius:
          "10px",
        fontSize:
          "2rem",
        fontWeight:
          "700",
        boxShadow:
          "0 0 20px rgba(212,175,55,0.5)",
      }}
    >
      {
  category
    ? category.toUpperCase()
    : vehicleType
    ? `${vehicleType}s`
    : "Available Vehicles"
}
    </span>

  </div>
  <div className="row mb-4">

    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Search vehicle..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          backgroundColor:
            "#000",
          color:
            "white",
          border:
            "1px solid #D4AF37",
        }}
      />
    </div>

    <div className="col-md-6">
      <select
        className="form-select"
        value={sortOption}
        onChange={(e) =>
          setSortOption(
            e.target.value
          )
        }
        style={{
          backgroundColor:
            "#000",
          color:
            "white",
          border:
            "1px solid #D4AF37",
        }}
      >
        <option value="">
          Sort By
        </option>

        <option value="low-high">
          Price Low → High
        </option>

        <option value="high-low">
          Price High → Low
        </option>

        <option value="a-z">
          Name A → Z
        </option>

      </select>
    </div>

  </div>

  {loading ? (

    <h3
      className="text-center"
    >
      Loading Vehicles...
    </h3>

  ) : (

    <div className="row">

      {filteredVehicles.map(
        (vehicle) => (
          <div
            key={vehicle._id}
            className="
            col-lg-3
            col-md-4
            col-sm-6
            mb-4
          "
          >
            <div
              className="card h-100"
              style={{
                backgroundColor:
                  "#000",
                color:
                  "white",
                border:
                  "2px solid #D4AF37",
              }}
            >
              <img
                src={
                  vehicle.image
                }
                alt={
                  vehicle.name
                }
                style={{
                  height:
                    "220px",
                  width:
                    "100%",
                  objectFit:
                    "cover",
                }}
              />

              <div
                className="card-body"
              >

                <h5
                  style={{
                    color:
                      "#D4AF37",
                  }}
                >
                  {vehicle.name}
                </h5>

                <p>
                  <strong>
                    Brand:
                  </strong>{" "}
                  {
                    vehicle.brand
                  }
                </p>

                <p>
                  <strong>
                    City:
                  </strong>{" "}
                  {
                    vehicle.city
                  }
                </p>
                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {
                    vehicle.category
                  }
                </p>

                <p>
                  <strong>
                    Type:
                  </strong>{" "}
                  {
                    vehicle.type
                  }
                </p>

                <p>
                  <strong>
                    Fuel:
                  </strong>{" "}
                  {
                    vehicle.fuelType
                  }
                </p>

                <h5
                  style={{
                    color:
                      "#D4AF37",
                  }}
                >
                  ₹
                  {
                    vehicle.pricePerDay
                  }
                  /day
                </h5>

                <button
                  className="btn w-100"
                  style={{
                    backgroundColor:
                      "#D4AF37",
                    color:
                      "#000",
                    fontWeight:
                      "bold",
                  }}
                  onClick={() =>
                    navigate(
                      `/packages/${vehicle._id}`
                    )
                  }
                >
                  View Details
                </button>

              </div>
            </div>
          </div>
        )
      )}

    </div>
  )}

  <button
    onClick={() =>
      navigate("/")
    }
    style={{
      position:
        "fixed",
      bottom: "20px",
      right: "20px",
      border: "none",
      background:
        "transparent",
      fontSize:
        "30px",
    }}
  >
    🏠
  </button>

  </div>
);
}

export default Packages;