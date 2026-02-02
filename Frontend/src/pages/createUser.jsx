import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const CreateUser = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    nombres: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    role: "buyer",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-right">
            <h2>No autorizado</h2>
            <p>Esta sección es solo para administradores.</p>
          </div>
        </div>
      </div>
    );
  }

  const passwordRules = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[@$!%*?&#]/.test(form.password),
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(passwordRules).every(Boolean)) {
      alert("La contraseña no cumple con los requisitos");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/users/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al crear usuario");
      }

      alert("Usuario creado correctamente ✅");

      setForm({
        nombres: "",
        apellido: "",
        rut: "",
        email: "",
        telefono: "",
        role: "buyer",
        password: ""
      });

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* LEFT PANEL */}
        <div className="profile-left">
          <div className="profile-avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Nuevo usuario"
            />
          </div>

          <div className="profile-name">Nuevo usuario</div>

          <span className="profile-role">
            Creación de cuenta
          </span>
        </div>

        {/* RIGHT PANEL */}
        <div className="profile-right">
          <h2>Crear usuario</h2>

          <form className="profile-form" onSubmit={handleSubmit}>

            <div>
              <label>Nombres</label>
              <input
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Apellido</label>
              <input
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>RUT</label>
              <input
                name="rut"
                value={form.rut}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Correo</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Teléfono</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Rol</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="buyer">Buyer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="full">
              <label>Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

          </form>

          <ul className="password-rules">
            <li className={passwordRules.length ? "ok" : "error"}>Mínimo 8 caracteres</li>
            <li className={passwordRules.upper ? "ok" : "error"}>Una mayúscula</li>
            <li className={passwordRules.lower ? "ok" : "error"}>Una minúscula</li>
            <li className={passwordRules.number ? "ok" : "error"}>Un número</li>
            <li className={passwordRules.special ? "ok" : "error"}>Un carácter especial</li>
          </ul>

          <div className="profile-actions">
            <button
              className="btn-save"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear usuario"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateUser;
