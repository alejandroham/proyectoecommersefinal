import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // LOGIN (JWT)
  // ==========================
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
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

    // cargar usuario real
    await loadUser();

    return data;
  };


  // CArga Información del usuario con el Token

 const loadUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error("No autorizado");

    const data = await res.json();

    // NORMALIZAMOS EL USUARIO AQUÍ
    setUser({
      id: data.user_id,
      email: data.email,
      role: data.role,
      nombres: data.nombres || data.email.split("@")[0],
    });

  } catch {
    localStorage.removeItem("token");
    setUser(null);
  } finally {
    setLoading(false);
  }
};


  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // AUTO LOGIN AL RECARGAR

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
