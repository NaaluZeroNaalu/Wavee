import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, RotateCcw, User, Stethoscope } from 'lucide-react';

const ParticleCircle = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const audioIntervalRef = useRef(null);
  const barsRef = useRef([]);

  // Predefined conversation
  const conversation = [
    { speaker: 'doctor', text: "Good morning! Please have a seat. What brings you in today?" },
    { speaker: 'patient', text: "Good morning, Doctor. I've been having persistent headaches for the past week." },
    { speaker: 'doctor', text: "I see. Can you describe the headaches? Are they constant or do they come and go?" },
    { speaker: 'patient', text: "They usually start in the afternoon and get worse by evening. It feels like pressure around my forehead." },
    { speaker: 'doctor', text: "Have you noticed any triggers? Perhaps stress, lack of sleep, or screen time?" },
    { speaker: 'patient', text: "Now that you mention it, I have been working long hours on the computer lately." },
    { speaker: 'doctor', text: "That could definitely be a factor. Have you experienced any nausea, vision changes, or sensitivity to light?" },
    { speaker: 'patient', text: "Sometimes my eyes feel strained, but no nausea or light sensitivity." },
    { speaker: 'doctor', text: "It sounds like tension headaches, possibly from eye strain. Let me check your blood pressure and examine you." },
    { speaker: 'patient', text: "Okay, thank you." },
    { speaker: 'doctor', text: "Your blood pressure is normal. I recommend taking regular breaks from screen time, ensuring proper lighting, and staying hydrated." },
    { speaker: 'patient', text: "Should I take any medication?" },
    { speaker: 'doctor', text: "Over-the-counter pain relievers like ibuprofen should help. Take 400mg when needed, but not more than 3 times daily." },
    { speaker: 'patient', text: "How long should I try this before coming back?" },
    { speaker: 'doctor', text: "Give it two weeks. If the headaches persist or worsen, schedule a follow-up and we'll consider further tests." },
    { speaker: 'patient', text: "Thank you, Doctor. I'll follow your advice." },
    { speaker: 'doctor', text: "You're welcome. Take care and don't hesitate to call if you have concerns." }
  ];

  // Initialize equalizer bars
  useEffect(() => {
    const barCount = 64;
    barsRef.current = Array(barCount).fill(0).map(() => ({
      height: 0,
      targetHeight: 0,
      velocity: 0
    }));
  }, []);

  // Equalizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#f0f9ff');
      bgGradient.addColorStop(1, '#ffffff');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      const barCount = barsRef.current.length;
      const barWidth = (width / barCount) * 0.8;
      const gap = (width / barCount) * 0.2;
      
      // Check if all bars are at zero (idle state)
      const isIdle = barsRef.current.every(bar => bar.height < 0.01 && bar.targetHeight < 0.01);
      
      if (isIdle) {
        // Draw a simple flat line when idle
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(width * 0.1, height / 2);
        ctx.lineTo(width * 0.9, height / 2);
        ctx.stroke();
        
        // Add subtle glow to the line
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        // Draw animated bars
        barsRef.current.forEach((bar, i) => {
          // Spring physics for smooth animation
          const spring = 0.15;
          const damping = 0.85;
          
          bar.velocity += (bar.targetHeight - bar.height) * spring;
          bar.velocity *= damping;
          bar.height += bar.velocity;
          
          // Prevent negative heights
          bar.height = Math.max(0, bar.height);
          
          const x = i * (barWidth + gap) + gap / 2;
          const barHeight = bar.height * height * 0.8;
          const y = height / 2 - barHeight / 2;
          
          // Create gradient for each bar
          const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
          
          // Color based on position (spectrum effect)
          const hue = (i / barCount) * 180 + 180; // Blue to cyan range
          gradient.addColorStop(0, `hsl(${hue}, 80%, 60%)`);
          gradient.addColorStop(1, `hsl(${hue}, 70%, 45%)`);
          
          ctx.fillStyle = gradient;
          
          // Draw bar with rounded corners
          ctx.beginPath();
          const radius = barWidth / 2;
          ctx.roundRect(x, y, barWidth, Math.max(barHeight, radius * 2), radius);
          ctx.fill();
          
          // Glow effect for taller bars
          if (bar.height > 0.3) {
            ctx.shadowColor = `hsl(${hue}, 80%, 60%)`;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Scroll to bottom when new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Calculate delay based on text length
  const calculateDelay = (text) => {
    const wordsPerMinute = 150;
    const words = text.split(' ').length;
    const readingTime = (words / wordsPerMinute) * 60 * 1000;
    const minDelay = 2000;
    const maxDelay = 8000;
    return Math.min(Math.max(readingTime, minDelay), maxDelay);
  };

  // Simulate equalizer animation
  const simulateEqualizerAnimation = (duration) => {
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }

    let elapsed = 0;
    const intervalTime = 50;
    
    audioIntervalRef.current = setInterval(() => {
      if (elapsed >= duration) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
        // Smoothly reduce all bars to zero
        barsRef.current.forEach(bar => {
          bar.targetHeight = 0;
        });
        return;
      }

      // Update each bar with random heights for natural look
      barsRef.current.forEach((bar, i) => {
        // Create wave pattern across bars
        const progress = elapsed / duration;
        const wave = Math.sin(progress * Math.PI * 4 + i * 0.3) * 0.5 + 0.5;
        
        // Add randomness for natural audio visualization
        const randomness = Math.random() * 0.7 + 0.3;
        
        // Lower frequencies (left side) generally have more energy
        const frequencyFactor = 1 - (i / barsRef.current.length) * 0.4;
        
        // Add variation to make it look more natural
        const variation = Math.sin(elapsed * 0.01 + i * 0.5) * 0.3 + 0.7;
        
        bar.targetHeight = wave * randomness * frequencyFactor * variation * 0.9;
      });
      
      elapsed += intervalTime;
    }, intervalTime);
  };

  // Simulation effect with dynamic timing
  useEffect(() => {
    if (!isSimulating || currentMessageIndex >= conversation.length) {
      if (currentMessageIndex >= conversation.length && isSimulating) {
        setIsSimulating(false);
        if (audioIntervalRef.current) {
          clearInterval(audioIntervalRef.current);
        }
      }
      return;
    }

    const newMessage = conversation[currentMessageIndex];
    const delay = calculateDelay(newMessage.text);
    
    setMessages(prev => [...prev, newMessage]);
    simulateEqualizerAnimation(delay * 0.8);
    
    const timer = setTimeout(() => {
      setCurrentMessageIndex(prev => prev + 1);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [isSimulating, currentMessageIndex]);

  const startSimulation = () => {
    setIsSimulating(true);
    setMessages([]);
    setCurrentMessageIndex(0);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
    barsRef.current.forEach(bar => {
      bar.targetHeight = 0;
    });
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setMessages([]);
    setCurrentMessageIndex(0);
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
    barsRef.current.forEach(bar => {
      bar.height = 0;
      bar.targetHeight = 0;
      bar.velocity = 0;
    });
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Equalizer */}
        <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
          
          {/* Status Indicator */}
          <div className="absolute top-6 left-6 flex items-center space-x-3 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-100">
            {isSimulating ? (
              <>
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-semibold text-green-600">Speaking</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-500">Ready</span>
              </>
            )}
          </div>

          {/* Progress indicator */}
          {isSimulating && (
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-gray-600">Progress:</div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">{currentMessageIndex}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-sm font-medium text-gray-500">{conversation.length}</span>
                </div>
              </div>
              <div className="mt-2 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 rounded-full"
                  style={{ width: `${(currentMessageIndex / conversation.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Equalizer Label */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {!isSimulating && messages.length === 0 && (
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">🎵</div>
                <p className="text-xl font-semibold text-gray-400">Audio Equalizer</p>
                <p className="text-sm text-gray-300 mt-2">Click Start to begin</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Conversation */}
        <div className="w-96 bg-gradient-to-b from-blue-50 to-white border-l border-gray-200 flex flex-col shadow-xl">
          <div className="p-5 bg-white border-b border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Patient-Doctor Conversation</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time consultation simulation</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Stethoscope className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Waiting to start...</p>
                  <p className="text-xs mt-1 text-gray-400">Click Start to begin simulation</p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 animate-slideIn ${
                    msg.speaker === 'doctor' ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                  }`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    msg.speaker === 'doctor' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-green-500 to-green-600'
                  }`}>
                    {msg.speaker === 'doctor' ? (
                      <Stethoscope className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex-1 max-w-xs ${
                    msg.speaker === 'doctor' ? 'text-left' : 'text-right'
                  }`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl shadow-sm ${
                      msg.speaker === 'doctor'
                        ? 'bg-blue-100 text-blue-900 rounded-tl-none'
                        : 'bg-green-100 text-green-900 rounded-tr-none'
                    }`}>
                      <p className="text-xs font-semibold mb-1 opacity-60 uppercase tracking-wide">
                        {msg.speaker === 'doctor' ? 'Doctor' : 'Patient'}
                      </p>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 flex-shrink-0 shadow-lg">
        <div className="px-8 py-6">
          <div className="flex justify-center">
            <div className="inline-flex space-x-2 bg-gray-100 p-1.5 rounded-full shadow-inner">
              <button 
                onClick={stopSimulation}
                disabled={!isSimulating}
                className={`flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  !isSimulating
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <Square className="w-5 h-5 mr-2" />
                <span>Stop</span>
              </button>
              
              <button 
                onClick={startSimulation}
                disabled={isSimulating}
                className={`flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isSimulating
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md'
                }`}
              >
                <Play className="w-5 h-5 mr-2" />
                <span>Start</span>
              </button>
              
              <button 
                onClick={resetSimulation}
                className="flex items-center justify-center px-6 py-3 rounded-full font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ParticleCircle;