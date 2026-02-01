// modules/auth/auth.service.js
import * as AuthModel from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (email, password) => {
  // Buscar usuario
  const user = await AuthModel.findUserByEmail(email);

  if (!user) {
    throw new Error("Usuario no válido");
  }

  // Comparar password
  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    throw new Error("Usuario no válido");
  }

  // Generar token 
// modules/auth/auth.service.js

const token = jwt.sign(
  {
    user_id: user.user_id,  
    role: user.role,
    email: user.email
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

  // Retornar token
  return { token };
};

export const getMe = async (user_id) => {
  return AuthModel.findUserById(user_id);
};
