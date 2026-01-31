// modules/users/users.controller.js

import * as usersService from "./users.service.js";

// Admin
export const getUsuarios = async (req, res) => {
  const usuarios = await usersService.listarUsuarios();
  res.json(usuarios);
};

export const getUsuario = async (req, res) => {
  const usuario = await usersService.obtenerUsuario(req.params.id);
  res.json(usuario);
};

export const updateMe = async (req, res) => {
  await usersService.actualizarPerfil(req.usuario.id, req.body);
  res.sendStatus(204);
};

export const enableUser = async (req, res) => {
  await usersService.cambiarEstadoUsuario(req.params.id, true);
  res.sendStatus(204);
};

export const disableUser = async (req, res) => {
  await usersService.cambiarEstadoUsuario(req.params.id, false);
  res.sendStatus(204);
};

// Registro público (Buyer)
export const registerUser = async (req, res) => {
  try {
    const user = await usersService.createBuyer(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(" ERROR REGISTRO USER:", error);
    res.status(500).json({
      error: "Error al registrar usuario",
      detalle: error.message
    });
  }
};

//  Admin crea usuarios
export const createUserByAdmin = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ error: "Role es requerido" });
    }

    const user = await usersService.createByAdmin(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
