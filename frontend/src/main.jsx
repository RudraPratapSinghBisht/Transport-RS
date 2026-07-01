import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  CartProvider,
} from "./context/CartContext";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <CartProvider>
  <App />
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    theme="dark"
  />
</CartProvider>
  </StrictMode>
);