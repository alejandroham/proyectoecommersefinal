import * as usersService from "./users.service.js";

/* ===========================
   REGISTRO PÚBLICO (BUYER)
=========================== */
export const registerUser = async (req, res) => {
  try {
    const user = await usersService.createBuyer(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* ===========================
   PERFIL DEL USUARIO LOGUEADO
=========================== */
export const getMe = async (req, res) => {
  try {
    // 🔑 VIENE DEL JWT
    const user_id = req.usuario.user_id;

    const user = await usersService.obtenerUsuario(user_id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener perfil"
    });
  }
};

/* ===========================
   USUARIO EDITA SU PERFIL
=========================== */
export const updateMe = async (req, res) => {
  try {
    const user_id = req.usuario.user_id;

    const user = await usersService.actualizarMiPerfil(
      user_id,
      req.body
    );

    res.json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message || "Error al actualizar perfil"
    });
  }
};

/* ===========================
   ADMIN
=========================== */
export const getUsuarios = async (req, res) => {
  try {
    const users = await usersService.listarUsuarios();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const user = await usersService.obtenerUsuario(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const user = await usersService.createBuyer(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const enableUser = async (req, res) => {
  res.json({ ok: true });
};

export const disableUser = async (req, res) => {
  res.json({ ok: true });
};
