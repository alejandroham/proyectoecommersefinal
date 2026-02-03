import { useState } from "react";
import {
  useNavigate,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // mientras se reconstruye sesión
  if (loading) return null;

  // si ya está logueado, quedarse donde está
  if (user) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);

      // 👇 volver a la ruta original
      const redirectTo =
        location.state?.from?.pathname || "/";

      navigate(redirectTo, { replace: true });
    } catch {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 style="color: #0a0f1e;">Iniciar sesión</h2>

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
