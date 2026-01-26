// modules/users/users.service.js
import bcrypt from "bcrypt";
import * as usersModel from "./users.model.js";

// Registro público (Buyer)
export const createBuyer = async (data) => {
  if (!data.password) {
    throw new Error("Password es requerido");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  return usersModel.create({
    email: data.email,
    password_hash: passwordHash, // 👈 SE MAPEA BIEN
    nombres: data.nombres,
    apellido: data.apellido,
    telefono: data.telefono,
    role: "buyer"
  });
};

// Admin crea usuarios
export const createByAdmin = async (data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);

  return usersModel.create({
    ...data,
    password_hash: passwordHash
  });
};
