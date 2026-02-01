import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Mi perfil</h2>

        <div className="profile-row">
          <span>Nombre</span>
          <strong>{user.nombres || "No informado"}</strong>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>

        <div className="profile-row">
          <span>Rol</span>
          <strong className={`role ${user.role}`}>
            {user.role === "admin" ? "Administrador" : "Cliente"}
          </strong>
        </div>

        {/* FUTURO */}
        <button className="profile-edit-btn" disabled>
          Editar información (próximamente)
        </button>
      </div>
    </div>
  );
}

export default Profile;
