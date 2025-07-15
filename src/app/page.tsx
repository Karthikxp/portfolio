'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSpotify } from '../hooks/useSpotify';

export default function Home() {
  const [showHoverImage, setShowHoverImage] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });

  // State for Karthik hover effect
  const [showKarthikImage, setShowKarthikImage] = useState(false);
  const [karthikCursorPosition, setKarthikCursorPosition] = useState({ x: 0, y: 0 });
  const [karthikOpacity, setKarthikOpacity] = useState(0);
  const [karthikScale, setKarthikScale] = useState(0.5);
  const karthikTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const karthikRequestRef = useRef<number | null>(null);
  const karthikPrevCursorPosition = useRef({ x: 0, y: 0 });

  // Spotify integration
  const { track, loading } = useSpotify();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;

    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };

    if (showHoverImage) {
      window.addEventListener('mousemove', updateCursorPosition);
    }

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove, showHoverImage]);

  // Karthik hover handlers
  const handleKarthikMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - karthikPrevCursorPosition.current.x;
    const dy = clientY - karthikPrevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = karthikPrevCursorPosition.current.x + dx * easeAmount;
    const newY = karthikPrevCursorPosition.current.y + dy * easeAmount;

    setKarthikCursorPosition({ x: newX, y: newY });
    karthikPrevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateKarthikCursorPosition = (e: MouseEvent) => {
      if (karthikRequestRef.current) return;
      karthikRequestRef.current = requestAnimationFrame(() => {
        handleKarthikMouseMove(e);
        karthikRequestRef.current = null;
      });
    };

    if (showKarthikImage) {
      window.addEventListener('mousemove', updateKarthikCursorPosition);
    }

    return () => {
      window.removeEventListener('mousemove', updateKarthikCursorPosition);
      if (karthikRequestRef.current) cancelAnimationFrame(karthikRequestRef.current);
    };
  }, [handleKarthikMouseMove, showKarthikImage]);

  const handlePitbullHover = useCallback((e: React.MouseEvent) => {
    // Initialize cursor position
    const { clientX, clientY } = e;
    setCursorPosition({ x: clientX, y: clientY });
    prevCursorPosition.current = { x: clientX, y: clientY };
    
    setShowHoverImage(true);
    document.body.style.cursor = 'none'; // Hide cursor
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 50);
  }, []);

  const handlePitbullLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    document.body.style.cursor = 'auto'; // Restore cursor
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowHoverImage(false);
    }, 100);
  }, []);

  const handleKarthikHover = useCallback((e: React.MouseEvent) => {
    // Initialize cursor position
    const { clientX, clientY } = e;
    setKarthikCursorPosition({ x: clientX, y: clientY });
    karthikPrevCursorPosition.current = { x: clientX, y: clientY };
    
    setShowKarthikImage(true);
    document.body.style.cursor = 'none'; // Hide cursor
    if (karthikTimeoutRef.current) clearTimeout(karthikTimeoutRef.current);
    karthikTimeoutRef.current = setTimeout(() => {
      setKarthikOpacity(1);
      setKarthikScale(1);
    }, 50);
  }, []);

  const handleKarthikLeave = useCallback(() => {
    setKarthikOpacity(0);
    setKarthikScale(0.5);
    document.body.style.cursor = 'auto'; // Restore cursor
    if (karthikTimeoutRef.current) clearTimeout(karthikTimeoutRef.current);
    karthikTimeoutRef.current = setTimeout(() => {
      setShowKarthikImage(false);
    }, 100);
  }, []);

  return (
    <main className="min-h-screen relative">
      <div 
        className="absolute text-black"
        style={{
          left: '110px',
          top: '150px',
          width: '101px',
          fontSize: '22.28px',
          fontFamily: 'Dirtyline, sans-serif'
        }}
      >
        Karthik M
      </div>
      
      <div 
        className="absolute text-black dongle-font"
        style={{
          left: '110px',
          top: '271px',
          fontSize: '17.45px'
        }}
      >
        UI/UX designer, cybersecurity analyst, and full-stack developer—bridging aesthetics, security, and functionality. I design <br/>
        intuitive interfaces, build scalable software, and secure digital ecosystems. Always learning, always building.
      </div>

      {/* GitHub Icon */}
      <a 
        href="https://github.com/Karthikxp"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute"
        style={{
          left: '108px',
          top: '411px'
        }}
      >
        <img 
          src="/github.png" 
          alt="GitHub"
          style={{
            width: '25px',
            height: '25px'
          }}
        />
      </a>

      {/* LinkedIn Button */}
      <a
        href="https://www.linkedin.com/in/karthik-manikandan-6a111825b/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute"
        style={{
          left: '217px',
          top: '415px',
          width: '21px',
          height: '21px'
        }}
      >
        <div 
          className="absolute top-0 left-0 rounded-md w-[21px] h-[21px]"
          style={{ backgroundColor: '#e6e6e6' }}
        />
        <div 
          className="absolute top-[2px] left-[4px] text-black days-one-font"
          style={{
            fontSize: '13px'
          }}
        >
          In
        </div>
      </a>

      {/* Email Button */}
      <a
        href="mailto:karthik.manikandanmk@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute"
        style={{
          left: '325px',
          top: '415px',
          width: '21px',
          height: '21px'
        }}
      >
        <div 
          className="absolute top-0 left-0 rounded-md w-[21px] h-[21px]"
          style={{ backgroundColor: '#e6e6e6' }}
        />
        <div 
          className="absolute top-[2px] left-[4px] text-black days-one-font"
          style={{
            fontSize: '13px'
          }}
        >
          @
        </div>
      </a>

      {/* Spotify Card */}
      <img 
        src="/spoticard.png" 
        alt="Spotify Card"
        className="absolute"
        style={{
          left: '940px',
          top: '113px',
          width: '254px',
          height: '346px'
        }}
      />
      <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '1340px',
            top: '415px'
          }}
        >
          T
        </div>


      {/* Spotify Now Playing */}
      <div 
        className="absolute text-white text-left"
        style={{
          left: '957px',
          top: '390px',
          width: '200px',
          fontSize: '11.7px',
          letterSpacing: '0.13em',
          fontFamily: 'CFChristmasStitch, sans-serif'
        }}
      >
        {loading ? (
          'Loading...'
        ) : track ? (
          `${track.title}.${track.artist}`
        ) : (
          'Nenjukkule.AR Rahman'
        )}
      </div>

      {/* Software Projects Card */}
      <div className="absolute" style={{ left: '0px', top: '840px', width: '100%', height: '300px' }}>
        {/* Sof. Projects Title */}
        <div 
          className="absolute text-black"
          style={{
            left: '110px',
            top: '0px',
            width: '153px',
            height: '25px',
            fontSize: '22.28px',
            fontFamily: 'Dirtyline, sans-serif'
          }}
        >
          Sof. Projects
        </div>

        {/* Rotated T */}
        <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '372px',
            top: '6px'
          }}
        >
          T
        </div>

        {/* Project Description */}
        <div 
          className="absolute text-black dongle-font"
          style={{
            left: '108px',
            top: '147px',
            width: '630px',
            height: '36px',
            fontSize: '17px'
          }}
        >
          "Simplicity isn't about the lack of complexity—it's about making complexity effortless. Clean design, efficient code, and intuitive experiences define my approach. If it doesn't add value, it doesn't belong."
        </div>

        {/* Blurred Black Rectangle (Shadow/Depth) */}
        <div 
          className="absolute [filter:blur(16.9px)] rounded-[5.68px] bg-black h-[196px]"
          style={{
            left: '940px',
            top: '48px',
            width: '196px'
          }}
        />

        {/* N.Pitbull Interactive Section */}
        <div 
          className="absolute"
          style={{
            left: '940px',
            top: '40px',
            width: '196px',
            height: '196px',
            cursor: 'none'
          }}
          onMouseEnter={handlePitbullHover}
          onMouseLeave={handlePitbullLeave}
          onClick={() => window.open('https://github.com/Karthikxp/Sidemen', '_blank')}
        >
          {/* Black Rectangle */}
          <div 
            className="absolute rounded-[5.68px] bg-black h-[196px] w-[196px] transition-all duration-300 hover:scale-105"
          />

          {/* N.Pitbull Text */}
          <div 
            className="absolute text-white pointer-events-none"
            style={{
              left: '50px',
              top: '86px',
              width: '97px',
              fontSize: '22px',
              fontFamily: 'Dirtyline, sans-serif'
            }}
          >
            Sidemen
          </div>
        </div>

        {/* Second Rotated T */}
        <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '1340px',
            top: '219px'
          }}
        >
          T
        </div>
      </div>

      {/* Principles Card */}
      <div className="absolute" style={{ left: '0px', top: '1423px', width: '100%', height: '300px' }}>
        {/* Principles Title */}
        <div 
          className="absolute text-black"
          style={{
            left: '110px',
            top: '0px',
            width: '153px',
            height: '25px',
            fontSize: '22.28px',
            fontFamily: 'Dirtyline, sans-serif'
          }}
        >
          Principles
        </div>

        {/* Rotated T */}
        <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '372px',
            top: '6px'
          }}
        >
          T
        </div>

        {/* Project Description */}
        <div 
          className="absolute text-black dongle-font"
          style={{
            left: '108px',
            top: '147px',
            width: '630px',
            height: '36px',
            fontSize: '17px'
          }}
        >
          "Simplicity isn't about the lack of complexity—it's about making complexity effortless. Clean design, efficient code, and intuitive experiences define my approach. If it doesn't add value, it doesn't belong."
        </div>

        {/* Black Rectangle */}
        <div 
          className="absolute rounded-[5.68px] border-black border-solid border-[1px] box-border h-[196px]"
          style={{
            left: '940px',
            top: '40px',
            width: '196px'
          }}
        />

        {/* Simplicity Text */}
        <div 
          className="absolute text-white"
          style={{
            left: '990px',
            top: '126px',
            width: '97px',
            fontSize: '22px',
            fontFamily: 'Dirtyline, sans-serif',
            color: '#000000'
          }}
        >
          Simplicity
        </div>

        {/* Second Rotated T */}
        <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '1340px',
            top: '219px'
          }}
        >
          T
        </div>
      </div>

      {/* Philosophy Card */}
      <div className="absolute" style={{ left: '0px', top: '1977px', width: '100%', height: '450px' }}>
        {/* EVOLVE Text */}
        <div 
          className="absolute text-black bubbler-one-font text-left"
          style={{
            left: '50%',
            top: '0px',
            width: '588px',
            fontSize: '22.28px',
            letterSpacing: '4.74em',
            transform: 'translateX(-50%)'
          }}
        >
          EVOLVE
        </div>

        {/* Tamil Text */}
        <div 
          className="absolute text-black bubbler-one-font text-center"
          style={{
            left: '50%',
            top: '167px',
            width: '323px',
            fontSize: '12px',
            letterSpacing: '0.13em',
            transform: 'translateX(-50%)'
          }}
        >
          <p className="m-0">ஒளிவல்ல செய்யலால் கல்விவல்லார் கற்றல்</p>
          <p className="m-0">களிவல்ல மற்று நிலைத்து.</p>
        </div>

        {/* Edify Text */}
        <div 
          className="absolute text-black text-left"
          style={{
            left: '110px',
            top: '308px',
            width: '54px',
            fontSize: '22.28px',
            fontFamily: 'Dirtyline, sans-serif'
          }}
        >
          Edify
        </div>

        {/* Ver. 396 Text */}
        <div 
          className="absolute text-black bubbler-one-font text-left"
          style={{
            left: '1126px',
            top: '301px',
            width: '70px',
            fontSize: '12px',
            letterSpacing: '0.13em'
          }}
        >
          ver. 396
        </div>

        {/* Rotated T below ver. 396 */}
        <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '1340px',
            top: '421px'
          }}
        >
          T
        </div>

        {/* Learning Quote Text */}
        <div 
          className="absolute text-black bubbler-one-font text-left"
          style={{
            left: '50%',
            top: '421px',
            width: '600px',
            fontSize: '12px',
            letterSpacing: '0.13em',
            height: '14px',
            transform: 'translateX(-50%)'
          }}
        >
          The truly wise never stop learning, as knowledge itself keeps evolving like an endless treasure.
        </div>
      </div>

      {/* Designed & Developed by Karthik */}
      <div 
        className="absolute text-black bubbler-one-font text-left"
        style={{
          left: '50%',
          top: '2817px',
          width: '161px',
          fontSize: '10px',
          letterSpacing: '0.13em',
          transform: 'translateX(-50%)'
        }}
      >
        Designed & Developed by{' '}
        <span 
          className="cursor-pointer hover:underline"
          onMouseEnter={handleKarthikHover}
          onMouseLeave={handleKarthikLeave}
        >
          Karthik
        </span>
      </div>

      {/* Floating Image on N.Pitbull Hover */}
      {showHoverImage && (
        <img
          src="/m-sec.png"
          alt="M-Sec Security"
          className="fixed object-cover pointer-events-none z-50 rounded-lg shadow-2xl"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity: opacity,
            width: '300px',
            height: '400px',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}
        />
      )}

      {/* Floating Image on Karthik Hover */}
      {showKarthikImage && (
        <img
          src="/eggy.png"
          alt="Eggy"
          className="fixed object-cover pointer-events-none z-50 rounded-lg shadow-2xl"
          style={{
            left: `${karthikCursorPosition.x}px`,
            top: `${karthikCursorPosition.y}px`,
            transform: `translate(-50%, -100%) scale(${karthikScale})`,
            opacity: karthikOpacity,
            width: '300px',
            height: '400px',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}
        />
      )}
    </main>
  );
}
