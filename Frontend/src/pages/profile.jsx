import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

const API_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const { user, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    nombres: "",
    apellido: "",
    telefono: "",
    profile_image: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================
  // CARGAR PERFIL
  // ==========================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Error al cargar perfil");

        const data = await res.json();

        setForm({
          email: data.email || "",
          nombres: data.nombres || "",
          apellido: data.apellido || "",
          telefono: data.telefono || "",
          profile_image: data.profile_image || "",
          password: ""
        });
      } catch (err) {
        setError("No se pudo cargar el perfil");
      }
    };

    if (!loading) loadProfile();
  }, [loading]);

  // ==========================
  // MANEJAR FORM
  // ==========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ==========================
  // GUARDAR CAMBIOS
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const payload = { ...form };

      // Si no cambia password, no la enviamos
      if (!payload.password) {
        delete payload.password;
      }

      const res = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al guardar");

      setMessage("Perfil actualizado correctamente");
      setForm({ ...form, password: "" });
    } catch {
      setError("Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* COLUMNA IZQUIERDA */}
        <div className="profile-sidebar">
          <img
            src={form.profile_image}
            alt="Perfil"
            className="profile-avatar"
          />

          <h3>
            {form.nombres} {form.apellido}
          </h3>

          {user?.role === "admin" && (
            <span className="role-badge">Administrador</span>
          )}
        </div>

        {/* COLUMNA DERECHA */}
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Editar perfil</h2>

          {message && <div className="success-msg">{message}</div>}
          {error && <div className="error-msg">{error}</div>}

          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Nombres</label>
          <input
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            required
          />

          <label>Apellido</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />

          <label>Teléfono</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />

          <label>Imagen de perfil (URL)</label>
          <input
            name="profile_image"
            value={form.profile_image}
            onChange={handleChange}
          />

          <label>Nueva contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Dejar vacío si no cambia"
          />

          <button type="submit">
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
