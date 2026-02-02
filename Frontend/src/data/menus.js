// src/data/menus.js
export const MENUS = {
  public: [
    { label: "Gaming", icon: "🎮", path: "/products?cat=Gaming" },
    { label: "Computación", icon: "💻", path: "/products?cat=Computación" },
    { label: "Componentes", icon: "🧩", path: "/products?cat=Componentes" },
    { label: "Redes", icon: "📡", path: "/products?cat=Redes" },
    { label: "Hogar", icon: "🏠", path: "/products?cat=Hogar" },
  ],

  admin: [
    { label: "Productos", icon: "📦", path: "/products" },
    { label: "Panel Administración", icon: "🧑‍💻", path: "/stock" },
    { label: "Crear Nuevo Usuario", icon: "🪏", path: "/createUser" },
  ],
};
