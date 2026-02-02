import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Portal from "./pages/portal/portal";
import Profile from "./pages/profile/Profile";
import AdminPanel from "./pages/admin/AdminPanel";
import AddUser from "./pages/admin/AddUser";
import Login from "./pages/auth/Login";

import PrivateRoute from "./routes/PrivateRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* Perfil (cualquier usuario autenticado) */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Portal general */}
        <Route
          path="/portal"
          element={
            <PrivateRoute>
              <Portal />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users/add"
          element={
            <PrivateRoute roles={["admin"]}>
              <AddUser />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
