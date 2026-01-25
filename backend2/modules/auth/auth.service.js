// modules/auth/auth.service.js

import * as AuthModel from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (email, password) => {
  const user = await AuthModel.findUserByEmail(email);

  if (!user || !user.active) {
    throw new Error("Usuario no válido");
  }

  const passwordValida = await bcrypt.compare(password, user.password);

  if (!passwordValida) {
    throw new Error("Credenciales incorrectas");
  }

  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      rol: user.rol
    }
  };
};

export const getMe = async (id) => {
  return AuthModel.findUserById(id);
};
