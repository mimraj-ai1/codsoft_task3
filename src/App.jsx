import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Courses from "./Components/Pages/Courses";
import Team from "./Components/Pages/Team";
import Testimonial from "./Components/Pages/Testimonial";
import Contact from "./Components/Pages/Contact";
import ErrorPage from "./Components/Pages/ErrorPage";
import Subscribe from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import CourseDetail from "./Components/Course/CourseDetail";
import Mern from "./Components/Course/Mern";
import Fullstack from "./Components/Course/Fullstack";
import Programming from "./Components/Course/Programming";
import ShowBook from "./Components/Ebook/ShowBook";
import BotpressChatbot from "./Components/Ebook/BotpressChatbot";
import JavaQuiz from "./Components/Quiz/JavaQuiz";
import Test from "./Components/Pages/Test";
import FullstackQuiz from "./Components/Quiz/FullstackQuiz";
import JavascriptQuiz from "./Components/Quiz/JavascriptQuiz";
import ReactQuiz from "./Components/Quiz/ReactQuiz";
import Profile from "./Components/Pages/Profile";
import Feedback from "./Components/Pages/Feedback";
import FeedbackAll from "./Components/Pages/FeedbackAll";
import UserSync from "./Components/Auth/UserSync";
import SignInRedirect from "./Components/Auth/SignInRedirect";

function App() {
  return (
    <>
      <UserSync />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Layout headerName="About"><About /></Layout>} />
          <Route path="/courses" element={<Layout headerName="Courses"><Courses /></Layout>} />
          <Route path="/team" element={<Layout headerName="Our Team"><Team /></Layout>} />
          <Route path="/testimonial" element={<Layout headerName="Testimonial"><Testimonial /></Layout>} />
          <Route path="/contact" element={<Layout headerName="Contact"><Contact /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/signin" element={<SignInRedirect />} />
          <Route path="/register" element={<Subscribe />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/test" element={<Test />} />
          <Route path="/test/java" element={<JavaQuiz />} />
          <Route path="/test/fullstack" element={<FullstackQuiz />} />
          <Route path="/test/javascript" element={<JavascriptQuiz />} />
          <Route path="/test/react" element={<ReactQuiz />} />

          <Route path="/course/:courseId" element={<CourseDetail />} />

          <Route path="/courses/mern" element={<Mern />} />
          <Route path="/courses/fullstack" element={<Fullstack />} />
          <Route path="/cources/programming" element={<Programming />} />

          <Route path="/library" element={<ShowBook />} />
          <Route path="/feedback/new" element={<Feedback />} />
          <Route path="/feedback" element={<FeedbackAll />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <BotpressChatbot />
    </>
  );
}

export default App;
