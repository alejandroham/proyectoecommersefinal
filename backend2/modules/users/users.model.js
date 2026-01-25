// modules/users/users.model.js

export const findAll = async () => {
  return db.query(
    "SELECT id, email, rol, active, created_at FROM users"
  );
};

export const findById = async (id) => {
  return db.query(
    "SELECT id, email, rol, active FROM users WHERE id = ?",
    [id]
  );
};

export const updateById = async (id, data) => {
  return db.query(
    "UPDATE users SET ? WHERE id = ?",
    [data, id]
  );
};
