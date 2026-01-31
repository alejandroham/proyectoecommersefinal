import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import productRoutes from "./modules/products/products.routes.js";
import ordersRoutes from "./modules/orders/orders.routes.js";
import reportsRoutes from "./modules/reports/reports.routes.js";
import testLocalRoutes from "./test.local.js";


export const registerRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/", ordersRoutes);
  app.use("/", reportsRoutes);
  app.use("/", testLocalRoutes);

};
