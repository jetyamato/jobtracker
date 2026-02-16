# 📝 Job Application Tracker

A full-stack job application tracker built with **React, Express,
PostgreSQL, and JWT authentication**.\
Users can register, log in securely, and manage their own job
applications.

---

## 🚀 Tech Stack

### Frontend

- React (Vite)
- React Router
- Context API (Auth Context)
- Fetch API
- CSS

### Backend

- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

## 🔐 Features

- User registration & login
- Password hashing with bcrypt
- JWT-based authentication
- Protected backend routes
- Protected frontend routes
- Persistent login via localStorage
- User-specific job data (multi-user isolation)
- CRUD operations for job applications
- Logout functionality
- Environment-based configuration

---

## 📂 Project Structure

    job-tracker/
    │
    ├── backend/
    │   ├── routes/
    │   │   ├── auth.js
    │   │   └── jobs.js
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   ├── db.js
    │   ├── server.js
    │   └── .env
    │
    ├── frontend/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── README.md

---

## 🧠 Architecture Overview

### Authentication Flow

1.  User registers or logs in
2.  Backend validates credentials
3.  Backend issues a JWT token
4.  Frontend stores token in auth context + localStorage
5.  Token is attached to protected API requests
6.  Backend verifies token via middleware
7.  User can only access their own data

---

## 🗄 Database Design

### users

- id (SERIAL PRIMARY KEY)
- email (TEXT UNIQUE NOT NULL)
- password (TEXT NOT NULL)
- created_at (TIMESTAMP)

### jobs

- id (SERIAL PRIMARY KEY)
- user_id (INTEGER REFERENCES users(id) ON DELETE CASCADE)
- company (TEXT NOT NULL)
- position (TEXT NOT NULL)
- status (TEXT NOT NULL)
- applied_date (DATE)
- notes (TEXT)
- created_at (TIMESTAMP)

Each job belongs to exactly one user.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd job-tracker
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

    JWT_SECRET=your_secret_here

Start server:

```bash
node server.js
```

Backend runs on:

    http://localhost:4000

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

    http://localhost:5173

---

## 🔒 Security Practices Implemented

- Password hashing with bcrypt
- JWT verification middleware
- Route-level access control
- User-specific SQL queries
- No hardcoded secrets
- `.env` configuration
- Protected frontend routes

---

## 📌 Key Learning Outcomes

This project demonstrates:

- Building a REST API with Express
- Designing relational database schemas
- Implementing JWT authentication
- Creating protected routes (frontend + backend)
- Managing global state with React Context
- Handling async operations with proper error states
- Structuring scalable frontend architecture

---

## 🛠 Future Improvements

- Refresh tokens
- Role-based access
- Deployment (Render + Vercel)
- Axios interceptor for token handling
- Form validation library
- Unit testing

---

## 👨‍💻 Author

Built as part of a full-stack learning journey using:

React + Express + PostgreSQL + JWT
