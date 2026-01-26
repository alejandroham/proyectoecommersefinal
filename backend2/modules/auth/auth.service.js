// modules/auth/auth.service.js
import * as AuthModel from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (email, password) => {
  // 1️⃣ Buscar usuario
  const user = await AuthModel.findUserByEmail(email);

  if (!user) {
    throw new Error("Usuario no válido");
  }

  // 2️⃣ Comparar password
  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    throw new Error("Usuario no válido");
  }

  // 3️⃣ Generar token
  const token = jwt.sign(
    {
      id: user.user_id,
      role: user.role,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // 4️⃣ Retornar
  return { token };
};

export const getMe = async (id) => {
  return AuthModel.findUserById(id);
};
