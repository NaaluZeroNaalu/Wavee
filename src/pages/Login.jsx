import React, { useState, useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showStoryPopup, setShowStoryPopup] = useState(true);
  const [currentStoryStep, setCurrentStoryStep] = useState(0);

  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "AI-Driven Doctor-Patient Interaction",
      subtitle: "Effortless Conversations, Instant Summaries",
      description: "Our AI captures every conversation between doctor and patient, automatically summarizing key details like name, mobile number, and prescriptions. No more manual note-taking!"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      title: "Instant Prescription Generation",
      subtitle: "AI That Helps You Focus on Care",
      description: "Our AI listens, analyzes, and generates prescriptions based on patient conversations, saving doctors valuable time while ensuring accuracy and efficiency."
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: "Seamless Patient Management",
      subtitle: "Easy Access to Critical Information",
      description: "Track and manage patient information with ease. Our platform helps doctors access detailed summaries, prescriptions, and contact information all in one place."
    }
  ];

 const storySteps = [
      {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "😓 The Struggle",
      subtitle: "Meet Dr. Anjali Sharma",
      description: "Dr. Anjali became a doctor to heal people and connect with them. But lately, her greatest challenge isn't a complex medical case—it's the mountain of paperwork. For every patient she sees, she spends another ten minutes typing and clicking. Her computer screen has become a barrier between her and her patients."
      },
      {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "💡 A Dream",
      subtitle: "Imagining a Different Reality",
      description: "One exhausted evening, Dr. Sharma imagines something different. What if she had an invisible assistant that could handle the paperwork, listen to conversations, and organize everything? An intelligent helper that would free her to do what only she can do: care for her patients."
      },
      {
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "✨ Enter Pravaah",
      subtitle: "The Guide Appears",
      description: "Pravaah isn't another complicated software to learn. It's a lightweight, intelligent AI assistant that seamlessly integrates into her existing workflow. It's the invisible helper she dreamed of—listening silently, understanding context, and drafting complete prescriptions while she focuses on her patient."
      },
      {
      image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "🚀 The Transformation",
      subtitle: "A New Beginning",
      description: "Her practice is transformed: conversations flow naturally while Pravaah creates prescriptions. Old prescriptions are digitized with a photo. Care extends beyond the clinic with WhatsApp delivery and automatic follow-ups. For the first time in years, Dr. Sharma finishes her day energized, having spent her time making eye contact and caring—not doing data entry.",
      features: [
      { icon: "🎙️", text: "Voice Recognition" },
      { icon: "📝", text: "Auto Prescriptions" },
      { icon: "⚡", text: "Instant Summaries" },
      { icon: "🔒", text: "Secure & Private" }
      ]
      }
];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  // Typing animation helper
  const typeText = (setter, text, delay = 100) => {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setter(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  };

  const startGuide = () => {
    setShowStoryPopup(false);
    
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: '.login-card',
          popover: {
            title: 'Welcome to the Demo Guide',
            description: 'Let me show you how to sign in. Click "Next" to continue.',
            position: 'center'
          }
        },
        {
          element: '#email-input',
          popover: {
            title: 'Email Address',
            description: 'First, enter your email address. Watch as we type it for you!',
            position: 'bottom',
            onNextClick: async () => {
              await typeText(setEmail, 'Dr.Anjali@gmail.com', 80);
              driverObj.moveNext();
            }
          }
        },
        {
          element: '#password-input',
          popover: {
            title: 'Password',
            description: 'Now, enter your password.',
            position: 'bottom',
            onNextClick: async () => {
              await typeText(setPassword, 'password123', 80);
              driverObj.moveNext();
            }
          }
        },
        {
          element: '#keep-signed-in',
          popover: {
            title: 'Keep Me Signed In',
            description: 'You can choose to stay signed in for convenience.',
            position: 'bottom',
            onNextClick: () => {
              setKeepSignedIn(true);
              setTimeout(() => driverObj.moveNext(), 300);
            }
          }
        },
        {
          element: '#signin-button',
          popover: {
            title: 'Sign In',
            description: 'Click "Next" to sign in and go to the Dashboard!',
            position: 'top',
            onNextClick: () => {
              driverObj.destroy();
              window.location.href = "/Dashboard";
            }
          }
        }
      ],
      onDestroyStarted: () => {
        driverObj.destroy();
      }
    });

    driverObj.drive();
  };

  const handleNextStep = () => {
    if (currentStoryStep < storySteps.length - 1) {
      setCurrentStoryStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStoryStep > 0) {
      setCurrentStoryStep(prev => prev - 1);
    }
  };

  const currentStep = storySteps[currentStoryStep];

  return (
    <>
      {showStoryPopup && (
        <div className="story-popup-overlay">
          <div className="story-popup-card">
            <button className="close-btn" onClick={() => setShowStoryPopup(false)}>✕</button>
            
            <div className="story-image-section">
              <img src={currentStep.image} alt={currentStep.title} className="story-image" />
              <div className="step-indicator">
                {currentStoryStep + 1} / {storySteps.length}
              </div>
            </div>
            
            <div className="story-text-section">
              <div className="story-content-wrapper">
                <div className="story-subtitle">{currentStep.subtitle}</div>
                <h2 className="story-title">{currentStep.title}</h2>
                <p className="story-description">{currentStep.description}</p>
                
              </div>
              
              <div className="story-navigation">
                <button 
                  className="nav-btn prev-btn" 
                  onClick={handlePrevStep}
                  disabled={currentStoryStep === 0}
                >
                  ← Previous
                </button>
                
                {currentStoryStep < storySteps.length - 1 ? (
                  <button className="nav-btn next-btn" onClick={handleNextStep}>
                    Next →
                  </button>
                ) : (
                  <button className="nav-btn demo-btn" onClick={startGuide}>
                    Start Demo
                  </button>
                )}
              </div>
              
              <div className="progress-dots">
                {storySteps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`progress-dot ${idx === currentStoryStep ? 'active' : ''} ${idx < currentStoryStep ? 'completed' : ''}`}
                    onClick={() => setCurrentStoryStep(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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

          .login-section {
            padding: 60px 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: white;
            position: relative;
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
            cursor: pointer;
          }

          .form-check-label {
            font-size: 14px;
            color: #666;
            cursor: pointer;
          }

          .btn-primary {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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

          .story-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .story-popup-card {
            background: white;
            border-radius: 20px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.4s ease;
            display: grid;
            grid-template-columns: 1fr 1fr;
            position: relative;
          }

          .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.3s ease;
            color: #333;
          }

          .close-btn:hover {
            background: white;
            transform: rotate(90deg);
          }

          .story-image-section {
            position: relative;
            overflow: hidden;
            background: #000;
          }

          .story-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: fadeIn 0.5s ease;
          }

          .step-indicator {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
          }

          .story-text-section {
            padding: 50px 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: white;
          }

          .story-content-wrapper {
            flex: 1;
          }

          .story-subtitle {
            color: #667eea;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .story-title {
            font-size: 32px;
            font-weight: 700;
            color: #333;
            margin-bottom: 20px;
            line-height: 1.2;
          }

          .story-description {
            font-size: 16px;
            color: #666;
            line-height: 1.8;
            margin-bottom: 30px;
          }

          .story-features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 30px;
          }

          .feature-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            transition: all 0.3s ease;
          }

          .feature-box:hover {
            background: #e8f5e9;
            transform: translateY(-3px);
          }

          .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
          }

          .feature-text {
            font-size: 14px;
            color: #555;
            font-weight: 600;
          }

          .story-navigation {
            display: flex;
            gap: 15px;
            margin-top: 30px;
          }

          .nav-btn {
            flex: 1;
            padding: 14px 28px;
            border: none;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .prev-btn {
            background: #f0f0f0;
            color: #666;
          }

          .prev-btn:hover:not(:disabled) {
            background: #e0e0e0;
            transform: translateX(-3px);
          }

          .prev-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }

          .next-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }

          .next-btn:hover {
            transform: translateX(3px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          }

          .demo-btn {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
          }

          .demo-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
          }

          .progress-dots {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 25px;
          }

          .progress-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #e0e0e0;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .progress-dot.active {
            background: #667eea;
            transform: scale(1.3);
          }

          .progress-dot.completed {
            background: #4facfe;
          }

          @media (max-width: 968px) {
            .story-popup-card {
              grid-template-columns: 1fr;
              max-width: 500px;
            }

            .story-image-section {
              min-height: 250px;
              max-height: 250px;
            }

            .story-text-section {
              padding: 40px 30px;
            }

            .story-title {
              font-size: 24px;
            }

            .story-features-grid {
              grid-template-columns: 1fr;
            }
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
          }
        `}</style>

        <div className="login-card">
          <div className="carousel-section">
            {carouselSlides.map((slide, index) => (
              <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={slide.image} alt={slide.title} className="carousel-bg" />
                <div className="carousel-content">
                  <div className="carousel-subtitle">{slide.subtitle}</div>
                  <h1 className="carousel-title">{slide.title}</h1>
                  <p className="carousel-description">{slide.description}</p>
                </div>
              </div>
            ))}
            
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
                  id="email-input"
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <input
                  id="password-input"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="form-check" id="keep-signed-in">
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
                id="signin-button"
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