# OnLearny

A comprehensive online learning platform designed to help users learn web development, programming, and various modern technologies.

[![Website Link](https://img.shields.io/badge/Visit-OnLearny-blue)](https://onlearny.vercel.app/)

## 🚀 Overview

This eLearning platform offers a wide range of courses, interactive quizzes, and e-books to provide a complete learning experience. It features a modern, responsive design and a robust backend for user management and content delivery.

## ✨ Features

-   **Wide Course Selection:** Courses covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Java, DSA, MERN Stack, and Full Stack Development.
-   **Interactive Quizzes:** Test your knowledge with subject-specific quizzes and see your results instantly.
-   **E-books Library:** Access a collection of educational books and resources.
-   **User Authentication:** Secure login and registration powered by **Auth0** with profile synchronization.
-   **Personalized Profiles:** Users can manage their profiles and track their learning progress.
-   **AI Chatbot:** Integrated **Botpress** AI Assistant to help and guide users.
-   **Feedback & Newsletter:** Seamless user interactions notifications powered by **Web3Forms**.
-   **Responsive Design:** Fully optimized for all devices using Bootstrap and Material UI.
-   **Smooth UI/UX:** Enhanced with animations and carousels using Owl Carousel and Animate.css.

## 📸 Screenshots
*(Add screenshots here)*

## 🛠️ Tech Stack

### Frontend
-   **Framework:** [React](https://reactjs.org/) (Vite)
-   **Styling:** [Bootstrap](https://getbootstrap.com/), [Material UI](https://mui.com/), [Styled Components](https://styled-components.com/)
-   **Authentication:** [Auth0](https://auth0.com/)
-   **Forms & Notifications:** Web3Forms
-   **Animations:** Animate.css, Owl Carousel

### Backend
-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB Atlas](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Security:** Auth0 token validation (`express-oauth2-jwt-bearer`), CORS

### Deployment
-   **Frontend:** Vercel
-   **Backend:** Render

## ⚙️ Getting Started

### Prerequisites
-   Node.js (v18+ recommended)
-   MongoDB Atlas account or local MongoDB instance
-   Auth0 account for authentication setup

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mimcoder03/sekhm.git
    cd OnLearny
    ```

2.  **Install dependencies:**
    
    **Frontend:**
    ```bash
    npm install
    ```
    
    **Backend:**
    ```bash
    cd back-end
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and another in the `back-end` directory.

    **Frontend `.env`:**
    ```env
    VITE_AUTH0_DOMAIN=your_auth0_domain
    VITE_AUTH0_CLIENT_ID=your_auth0_client_id
    VITE_AUTH0_AUDIENCE=your_api_audience
    VITE_API_URL=http://localhost:5000
    ```

    **Backend `back-end/.env`:**
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    AUTH0_DOMAIN=your_auth0_domain
    AUTH0_AUDIENCE=your_api_audience
    ```

### Running the Application

1.  **Start the Backend (from `back-end` folder):**
    ```bash
    npm run dev
    # Or: node index.js
    ```

2.  **Start the Frontend (from project root):**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:4110` (or whichever port Vite uses).

## 📂 Project Structure

```text
OnLearny/
├── back-end/               # Express backend application
│   ├── models/             # Mongoose database models
│   ├── routes/             # API endpoints routes
│   ├── controllers/        # Route handler functions
│   ├── middleware/         # Custom middlewares (e.g., Auth0 JWT checking)
│   ├── index.js            # Entry point for backend
│   └── .env                # Backend environment variables
├── src/                    # Frontend React source files
│   ├── Components/         # React components
│   │   ├── Course/         # Course-related UI
│   │   ├── Ebook/          # E-book related UI
│   │   ├── Layout/         # Shared layouts (Navbar, Footer, etc.)
│   │   ├── Pages/          # Main application pages
│   │   └── Quiz/           # Interactive quiz components
│   ├── assets/             # Static assets (images, global CSS)
│   ├── auth/               # Auth0 configuration & helpers
│   ├── App.jsx             # Main App root component
│   └── main.jsx            # React rendering entry point
├── index.html              # Main HTML template
├── package.json            # Frontend workspace dependencies
└── vite.config.js          # Vite configuration settings
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request if you want to contribute to the project.

## 📝 License

This project is open-source and available under the MIT License.
