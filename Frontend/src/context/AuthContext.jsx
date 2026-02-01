import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // LOGIN REAL (JWT)
  // ==========================
  const login = async (email, password) => {
    const res = await fetch("https://proyectoecommersefinal.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    

    // 🔄 Cargamos usuario real
    await loadUser();

    return data;
  };

  // ==========================
  // CARGAR USUARIO DESDE TOKEN
  // ==========================
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://proyectoecommersefinal.onrender.com/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("No autorizado");

      const userData = await res.json();
      setUser(userData);
    } catch  {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ==========================
  // AUTO LOGIN AL RECARGAR
  // ==========================
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
