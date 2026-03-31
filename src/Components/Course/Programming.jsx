import React from "react";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";
import Coursestructure from "./Coursestructure";

export default function Programming() {
  const courses = [
    {
      time: "0.1s",
      img: "/img/java.jpg",
      readlink: "https://en.wikipedia.org/wiki/java",
      join: "/course/java",
      price: "$249.00",
      review: 285,
      title: "Java Full Course",
      teachername: "Tr.",
      duration: "4.50 Hrs",
      totalstudent: "145",
    },
    {
      time: "0.3s",
      img: "/img/Adv_java.jpg",
      readlink: "https://en.wikipedia.org/wiki/Advance java",
      join: "/course/advjava",
      price: "$99.00",
      review: 156,
      title: "Advance Java",
      teachername: "Tr.",
      duration: "4.13 Hrs",
      totalstudent: "75",
    },
    {
      time: "0.5s",
      img: "/img/JavaScript.jpg",
      readlink: "https://en.wikipedia.org/wiki/JavaScript",
      join: "/course/javascript",
      price: "$89.00",
      review: 115,
      title: "JavaScript Tutorials",
      teachername: "Tr.",
      duration: "4.50 Hrs",
      totalstudent: "135",
    },
    {
      time: "0.6s",
      img: "/img/nodejs.jpg",
      readlink: "https://en.wikipedia.org/wiki/nodejs",
      join: "/course/express",
      price: "$89.00",
      review: 85,
      title: "Node JS Tutorials",
      teachername: "Tr.",
      duration: "1.50 Hrs",
      totalstudent: "35",
    }
  ];
  return (
    <>
      <Navbar />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Programming Languages Tutorials</h1>
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
