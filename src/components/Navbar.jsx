import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. استدعاء الكونتكست

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth(); // 2. استخراج البيانات
  
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const items = [
    {
      label: "Platform ",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Home", href: "/" },
        { label: "Pricing Plans", href: "/plan" }, // تأكد ان الرابط مطابق للراوتر عندك
        { label: "AI Chat / Assistant", href: "/ai" } // عدلت الرابط لصفحة الشات
      ]
    },
    {
      label: "Features & Resources",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/doc" } 
      ]
    },
    {
      label: "Company",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "About Us", href: "/About" },
        { label: "Contact Us", href: "/contact" },
      ]
    }
  ];

  const ease = "power3.out";

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => { if (el) cardsRef.current[i] = el; };
  
  return (
    <div className="navbar-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-[99] top-[1.2em] md:top-[2em]">
      <nav
        ref={navRef}
        className="navbar block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass blur color
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="navbar-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          {/* Hamburger */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px]`}
            onClick={toggleMenu} role="button" aria-label={isExpanded ? 'Close menu' : 'Open menu'} tabIndex={0}
            style={{ color: '#fff' }}
          >
            <div className={`hamburger-line w-[30px] h-[2px] bg-current transition-transform duration-300 ease-in-out origin-center
              ${isHamburgerOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <div className={`hamburger-line w-[30px] h-[2px] bg-current transition-transform duration-300 ease-in-out origin-center
              ${isHamburgerOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </div>

          {/* Logo */}
          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-white font-bold text-lg">
            VulnSneak
          </div>

          {/* 3. Get Started button area - AUTH LOGIC ADDED HERE */}
          <div className="hidden md:flex h-full items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 bg-black/20 rounded-lg px-3 py-1.5 border border-white/10">
                <span className="text-purple-200 text-sm font-semibold truncate max-w-[100px]">
                  {/* التعديل هنا: استخدام .name مباشرة لأننا خزننا الاسم الكامل */}
                  Hi, {user?.name || "User"}
                </span>
                <button
                  onClick={logout}
                  className="text-xs bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                id="Get-Started"
                to="/auth"
                className="navbar-cta-button bg-black text-amber-100 border-0 rounded-[calc(0.75rem-0.2rem)] px-4 inline-flex items-center h-full font-medium cursor-pointer transition-colors duration-300 hover:bg-black/80"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div
          className={`nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[12px] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">{item.label}</div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links.map((lnk, i) => (
                  <Link // 4. استخدمت Link بدل a عشان يبقى SPA
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    to={lnk.href}
                    style={{color: "inherit"}}
                  >
                    ➤ {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;