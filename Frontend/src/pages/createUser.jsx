import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const CreateUser = () => {
  const { user } = useAuth(); // admin logueado


  const [nombres, setNombres] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState(""); 
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [role, setRole] = useState("buyer");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  // SEGURIDAD UI

  if (!user || user.role !== "admin") {
    return (
      <div className="register-container">
        <div className="register-box">
          <h2>No autorizado</h2>
          <p>Esta sección es solo para administradores.</p>
        </div>
      </div>
    );
  }


  // REGLAS PASSWORD

  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&#]/.test(password),
  };


  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = Object.values(passwordRules).every(Boolean);
    if (!isValidPassword) {
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
        body: JSON.stringify({
          email,
          password,
          nombres,
          apellido,
          telefono,
          role,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al crear usuario");
      }

      alert("Usuario creado correctamente ✅");

      // Reset
      setNombres("");
      setApellido("");
      setRut("");
      setEmail("");
      setTelefono("");
      setPassword("");
      setRole("buyer");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  // UI

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Crear usuario</h2>
        <p className="subtitle">Panel administrador</p>

        <input
          type="text"
          placeholder="Nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="12.345.678-9"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
        </select>

        {/* PASSWORD */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>👁️</span>
        </div>

        <ul className="password-rules">
          <li className={passwordRules.length ? "ok" : "error"}>Mínimo 8 caracteres</li>
          <li className={passwordRules.upper ? "ok" : "error"}>Una mayúscula</li>
          <li className={passwordRules.lower ? "ok" : "error"}>Una minúscula</li>
          <li className={passwordRules.number ? "ok" : "error"}>Un número</li>
          <li className={passwordRules.special ? "ok" : "error"}>Un carácter especial</li>
        </ul>

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear usuario"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
