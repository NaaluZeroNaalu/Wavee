import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, RotateCcw, Mic, MicOff } from 'lucide-react';

const ParticleCircle = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('Click start to begin speech recognition...');
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const frequencyDataRef = useRef(null);
  const speechActivityRef = useRef(0);
  const particleModeRef = useRef('circle');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size with device pixel ratio for crisp rendering
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

    // Enhanced Particle class with spectrum reactive behavior
    class Particle {
      constructor(index) {
        this.index = index;
        this.frequencyIndex = Math.floor((index / 120) * 128); // Map to frequency bins
        this.reset();
        this.color = this.getSpectralColor();
        this.baseSize = Math.random() * 2 + 1.5;
        this.angle = (index / 120) * Math.PI * 2; // Distribute evenly around circle
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.energy = 0;
        this.life = Math.random();
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.spectralEnergy = 0;
      }
      
      reset() {
        const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
        const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;
        const radius = Math.min(canvas.width, canvas.height) / (window.devicePixelRatio || 1) / 6;
        
        // Ensure valid initial position
        if (!isFinite(centerX) || !isFinite(centerY) || !isFinite(radius)) {
          this.baseX = 200;
          this.baseY = 200;
        } else {
          // Position on circle initially
          this.baseX = centerX + Math.cos(this.angle) * radius;
          this.baseY = centerY + Math.sin(this.angle) * radius;
        }
        
        this.x = this.baseX;
        this.y = this.baseY;
        this.vx = 0;
        this.vy = 0;
        this.targetX = this.baseX;
        this.targetY = this.baseY;
      }
      
      getSpectralColor() {
        // Color based on frequency position around the circle - spectrum mapping
        const ratio = this.frequencyIndex / 178;
      
        return '#1589FF';
      }
      
      update(time) {
        const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
        const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;
        const baseRadius = Math.min(canvas.width, canvas.height) / (window.devicePixelRatio || 1) / 6;

        if (!isFinite(centerX) || !isFinite(centerY) || !isFinite(baseRadius)) {
          return;
        }

        // Frequency energy from audio data
        if (frequencyDataRef.current && this.frequencyIndex < frequencyDataRef.current.length) {
          this.spectralEnergy = frequencyDataRef.current[this.frequencyIndex] / 255;
        } else {
          this.spectralEnergy = 0;
        }

        this.energy = Math.max(0, Math.min(1, (audioLevel + this.spectralEnergy) * speechActivityRef.current * 0.8));

        // Trigger explode mode based on audio level (normal speech)
        if (audioLevel > 0.05 || speechActivityRef.current > 0.5) {
          particleModeRef.current = 'explode';
        } else if (particleModeRef.current === 'explode') {
          particleModeRef.current = 'circle'; // Revert to circle when no speech
        }

        if (particleModeRef.current === 'explode') {
          // Strong vibration: random quick jumps + outward push
          const dx = this.x - centerX;
          const dy = this.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Push outward with velocity based on energy
          this.vx += (dx / dist) * this.energy * 5 + (Math.random() - 0.5) * 5;
          this.vy += (dy / dist) * this.energy * 5 + (Math.random() - 0.5) * 5;

          // Damping for velocity
          this.vx *= 0.95;
          this.vy *= 0.95;

          // Update positions
          this.x += this.vx;
          this.y += this.vy;

          return;
        }

        // Normal circle mode behavior
        const vibrationStrength = this.energy * 10;
        this.angle += this.energy * 0.2;
        const dynamicRadius = baseRadius + Math.sin(time * 0.002 + this.pulseOffset) * 10;
        this.targetX = centerX + Math.cos(this.angle) * dynamicRadius;
        this.targetY = centerY + Math.sin(this.angle) * dynamicRadius;

        if (this.energy > 0.2) {
          this.x += (Math.random() - 0.5) * vibrationStrength;
          this.y += (Math.random() - 0.5) * vibrationStrength;
        }

        // Spring physics toward target
        const spring = 0.08 + this.energy * 0.04 + this.spectralEnergy * 0.03;
        const damping = 0.85;

        this.vx += (this.targetX - this.x) * spring;
        this.vy += (this.targetY - this.y) * spring;

        this.vx *= damping;
        this.vy *= damping;

        if (!isFinite(this.vx)) this.vx = 0;
        if (!isFinite(this.vy)) this.vy = 0;

        this.x += this.vx;
        this.y += this.vy;

        if (!isFinite(this.x)) this.x = centerX;
        if (!isFinite(this.y)) this.y = centerY;
      }
      
      draw(ctx, time) {
        // Size with frequency response
        const baseSize = this.baseSize + this.energy * 4 + this.spectralEnergy * 3;
        const size = Math.max(0.5, baseSize + Math.sin(time * 0.005 + this.pulseOffset) * 0.5);
        const alpha = Math.min(1, Math.max(0.1, 0.6 + this.energy * 0.4 + this.spectralEnergy * 0.3 + Math.sin(this.life) * 0.1));
        
        // Validate coordinates are finite
        if (!isFinite(this.x) || !isFinite(this.y) || !isFinite(size)) {
          return; // Skip drawing if values are invalid
        }
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Create radial gradient for glow effect with validated parameters
        const gradientRadius = Math.max(1, size * 3);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, gradientRadius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.3, this.color + '80'); // Semi-transparent
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, size * 2), 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Extra glow for high frequency energy
        if ((this.energy > 0.3 || this.spectralEnergy > 0.4) && isFinite(size)) {
          ctx.globalAlpha = Math.min(1, (this.energy + this.spectralEnergy) * 0.3);
          ctx.shadowColor = this.color;
          ctx.shadowBlur = Math.max(1, size * 4);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, Math.max(0.5, size * 0.5), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = 300;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(i));
      }
    };

    // Animation loop with smooth rendering
    const animate = (time) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Subtle background with trailing effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(time);
        particle.draw(ctx, time);
      });
      
      // Draw connections for high speech activity
      if (speechActivityRef.current > 0.5) {
        ctx.strokeStyle = `rgba(138, 43, 226, ${speechActivityRef.current * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = speechActivityRef.current * 0.3;
        
        for (let i = 0; i < particlesRef.current.length; i += 4) {
          for (let j = i + 4; j < particlesRef.current.length; j += 4) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      }
      
      // Smooth decay of speech activity
      speechActivityRef.current *= 0.96;
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioLevel]);

  // Enhanced audio analysis for spectrum data
  const setupAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const microphone = audioContextRef.current.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      frequencyDataRef.current = new Uint8Array(bufferLength);
      
      microphone.connect(analyserRef.current);
      
      const analyzeAudio = () => {
        if (!analyserRef.current) return;
        
        analyserRef.current.getByteFrequencyData(frequencyDataRef.current);
        
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += frequencyDataRef.current[i];
        }
        const level = sum / (bufferLength * 255);
        setAudioLevel(level);
        
        if (level > 0.05) { // Lower threshold for normal speech
          speechActivityRef.current = Math.min(speechActivityRef.current + 0.15, 1);
        } else {
          speechActivityRef.current *= 0.96; // Decay when no speech
        }
        
        if (isListening) {
          requestAnimationFrame(analyzeAudio);
        }
      };
      analyzeAudio();
      
    } catch (err) {
      console.log('Audio access denied:', err);
    }
  };

  // Speech recognition setup
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setupAudioAnalysis();
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        let text = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript(text);
        
        // Voice command detection (still allow specific commands)
        const lowerText = text.toLowerCase();
        if (lowerText.includes('calm')) {
          particleModeRef.current = 'calm';
        } else if (lowerText.includes('dance')) {
          particleModeRef.current = 'dance';
        } else if (lowerText.includes('reset')) {
          particleModeRef.current = 'circle';
          particlesRef.current.forEach(p => p.reset());
        }
        
        // Boost speech activity on any speech
        speechActivityRef.current = Math.max(speechActivityRef.current, 0.7);
      };

      recognitionRef.current.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
      };

      recognitionRef.current.start();
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const resetParticles = () => {
    setTranscript('Click start to begin speech recognition...');
    particleModeRef.current = 'circle';
    particlesRef.current.forEach(p => p.reset());
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ background: 'white' }}
          />
          
          {/* Status Indicator - Top Left */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            {isListening ? (
              <>
                <Mic className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Listening</span>
              </>
            ) : (
              <>
                <MicOff className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">Not listening</span>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar - Transcript */}
        <div className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col space-y-5">
          {/* Speech Transcript Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Speech Transcript</h3>
            <div className="h-40 bg-gray-50 border border-gray-300 rounded-lg p-3 overflow-y-auto text-sm text-gray-700 shadow-inner">
              {transcript || 'No speech detected yet.'}
            </div>
          </div>

          {/* Upload Prescription Section */}
          <div>
            <h6 className="text-lg text-center font-semibold text-gray-800 mb-2">Upload Prescription (optional)</h6>
            
            <label className="w-full text-center  flex items-center justify-center px-4 py-3 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-all duration-300">
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden "
                
              />
              Click to upload a file
            </label>

            {/* Optional: You can show processing or result below */}
            
          </div>
        </div>
      </div>

      {/* Control Panel - Segmented Control Style */}
      <div className=" from-slate-800 via-slate-900 to-slate-800 border-slate-700 flex-shrink-0">
        <div className="px-8 py-16">
          
          {/* Segmented Button Control */}
          <div className="flex pl-60" >
            <div className="inline-flex  p-1">
              {/* Stop Button - Left */}
              <button 
                onClick={stopListening}
                disabled={!isListening}
                className={`group relative flex items-center justify-center px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  !isListening && recognitionRef.current === null
                    ? 'text-slate-700 shadow-md' 
                    : 'text-slate-600 hover:text-slate-800 '
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Square className="w-5 h-5 mr-2" />
                <span>Stop</span>
              </button>
              
              {/* Start Button - Center */}
              <button 
                onClick={startListening}
                disabled={isListening}
                className={`group relative flex items-center justify-center px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  isListening
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : !recognitionRef.current 
                    ? 'bg-white text-slate-700 shadow-md'
                    : 'text-slate-600 hover:text-slate-800 '
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Play className="w-5 h-5 mr-2" />
                <span>Start</span>
                {isListening && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                )}
              </button>
              
              {/* Reset Button - Right */}
              <button 
                onClick={resetParticles}
                className="group relative flex items-center justify-center px-8 py-3 rounded-full font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="flex justify-center mt-6">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticleCircle;