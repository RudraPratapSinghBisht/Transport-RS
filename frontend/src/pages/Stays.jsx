import hostelImg from "../assets/Hostels.png";
import budgetImg from "../assets/BudgetHotel.png";
import fiveStarImg from "../assets/5StarHotel.png";
import resortImg from "../assets/resort.png";
import airbnbImg from "../assets/airbnb.png";
import villaImg from "../assets/Villas.png";
function Stays() {
 const stayTypes = [
  {
    title: "Hostels",
    image: hostelImg,
  },
  {
    title: "Budget Hotels",
    image: budgetImg,
  },
  {
    title: "5 Star Hotels",
    image: fiveStarImg,
  },
  {
    title: "Luxury Resorts",
    image: resortImg,
  },
  {
    title: "Airbnb",
    image: airbnbImg,
  },
  {
    title: "Villas",
    image: villaImg,
  },
];

return (
  <div
  className="card shadow h-100"
  style={{
    backgroundColor: "#1F2937",
    color: "white",
    border: "1px solid #374151",
    transition: "0.3s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px)";
  }}
>

   <h1
  className="text-center mb-5 fw-bold"
  style={{
    color: "#D4AF37",
  }}
>
  Choose Your Stay
</h1>

    <div className="row g-4">

      {stayTypes.map((stay, index) => (
        <div className="col-lg-4 col-md-6" key={index}>

          <div className="card shadow-sm h-100 stay-card">

            <img
              src={stay.image}
              alt={stay.title}
              style={{
                height: "280px",
                width: "100%",
                objectFit: "cover",
              }}
            />

            <div className="card-body text-center">

              <h3 className="fw-bold">
                {stay.title}
              </h3>

              <button
                className="btn mt-3"
                style={{
                  backgroundColor: "#D4AF37",
                  color: "#000",
                  fontWeight: "600",
                }}
              >
                Explore
              </button>

            </div>

          </div>

        </div>
      ))}

    </div>

  </div>
);
}

export default Stays;