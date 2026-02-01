import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch  {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <p className="login-subtitle">
          Accede a tu cuenta para continuar
        </p>

        {error && <div className="login-error">{error}</div>}

        <input
          type="email"
          placeholder="Correo electrónico"
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

        <button type="submit">Ingresar</button>

        <p className="login-footer">
          ¿No tienes cuenta?{" "}
          <Link to="/register">Crear cuenta</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
