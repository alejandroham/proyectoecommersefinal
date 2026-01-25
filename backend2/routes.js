import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import productRoutes from "./modules/products/products.routes.js";

export const registerRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
};
