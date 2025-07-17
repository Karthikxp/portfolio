'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { HyperText } from "@/components/magicui/hyper-text";
import TiltedCard from "@/components/TiltedCard";

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

  // State for Sentnl hover effect
  const [showSentnlImage, setShowSentnlImage] = useState(false);
  const [sentnlCursorPosition, setSentnlCursorPosition] = useState({ x: 0, y: 0 });
  const [sentnlOpacity, setSentnlOpacity] = useState(0);
  const [sentnlScale, setSentnlScale] = useState(0.5);
  const sentnlTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sentnlRequestRef = useRef<number | null>(null);
  const sentnlPrevCursorPosition = useRef({ x: 0, y: 0 });

  // State for Software Projects / Designs toggle
  const [isDesignMode, setIsDesignMode] = useState(false);

  // State for Design Card Collaboration tooltip
  const [showCollabTooltip, setShowCollabTooltip] = useState(false);
  const [collabTooltipPosition, setCollabTooltipPosition] = useState({ x: 0, y: 0 });

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

  // Sentnl hover handlers
  const handleSentnlMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - sentnlPrevCursorPosition.current.x;
    const dy = clientY - sentnlPrevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = sentnlPrevCursorPosition.current.x + dx * easeAmount;
    const newY = sentnlPrevCursorPosition.current.y + dy * easeAmount;

    setSentnlCursorPosition({ x: newX, y: newY });
    sentnlPrevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateSentnlCursorPosition = (e: MouseEvent) => {
      if (sentnlRequestRef.current) return;
      sentnlRequestRef.current = requestAnimationFrame(() => {
        handleSentnlMouseMove(e);
        sentnlRequestRef.current = null;
      });
    };

    if (showSentnlImage) {
      window.addEventListener('mousemove', updateSentnlCursorPosition);
    }

    return () => {
      window.removeEventListener('mousemove', updateSentnlCursorPosition);
      if (sentnlRequestRef.current) cancelAnimationFrame(sentnlRequestRef.current);
    };
  }, [handleSentnlMouseMove, showSentnlImage]);

  const handlePitbullHover = useCallback((e: React.MouseEvent) => {
    // Don't show popup in design mode
    if (isDesignMode) return;
    
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
  }, [isDesignMode]);

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

  const handleSentnlHover = useCallback((e: React.MouseEvent) => {
    // Initialize cursor position
    const { clientX, clientY } = e;
    setSentnlCursorPosition({ x: clientX, y: clientY });
    sentnlPrevCursorPosition.current = { x: clientX, y: clientY };
    
    setShowSentnlImage(true);
    document.body.style.cursor = 'none'; // Hide cursor
    if (sentnlTimeoutRef.current) clearTimeout(sentnlTimeoutRef.current);
    sentnlTimeoutRef.current = setTimeout(() => {
      setSentnlOpacity(1);
      setSentnlScale(1);
    }, 50);
  }, []);

  const handleSentnlLeave = useCallback(() => {
    setSentnlOpacity(0);
    setSentnlScale(0.5);
    document.body.style.cursor = 'auto'; // Restore cursor
    if (sentnlTimeoutRef.current) clearTimeout(sentnlTimeoutRef.current);
    sentnlTimeoutRef.current = setTimeout(() => {
      setShowSentnlImage(false);
    }, 100);
  }, []);

  // Design Card Collaboration handlers
  const handleDesignCardHover = useCallback((e: React.MouseEvent) => {
    if (!isDesignMode) return;
    
    const { clientX, clientY } = e;
    setCollabTooltipPosition({ x: clientX, y: clientY });
    setShowCollabTooltip(true);
  }, [isDesignMode]);

  const handleDesignCardMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDesignMode || !showCollabTooltip) return;
    
    const { clientX, clientY } = e;
    setCollabTooltipPosition({ x: clientX, y: clientY });
  }, [isDesignMode, showCollabTooltip]);

  const handleDesignCardLeave = useCallback(() => {
    setShowCollabTooltip(false);
  }, []);

  const handleCollabClick = useCallback(() => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=karthik.manikandanmk@gmail.com&su=Let's%20collaborate!`;
    window.open(gmailUrl, '_blank');
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

      <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '1340px',
            top: '415px'
          }}
        >
          T
        </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute w-[126px] h-[34px] rounded-[5px] cursor-pointer"
        style={{
          left: '50%',
          top: '75%',
          transform: 'translate(-50%, -50%)'
        }}
        onClick={() => {
          const targetPosition = 600;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1500; // 1.5 seconds for smoother scroll
          let start: number | null = null;

          function animation(currentTime: number) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          }

          function ease(t: number, b: number, c: number, d: number) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
          }

          requestAnimationFrame(animation);
        }}
      >
        <div className="w-[126px] h-[31px] left-0 top-[1px] absolute bg-black rounded-[5px] blur-[3.45px]" />
        <div className="w-[126px] h-[31px] left-0 top-[1px] absolute bg-black rounded-[5px]" />
        <div className="left-[70px] top-0 absolute origin-top-left rotate-90 justify-start text-white text-[11.11px] font-normal font-['Maddac']">=</div>
        <div className="left-[70px] top-[27px] absolute origin-top-left rotate-90 justify-start text-white text-[11.11px] font-normal font-['Maddac']">=</div>
        <div className="left-[50px] top-[9px] absolute justify-start text-white text-[11.11px] font-normal font-['Maddac']">SCROLL</div>
      </div>

      {/* Software Projects Card */}
      <div className="absolute" style={{ left: '0px', top: '840px', width: '100%', height: '300px' }}>
        {/* Sof. Projects Title */}
        <div 
          className="absolute text-black"
          style={{
            left: '110px',
            top: '0px',
            width: '250px',
            height: '25px',
            fontSize: '22.28px',
            fontFamily: 'Dirtyline, sans-serif',
            overflow: 'hidden'
          }}
        >
          <HyperText
            className="text-black !text-[22.28px] !font-normal !py-0 !whitespace-nowrap"
            style={{ 
              fontFamily: 'Dirtyline, sans-serif !important',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
            duration={800}
            animateOnHover={false}
            startOnView={false}
            key={isDesignMode ? 'designs' : 'projects'}
          >
            {isDesignMode ? 'Designs' : 'Sof. Projects'}
          </HyperText>
        </div>

        {/* Rotated T */}
        <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0] cursor-pointer hover:text-gray-600 transition-colors"
          style={{
            left: '372px',
            top: '6px'
          }}
          onClick={() => {
            console.log('T clicked! Current mode:', isDesignMode);
            setIsDesignMode(!isDesignMode);
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
            height: '54px',
            fontSize: '17px',
            lineHeight: '1.4',
            overflow: 'hidden'
          }}
        >
          {isDesignMode ? (
            <div>
              <HyperText
                className="text-black !text-[17px] !font-normal !py-0 dongle-font block"
                style={{ 
                  fontFamily: 'inherit',
                  overflow: 'hidden'
                }}
                duration={800}
                animateOnHover={false}
                startOnView={false}
                key="design-line1"
              >
                I design stuff — apps, sites, posters basically anything that needs to look good and make
              </HyperText>
              <HyperText
                className="text-black !text-[17px] !font-normal !py-0 dongle-font block"
                style={{ 
                  fontFamily: 'inherit',
                  overflow: 'hidden'
                }}
                duration={800}
                animateOnHover={false}
                startOnView={false}
                key="design-line2"
              >
                sense.
              </HyperText>
            </div>
          ) : (
            <div>
              <HyperText
                className="text-black !text-[17px] !font-normal !py-0 dongle-font block"
                style={{ 
                  fontFamily: 'inherit',
                  overflow: 'hidden'
                }}
                duration={800}
                animateOnHover={false}
                startOnView={false}
                key="projects-line1"
              >
                Embedded network server that monitors real-time IoT device activity with automatic threat detection and risk assessment. Authenticates users using blockchain contracts and handles potential security threats
              </HyperText>
              <HyperText
                className="text-black !text-[17px] !font-normal !py-0 dongle-font block"
                style={{ 
                  fontFamily: 'inherit',
                  overflow: 'hidden'
                }}
                duration={800}
                animateOnHover={false}
                startOnView={false}
                key="projects-line2"
              >
                Autonomously.
              </HyperText>
            </div>
          )}
        </div>

        <div 
          className={`absolute [filter:blur(16.9px)] rounded-[5.68px] bg-black h-[196px] transition-opacity duration-700 ease-in-out ${isDesignMode ? 'opacity-0' : 'opacity-100'}`}
          style={{
            left: '940px',
            top: '48px',
            width: '196px'
          }}
        />

        {/* Sidemen Interactive Section */}
        <div 
          className="absolute"
          style={{
            left: '940px',
            top: '40px',
            width: '196px',
            height: '196px',
            cursor: isDesignMode ? 'pointer' : 'none',
            perspective: '1000px'
          }}
          onMouseEnter={isDesignMode ? handleDesignCardHover : handlePitbullHover}
          onMouseLeave={isDesignMode ? handleDesignCardLeave : handlePitbullLeave}
          onMouseMove={isDesignMode ? handleDesignCardMouseMove : undefined}
          onClick={isDesignMode ? handleCollabClick : () => window.open('https://github.com/Karthikxp/Sidemen', '_blank')}
        >
          {/* Flip Container */}
          <div 
            className={`relative w-full h-full transition-transform duration-700 ${isDesignMode ? 'rotate-y-180' : ''}`}
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Front Face - Sidemen */}
            <div 
              className="absolute inset-0 backface-hidden"
              style={{
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Black Rectangle */}
              <div 
                className="absolute rounded-[5.68px] bg-black h-[196px] w-[196px] transition-all duration-300 hover:scale-105"
              />

              {/* Sidemen Text */}
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

            {/* Back Face - Design Template with Tilt Effect */}
            <div 
              className="absolute inset-0 rotate-y-180"
              style={{
                backfaceVisibility: 'hidden'
              }}
            >
              <TiltedCard
                imageSrc="/design-template.png"
                altText="Design Template"
                containerHeight="196px"
                containerWidth="196px"
                imageHeight="196px"
                imageWidth="196px"
                rotateAmplitude={18}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div 
                    className="absolute whitespace-nowrap overflow-hidden"
                    style={{
                      left: '-54.41px',
                      top: '18.14px',
                      width: '300px',
                      height: '30px'
                    }}
                  >
                    <div className="scrolling-text-container">
                      <div className="scrolling-text-content text-white text-[26.94px] font-normal font-['Dirtyline_36Daysoftype_2022']">
                        Graphic . App . Web . Poster&nbsp;&nbsp;&nbsp;. Graphic . App . Web . Poster .&nbsp;&nbsp;&nbsp; Graphic . App . Web . Poster &nbsp;&nbsp;&nbsp;
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
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
          Working on
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
          Developing a financial forecasting app that leverages live economic releases, debt indicators, income data, and market <br/>
          sentiment — fine-tuned with historical data — to predict daily market trends.
        </div>

        {/* Sentnl Interactive Section */}
        <div 
          className="absolute"
          style={{
            left: '940px',
            top: '40px',
            width: '196px',
            height: '196px',
            cursor: 'none'
          }}
          onMouseEnter={handleSentnlHover}
          onMouseLeave={handleSentnlLeave}
          onClick={() => window.open('https://github.com/Karthikxp', '_blank')}
        >
          {/* Black Rectangle */}
          <div 
            className="absolute rounded-[5.68px] border-black border-solid border-[1px] box-border h-[196px] w-[196px] transition-all duration-300 hover:scale-105"
          />

          {/* Sentnl Text */}
          <div 
            className="absolute text-black pointer-events-none"
            style={{
              left: '60px',
              top: '86px',
              width: '97px',
              fontSize: '22px',
              fontFamily: 'Dirtyline, sans-serif'
            }}
          >
            Sentnl
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

      {/* Philosophy Card */}
      <div className="absolute" style={{ left: '0px', top: '1977px', width: '100%', height: '450px' }}>
        {/* EVOLVE Text */}
        {/* <div 
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
        </div> */}

        {/* Tamil Text */}
        {/* <div 
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
        </div> */}

        {/* Edify Text */}
        {/* <div 
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
        </div> */}

        {/* Ver. 396 Text */}
        {/* <div 
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
        </div> */}

        {/* Rotated T below ver. 396 */}
        {/* <div 
          className="w-[17px] absolute text-[43.77px] tracking-[0.13em] bubbler-one-font text-black text-left inline-block [transform:_rotate(90deg)] [transform-origin:0_0]"
          style={{
            left: '1340px',
            top: '421px'
          }}
        >
          T
        </div> */}

        {/* Learning Quote Text */}
        {/* <div 
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
        </div> */}
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

      {/* Floating Image on Sentnl Hover */}
      {showSentnlImage && (
        <img
          src="/sentnl.png"
          alt="Sentnl"
          className="fixed object-cover pointer-events-none z-50 rounded-lg shadow-2xl"
          style={{
            left: `${sentnlCursorPosition.x}px`,
            top: `${sentnlCursorPosition.y}px`,
            transform: `translate(-50%, -50%) scale(${sentnlScale})`,
            opacity: sentnlOpacity,
            width: '300px',
            height: '400px',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}
        />
      )}

      {/* Collaboration Tooltip for Design Card */}
      {showCollabTooltip && isDesignMode && (
        <div
          className="fixed pointer-events-auto z-50 bg-black text-white px-3 py-2 rounded-md shadow-lg cursor-pointer select-none"
          style={{
            left: `${collabTooltipPosition.x + 10}px`,
            top: `${collabTooltipPosition.y - 40}px`,
            fontSize: '7px',
            fontFamily: 'Dirtyline, sans-serif'
          }}
          onClick={handleCollabClick}
        >
          Collab ?
        </div>
      )}
    </main>
  );
}
