import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const {
    cartItems,
    removeFromCart,
  } = useCart();
    const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="container py-5">

        <div className="text-center mb-5">
          <span
            style={{
              backgroundColor: "#D4AF37",
              color: "#fff",
              padding: "12px 30px",
              borderRadius: "12px",
              fontSize: "2rem",
              fontWeight: "700",
              display: "inline-block",
              boxShadow:
                "0 4px 15px rgba(212,175,55,0.3)",
            }}
          >
            My Cart
          </span>
        </div>

        {cartItems.length === 0 ? (
          <h3 className="text-center">
            Cart is Empty
          </h3>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="card mb-4"
                style={{
                  backgroundColor: "#000",
                  border:
                    "1px solid #D4AF37",
                  color: "white",
                }}
              >
                <div className="row g-0">

                  <div className="col-md-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="col-md-9">
                    <div className="card-body">

                      <h3>{item.title}</h3>

                      <h4
                        style={{
                          color: "#D4AF37",
                        }}
                      >
                        ₹{item.price}
                      </h4>

                      <p>
                        Type: {item.type}
                      </p>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeFromCart(item._id);
                          toast.error(
                            `${item.title} removed from cart`
                          );
                        }}
                      >
                        Remove
                      </button>

                    </div>
                  </div>

                </div>
              </div>
            ))}

            <div
              className="text-end mt-5"
            >
              <h2>
                Total:
                <span
                  style={{
                    color:
                      "#D4AF37",
                  }}
                >
                  {" "}
                  ₹{total}
                </span>
              </h2>

      <button
  className="btn"
  style={{
    backgroundColor: "#D4AF37",
    color: "#000",
    fontWeight: "700",
    padding: "12px 30px",
  }}
  onClick={() => navigate("/checkout")}
>
  Proceed To Checkout
</button>
             
            </div>
          </>
        )}
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

export default Cart;