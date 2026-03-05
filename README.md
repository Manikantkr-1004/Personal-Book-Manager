# 📚 Personal Book Manager

A full-stack Personal Book Manager built with the MERN stack and Next.js (App Router).
This application allows users to manage their personal book collection, track reading status, and gain simple insights through a clean dashboard.

> [!NOTE]
> Since our backend is deployed on Render free account, so it might take 60-120 seconds first time, when our frontend hits backend api first so due to this, frontend can delay or take time to load/doing task in authenticated pages or during login/signup so please wait, it's not a code issue.


<img width="1351" height="597" alt="dashboard" src="https://github.com/user-attachments/assets/abf87426-f948-41dd-8dfc-659cb86b28d4" />

## Deployment

* Frontend: [Vercel](https://kantbookmanager.vercel.app/)
* Backend: [Render](https://kantbookmanager.onrender.com/)
* Database: MongoDB Atlas

---

## ✨ Features

### 🔐 Authentication (JWT Based via Cookie)

* User Signup
* User Login
* Secure Logout
* Protected Routes
* Password hashing using bcrypt
* JWT stored in signed httpOnly cookies

### 📖 Book Management

Users can:

* Add a book (title, author, tags, status)
* Edit book details
* Delete books
* Update reading status
* Filter by tag
* Filter by reading status

### 📊 Dashboard

* Total books count
* Count by reading status:
  * Want to Read
  * Reading
  * Completed
* Filter by Status & Tags (Seprated by commas,)

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 🗂 Project Structure

### Frontend (Next.js)

```
app/
 ├── auth/login/
 ├── auth/signup/
 ├── user/dashboard/
 ├── user/profile/
 ├── layout.tsx
 └── page.tsx
 ├── lib/actions
.env
.env.example
next.config.mjs
proxy.js
```

### Backend (Express)

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── config
 ├── server.js
.env
.env.example
```

---

## ⚙️ Environment Variables

Create a `.env` file in both frontend and backend. Examples env already inside `.env.example` file

### Backend `.env`

```
COOKIE_SECRET = 
FRONTEND_URL = http://localhost:3000
MONGODB_URI = mongodb+srv://username:password@cluster0.kwor4pu.mongodb.net/BookManager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = 
NODE_ENV = development
SALT_ROUND = 
```

### Frontend `.env.local`

```
NEXT_PUBLIC_BACKEND_URL = http://localhost:8080
BACKEND_URL = http://localhost:8080
```

---

## 🚀 Local Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/Manikantkr-1004/Personal-Book-Manager.git
```

### 2️⃣ Backend Setup

```
cd Backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Designed & Developed by Manikant
