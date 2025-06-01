import React, { useState } from 'react';
import logo from "../images/logo.png"

function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);




    return(
        <>
        <div className="login-container">
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          // background: linear-gradient(135deg,rgb(0, 0, 0) 0%, #a855f7 50%, #3b82f6 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 20px;
        }

        .login-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        .welcome-section {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          position: relative;
          overflow: hidden;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          color: white;
          min-height: 500px;
        }

        .floating-circles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .circle:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          right: 20%;
          animation-delay: 0s;
        }

        .circle:nth-child(2) {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .circle:nth-child(3) {
          width: 60px;
          height: 60px;
          top: 10%;
          left: 15%;
          animation-delay: 4s;
        }

        .circle:nth-child(4) {
          width: 40px;
          height: 40px;
          top: 70%;
          left: 20%;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        .company-name {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .welcome-text {
          font-size: 14px;
          margin-bottom: 10px;
          opacity: 0.9;
        }

        .welcome-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 30px;
          letter-spacing: -1px;
        }

        .welcome-description {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
          max-width: 300px;
        }

        .login-section {
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 40px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-control {
          border: 2px solid #e8ecf4;
          border-radius: 10px;
          padding: 15px 20px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .form-control:focus {
          border-color: #4facfe;
          box-shadow: 0 0 0 0.2rem rgba(79, 172, 254, 0.15);
          background: white;
        }

        .form-check {
          margin-bottom: 30px;
        }

        .form-check-input:checked {
          background-color: #4facfe;
          border-color: #4facfe;
        }

        .form-check-label {
          font-size: 14px;
          color: #666;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border: none;
          border-radius: 50px;
          padding: 15px 40px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);
        }

        .already-member {
          text-align: center;
          margin-top: 30px;
          font-size: 14px;
          color: #666;
        }

        .already-member a {
          color: #4facfe;
          text-decoration: none;
          font-weight: 500;
        }

        .already-member a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-card {
            margin: 10px;
          }
          
          .welcome-section {
            padding: 40px 30px;
            min-height: 300px;
          }
          
          .welcome-title {
            font-size: 28px;
          }
          
          .login-section {
            padding: 40px 30px;
          }
        }
      `}</style>

      <div className="login-card">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="welcome-section">
              <div className="floating-circles">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <div className="company-name">
                <img src={logo} alt="" />
              </div>
              <div className="welcome-text">Nice to see you again</div>
              <h1 className="welcome-title">WELCOME BACK</h1>
              {/* <p className="welcome-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation.
              </p> */}
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="login-section">
              <h2 className="login-title">Login Account</h2>
              
              <div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="keepSignedIn"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="keepSignedIn">
                    Keep me signed in
                  </label>
                </div>
                
                <button onClick={()=>{
                  window.location.href = "/Dashboard"
                }} className="btn btn-primary w-100">
                  Login
                </button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default Login;
