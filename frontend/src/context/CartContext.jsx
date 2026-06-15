import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {
  const [cartItems, setCartItems] =
  useState(() => {
    const savedCart =
      localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });
    useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);
const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cart");
};
  const addToCart = (item) => {
    setCartItems((prev) => [
      ...prev,
      item,
    ]);
  };

const removeFromCart = (id) => {
  setCartItems(
    cartItems.filter(
      (item) => item._id !== id
    )
  );
};

  return (
 <CartContext.Provider
value={{
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
}}
>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);