import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del carrito, inicialmente vacío
  const [totalPrice, setTotalPrice] = useState(0); // Precio total
  const [totalItems, setTotalItems] = useState(0); // Total de productos en el carrito

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    updateCartMetrics(product.price, 1);
  };

  // Función para remover un producto del carrito
  const removeFromCart = (productName) => {
    setCart((prevCart) => {
      const productToRemove = prevCart.find((item) => item.name === productName);
      if (!productToRemove) return prevCart;

      const updatedCart = prevCart
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      updateCartMetrics(-productToRemove.price, -1);
      return updatedCart;
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalItems(0);
  };

  // Función para actualizar métricas del carrito
  const updateCartMetrics = (priceChange, itemsChange) => {
    setTotalPrice((prevTotal) => prevTotal + parseFloat(priceChange));
    setTotalItems((prevTotal) => prevTotal + itemsChange);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
