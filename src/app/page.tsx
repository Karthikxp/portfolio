'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export default function Home() {
  const [showHoverImage, setShowHoverImage] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });

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

  const handlePitbullHover = useCallback(() => {
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
          fontSize: '12.45px'
        }}
      >
        UI/UX designer, cybersecurity analyst, and full-stack developer—bridging aesthetics, security, and functionality. I design intuitive interfaces, build scalable software, and<br/>
        secure digital ecosystems. Always learning, always building.
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
        href="https://www.instagram.com/_.karthik_._/"
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

      {/* Sof. Projects Title */}
      <div 
        className="absolute text-black"
        style={{
          left: '110px',
          top: '840px',
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
          top: '846px'
        }}
      >
        T
      </div>

      {/* Project Description */}
      <div 
        className="absolute text-black dongle-font"
        style={{
          left: '108px',
          top: '987px',
          width: '630px',
          height: '36px',
          fontSize: '12.45px'
        }}
      >
        "Simplicity isn't about the lack of complexity—it's about making complexity effortless. Clean design, efficient code, and intuitive experiences define my approach. If it doesn't add value, it doesn't belong."
      </div>

      {/* Blurred Black Rectangle (Shadow/Depth) */}
      <div 
        className="absolute [filter:blur(16.9px)] rounded-[5.68px] bg-black h-[196px]"
        style={{
          left: '940px',
          top: '888px',
          width: '196px'
        }}
      />

      {/* N.Pitbull Interactive Section */}
      <div 
        className="absolute"
        style={{
          left: '940px',
          top: '880px',
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
          top: '1059px'
        }}
      >
        T
      </div>

      {/* CLONED SECTION - Starting at 1423px */}
      
      {/* Sof. Projects Title - Clone */}
      <div 
        className="absolute text-black"
        style={{
          left: '110px',
          top: '1423px',
          width: '153px',
          height: '25px',
          fontSize: '22.28px',
          fontFamily: 'Dirtyline, sans-serif'
        }}
      >
        Principles
      </div>

      {/* Rotated T - Clone */}
      <div 
        className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
        style={{
          left: '372px',
          top: '1429px'
        }}
      >
        T
      </div>

      {/* Project Description - Clone */}
      <div 
        className="absolute text-black dongle-font"
        style={{
          left: '108px',
          top: '1570px',
          width: '630px',
          height: '36px',
          fontSize: '12.45px'
        }}
      >
        "Simplicity isn't about the lack of complexity—it's about making complexity effortless. Clean design, efficient code, and intuitive experiences define my approach. If it doesn't add value, it doesn't belong."
      </div>

      {/* Black Rectangle - Clone */}
      <div 
        className="absolute rounded-[5.68px] border-black border-solid border-[1px] box-border h-[196px]"
        style={{
          left: '940px',
          top: '1463px',
          width: '196px'
        }}
      />

      {/* N.Pitbull Text - Clone */}
      <div 
        className="absolute text-white"
        style={{
          left: '990px',
          top: '1549px',
          width: '97px',
          fontSize: '22px',
          fontFamily: 'Dirtyline, sans-serif',
          color: '#000000'
        }}
      >
        Simplicity
      </div>

      {/* Second Rotated T - Clone */}
      <div 
        className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
        style={{
          left: '1340px',
          top: '1642px'
        }}
      >
        T
      </div>

      {/* EVOLVE Text */}
      <div 
        className="absolute text-black bubbler-one-font text-left"
        style={{
          left: '50%',
          top: '1977px',
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
          top: '2144px',
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
          top: '2285px',
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
          top: '2278px',
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
          top: '2398px'
        }}
      >
        T
      </div>

            {/* Learning Quote Text */}
      <div 
        className="absolute text-black bubbler-one-font text-left"
        style={{
          left: '50%',
          top: '2398px',
          width: '600px',
          fontSize: '12px',
          letterSpacing: '0.13em',
          height: '14px',
          transform: 'translateX(-50%)'
        }}
      >
        The truly wise never stop learning, as knowledge itself keeps evolving like an endless treasure.
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
        Designed & Developed by Karthik 
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
    </main>
  );
}
