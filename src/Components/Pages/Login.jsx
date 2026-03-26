import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0 login-page" style={{ minHeight: '100vh' }}>
        <div className="row g-0 h-100 align-items-center justify-content-center" style={{ minHeight: '90vh' }}>

          {/* Left Side - Illustration and Text */}
          <div className="col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center text-center p-5 login-page__left">
            <h1 className="display-5 mb-3 fw-bold login-page__title">Welcome to OnLearny</h1>
            <p className="text-secondary mb-5 fs-5">Unlock your potential by signing up with OnLearny
              and start learning new skills today.</p>
            {/* Inline SVG illustration to closely match the vibe without needing external assets */}
            <img
              src="/img/login_img.jpg"
              alt="Login Illustration"
              className="img-fluid rounded shadow"
              style={{ maxWidth: '90%', objectFit: 'cover' }}
            />
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 login-page__right" style={{ minHeight: '90vh' }}>
            <div className="bg-white rounded shadow-sm p-5" style={{ width: '100%', maxWidth: '450px' }}>
              <h3 className="text-center mb-4 pb-2 text-dark">{isLogin ? 'Login' : 'Sign Up'}</h3>

              <form>
                {!isLogin && (
                  <div className="mb-3">
                    <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="Name" />
                  </div>
                )}

                <div className="mb-3">
                  <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="Email Address" />
                </div>

                <div className="mb-3">
                  <input type="password" className="form-control form-control-lg bg-light border-0" placeholder="Password" />
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <input type="password" className="form-control form-control-lg bg-light border-0" placeholder="Confirm Password" />
                  </div>
                )}

                {isLogin && (
                  <div className="text-end mb-4">
                    <a href="#" className="text-decoration-none small text-primary">Forgot password?</a>
                  </div>
                )}

                <button type="button" className="btn btn-primary btn-lg w-100 mb-3 fw-bold">
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>

                <div className="text-center mb-3">
                  <span className="text-muted small">Or</span>
                </div>

                <div className="text-center mb-4">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-lg w-100 fw-bold"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </div>

                {!isLogin && (
                  <div className="form-check mt-4">
                    <input className="form-check-input" type="checkbox" id="terms" />
                    <label className="form-check-label text-muted small" htmlFor="terms" style={{ fontSize: '0.8rem' }}>
                      By continuing, You agree to OnLearny's terms & conditions & privacy policy
                    </label>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
