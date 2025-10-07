import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, RotateCcw, User, Stethoscope } from 'lucide-react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const Simulation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const audioIntervalRef = useRef(null);
  const barsRef = useRef([]);
  const [isGuideActive, setIsGuideActive] = useState(false);
  const guideDriverRef = useRef(null);

  const conversation = [
{ speaker: "patient", text: "Good morning, Doctor. I've been having a fever, sore throat, and cough for three days." },
{ speaker: "doctor", text: "Good morning. It sounds like a mild throat and chest infection. Let me prescribe you some medicines." },
{ speaker: "doctor", text: "You’ll take Amoxicillin 500mg three times daily after meals — it’s an antibiotic to treat the infection." },
{ speaker: "doctor", text: "For fever and body ache, take Paracetamol 650mg every 6 hours if needed." },
{ speaker: "doctor", text: "And for your cough, take Bromhexine 8mg three times a day with warm water." },
{ speaker: "patient", text: "Alright, Doctor. Should I follow any special precautions?" },
{ speaker: "doctor", text: "Yes. Drink plenty of water, rest well, and avoid cold drinks, smoking, or alcohol during recovery." },
{ speaker: "patient", text: "Got it, Doctor. Thank you for the clear instructions — I’ll follow them carefully." },
];

  useEffect(() => {
    const barCount = 80;
    barsRef.current = Array(barCount).fill(0).map(() => ({
      height: 0,
      targetHeight: 0,
      velocity: 0,
    }));
  }, []);

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

      const barCount = barsRef.current.length;
      const barWidth = (width / barCount) * 0.7;
      const gap = (width / barCount) * 0.3;

      barsRef.current.forEach((bar, i) => {
        const spring = 0.15;
        const damping = 0.85;

        bar.velocity += (bar.targetHeight - bar.height) * spring;
        bar.velocity *= damping;
        bar.height += bar.velocity;

        bar.height = Math.max(0, bar.height);

        const x = i * (barWidth + gap) + gap / 2 + width * 0.05;
        const barHeight = bar.height * height * 0.7;
        const y = height / 2 - barHeight / 2;

        ctx.fillStyle = '#14b8a6';

        ctx.beginPath();
        const radius = Math.min(barWidth / 2, 2);
        ctx.roundRect(x, y, barWidth, Math.max(barHeight, radius * 2), radius);
        ctx.fill();
      });

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const calculateDelay = (text) => {
    const wordsPerMinute = 150;
    const words = text.split(' ').length;
    const readingTime = (words / wordsPerMinute) * 60 * 1000;
    const minDelay = 2000;
    const maxDelay = 8000;
    return Math.min(Math.max(readingTime, minDelay), maxDelay);
  };

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
        barsRef.current.forEach(bar => {
          bar.targetHeight = 0;
        });
        return;
      }

      barsRef.current.forEach((bar, i) => {
        const progress = elapsed / duration;
        const numWaves = 3;
        const wave1 = Math.sin(progress * Math.PI * 2 * numWaves + i * 0.1);
        const wave2 = Math.sin(progress * Math.PI * 2 * numWaves * 1.5 + i * 0.15);
        const wave3 = Math.sin(progress * Math.PI * 2 * numWaves * 0.7 + i * 0.08);
        
        const combined = (wave1 + wave2 * 0.7 + wave3 * 0.5) / 2.2;
        const normalized = (combined + 1) / 2;
        
        const randomness = Math.random() * 0.3 + 0.7;
        bar.targetHeight = normalized * randomness * 0.95;
      });

      elapsed += intervalTime;
    }, intervalTime);
  };

  useEffect(() => {
    if (!isSimulating || currentMessageIndex >= conversation.length) {
      if (currentMessageIndex >= conversation.length && isSimulating && !isGuideActive) {
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
  }, [isSimulating, currentMessageIndex, isGuideActive]);

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

  const startGuide = () => {
    setIsGuideActive(true);
    
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          popover: {
            title: 'Welcome to Recording Demo',
            description: 'Let me guide you through the recording process. This demo will show you how the system captures and transcribes conversations.',
            position: 'center'
          }
        },
        {
          element: '#start-recording-btn',
          popover: {
            title: 'Start Recording',
            description: 'Click "Next" to start the recording. The system will begin capturing the conversation.',
            position: 'top',
            onNextClick: () => {
              startSimulation();
              setTimeout(() => driverObj.moveNext(), 500);
            }
          }
        },
        {
          element: '#recording-status',
          popover: {
            title: 'Recording Active',
            description: 'Notice the red indicator showing that recording is now active.',
            position: 'bottom'
          }
        },
        {
          element: '#equalizer-canvas',
          popover: {
            title: 'Audio Equalizer',
            description: 'The equalizer visualizes the audio input in real-time. When someone speaks, the bars animate to show the sound levels.',
            position: 'center'
          }
        },
        {
          element: '#control-buttons',
          popover: {
            title: 'Control Buttons',
            description: 'You can Stop the recording at any time or Reset to start over. These controls give you full management of the session.',
            position: 'top'
          }
        },
        {
          element: '#conversation-panel',
          popover: {
            title: 'Live Transcript',
            description: 'Watch as the conversation appears in real-time on the right side. The AI transcribes and displays the dialogue between doctor and patient.',
            position: 'left'
          }
        },
        {
          element: '#conversation-messages',
          popover: {
            title: 'Conversation Messages',
            description: 'Each message is labeled with the speaker (Doctor or Patient) and appears as the conversation progresses. The transcript updates automatically.',
            position: 'left'
          }
        },
        {
          element: '#finalize-btn',
          popover: {
            title: 'Finalize Recording',
            description: 'When the conversation is complete, click "Next" to finalize the recording and proceed to review the transcript and generate prescriptions.',
            position: 'top',
            onNextClick: () => {
              driverObj.destroy();
              setIsGuideActive(false);
              window.location.href = "/Finalize";
            }
          }
        }
      ],
      onDestroyStarted: () => {
        if (!driverObj.isLastStep()) {
          setIsGuideActive(false);
          stopSimulation();
          resetSimulation();
        }
        driverObj.destroy();
      }
    });

    guideDriverRef.current = driverObj;
    driverObj.drive();
  };

  // Auto-start guide when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      startGuide();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left side - Equalizer */}
        <div className="flex-1 relative flex flex-col bg-white min-h-[50vh] lg:min-h-0">
          <div id="recording-status" className="absolute top-3 left-3 lg:top-6 lg:left-6 flex items-center space-x-2 bg-white px-2 py-1.5 lg:px-3 lg:py-2 rounded-md shadow-sm border border-gray-200 z-10">
            <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-red-500' : 'bg-gray-400'}`}></div>
            <span className="text-xs font-medium text-gray-600">
              {isSimulating ? 'Recording' : 'Idle'}
            </span>
          </div>
          
          <div id="equalizer-canvas" className="flex-1 flex items-center justify-center px-4 lg:px-12">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Control Panel */}
          <div id="control-buttons" className="bg-white border-t border-gray-200 px-4 py-3 lg:px-8 lg:py-6">
            <div className="flex justify-center items-center space-x-2 lg:space-x-3">
              <button
                onClick={stopSimulation}
                disabled={!isSimulating || isGuideActive}
                className={`flex items-center justify-center px-3 py-2 lg:px-6 lg:py-2.5 rounded-md font-medium transition-all duration-200 border ${
                  !isSimulating
                    ? 'bg-white text-gray-400 border-gray-300 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Square className="w-4 h-4 lg:mr-2" />
                <span className="text-sm hidden lg:inline">Stop</span>
              </button>
              <button
                id="start-recording-btn"
                onClick={startSimulation}
                disabled={isSimulating}
                className={`flex items-center justify-center px-4 py-2 lg:px-6 lg:py-2.5 rounded-md font-medium transition-all duration-200 ${
                  isSimulating
                    ? 'bg-teal-500 text-white cursor-not-allowed'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                <Play className="w-4 h-4 lg:mr-2 fill-white" />
                <span className="text-sm">Start</span>
              </button>
              <button
                onClick={resetSimulation}
                disabled={isGuideActive}
                className="flex items-center justify-center px-3 py-2 lg:px-6 lg:py-2.5 rounded-md font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 lg:mr-2" />
                <span className="text-sm hidden lg:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Conversation */}
        <div id="conversation-panel" className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col max-h-[50vh] lg:max-h-none">
          <div className="p-3 lg:p-5 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-2 bg-teal-50 rounded-lg">
                <Stethoscope className="w-4 h-4 lg:w-5 lg:h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-sm lg:text-base font-semibold text-gray-900">Consultation Transcript</h2>
                <p className="text-xs text-gray-500 mt-0.5">Patient-Doctor Conversation</p>
              </div>
            </div>
          </div>
          
          <div id="conversation-messages" className="flex-1 overflow-y-auto p-3 lg:p-5 space-y-3 lg:space-y-5 bg-white">
            {messages.map((msg, index) => (
              <div key={index} className="animate-slideIn">
                <div className="flex items-start space-x-2 lg:space-x-2.5">
                  <div className={`flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center ${
                    msg.speaker === 'doctor' ? 'bg-teal-500' : 'bg-gray-400'
                  }`}>
                    {msg.speaker === 'doctor' ? (
                      <Stethoscope className="w-3 lg:w-3.5 h-3 lg:h-3.5 text-white" />
                    ) : (
                      <User className="w-3 lg:w-3.5 h-3 lg:h-3.5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold mb-1 text-gray-900 uppercase tracking-wide">
                      {msg.speaker === 'doctor' ? 'DOCTOR' : 'PATIENT'}
                    </p>
                    <p className="text-xs lg:text-sm leading-relaxed text-gray-700">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Finalize Button */}
          <div className="p-3 lg:p-5 border-t border-gray-200">
            <button 
              id="finalize-btn"
              onClick={() => { 
                if (!isGuideActive) {
                  window.location.href = "/Finalize";
                }
              }}
              className="w-full flex items-center justify-center px-4 py-2.5 lg:py-3 rounded-md font-medium text-white bg-teal-500 hover:bg-teal-600 transition-all duration-200"
            >
              <Play className="w-4 h-4 mr-2 fill-white" />
              <span className="text-sm">Finalize</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Simulation;