import bcrypt from "bcrypt";
import * as usersModel from "./users.model.js";

/* Registro público (buyer) */
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

/*Usuario edita SU perfil / No puede modificar role */
export const actualizarMiPerfil = async (user_id, data) => {
  // Blindaje total: aunque venga en el body
  if ("role" in data) {
    delete data.role;
  }

  return usersModel.updateProfileByUser(user_id, data);
};

/* Listar usuarios (admin o uso interno) */
export const listarUsuarios = async () => {
  return usersModel.findAll();
};

/* Obtener usuario por ID */
export const obtenerUsuario = async (user_id) => {
  return usersModel.findById(user_id);
};
