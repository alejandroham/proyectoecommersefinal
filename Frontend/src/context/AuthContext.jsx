/**
 * AuthContext.jsx
 * ----------------------------------------------------------------------
 * Este archivo define el CONTEXTO DE AUTENTICACIÓN de la aplicación.
 * - Centralizar el estado del usuario autenticado.
 * - Permitir saber en cualquier parte de la app si el usuario:
 *    - Está logueado
 *    - Roles (admin, sales, buyer)
 * ESTRUCTURA GENERAL:
 *
 * - AuthContext:
 *   Contexto creado con createContext que almacenará:
 *     - user  → información del usuario autenticado
 *     - login → función para iniciar sesión
 *     - logout → función para cerrar sesión
 */


import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  
  // Cargar usuario desde localStorage al refrescar
  
  useEffect(() => {
  
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
  
      setUser(JSON.parse(storedUser));
  
    }
  }, []);

  
  
  // Login 
  
  const login = (userData) => {
  
    localStorage.setItem("user", JSON.stringify(userData));
  
    setUser(userData);
  };

  
  
  // Logout
  
  const logout = () => {
  
    localStorage.removeItem("user");
  
    setUser(null);
  };

  
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de acceso al contexto
export const useAuth = () => useContext(AuthContext);
