E-Commerce Application
A full-stack e-commerce application with a modern React + Vite + TailwindCSS frontend and a Node.js + Express + MongoDB backend.
Includes role-based authentication for Admins and Users, with complete admin privileges for managing products.

✨ Features
🔑 Authentication & Authorization

Admin Login System

Secure login for admins.

Manage products (Add, Edit, Delete).

User Login System

Secure signup/login for customers.

Browse and view products.

🛍️ Product Management

Admin

Add new products.

Edit existing products.

Delete products.

User

View product listings.

View product details.

🎨 Frontend (React + Vite + Tailwind)

Modern responsive UI.

Lightning-fast build with Vite.

Admin and User dashboards.

⚙️ Backend (Node.js + Express + MongoDB)

RESTful APIs.

Role-based access with middleware.

JWT Authentication + Bcrypt for password security.
🏗️ Tech Stack
Layer	Technology
Frontend	React, Vite, TailwindCSS
Backend	Node.js, Express.js
Database	MongoDB (Mongoose)
Auth	JWT, Bcrypt

⚡ Getting Started
🖥️ Clone the Repository
git clone https://github.com/your-username/e-commerce-app.git
cd e-commerce-app
⚙️ Backend Setup
cd backend
npm install


Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Run backend:

npm start

🎨 Frontend Setup
cd frontend
npm install


Create a .env file inside frontend/:

VITE_API_URL=http://localhost:5000/api


Run frontend:

npm run dev

👩‍💻 Admin Privileges

✅ Add new products
✅ Edit existing products
✅ Delete products
✅ Full access to product catalog

🧑‍🤝‍🧑 User Privileges

✅ Register & login
✅ Browse products
✅ View product details
