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
    password_hash: passwordHash,
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


// Admin / Perfil

export const listarUsuarios = async () => {
  return usersModel.findAll();
};

export const obtenerUsuario = async (user_id) => {
  return usersModel.findById(user_id);
};

export const actualizarPerfil = async (user_id, data) => {
  return usersModel.updateById(user_id, data);
};


export const cambiarEstadoUsuario = async (user_id, activo) => {
  // NO Activo.
  return true;
};
