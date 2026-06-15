import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useLocation
} from "react-router-dom";

function Packages() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams =
  new URLSearchParams(
    location.search
  );

const searchedCity =
  queryParams.get("city") || "";
  const [sortOption, setSortOption] = useState("");
  const [filterCity, setFilterCity] = useState("");
  useEffect(() => {
  fetchPackages();
}, []);

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
  const [packages, setPackages] = useState([]);
  let filteredPackages = [...packages];
  if (searchedCity) {
    const search = searchedCity.toLowerCase();
    filteredPackages = filteredPackages.filter((pkg) =>
      pkg.title?.toLowerCase().includes(search) ||
      pkg.city?.toLowerCase().includes(search) ||
      pkg.country?.toLowerCase().includes(search) ||
      pkg.description?.toLowerCase().includes(search)
    );
  }
if (filterCity !== "") {
  const search =
    filterCity.toLowerCase();

  filteredPackages =
    filteredPackages.filter(
      (pkg) =>
        pkg.title
          ?.toLowerCase()
          .includes(search) ||

        pkg.city
          ?.toLowerCase()
          .includes(search) ||

        pkg.country
          ?.toLowerCase()
          .includes(search) ||

        pkg.description
          ?.toLowerCase()
          .includes(search)
    );
}

if (sortOption === "low-high") {
  filteredPackages.sort(
    (a, b) =>
      a.price -
      b.price
  );
}

if (sortOption === "high-low") {
  filteredPackages.sort(
    (a, b) => b.price - a.price
  );
}

if (sortOption === "a-z") {
  filteredPackages.sort((a, b) =>
    a.city.localeCompare(b.city)
  );
}

  return (
    <div
  className="container-fluid px-4 py-5"
  style={{
    backgroundColor: "#000000",
    minHeight: "100vh",
    color: "white",
  }}
>
<div className="text-center mb-5">
  <span
    style={{
      backgroundColor: "#D4AF37",
      color: "#000",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "2rem",
      fontWeight: "700",
      display: "inline-block",
      boxShadow: "0 3px 12px rgb(212, 169, 27)",
    }}
  >
    Travel Packages
  </span>
</div>
<div className="row mb-4">

  <div className="col-md-6">
    <input
  type="text"
  className="form-control"
  style={{
    backgroundColor: "#000000",
    color: "white",
    border: "1px solid #d6a210",
  }}
      placeholder="Search destination..."
      value={filterCity}
      onChange={(e) => setFilterCity(e.target.value)}
    />
  </div>

  <div className="col-md-6">
   <select
  className="form-select"
  style={{
    backgroundColor: "#000000",
    color: "white",
    border: "1px solid #d7a20f",
  }}
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="low-high">
        Price: Low to High
      </option>
      <option value="high-low">
        Price: High to Low
      </option>
      <option value="a-z">
        Alphabetical
      </option>
    </select>
  </div>

</div>
      <div className="row g-3">
        {filteredPackages.map((pkg, index) => (
          <div className="col-md-2" key={pkg._id}>
           <div
  className="card shadow premium-card h-100"
  style={{
    backgroundColor: "#000000",
    color: "white",
    border: "2px solid #faae22",
  }}
>
              <img
  src={pkg.image}
  alt={pkg.title}
  style={{
    height: "220px",
    width: "100%",
    objectFit: "cover",
  }}
/>
              <div className="card-body p-3">
                <h5 className="fw-bold">
                  {pkg.title}
                </h5>

                <p
                  className="mb-2"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {pkg.duration}
                </p>

                <h6
                  style={{
                    color: "#D4AF37",
                    fontWeight: "700",
                  }}
                >
                  ₹{pkg.price}
                </h6>

              <button
  className="btn w-100 mt-2"
  style={{
    backgroundColor: "#D4AF37",
    color: "#000",
    fontWeight: "600",
  }}
  onClick={() =>
    navigate(`/packages/${pkg._id}`)
  }
>
  Details
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

export default Packages;