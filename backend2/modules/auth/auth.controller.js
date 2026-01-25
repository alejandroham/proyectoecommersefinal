// modules/auth/auth.controller.js

import * as AuthService from "./auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  const user = await AuthService.getMe(req.usuario.id);
  res.json(user);
};
