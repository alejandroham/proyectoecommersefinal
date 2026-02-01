import * as usersService from "./users.service.js";

/* Usuario actualiza su perfil */
export const actualizarMiPerfilController = async (req, res) => {
  try {
    const user_id = req.user.user_id; // viene del JWT

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

/*Listar usuarios */
export const listarUsuariosController = async (req, res) => {
  try {
    const users = await usersService.listarUsuarios();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

/* Obtener usuario por ID */
export const obtenerUsuarioController = async (req, res) => {
  try {
    const user = await usersService.obtenerUsuario(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};
