import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


const API_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    nombres: "",
    apellido: "",
    telefono: "",
    profile_image: "",
    password: ""
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

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

        const data = await res.json();

        setForm({
          email: data.email,
          nombres: data.nombres,
          apellido: data.apellido,
          telefono: data.telefono || "",
          profile_image: data.profile_image || "",
          password: ""
        });
      } catch (err) {
        console.error("Error cargando perfil", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ==========================
  // HANDLERS
  // ==========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = { ...form };
      if (!payload.password) delete payload.password;

      const res = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const updated = await res.json();
      setUser(updated);
      setEditing(false);
    } catch (err) {
      console.error("Error guardando perfil", err);
    }
  };

  if (loading) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* ========== LEFT ========== */}
        <div className="profile-left">
          <div className="profile-avatar">
            <img
              src={form.profile_image}
              alt="Avatar"
            />
          </div>

          <h3 className="profile-name">
            {form.nombres} {form.apellido}
          </h3>

          {user?.role === "admin" && (
            <span className="profile-role">Administrador</span>
          )}
        </div>

        {/* ========== RIGHT ========== */}
        <div className="profile-right">
          <h2>Mi perfil</h2>

          <div className="profile-form">
            <div>
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div>
              <label>Teléfono</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div>
              <label>Nombres</label>
              <input
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div>
              <label>Apellido</label>
              <input
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="full">
              <label>Imagen de perfil (URL)</label>
              <input
                name="profile_image"
                value={form.profile_image}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="full">
              <label>Nueva contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Dejar vacío si no cambia"
                value={form.password}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
          </div>

          <div className="profile-actions">
            {!editing ? (
              <button
                className="btn-edit"
                onClick={() => setEditing(true)}
              >
                Editar perfil
              </button>
            ) : (
              <>
                <button className="btn-save" onClick={handleSave}>
                  Guardar cambios
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
