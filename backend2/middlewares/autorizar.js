// autorizar.js middleware para autorizar usuarios según sus roles
export const autorizar = (roles = []) => {
  return (req, res, next) => {

    //Token no válido o middleware anterior no ejecutado
    if (!req.usuario) {
      return res.status(401).json({
        message: "No autenticado"
      });
    }

    // Rol no autorizado
    if (!roles.includes(req.usuario.role)) {
      return res.status(403).json({
        message: "Acceso denegado"
      });
    }

    // Todo OK
    next();
  };
};
