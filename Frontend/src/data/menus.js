// src/data/menus.js
export const MENUS = {
  public: [
    { label: "Gaming", icon: "🎮", path: "/products?cat=gamer" },
    { label: "Computación", icon: "💻", path: "/products?cat=Notebook" },
    { label: "Componentes", icon: "🧩", path: "/products?cat=components" },
    { label: "Redes", icon: "📡", path: "/products?cat=reds" },
    { label: "Hogar", icon: "🏠", path: "/products?cat=hogar" },
  ],

  admin: [
    { label: "Productos", icon: "📦", path: "/products" },
    { label: "Ver stock", icon: "📦", path: "/stock" },
    { label: "Usuarios", icon: "👤", path: "/createUser" },
  ],
};
