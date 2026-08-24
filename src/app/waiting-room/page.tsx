'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  waitingRoomPrompts, 
  partsDescriptions, 
  scavengerHuntPrompts, 
  scavengerHuntFeedback, 
  cloudShapes 
} from '@/data/db';
import styles from './page.module.css';

export default function WaitingRoom() {
  const [activeTab, setActiveTab] = useState<'doodle' | 'parts' | 'sound' | 'scavenger' | 'cloud'>('doodle');

  // DOODLE CANVAS STATE
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#df8572');
  const [lineWidth, setLineWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [doodleCompleted, setDoodleCompleted] = useState(false);
  const [reflectiveLine, setReflectiveLine] = useState('');
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);

  // PARTS EXPLORER STATE
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // SOUND CORNER STATE
  const [rainPlaying, setRainPlaying] = useState(false);
  const [oceanPlaying, setOceanPlaying] = useState(false);
  const [breatheState, setBreatheState] = useState<'breathe-in' | 'hold' | 'breathe-out' | 'hold-out'>('breathe-in');
  const audioContextRef = useRef<AudioContext | null>(null);
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const oceanSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const oceanGainRef = useRef<GainNode | null>(null);

  // SCAVENGER HUNT STATE
  const [huntIndex, setHuntIndex] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [huntsCompleted, setHuntsCompleted] = useState(false);

  // CLOUD WATCHER STATE
  const [clouds, setClouds] = useState<{ id: number; top: number; speed: number; delay: number; morphed: boolean; emoji?: string; label?: string }[]>([]);

  // Initialize Clouds
  useEffect(() => {
    const list = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: 50 + i * 80 + Math.random() * 20,
      speed: 15 + Math.random() * 10,
      delay: i * -5,
      morphed: false
    }));
    setClouds(list);
  }, []);

  // Breathing metronome timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const breatheCycle = () => {
      setBreatheState('breathe-in');
      timer = setTimeout(() => {
        setBreatheState('hold');
        timer = setTimeout(() => {
          setBreatheState('breathe-out');
          timer = setTimeout(() => {
            setBreatheState('hold-out');
            timer = setTimeout(breatheCycle, 2000); // Hold out 2s
          }, 4000); // Exhale 4s
        }, 2000); // Hold 2s
      }, 4000); // Inhale 4s
    };
    breatheCycle();
    return () => clearTimeout(timer);
  }, []);

  // DOODLE FUNCTIONS
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    
    // Get correct coordinates
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    
    // Truncate history if we were in the middle of undo chain
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    }
    
    historyRef.current.push(dataUrl);
    historyIndexRef.current = historyRef.current.length - 1;
  };

  const handleUndo = () => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    restoreState();
  };

  const restoreState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new window.Image();
    img.src = historyRef.current[historyIndexRef.current];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDoodleCompleted(false);
    setReflectiveLine('');
    saveState();
  };

  const handleDoodleDone = () => {
    if (doodleCompleted) return;
    setDoodleCompleted(true);
    const randomIndex = Math.floor(Math.random() * waitingRoomPrompts.length);
    setReflectiveLine(waitingRoomPrompts[randomIndex]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'ankahee-doodle.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // Adjust canvas resolution on mount
  useEffect(() => {
    if (activeTab === 'doodle' && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 450;
      saveState();
    }
  }, [activeTab]);

  // WEB AUDIO API SYNTHESIS
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Generate White Noise Buffer
  const createNoiseBuffer = (ctx: AudioContext, seconds = 2) => {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  const toggleRain = () => {
    const ctx = getAudioContext();
    if (rainPlaying) {
      if (rainSourceRef.current) {
        rainSourceRef.current.stop();
        rainSourceRef.current = null;
      }
      setRainPlaying(false);
    } else {
      // Create noise source
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = createNoiseBuffer(ctx, 4);
      noiseSource.loop = true;

      // Filter noise (Lowpass to make it sound like rain/wind)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1000;

      // Gain (Volume) control
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.15;

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseSource.start();
      rainSourceRef.current = noiseSource;
      rainGainRef.current = gainNode;
      setRainPlaying(true);
    }
  };

  const toggleOcean = () => {
    const ctx = getAudioContext();
    if (oceanPlaying) {
      if (oceanSourceRef.current) {
        oceanSourceRef.current.stop();
        oceanSourceRef.current = null;
      }
      setOceanPlaying(false);
    } else {
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = createNoiseBuffer(ctx, 6);
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 400;
      filter.Q.value = 1.0;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Automated Wave Crashing (Low-frequency oscillation simulation)
      const waveCycle = () => {
        if (!oceanSourceRef.current) return;
        const now = ctx.currentTime;
        // Ascending wave
        gainNode.gain.linearRampToValueAtTime(0.12, now + 3);
        filter.frequency.linearRampToValueAtTime(600, now + 3);
        // Descending wave
        gainNode.gain.linearRampToValueAtTime(0.02, now + 7);
        filter.frequency.linearRampToValueAtTime(250, now + 7);
        
        setTimeout(waveCycle, 7000);
      };

      noiseSource.start();
      oceanSourceRef.current = noiseSource;
      oceanGainRef.current = gainNode;
      setOceanPlaying(true);
      waveCycle();
    }
  };

  // Stop sound on unmount
  useEffect(() => {
    return () => {
      if (rainSourceRef.current) rainSourceRef.current.stop();
      if (oceanSourceRef.current) oceanSourceRef.current.stop();
    };
  }, []);

  // SCAVENGER HUNT FUNCTIONS
  const handleHuntItemFound = () => {
    const randomFeedback = scavengerHuntFeedback[Math.floor(Math.random() * scavengerHuntFeedback.length)];
    setFeedbackText(randomFeedback);
    
    setTimeout(() => {
      setFeedbackText('');
      if (huntIndex < scavengerHuntPrompts.length - 1) {
        setHuntIndex(prev => prev + 1);
      } else {
        setHuntsCompleted(true);
      }
    }, 2500);
  };

  const resetHunt = () => {
    setHuntIndex(0);
    setFeedbackText('');
    setHuntsCompleted(false);
  };

  // CLOUD WATCHER FUNCTIONS
  const handleCloudClick = (id: number) => {
    setClouds(prev => prev.map(c => {
      if (c.id === id && !c.morphed) {
        const randomShape = cloudShapes[Math.floor(Math.random() * cloudShapes.length)];
        return {
          ...c,
          morphed: true,
          emoji: randomShape.emoji,
          label: randomShape.name
        };
      }
      return c;
    }));
  };

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.intro}>
        <h1 className={styles.title}>The Waiting Room</h1>
        <p className={styles.subtitle}>
          A quiet space to catch your breath. No rush, no expectation. Stay as long as you need, try anything that feels supportive, or simply pause.
        </p>
      </section>

      {/* Tabs Menu */}
      <div className={styles.tabsNav}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'doodle' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('doodle')}
        >
          🎨 Doodle Canvas
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'parts' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('parts')}
        >
          💭 Which Part is Here?
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'sound' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('sound')}
        >
          🎵 Sound & Breathe
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'scavenger' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('scavenger')}
        >
          🔍 Tiny Groundings
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'cloud' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('cloud')}
        >
          ☁️ Cloud Watcher
        </button>
      </div>

      {/* Interactive Content Panel */}
      <section className={styles.tabContent}>
        
        {/* DOODLE TAB */}
        {activeTab === 'doodle' && (
          <div className={styles.doodleContainer}>
            <div className={styles.canvasWrapper}>
              <canvas 
                ref={canvasRef}
                className={styles.canvas}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
            <div className={styles.doodleControls}>
              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Colors</span>
                <div className={styles.colorPalette}>
                  {['#df8572', '#e9a94c', '#9890ba', '#769397', '#a1ac98', '#2d2b2a'].map((c) => (
                    <button 
                      key={c}
                      className={`${styles.colorBtn} ${color === c ? styles.activeColor : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Pen Size</span>
                <input 
                  type="range" 
                  min="2" 
                  max="20" 
                  value={lineWidth} 
                  onChange={(e) => setLineWidth(Number(e.target.value))} 
                />
              </div>

              <div className={styles.toolButtons}>
                <button className={styles.actionBtn} onClick={handleUndo}>Undo</button>
                <button className={styles.actionBtn} onClick={handleClear}>Clear</button>
              </div>

              {doodleCompleted && (
                <div className={styles.reflectiveBox}>
                  {reflectiveLine}
                </div>
              )}

              <button 
                className={styles.doneBtn} 
                onClick={doodleCompleted ? handleDownload : handleDoodleDone}
              >
                {doodleCompleted ? 'Download Doodle' : 'Mark as Done'}
              </button>
            </div>
          </div>
        )}

        {/* PARTS EXPLORER */}
        {activeTab === 'parts' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              Which part showed up with you today?
            </h2>
            <div className={styles.partsGrid}>
              {Object.keys(partsDescriptions).map((key) => (
                <div 
                  key={key} 
                  className={`${styles.partCard} ${selectedPart === key ? styles.activePartCard : ''}`}
                  onClick={() => setSelectedPart(key)}
                >
                  {partsDescriptions[key].title}
                </div>
              ))}
            </div>
            {selectedPart && (
              <div className={styles.partDetails}>
                <h3 className={styles.partDetailsTitle}>
                  {partsDescriptions[selectedPart].title}
                </h3>
                <p style={{ color: '#4c463f', lineHeight: 1.6 }}>
                  {partsDescriptions[selectedPart].desc}
                </p>
              </div>
            )}
          </div>
        )}

        {/* SOUND CORNER & BREATHING metronome */}
        {activeTab === 'sound' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className={styles.soundGrid}>
              <div className={styles.soundCard}>
                <span style={{ fontSize: '3rem' }}>🌧️</span>
                <h3 className={styles.soundTitle}>Natively Synthesized Rain</h3>
                <p style={{ fontSize: '0.85rem', color: '#6d665b' }}>Soft brownian noise filters</p>
                <button 
                  className={`${styles.playBtn} ${rainPlaying ? styles.isPlaying : ''}`}
                  onClick={toggleRain}
                >
                  {rainPlaying ? '⏸' : '▶'}
                </button>
              </div>

              <div className={styles.soundCard}>
                <span style={{ fontSize: '3rem' }}>🌊</span>
                <h3 className={styles.soundTitle}>Ocean Wave Synthesis</h3>
                <p style={{ fontSize: '0.85rem', color: '#6d665b' }}>Low-frequency oscillating waves</p>
                <button 
                  className={`${styles.playBtn} ${oceanPlaying ? styles.isPlaying : ''}`}
                  onClick={toggleOcean}
                >
                  {oceanPlaying ? '⏸' : '▶'}
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Grounding Breath Guide</h3>
              <div className={`${styles.breathingCircle} ${
                breatheState === 'breathe-in' ? styles.breatheIn : ''
              }`}>
                {breatheState === 'breathe-in' && 'Inhale'}
                {breatheState === 'hold' && 'Hold'}
                {breatheState === 'breathe-out' && 'Exhale'}
                {breatheState === 'hold-out' && 'Rest'}
              </div>
            </div>
          </div>
        )}

        {/* SCAVENGER HUNT */}
        {activeTab === 'scavenger' && (
          <div className={styles.huntContainer}>
            <h2 style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '1rem' }}>
              Ground yourself by looking around...
            </h2>
            
            {!huntsCompleted ? (
              <div className={styles.huntCard}>
                <span className={styles.huntText}>
                  {scavengerHuntPrompts[huntIndex]}
                </span>
                <button 
                  className={styles.foundBtn}
                  onClick={handleHuntItemFound}
                  disabled={feedbackText !== ''}
                >
                  Found It
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>You\'ve completed the scavenger hunt!</h3>
                <p>Tiny moments count too. Take a deep breath and reconnect with your environment.</p>
                <button className={styles.foundBtn} style={{ alignSelf: 'center' }} onClick={resetHunt}>
                  Start Again
                </button>
              </div>
            )}

            {feedbackText && (
              <div className={styles.huntFeedback}>
                {feedbackText}
              </div>
            )}
          </div>
        )}

        {/* CLOUD WATCHER */}
        {activeTab === 'cloud' && (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Slowly moving clouds. Click one to see what it morphs into.
            </h3>
            <div className={styles.cloudSky}>
              {clouds.map((cloud) => (
                <div 
                  key={cloud.id}
                  className={styles.cloud}
                  style={{
                    top: `${cloud.top}px`,
                    animationDelay: `${cloud.delay}s`,
                    animationDuration: `${cloud.speed}s`
                  }}
                  onClick={() => handleCloudClick(cloud.id)}
                >
                  {!cloud.morphed ? (
                    <div className={styles.cloudBody}>
                      Ankahee Cloud
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className={styles.morphedEmoji}>{cloud.emoji}</span>
                      <span className={styles.morphedLabel}>{cloud.label}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}
