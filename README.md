# 🚀 Blinkit | Full-Stack E-Commerce Platform (MERN)

[![Repo Size](https://img.shields.io/github/repo-size/tausif-alam-64/Blinkit)](https://github.com/tausif-alam-64/Blinkit)
[![Issues](https://img.shields.io/github/issues/tausif-alam-64/Blinkit)](https://github.com/tausif-alam-64/Blinkit/issues)
[![Stars](https://img.shields.io/github/stars/tausif-alam-64/Blinkit?style=social)](https://github.com/tausif-alam-64/Blinkit)

A **full-stack, Blinkit-style e-commerce application** built with the **MERN stack**.  
It demonstrates real-world features like secure authentication, admin management, product browsing, payment checkout, and more.

> Clean architecture, scalable design, and secure patterns 

<!--## 🌐 Live Demo --> 

<!--🔗 **Frontend:** _Add live frontend link here_  -->
<!--🔗 **Backend API:** _Add backend link here_ -->

<!-- 🎥 **Demo Video:**  -->
<!--_Add YouTube / Drive / Loom link here_ -->
---

## 📸 Screenshots

_Add screenshots here once UI is ready_

<img width="1919" height="1079" alt="Screenshot 2026-02-07 155536" src="https://github.com/user-attachments/assets/030d2b06-b866-47cb-90e4-aff16e9d34bf" />
<img width="1918" height="1078" alt="Screenshot 2026-02-07 155705" src="https://github.com/user-attachments/assets/a397b2b4-cc24-4cee-8cc1-09f9cc32f2a2" />
<img width="1919" height="1076" alt="Screenshot 2026-02-07 155844" src="https://github.com/user-attachments/assets/7492a3f5-c272-4207-942c-db5129825524" />
<img width="1918" height="1079" alt="Screenshot 2026-02-07 155913" src="https://github.com/user-attachments/assets/3c3696e4-6447-4ad6-b60e-812e0bc09e4f" />
<img width="1919" height="1079" alt="Screenshot 2026-02-07 155741" src="https://github.com/user-attachments/assets/c0d4cedc-887f-49f9-8a08-41146ffe8a44" />

---

## 📌 Project Overview

This project replicates the **core functionality of Blinkit-style online shopping**, including:

- User & admin authentication
- Product and category management
- Secure payments
- Email verification & password recovery
- Cloud-based image uploads
- Modern frontend with state management

---

## ✨ Features

### 👤 User Features
- User registration & login
- **JWT authentication (Access + Refresh tokens)**
- OTP-based email verification
- Secure password recovery
- Browse products by category & sub-category
- Cart & checkout system
- Order history
- Stripe payment integration

---

### 🛠 Admin Features
- Admin authentication
- Add / update / delete products
- Category & sub-category management
- Image upload via Cloudinary
- Order management dashboard
- Role-based access control

---

### 🔐 Security Features
- Password hashing
- Token-based authentication
- Protected API routes
- Secure environment variables
- OTP & email-based verification

---

## 🧱 Tech Stack

### Frontend
- **React**
- **Vite**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **SweetAlert2**

---

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Token (JWT)**
- **Dotenv**
- **Resend (Email Service)**
- **Cloudinary (Image Upload)**
- **Stripe (Payment Gateway)**

---

### Tools
- **VS Code**
- **Postman**

---

## 🗂 Project Structure

```bash
Blinkit/
│
├── client/                        # React frontend (Vite)
│   ├── public/                    # Public assets
│   ├── src/                      # Source code
│   │   ├── assets/                # Images, Icons, media
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page level components
│   │   ├── redux/                 # Redux Toolkit state management
│   │   ├── routes/                # App routing
│   │   ├── utils/                 # Utility functions
│   │   └── index.jsx              # App entrypoint
│   ├── .env                      # Environment variables (frontend)
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite config
│
├── server/                        # Backend (Node + Express)
│   ├── config/                    # Configuration files (db, env, services)
│   ├── controllers/              # Route handlers (business logic)
│   ├── middleware/               # Auth & custom middleware
│   ├── models/                   # Database schemas (Mongoose)
│   ├── routes/                   # Express routes
│   ├── utils/                    # Helpers & utilities
│   ├── .env                      # Environment variables (backend)
│   ├── package.json              # Backend dependencies
│   └── server.js / app.js        # Backend entrypoint
│
└── README.md                     # This documentation
```


