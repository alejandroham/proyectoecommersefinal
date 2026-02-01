🧪 CHECKLIST TEST API – BACKEND (RENDER)

🌐 URL BASE
👉 https://proyectoecommersefinal.onrender.com

👤 USUARIOS

1️⃣ Registrar usuario (buyer)
🔗 https://proyectoecommersefinal.onrender.com/users

📌 POST
✔ Respuesta: 201 Created

2️⃣ Login usuario
🔗 https://proyectoecommersefinal.onrender.com/auth/login

📌 POST
✔ Respuesta: 200 OK
✔ Devuelve: JWT

3️⃣ Perfil usuario
🔗 https://proyectoecommersefinal.onrender.com/auth/me

📌 GET
🔐 Header:
Authorization: Bearer <TOKEN>
✔ Respuesta: 200 OK

👑 CUENTA ADMIN (PRUEBAS)

📧 Email: admin@test.cl
🔑 Password: 123456
🛡 Role: admin

📦 PRODUCTOS (ADMIN)

4️⃣ Crear producto
🔗 https://proyectoecommersefinal.onrender.com/products

📌 POST
🔐 Token admin
✔ Respuesta: 201 Created

📌 Categorías válidas:
Notebook | Tablets | Telefonia | test

🛒 CARRITO (BUYER)

5️⃣ Ver carrito
🔗 https://proyectoecommersefinal.onrender.com/cart

📌 GET
🔐 Token buyer
✔ Respuesta: 200 OK

6️⃣ Agregar producto al carrito
🔗 https://proyectoecommersefinal.onrender.com/cart

📌 POST
Body:

{ "product_id": 1 }


✔ Respuesta: 204 No Content

7️⃣ Ver carrito con items
🔗 https://proyectoecommersefinal.onrender.com/cart

📌 GET
✔ items.length > 0

📦 ÓRDENES

8️⃣ Mis órdenes (buyer)
🔗 https://proyectoecommersefinal.onrender.com/orders/me

📌 GET

9️⃣ Todas las órdenes (admin)
🔗 https://proyectoecommersefinal.onrender.com/orders

📌 GET
