// src/data/menus.js
export const MENUS = {
  public: [
    { label: "Gaming", icon: "🎮", path: "/products?cat=gaming" },
    { label: "Computación", icon: "💻", path: "/products?cat=computacion" },
    { label: "Componentes", icon: "🧩", path: "/products?cat=componentes" },
    { label: "Redes", icon: "📡", path: "/products?cat=redes" },
    { label: "Hogar", icon: "🏠", path: "/products?cat=hogar" },
  ],

  admin: [
    { label: "Productos", icon: "📦", path: "/productos" },
    { label: "Stock", icon: "📦", path: "/products" },
    { label: "Usuarios", icon: "👤", path: "/createUser" },
    { label: "Dasboard", icon: "💰", path: "/dashboard" },
  ],
};
