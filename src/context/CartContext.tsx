import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Add item to cart or increase quantity if it exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setTotal((prevTotal) => prevTotal + product.price);
  };

  // Remove item completely from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === productId);
      if (itemToRemove) {
        setTotal((prevTotal) => prevTotal - itemToRemove.price * itemToRemove.quantity);
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart;
    });
  };

  // Update quantity of an item
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(quantity, 1); // Ensure quantity doesn't go below 1
          setTotal((prevTotal) => prevTotal + (newQuantity - item.quantity) * item.price);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
