// modules/users/users.service.js

import * as UserModel from "./users.model.js";

export const listarUsuarios = async () => {
  return UserModel.findAll();
};

export const obtenerUsuario = async (id) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user;
};

export const actualizarPerfil = async (id, data) => {
  delete data.rol;      // nunca permitir cambiar rol
  delete data.active;   // ni estado

  return UserModel.updateById(id, data);
};

export const cambiarEstadoUsuario = async (id, active) => {
  return UserModel.updateById(id, { active });
};
