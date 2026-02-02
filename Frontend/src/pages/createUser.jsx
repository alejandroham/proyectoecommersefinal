import { useState } from "react";

const CreateUser = () => {
  // ======================
  // DATOS DEL USUARIO
  // ======================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("sales");
  const [password, setPassword] = useState("");

  // ======================
  // UI
  // ======================
  const [showPassword, setShowPassword] = useState(false);

  // ======================
  // REGLAS CONTRASEÑA
  // ======================
  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&#]/.test(password),
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidPassword = Object.values(passwordRules).every(Boolean);
    if (!isValidPassword) {
      alert("La contraseña no cumple con los requisitos");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role,
      active: true,
      createdAt: new Date().toISOString(),
    };

    // Demo
    console.log("Usuario creado:", newUser);
    alert("Usuario creado correctamente (demo)");

    // Reset
    setName("");
    setEmail("");
    setPassword("");
    setRole("sales");
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        {/* ======================
            HEADER
        ====================== */}
        <h2>Crear cuenta</h2>
        <p className="subtitle">
          Regístrate para comenzar a comprar
        </p>

        {/* ======================
            INPUTS
        ====================== */}
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="sales">Buyer</option>
          
        </select>

        {/* ======================
            PASSWORD
        ====================== */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            👁️
          </span>
        </div>

        {/* ======================
            REGLAS
        ====================== */}
        <ul className="password-rules">
          <li className={passwordRules.length ? "ok" : "error"}>
            Mínimo 8 caracteres
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

        {/* ======================
            CTA
        ====================== */}
        <button type="submit">Crear cuenta</button>

        {/* ======================
            FOOTER
        ====================== */}
        <div className="register-footer">
          ¿Ya tienes cuenta?{" "}
          <a href="/login">Inicia sesión</a>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
