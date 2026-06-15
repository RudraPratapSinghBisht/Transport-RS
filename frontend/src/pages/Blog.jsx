const blogs = [
  {
    title: "Top 10 Places To Visit In Japan",
    date: "June 2026",
    description:
      "Discover Tokyo, Kyoto, Osaka and the most beautiful destinations in Japan.",
  },
  {
    title: "Why Switzerland Is A Dream Destination",
    date: "May 2026",
    description:
      "Explore snowy mountains, crystal lakes and breathtaking scenery.",
  },
  {
    title: "Best Things To Do In Bali",
    date: "April 2026",
    description:
      "From beaches to temples, Bali offers something for every traveler.",
  },
  {
    title: "Ultimate Dubai Travel Guide",
    date: "March 2026",
    description:
      "Luxury shopping, desert safaris and world-famous attractions.",
  },
  {
    title: "Paris Travel Tips For First-Time Visitors",
    date: "February 2026",
    description:
      "Everything you need to know before visiting the City of Love.",
  },
  {
    title: "Exploring Türkiye Beyond Istanbul",
    date: "January 2026",
    description:
      "Hot air balloons, ancient ruins and incredible food await.",
  },
];
function Blog() {
  return (
  <div
    className="container-fluid py-5"
    style={{
      backgroundColor: "#000000",
      minHeight: "100vh",
      color: "white",
    }}
  >
    <div className="container"></div>

      <h1
  className="text-center fw-bold mb-5"
  style={{
    color: "#D4AF37",
    fontSize: "4rem",
  }}
>
  Travel Blog
</h1>

      <div className="row g-4">

        {blogs.map((blog, index) => (
          <div className="col-lg-4 col-md-6" key={index}>

            <div
  className="card h-100"
  style={{
    backgroundColor: "#000000",
    color: "white",
    border: "1px solid #d4a525",
    transition: "0.3s",
    cursor: "pointer",
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

              <div className="card-body">

                <p
                  style={{
                    color: "#D4AF37",
                    fontWeight: "600",
                  }}
                >
                  {blog.date}
                </p>

                <h4 className="fw-bold">
                  {blog.title}
                </h4>

                <p>
                  {blog.description}
                </p>

                <button
                  className="btn"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "#000",
                    fontWeight: "600",
                  }}
                >
                  Read More
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Blog;