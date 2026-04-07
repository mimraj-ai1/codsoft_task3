import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const hcaptchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITEKEY;

export default function Contact() {
  const [result, setResult] = React.useState("");
  const [captchaToken, setCaptchaToken] = React.useState(null);

  const onHCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!web3formsKey) {
      setResult("Contact form is not configured (missing VITE_WEB3FORMS_ACCESS_KEY).");
      return;
    }
    if (hcaptchaSiteKey && !captchaToken) {
      setResult("Please complete the captcha.");
      return;
    }
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", web3formsKey);
    if (captchaToken) {
      formData.set("h-captcha-response", captchaToken);
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setCaptchaToken(null);
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Contact Us
            </h6>
            <h1 className="mb-5">Contact For Any Query</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* <div
              className="col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h5>Get In Touch</h5>
              <p className="mb-4">
                {/* The contact form is currently inactive. Please contact on phone,
                mail or social-media. */}
            {/* </p>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-map-marker-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Office</h5>
                  <p className="mb-0">Kolkata, West Bengal, India</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-phone-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Mobile</h5>
                  <p className="mb-0">+091 743 911 0000</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-envelope-open text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Email</h5>
                  <p className="mb-0">onlearny.contact@gmail.com</p>
                </div>
              </div>
            </div> */}

            <div
              className="col-lg-6 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form onSubmit={onSubmit}>
                <input type="hidden" name="from_name" value="OnLearny" />

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Mobile No"
                        required
                      />
                      <label htmlFor="subject">Mobile No</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        name="message"
                        style={{ height: "150px" }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="subject"
                    value="New Submission from contact page"
                  ></input>
                  <div className="col-8">
                    {hcaptchaSiteKey ? (
                      <HCaptcha
                        sitekey={hcaptchaSiteKey}
                        reCaptchaCompat={false}
                        onVerify={onHCaptchaChange}
                      />
                    ) : (
                      <p className="text-muted small mb-0">
                        Add <code>VITE_HCAPTCHA_SITEKEY</code> to <code>.env</code>{" "}
                        to enable captcha.
                      </p>
                    )}
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
              <span>{result}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
