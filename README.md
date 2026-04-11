# 🚀 OnLearny – Full Stack eLearning Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" alt="Frontend: React" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge" alt="Backend: Node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge" alt="Database: MongoDB" />
  <img src="https://img.shields.io/badge/Auth-Auth0-orange?style=for-the-badge" alt="Auth: Auth0" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge" alt="Deployed: Vercel" />
</p>

<p align="center">
  <b>A modern full-stack learning platform with courses, quizzes, and AI assistance</b>
</p>

---

## 🌐 Live Demo
👉 **[https://onlearny.vercel.app/](https://onlearny.vercel.app/)**

---

## 🎯 Problem Statement
Many learners struggle with fragmented resources across multiple platforms.  
**OnLearny** solves this by providing a **centralized, interactive learning system** with courses, quizzes, and AI guidance in one place.

---

## ✨ Key Features

- 📚 **Comprehensive Courses**  
  Covers HTML, CSS, JavaScript, React, Node.js, MongoDB, DSA & more  

- 🧠 **Interactive Quizzes**  
  Real-time evaluation with instant results  

- 🤖 **AI Chatbot Assistant**  
  Integrated chatbot (Botpress) for guidance and queries  

- 🔐 **Secure Authentication**  
  Auth0-based login with JWT validation  

- 👤 **User Profiles**  
  Track learning progress and activity  

- 📖 **E-Book Library**  
  Access curated educational resources  

- 📩 **Feedback System**  
  Powered by Web3Forms  

- 📱 **Responsive UI**  
  Works across mobile, tablet, and desktop  

---

## 🛠️ Tech Stack

### 💻 Frontend
- React (Vite)
- Bootstrap + Material UI
- Styled Components
- Animate.css & Owl Carousel

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)

### 🔐 Authentication
- Auth0 (JWT-based secure access)

### 🚀 Deployment
- Frontend: Vercel  
- Backend: Render  

---

## 📸 Screenshots

> *(Create a `screenshots` folder and add your images there)*

![Home Page](./screenshots/home.png)
![Dashboard](./screenshots/dashboard.png)
![Quiz Feature](./screenshots/quiz.png)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/mimraj-ai1/onlearny-learning-platform.git
cd OnLearny
```

---

### 2️⃣ Install Dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd back-end
npm install
```

---

### 3️⃣ Environment Variables

#### Frontend `.env`

```env
VITE_AUTH0_DOMAIN=your_domain
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_AUTH0_AUDIENCE=your_api_audience
VITE_API_URL=http://localhost:5000
```

#### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
AUTH0_DOMAIN=your_domain
AUTH0_AUDIENCE=your_api_audience
```

---

### 4️⃣ Run Application

#### Start Backend

```bash
cd back-end
npm run dev
```

#### Start Frontend

```bash
npm run dev
```

---

## 📂 Project Structure

```text
OnLearny/
├── back-end/               # Express backend application
│   ├── controllers/        # Route handler functions
│   ├── middleware/         # Custom middlewares (e.g., Auth0)
│   ├── models/             # Mongoose database models
│   ├── routes/             # API endpoint definitions
│   └── index.js            # Entry point for backend server
│
├── src/                    # Frontend React source files
│   ├── assets/             # Static assets (images, CSS)
│   ├── auth/               # Auth0 configuration and helpers
│   ├── Components/         # Reusable React components
│   │   ├── Auth/           # Login/Registration components
│   │   ├── Course/         # UI for course pages
│   │   ├── Ebook/          # E-book library components
│   │   ├── Layout/         # Shared layouts (Navbar, Footer)
│   │   ├── Pages/          # Main application page views
│   │   └── Quiz/           # Interactive quiz components
│   ├── data/               # Static dataset constants
│   ├── App.jsx             # Main App root component
│   └── main.jsx            # React rendering entry point
```

---

## 🔐 Security Practices

* JWT validation using Auth0
* Protected API routes
* CORS enabled
* Environment variables for sensitive data

---

## 📊 Project Highlights

* ⚡ Built using modern full-stack architecture
* 🔐 Industry-level authentication (Auth0)
* 🤖 Integrated AI chatbot for user assistance
* 🌍 Deployed on production (Vercel + Render)

---

## 🚀 Future Enhancements

* 📊 Learning analytics dashboard
* 🧠 AI-based course recommendations
* 📈 Progress tracking system
* 🧩 DSA roadmap integration

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 🧑‍💻 Author

**Shaikh Mimraj**

* 💼 Software Engineer (Student)
* 🌐 GitHub: [https://github.com/mimraj-ai1](https://github.com/mimraj-ai1) 

---

## 📄 License

This project is licensed under the MIT License.
