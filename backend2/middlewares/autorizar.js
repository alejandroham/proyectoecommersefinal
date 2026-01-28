export const autorizar = (roles = []) => {
  return (req, res, next) => {
    if (!req.usuario || !roles.includes(req.usuario.role)) {
      return res.status(403).json({
        message: "Acceso denegado"
      });
    }
    next();
  };
};
