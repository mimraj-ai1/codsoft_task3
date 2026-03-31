import React from "react";

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Quick Link</h4>
              <a className="btn btn-link" href>
                About Us
              </a>
              <a className="btn btn-link" href>
                Contact Us
              </a>
              <a className="btn btn-link" href>
                Privacy Policy
              </a>
              <a className="btn btn-link" href>
                Terms &amp; Condition
              </a>
              <a className="btn btn-link" href>
                FAQs &amp; Help
              </a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Services</h4>
              <a className="btn btn-link" href>Web Design</a>
              <a className="btn btn-link" href>Web Development</a>
              <a className="btn btn-link" href>Product Management</a>
              <a className="btn btn-link" href>Programming Languages</a>
              <a className="btn btn-link" href>Graphic Design</a>
              <a className="btn btn-link" href>Marketing</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Kolkata, West Bengal, India
              </p>
              {/* <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +091 743 911 0000
              </p> */}
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                services@codsoft.in
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-outline-light btn-social"
                  href=""
                >
                  <i className="fab fa-facebook-f" ></i>
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href=""
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href=""
                >
                  <i className="fab fa-telegram" />
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href=""
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Newsletter</h4>
              <p>
                Subscribe to our newsletter for the latest updates.              </p>
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <input
                  className="form-control border-0 w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{" "}
                <a className href>
                  2025 OnLearny
                </a>
                . All rights reserved.
                <br />
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a href>Home</a>
                  <a href>Cookies</a>
                  <a href>Help</a>
                  <a href>FQAs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
