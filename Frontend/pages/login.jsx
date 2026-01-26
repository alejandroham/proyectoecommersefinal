import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import users from "../data/users.json";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ Buscar usuario activo por email
    const foundUser = users.find(
      (u) => u.email === email && u.is_active === 1
    );

    if (!foundUser) {
      alert("Usuario no encontrado o inactivo");
      return;
    }

    // 2️⃣ Passwords simuladas por rol (mock)
    const passwordMap = {
      buyer: "buyer123",
      admin: "admin123",
      sales: "sales123",
    };

    if (password !== passwordMap[foundUser.role]) {
      alert("Contraseña incorrecta");
      return;
    }

    // 3️⃣ Guardar usuario en AuthContext
    login({
      user_id: foundUser.user_id,
      nombres: foundUser.nombres,
      apellido: foundUser.apellido,
      email: foundUser.email,
      role: foundUser.role,
    });

    // 4️⃣ Redirigir al home
    navigate("/");
  };

  return (
    <div className="login-container modal-mode">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Continuar</button>

        {/* 🔗 Enlace de registro */}
        <p className="register-link">
          ¿No tienes cuenta?{" "}
          <Link to="/registro">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
