import React from "react";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";
import { Link } from "react-router-dom";
import Coursestructure from "./Coursestructure";

export default function Fullstack() {
  const courses = [
    {
      time: "0.1s",
      img: "/img/HTML.jpg",
      readlink: "https://en.wikipedia.org/wiki/html",
      join: "/course/html",
      price: "$49.00",
      title: "HTML5 Tutorials",
      teachername: "Tr.",
      review: 210,
      duration: "3.11 Hrs",
      totalstudent: "50",
    },
    {
      time: "0.3s",
      img: "/img/CSS.jpg",
      readlink: "https://en.wikipedia.org/wiki/css",
      join: "/course/css",
      price: "$49.00",
      title: "CSS Tutorials",
      review: 237,
      teachername: "Tr.",
      duration: "1.00 Hrs",
      totalstudent: "35",
    },
    {
      time: "0.5s",
      img: "/img/JavaScript.jpg",
      readlink: "https://en.wikipedia.org/wiki/javascript",
      join: "/course/javascript",
      price: "$99.00.00",
      title: "JavaScript Tutorials",
      review: 174,
      teachername: "Tr.",
      duration: "4.20 Hrs",
      totalstudent: "45",
    },
    {
      time: "0.1s",
      img: "/img/react.jpg",
      readlink:
        "https://en.wikipedia.org/wiki/Outline_of_web_design_and_web_development",
      join: "/course/react",
      price: "$149.00",
      title: "React Js Tutorials",
      review: 34,
      teachername: "Tr.",
      duration: "2.50 Hrs",
      totalstudent: "35",
    },
    {
      time: "0.7s",
      img: "/img/nodejs.jpg",
      readlink: "https://en.wikipedia.org/wiki/nodejs",
      join: "/course/nodejs",
      price: "$89.00",
      title: "Node JS Tutorials",
      review: 88,
      teachername: "Tr.",
      duration: "1.50 Hrs",
      totalstudent: "35",
    },
    {
      time: "0.7s",
      img: "/img/sql.jpg",
      readlink: "https://en.wikipedia.org/wiki/sql",
      join: "/course/mysql",
      price: "$169.00",
      title: "MySQL Tutorials",
      review: 123,
      teachername: "Tr.",
      duration: "3.16 Hrs",
      totalstudent: "35",
    },
    {
      time: "0.3s",
      img: "/img/mongodb.jpg",
      readlink: "https://en.wikipedia.org/wiki/mongodb",
      join: "/course/mongodb",
      price: "$89.00",
      title: "Mongodb Tutorials",
      review: 98,
      teachername: "Tr.",
      duration: "1.50 Hrs",
      totalstudent: "35",
    },
    {
      time: "0.5s",
      img: "/img/express.jpg",
      readlink: "https://en.wikipedia.org/wiki/expressjs",
      join: "/course/express",
      price: "$89.00",
      title: "Express Js Tutorials",
      review: 231,
      teachername: "Tr.",
      duration: "1.30 Hrs",
      totalstudent: "35",
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow>
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Full Stack Web Devlopment Courses</h1>
          </div>

          <div className="row g-4 justify-content-center">
            {courses.map((course, index) => (
              <Coursestructure key={index} data={course} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
