# OnLearny

A comprehensive online learning platform designed to help users learn web development, programming, and various modern technologies.

[![Website Link]

## 🚀 Overview

This eLearning platform offers a wide range of courses, interactive quizzes, and e-books to provide a complete learning experience. It features a modern, responsive design and a robust backend for user management and content delivery.

## ✨ Features

-   **Wide Course Selection:** Courses covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Java, DSA, MERN Stack, and Full Stack Development.
-   **Interactive Quizzes:** Test your knowledge with subject-specific quizzes and see your results instantly.
-   **E-books Library:** Access a collection of educational books and resources.
-   **User Authentication:** Secure login and registration powered by **Auth0**.
-   **Personalized Profiles:** Users can manage their profiles and track their learning progress.
-   **AI Chatbot:** Integrated **Botpress** chatbot to assist users with their queries.
-   **Responsive Design:** Fully optimized for all devices using Bootstrap and Material UI.
-   **Smooth UI/UX:** Enhanced with animations and carousels using Owl Carousel and Animate.css.

## 🛠️ Tech Stack

### Frontend
-   **Framework:** [React](https://reactjs.org/) (Vite)
-   **Styling:** [Bootstrap](https://getbootstrap.com/), [Material UI](https://mui.com/), [Styled Components](https://styled-components.com/)
-   **Icons:** Font Awesome, Material Symbols
-   **Authentication:** [Auth0](https://auth0.com/)
-   **State Management/Forms:** React Hook Form
-   **Animations:** Animate.css, Owl Carousel

### Backend
-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Security:** JSON Web Tokens (JWT), CORS, Dotenv

## ⚙️ Getting Started

### Prerequisites
-   Node.js installed on your machine.
-   A MongoDB Atlas account or local MongoDB instance.
-   Auth0 account for authentication setup.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tr.-goswami/eLearning-website.git
    cd eLearning-website
    ```

2.  **Install dependencies:**
    -   **Frontend:**
        ```bash
        npm install
        ```
    -   **Backend:**
        ```bash
        cd back-end
        npm install
        ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and another in the `back-end` directory based on the `.env.example` files.

    **Root `.env` / `back-end/.env`:**
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_KEY=your_stripe_key (if applicable)
    ```

### Running the Application

1.  **Start the Backend:**
    ```bash
    cd back-end
    node index.js
    # Or if you have nodemon installed:
    # nodemon index.js
    ```

2.  **Start the Frontend:**
    ```bash
    # From the root directory
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```text
eLearning-website/
├── back-end/               # Express backend
│   ├── index.js            # Entry point
│   └── .env                # Backend environment variables
├── src/                    # Frontend source files
│   ├── Components/         # React components
│   │   ├── Course/        # Course-related components
│   │   ├── Ebook/         # E-book related components
│   │   ├── Layout/        # Common layout (Navbar, Footer)
│   │   ├── Pages/         # Page components (Home, About, Contact)
│   │   └── Quiz/          # Quiz-related components
│   ├── assets/             # Static assets (CSS, JS, Libs)
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Entry point
├── index.html              # Frontend template
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```




