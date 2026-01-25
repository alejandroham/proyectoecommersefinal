// modules/users/users.controller.js

import * as UserService from "./users.service.js";

export const getUsuarios = async (req, res) => {
  const usuarios = await UserService.listarUsuarios();
  res.json(usuarios);
};

export const getUsuario = async (req, res) => {
  const usuario = await UserService.obtenerUsuario(req.params.id);
  res.json(usuario);
};

export const updateMe = async (req, res) => {
  await UserService.actualizarPerfil(req.usuario.id, req.body);
  res.sendStatus(204);
};

export const enableUser = async (req, res) => {
  await UserService.cambiarEstadoUsuario(req.params.id, true);
  res.sendStatus(204);
};

export const disableUser = async (req, res) => {
  await UserService.cambiarEstadoUsuario(req.params.id, false);
  res.sendStatus(204);
};
