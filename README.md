# 🚀 TaskWave

**TaskWave** is a full-stack productivity SaaS application designed to help users manage their tasks, track focused work sessions, and maintain streaks for improved performance. It is built using the **MERN stack**, enhanced with modern libraries and tools for security, validation, styling, and API documentation.

---

## 🌐 Live Demo

> Hosted live on a production server  
> **🔗 [task-wavee.netlify.app](https://task-wavee.netlify.app)** 

---

## 🛠 Tech Stack

- **Frontend:**
  - React
  - Tailwind CSS
  - React Toastify (for elegant notification messages)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (as primary database)
  - Redis (for storing OTPs securely)

- **Security & Validation:**
  - JWT (JSON Web Tokens for authentication)
  - Bcrypt (for password hashing)
  - Zod (for schema-based input validation)

- **API Documentation:**
  - Swagger UI (for testing and interacting with APIs)
  - Redoc (for clean and readable API documentation)

---

## ✨ Features

### 🔐 Authentication & Security
- Secure signup and login using JWT.
- Passwords are hashed with bcrypt.
- OTP-based password change system using Redis.
- Input validation using Zod.

### 🧑‍💻 Dashboard

#### 📋 Task Management
- Add, update, and delete tasks.
- Filter tasks based on:
  - **Status**
  - **Priority**
  - **Created Date**
  - **Due Date**
- Real-time feedback using React Toastify.

#### ⏱️ Focus Sessions
- Start and manage focused work sessions with a built-in timer.
- Track productivity with success vs interruption metrics.
- Maintain and visualize streaks based on session performance.
- View complete session history by date and outcome.

### 👤 Profile Management
- View profile with name, username, and masked password.
- Toggle password visibility.
- Secure password update with email OTP verification.

### 🌓 Theme Toggle
- Switch between **light** and **dark** mode for personalized UI.

---

## 📘 API Documentation

- **Interactive Testing:** Swagger UI → **[task-wavee-api-docs.netlify.app/swagger-ui.html](https://task-wavee-api-docs.netlify.app/swagger-ui.html)**
- **Readable Docs:** Redoc → **[task-wavee-api-docs.netlify.app/redoc.html](https://task-wavee-api-docs.netlify.app/redoc.html)**
