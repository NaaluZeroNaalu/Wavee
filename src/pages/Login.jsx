import React, { useState, useEffect } from 'react';

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data - replace with your actual images and content
  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Welcome to Our Platform",
      subtitle: "Experience the Future",
      description: "Join thousands of users who trust our secure and innovative platform for their daily needs."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      title: "Powerful Analytics",
      subtitle: "Data-Driven Insights",
      description: "Transform your business with comprehensive analytics and real-time reporting tools."
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: "Team Collaboration",
      subtitle: "Work Together Seamlessly",
      description: "Connect with your team and collaborate effectively with our integrated communication tools."
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <>
      <div className="login-container">
        <style jsx>{`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 20px;
            background: #f5f7fa;
          }

          .login-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            max-width: 1000px;
            width: 100%;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 600px;
          }

          .carousel-section {
            position: relative;
            overflow: hidden;
            background: #000;
          }

          .carousel-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.8s ease-in-out;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: white;
            padding: 40px;
          }

          .carousel-slide.active {
            opacity: 1;
          }

          .carousel-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.4);
          }

          .carousel-content {
            position: relative;
            z-index: 2;
            max-width: 400px;
          }

          .logo-container {
            margin-bottom: 40px;
          }

          .logo {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            backdrop-filter: blur(10px);
            font-weight: bold;
            font-size: 24px;
          }

          .carousel-subtitle {
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 1px;
            margin-bottom: 15px;
            opacity: 0.9;
            color: #4facfe;
          }

          .carousel-title {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 20px;
            letter-spacing: -1px;
            line-height: 1.2;
          }

          .carousel-description {
            font-size: 16px;
            line-height: 1.6;
            opacity: 0.9;
            margin-bottom: 30px;
          }

          .carousel-nav {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 3;
          }

          .nav-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .nav-dot.active {
            background: #4facfe;
            transform: scale(1.2);
          }

          .carousel-arrows {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 3;
            backdrop-filter: blur(10px);
          }

          .carousel-arrows:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
          }

          .prev-arrow {
            left: 20px;
          }

          .next-arrow {
            right: 20px;
          }

          .login-section {
            padding: 60px 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: white;
          }

          .login-title {
            font-size: 28px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
          }

          .login-subtitle {
            color: #666;
            margin-bottom: 40px;
            font-size: 16px;
          }

          .form-group {
            margin-bottom: 25px;
          }

          .form-control {
            border: 2px solid #e8ecf4;
            border-radius: 12px;
            padding: 16px 20px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: #f8f9fa;
            width: 100%;
            box-sizing: border-box;
          }

          .form-control:focus {
            border-color: #4facfe;
            box-shadow: 0 0 0 0.2rem rgba(79, 172, 254, 0.15);
            background: white;
            outline: none;
          }

          .form-check {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .form-check-input {
            width: 18px;
            height: 18px;
            accent-color: #4facfe;
          }

          .form-check-label {
            font-size: 14px;
            color: #666;
            cursor: pointer;
          }

          .btn-primary {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            // background: #4facfe;
            border: none;
            border-radius: 12px;
            padding: 16px 40px;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            color: white;
            width: 100%;
            cursor: pointer;
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);
          }

          .forgot-password {
            text-align: center;
            margin-top: 20px;
          }

          .forgot-password a {
            color: #4facfe;
            text-decoration: none;
            font-size: 14px;
          }

          .forgot-password a:hover {
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            .login-card {
              grid-template-columns: 1fr;
              max-width: 400px;
            }
            
            .carousel-section {
              min-height: 300px;
            }
            
            .carousel-title {
              font-size: 24px;
            }
            
            .login-section {
              padding: 40px 30px;
            }
            
            .carousel-arrows {
              display: none;
            }
          }
        `}</style>

        <div className="login-card">
          <div className="carousel-section">
            {carouselSlides.map((slide, index) => (
              <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={slide.image} alt={slide.title} className="carousel-bg" />
                <div className="carousel-content">
                  {/* <div className="logo-container">
                    <div className="logo">L</div>
                  </div> */}
                  <div className="carousel-subtitle">{slide.subtitle}</div>
                  <h1 className="carousel-title">{slide.title}</h1>
                  <p className="carousel-description">{slide.description}</p>
                </div>
              </div>
            ))}
            
            {/* <button className="carousel-arrows prev-arrow" onClick={prevSlide}>
              &#8249;
            </button>
            <button className="carousel-arrows next-arrow" onClick={nextSlide}>
              &#8250;
            </button> */}
            
            <div className="carousel-nav">
              {carouselSlides.map((_, index) => (
                <div
                  key={index}
                  className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="login-section">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Please sign in to your account</p>
            
            <div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
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
              
              <button 
                onClick={() => {
                  window.location.href = "/Dashboard"
                }} 
                className="btn-primary"
              >
                Sign In
              </button>
              
              <div className="forgot-password">
                <a href="/forgot-password">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;