import { useState } from "react";


const CreateUser = () => {
  // Datos del usuario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("sales");
  const [password, setPassword] = useState("");

  // UI
  const [showPassword, setShowPassword] = useState(false);

  // Reglas de contraseña
  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&#]/.test(password),
  };

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

    // Aquí enviarías al backend o context
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
        <h2>Crear Usuario</h2>

        {/* Nombre */}
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Rol */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="sales">Sales</option>
          <option value="admin">Admin</option>
        </select>

        {/* Password */}
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

        {/* Reglas */}
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

        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
