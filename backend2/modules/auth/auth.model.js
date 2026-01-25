// modules/auth/auth.model.js

export const findUserByEmail = async (email) => {
  // EJEMPLO SQL / ORM
  return db.query(
    "SELECT id, email, password, rol, active FROM users WHERE email = ?",
    [email]
  );
};

export const findUserById = async (id) => {
  return db.query(
    "SELECT id, email, rol FROM users WHERE id = ?",
    [id]
  );
};
