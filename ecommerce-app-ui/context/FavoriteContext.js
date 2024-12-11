import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const FavoriteContext = createContext();

// Componente proveedor
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Función para agregar un producto a favoritos
  const addFavorite = (product) => {
    setFavorites((prev) => [...prev, product]);
  };

  // Función para eliminar un producto de favoritos
  const removeFavorite = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.name !== productId));
  };

  // Verificar si un producto está en favoritos
  const isFavorite = (productId) => {
    return favorites.some((item) => item.name === productId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
      throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
}
