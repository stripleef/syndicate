import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronLeft, ChevronRight, Star, MapPin, Phone, Clock, Quote, Maximize2, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Curved SVG dividers
const DividerTop = () => (
  <svg className="w-full h-8 md:h-16 text-[#e8e4dd] fill-current -mb-1 relative z-10" viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path d="M0,100 C280,0 720,0 1440,100 L1440,100 L0,100 Z" />
  </svg>
);

const DividerBottom = () => (
  <svg className="w-full h-8 md:h-16 text-[#e8e4dd] fill-current -mt-1 relative z-10 rotate-180" viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path d="M0,100 C280,0 720,0 1440,100 L1440,100 L0,100 Z" />
  </svg>
);

// Decorative line
const DecorLine = () => (
  <div className="flex items-center justify-center gap-4 my-6">
    <div className="w-16 h-px bg-accent/50" />
    <Star className="w-4 h-4 text-accent fill-accent" />
    <div className="w-16 h-px bg-accent/50" />
  </div>
);

// BookingModal Component
const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-[#111111] border border-white/10 p-8 md:p-12 max-w-md w-full relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="font-display text-4xl text-parchment text-center mb-2 drop-shadow-md uppercase">ОНЛАЙН ЗАПИСЬ</h3>
        <p className="font-body text-white/50 text-center text-sm mb-8">Оставьте свой номер телефона, и мы свяжемся с вами для подтверждения записи.</p>
        
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('Заявка отправлена!'); onClose(); }}>
          <div>
            <label className="block font-oswald text-xs tracking-widest text-white/50 uppercase mb-2">Номер телефона</label>
            <input 
              type="tel" 
              placeholder="+7 (999) 000-00-00"
              required
              className="w-full bg-[#050505] border border-white/10 text-white font-body px-4 py-3 outline-none focus:border-accent transition-colors"
            />
          </div>
          <button 
            type="submit"
            className="w-full border border-accent text-accent font-oswald tracking-[0.2em] uppercase px-8 py-4 text-sm font-bold hover:bg-accent hover:text-primary transition-colors bg-accent/5 backdrop-blur-sm"
          >
            ОТПРАВИТЬ ЗАЯВКУ
          </button>
        </form>
      </div>
    </div>
  );
};

// Navbar
const Navbar = () => {
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5 seconds for extra smooth scroll
      let start = null;

      const easeInOutCubic = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex flex-row items-center justify-between px-2 md:px-8 py-4 md:py-6 font-oswald tracking-widest text-xs md:text-sm text-parchment uppercase bg-transparent">
       <div className="flex justify-end gap-4 md:gap-12 flex-1 mr-4 md:mr-12">
         <a href="#about" onClick={handleScroll} className="hover:text-accent transition-colors">О нас</a>
         <a href="#services" onClick={handleScroll} className="hover:text-accent transition-colors">Услуги</a>
       </div>
       <div className="flex justify-center cursor-pointer shrink-0">
         <img src={`${import.meta.env.BASE_URL}ikonka.png`} alt="SYNDICATE" className="h-10 md:h-16 drop-shadow-md" />
       </div>
       <div className="flex justify-start gap-4 md:gap-12 flex-1 ml-4 md:ml-12">
         <a href="#faq" onClick={handleScroll} className="hover:text-accent transition-colors">FAQ</a>
         <a href="#reviews" onClick={handleScroll} className="hover:text-accent transition-colors">Отзывы</a>
       </div>
    </nav>
  );
};

// New Watermark component
const Watermark = () => {
  const line = Array(15).fill("SYNDICATE").join("\u00A0\u00A0\u00A0\u00A0");
  return (
    <div className="fixed inset-0 flex flex-col justify-center overflow-hidden opacity-[0.06] pointer-events-none select-none z-0">
       {[...Array(16)].map((_, i) => (
         <div key={i} className="relative w-full h-[5rem] sm:h-[9rem] md:h-[19rem] flex-shrink-0 overflow-visible">
           <span className="absolute top-0 left-1/2 -translate-x-1/2 font-display text-[6rem] sm:text-[10rem] md:text-[24rem] leading-[0.8] whitespace-nowrap text-white drop-shadow-lg">
             {line}
           </span>
         </div>
       ))}
    </div>
  );
};

