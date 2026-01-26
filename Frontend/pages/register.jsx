import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  // Estados para los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Controla mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  // reglas de validación de contraseña
  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&#]/.test(password),
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificamos que todas las reglas se cumplan
    const isValid = Object.values(passwordRules).every(Boolean);

    if (!isValid) {
      alert("La contraseña no cumple con los requisitos");
      return;
    }

    // Aquí enviarías los datos al backend
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Cuenta creada con éxito (demo)");
  };

  return (
    <div className="register-container">
      {/* Caja del registro */}
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Crea tu Cuenta</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            👁️
          </span>
        </div>

        {/* Reglas */}
        <ul className="password-rules">
          <li className={passwordRules.length ? "ok" : "error"}>
            Al menos 8 caracteres
          </li>
          <li className={passwordRules.upper ? "ok" : "error"}>
            Una mayúscula
          </li>
          <li className={passwordRules.lower ? "ok" : "error"}>
            Una minúscula
          </li>
          <li className={passwordRules.number ? "ok" : "error"}>
            Un número
          </li>
          <li className={passwordRules.special ? "ok" : "error"}>
            Un carácter especial
          </li>
        </ul>

        {/* Botón */}
        <button type="submit">Crear Cuenta</button>

        {/* Link login */}
        <p className="login-link">
          Si ya tienes tu cuenta <Link to="/login">Login</Link>
        </p>
      </form>

      {/* Footer */}
      <footer>
       {/*} <a href="#">Terms of Use</a> | <a href="#">Privacy</a>*/}
      </footer>
    </div>
  );
};

export default Register;
