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
import Javaprog from "./Components/Course/Javaprog";
import Dsa from "./Components/Course/Dsa";
import Mern from "./Components/Course/Mern";
import Fullstack from "./Components/Course/Fullstack";
import Programming from "./Components/Course/Programming";
import ShowBook from "./Components/Ebook/ShowBook";
import BotpressChatbot from "./Components/Ebook/BotpressChatbot";
import Reactjs from "./Components/Course/Reactjs";
import Express from "./Components/Course/Express";
import Nodejs from "./Components/Course/Nodejs";
import Mongodb from "./Components/Course/Mongodb";
import Mysql from "./Components/Course/Mysql";
import Javascript from "./Components/Course/Javascript";
import Html from "./Components/Course/Html";
import Css from "./Components/Course/Css";
import Advjava from "./Components/Course/Advjava";
import JavaQuiz from "./Components/Quiz/JavaQuiz";
import Test from "./Components/Pages/Test";
import FullstackQuiz from "./Components/Quiz/FullstackQuiz";
import JavascriptQuiz from "./Components/Quiz/JavascriptQuiz";
import ReactQuiz from "./Components/Quiz/ReactQuiz";
import Profile from "./Components/Pages/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Feedback from "./Components/Pages/Feedback";
import FeedbackAll from "./Components/Pages/FeedbackAll";

function App() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
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
          <Route
            path="/signin"
            render={() => {
              loginWithRedirect();
            }}
          />
          <Route path="/register" element={<Subscribe />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/test" element={<Test />} />
          <Route path="/test/java" element={<JavaQuiz />} />
          <Route path="/test/fullstack" element={<FullstackQuiz />} />
          <Route path="/test/javascript" element={<JavascriptQuiz />} />
          <Route path="/test/react" element={<ReactQuiz />} />

          <Route path="/courses/java" element={<Javaprog />} />
          <Route path="/courses/dsa" element={<Dsa />} />

          <Route path="/courses/mern" element={<Mern />} />
          <Route path="/courses/mern/nodejs" element={<Nodejs />} />
          <Route path="/courses/mern/express" element={<Express />} />
          <Route path="/courses/mern/react" element={<Reactjs />} />
          <Route path="/courses/mern/mongodb" element={<Mongodb />} />

          <Route path="/courses/fullstack" element={<Fullstack />} />
          <Route path="/courses/fullstack/sql" element={<Mysql />} />
          <Route path="/courses/fullstack/nodejs" element={<Nodejs />} />
          <Route path="/courses/fullstack/express" element={<Express />} />
          <Route path="/courses/fullstack/react" element={<Reactjs />} />
          <Route path="/courses/fullstack/mongodb" element={<Mongodb />} />
          <Route
            path="/courses/fullstack/javascript"
            element={<Javascript />}
          />
          <Route path="/courses/fullstack/html" element={<Html />} />
          <Route path="/courses/fullstack/css" element={<Css />} />

          <Route path="/cources/programming" element={<Programming />} />
          <Route path="/cources/programming/java" element={<Javaprog />} />
          <Route path="/cources/programming/advJava" element={<Advjava />} />
          <Route
            path="/cources/programming/javascript"
            element={<Javascript />}
          />

          <Route path="/library" element={<ShowBook />} />
          {/* <Route path="/feedback/new" element={<Feedback />} /> */}
          <Route path="/feedback" element={<FeedbackAll />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <BotpressChatbot />
    </>
  );
}

export default App;