// Film Grain Noise Overlay
const NoiseOverlay = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-[0.15] z-0 pointer-events-none mix-blend-overlay" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

// Hero
const Hero = ({ onOpenBooking }) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  
  useEffect(() => {
    const v = videoRef.current;
    let timeUpdateHandler;
    
    if (v) {
      v.playbackRate = 0.5; // Slow down video even more
      
      // Trim video to 9 seconds and fade to black
      timeUpdateHandler = () => {
        if (v.currentTime >= 9 && !v.paused) {
          v.pause();
          setShowBlackScreen(true);
          
          setTimeout(() => {
            setShowBlackScreen(false);
            setTimeout(() => {
              if (v) {
                v.currentTime = 0;
                v.play();
              }
            }, 1000); // Wait for fade out to complete
          }, 4000); // 4 seconds of black screen
        }
      };
      v.addEventListener('timeupdate', timeUpdateHandler);
    }
    
    let ctx = gsap.context(() => {
      gsap.from('.hero-anim', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.to('.hero-graphic', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      gsap.to('.hero-graphic', {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, heroRef);
    
    return () => {
      ctx.revert();
      if (v && timeUpdateHandler) {
        v.removeEventListener('timeupdate', timeUpdateHandler);
      }
    };
  }, []);

  return (
    <header ref={heroRef} className="relative w-full h-[100svh] overflow-hidden flex flex-col bg-[#050505]">
       <video 
         ref={videoRef}
         src={`${import.meta.env.BASE_URL}video/main-1554591349.mp4`}
         autoPlay 
         loop={false} 
         muted 
         playsInline
         className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 brightness-110 contrast-125 saturate-150"
       />
       
       {/* Cinematic black screen fader */}
       <div 
         className={`absolute inset-0 bg-[#050505] z-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${showBlackScreen ? 'opacity-100' : 'opacity-0'}`} 
       />
       
       <NoiseOverlay />
       <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />
       
       <Navbar />

       <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center mt-24 px-4">
          <p className="hero-anim font-display-sc tracking-[0.2em] text-parchment uppercase mb-4 text-sm md:text-base drop-shadow-md font-bold">BARBER SHOP ISHIMBAY</p>
          <h1 className="hero-anim font-display text-7xl md:text-[10rem] text-parchment mb-16 tracking-wider drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] leading-none mt-2">SYNDICATE</h1>
          
          <button 
            onClick={onOpenBooking}
            className="hero-anim border border-accent text-accent font-oswald tracking-[0.2em] uppercase px-12 py-4 text-sm font-bold hover:bg-accent hover:text-primary transition-colors bg-black/30 backdrop-blur-sm"
          >
            ОНЛАЙН ЗАПИСЬ
          </button>
       </div>

       <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-12 py-6 bg-black/60 backdrop-blur-xl text-xs font-oswald tracking-[0.2em] text-parchment/80 uppercase mt-auto border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 md:mb-0 hover:text-accent transition-colors cursor-pointer"><Phone className="w-4 h-4 text-accent"/> +7 (999) 123-45-67</div>
          <div className="flex items-center gap-3 mb-4 md:mb-0 hover:text-accent transition-colors cursor-pointer"><MapPin className="w-4 h-4 text-accent"/> г. Ишимбай, ул. Геологическая 87</div>
          <div className="flex items-center gap-3 hover:text-accent transition-colors cursor-pointer"><Clock className="w-4 h-4 text-accent"/> ПН-ВС: 10:00 - 20:00</div>
       </div>
    </header>
  );
};



// About
const About = () => {
  return (
    <section id="about" className="relative bg-transparent py-12 md:py-32 px-6 overflow-hidden">
      {/* Smooth transition from Hero */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-64 bg-gradient-to-b from-[#050505] to-transparent z-0 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h4 className="font-oswald tracking-widest text-accent uppercase text-sm mb-2">Syndicate</h4>
          <h2 className="font-display text-5xl md:text-7xl text-parchment mb-8 drop-shadow-md">ABOUT US</h2>
          <div className="font-body text-parchment/70 leading-relaxed space-y-4 mb-10">
            <p>
              Добро пожаловать в Syndicate — место, где мужской стиль возведен в абсолют. Мы не просто стрижем волосы, мы создаем ваш персональный образ, подчеркивая характер и мужскую харизму. 
            </p>
            <p>
              Наши мастера — профессионалы своего дела, владеющие как классическими техниками, так и современными трендами. Мы используем только премиальные инструменты и косметику.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 border-2 border-accent translate-x-4 translate-y-4 z-0" />
          <img src={`${import.meta.env.BASE_URL}photo/vhod.jpg`} alt="Вход в Syndicate" className="relative z-10 w-full h-auto object-cover grayscale-[30%] contrast-125" />
        </div>
      </div>
    </section>
  );
};

// Services
const Services = () => {
  const [spinDeg, setSpinDeg] = useState(0);
  
  const leftServices = [
    { name: 'Мужская стрижка', desc: 'Модельная стрижка любой длины и сложности', price: 'от 2000₽' },
    { name: 'Стрижка + борода', desc: 'Модельная стрижка + оформление бороды', price: '3500₽' },
    { name: 'Стрижка под насадку', desc: 'Быстро, строго и аккуратно', price: '1000₽' },
    { name: 'Укладка волос', desc: 'Укладка с применением стайлингов', price: '500₽' },
  ];
  const rightServices = [
    { name: 'Моделирование бороды', desc: 'Профессиональный уход и коррекция', price: '1500₽' },
    { name: 'Камуфляж седины', desc: 'Тонирование профессиональной краской', price: '1200₽' },
    { name: 'Королевское бритье', desc: 'Опасной бритвой с распариванием', price: '2000₽' },
    { name: 'Детская стрижка', desc: 'Стрижка для ребенка', price: '1200₽' },
  ];

  const ServiceItem = ({ s }) => (
    <div className="flex flex-col mb-10 w-full">
      <div className="flex justify-between items-baseline w-full">
        <span className="font-oswald font-bold uppercase text-lg md:text-xl text-parchment tracking-wide shrink-0 pr-3">{s.name}</span>
        <div className="flex-1 border-b-[3px] border-dotted border-white/20 mx-2 mb-[6px]"></div>
        <span className="font-oswald text-accent text-lg md:text-xl font-bold shrink-0 pl-3">{s.price}</span>
      </div>
      <span className="font-body text-xs md:text-sm text-parchment/50 mt-2">{s.desc}</span>
    </div>
  );

  return (
    <div className="relative bg-transparent overflow-hidden">
      
      <section id="services" className="pt-12 pb-0 md:py-32 px-6 text-parchment relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-4 tracking-wider text-parchment drop-shadow-lg">BARBER SERVICES</h2>
          <div className="flex justify-center gap-3 text-accent mb-16 drop-shadow-md">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full relative z-10">
          {/* Left */}
          <div className="w-full md:w-[35%] flex flex-col justify-center">
             {leftServices.map(s => <ServiceItem key={s.name} s={s} />)}
          </div>

          {/* Center Un-stretched Graphic with Fading Edges */}
          <div className="hidden md:flex flex-col items-center justify-center w-[30%] shrink-0">
             <img 
                src={`${import.meta.env.BASE_URL}center-graphic.png`}
                alt="Center Graphic" 
                onClick={() => setSpinDeg(prev => prev + 360)}
                className="w-full max-w-[500px] object-contain drop-shadow-2xl cursor-pointer"
                style={{
                  transform: `rotate(${spinDeg}deg)`,
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
             />
          </div>

          {/* Right */}
          <div className="w-full md:w-[35%] flex flex-col justify-center">
             {rightServices.map(s => <ServiceItem key={s.name} s={s} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

// Gallery
const Gallery = () => {
  const images = [
    `${import.meta.env.BASE_URL}gallery.jpg`,
    `${import.meta.env.BASE_URL}gallery2.jpg`,
    `${import.meta.env.BASE_URL}gallery3.jpg`,
    `${import.meta.env.BASE_URL}gallery4.jpg`
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };
  
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="relative bg-transparent overflow-hidden">
      <div className="pt-0 md:pt-12 pb-8 relative z-10">
        <div className="text-center mb-6 md:mb-12">
          <h4 className="font-oswald tracking-widest text-white/50 uppercase text-xs md:text-sm mb-2 font-bold drop-shadow-md">SYNDICATE</h4>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-parchment drop-shadow-lg uppercase">OUR GALERY</h2>
        </div>
        
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full">
            {images.map((src, i) => (
              <div 
                key={i} 
                className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-[#050505]"
                onClick={() => setSelectedIndex(i)}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${i}`} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm border border-white/10">
                    <Maximize2 className="text-white w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 cursor-zoom-out opacity-100 transition-opacity duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 bg-black/50 rounded-full border border-white/10 z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute left-2 md:left-8 text-white/50 hover:text-white transition-colors p-2 md:p-3 bg-black/50 rounded-full border border-white/10 z-50"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <img 
            src={images[selectedIndex]} 
            alt="Enlarged" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button 
            className="absolute right-2 md:right-8 text-white/50 hover:text-white transition-colors p-2 md:p-3 bg-black/50 rounded-full border border-white/10 z-50"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </div>
      )}
    </section>
  );
};

// FAQ
const FAQ = () => {
  const faqs = [
    { q: "Как подготовиться к стрижке?", a: "Достаточно просто помыть голову, но если не успели — мы сделаем это за вас с использованием премиального шампуня." },
    { q: "Какие бренды косметики вы используете?", a: "Мы работаем исключительно с проверенными мужскими брендами: Reuzel, Proraso, Uppercut Deluxe." },
    { q: "Можно ли приобрести косметику у вас?", a: "Да, на стойке администратора представлен полный ассортимент уходовых средств для волос и бороды." },
    { q: "Есть ли у вас парковка?", a: "Да, для наших клиентов предусмотрена бесплатная охраняемая парковка." }
  ];

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-transparent pt-0 pb-8 md:pb-16 px-6 overflow-hidden">

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        {/* Left image/graphic */}
        <div className="w-full md:w-5/12 flex flex-col items-center justify-center pt-4 order-2 md:order-1">
           <img src={`${import.meta.env.BASE_URL}vector-chair.png`} alt="Vintage Chair" className="w-1/2 max-w-[180px] md:w-full md:max-w-[450px] object-contain mix-blend-screen opacity-90" />
           <div className="font-display text-3xl md:text-4xl tracking-[0.2em] text-white/50 mt-4 text-center uppercase">SYNDICATE</div>
        </div>
        
        {/* Right FAQ */}
        <div className="w-full md:w-7/12 order-1 md:order-2">
          <div className="mb-12">
            <h4 className="font-oswald tracking-widest text-white font-bold uppercase text-sm mb-1 drop-shadow-md">SYNDICATE</h4>
            <h2 className="font-display text-6xl md:text-8xl text-white tracking-wider drop-shadow-lg">FAQ</h2>
          </div>
          
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#a38035]/50 group">
                <button 
                  className="w-full flex justify-between items-center text-left font-body font-bold text-base md:text-lg text-[#e8e4dd] group-hover:text-white transition-colors py-5"
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 text-white/50 group-hover:text-[#a38035] ${open === i ? 'rotate-180 text-[#a38035]' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 font-body text-[#b0b0b0] text-sm md:text-base leading-relaxed ${open === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Reviews
const Reviews = () => {
  const reviews = [
    { name: "Александр В.", date: "1 месяц назад", text: "Отличная атмосфера и профессиональные мастера. Постригли идеально, как и просил. Обязательно вернусь." },
    { name: "Михаил С.", date: "2 месяца назад", text: "Лучший барбершоп в городе. Качественное королевское бритье, настоящий ритуал. Рекомендую всем." },
    { name: "Дмитрий К.", date: "Полгода назад", text: "Строго, четко, без лишних вопросов. Мастера понимают с полуслова. Высший пилотаж." },
    { name: "Иван Т.", date: "Неделю назад", text: "Отличный сервис, приятная беседа и шикарный результат. Барбер подобрал мне идеальную форму бороды." },
    { name: "Сергей П.", date: "3 недели назад", text: "Хожу сюда уже год. Ни разу не разочаровался. Ребята знают свое дело на все 100%." }
  ];

  return (
    <div className="relative bg-transparent border-t border-white/5">
      <section id="reviews" className="relative pt-8 pb-12 md:pt-16 md:pb-24 px-0 md:px-6 text-parchment overflow-hidden z-0">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 px-6">
            <DecorLine />
            <h2 className="font-display text-5xl md:text-7xl mb-4 mt-6 text-white drop-shadow-lg">REVIEWS</h2>
            <div className="flex justify-center gap-2 text-accent">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current drop-shadow-md" />)}
            </div>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-8 mb-12 pb-8 px-6 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            {reviews.map((r, i) => (
              <div key={i} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center border border-accent/20 p-5 md:p-6 relative flex flex-col justify-between h-full bg-[#111111]/80 backdrop-blur-md shadow-2xl border-double border-4">
                <Quote className="absolute top-4 right-4 w-6 h-6 text-white/5" />
                <p className="font-body text-xs md:text-sm leading-relaxed mb-6 italic text-white/70 font-semibold drop-shadow-md">"{r.text}"</p>
                <div>
                  <div className="flex gap-1 text-accent mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current drop-shadow-sm" />)}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#050505] text-white rounded-full flex items-center justify-center border border-accent shrink-0">
                      <span className="font-oswald font-bold text-lg">{r.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-oswald font-bold uppercase tracking-wider text-[#e8e4dd] text-sm">{r.name}</div>
                      <div className="font-body text-[10px] md:text-xs text-white/40">{r.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-end text-center font-oswald uppercase relative z-10">
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-1 text-white drop-shadow-md">2021</div>
              <div className="text-xs text-white/50 tracking-widest font-semibold border-t border-accent/30 pt-2">Год основания</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-1 text-white drop-shadow-md">3</div>
              <div className="text-xs text-white/50 tracking-widest font-semibold border-t border-accent/30 pt-2">Мастера</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-1 text-white drop-shadow-md">5</div>
              <div className="text-xs text-white/50 tracking-widest font-semibold border-t border-accent/30 pt-2">Лет опыта</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="relative bg-[#050505] py-16 px-6 text-center overflow-hidden border-t border-white/5 z-10">
      <div className="relative z-10">
        <img src={`${import.meta.env.BASE_URL}ikonka.webp`} alt="Syndicate" className="h-24 mx-auto mb-10 opacity-90 drop-shadow-lg" />
        <div className="flex justify-center gap-6 font-oswald text-xs uppercase tracking-widest text-white/50 mb-8">
           <a href="#" className="hover:text-accent transition-colors">Instagram</a>
           <a href="#" className="hover:text-accent transition-colors">VKontakte</a>
           <a href="#" className="hover:text-accent transition-colors">Telegram</a>
        </div>
        <p className="font-oswald tracking-widest text-white/20 text-xs uppercase">
          &copy; 2026 Syndicate Barbershop. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

const App = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-reveal').forEach((element) => {
        gsap.fromTo(element, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              once: true
            }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-[#050505] selection:bg-accent selection:text-primary">
      <Watermark />
      <Hero onOpenBooking={() => setIsBookingModalOpen(true)} />
      <div className="gsap-reveal"><About /></div>
      <div className="gsap-reveal"><Services /></div>
      <div className="gsap-reveal"><Gallery /></div>
      <div className="gsap-reveal"><FAQ /></div>
      <div className="gsap-reveal"><Reviews /></div>
      <div className="gsap-reveal"><Footer /></div>
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </main>
  );
};

export default App;
