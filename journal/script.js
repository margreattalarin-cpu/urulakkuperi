/* ===================================================================
   URULAKKUPPERI PROJECT JOURNAL — INTERACTIVE LOGIC
   Features: Reading progress, scroll animations, quote previews, easter eggs
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('reading-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const progress = (window.scrollY / totalScroll) * 100;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }

    if (backToTopBtn) {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // 2. Scroll Reveal Animations
  const sections = document.querySelectorAll('.journal-section, .hero, .final-cta-section');
  sections.forEach((sec) => sec.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach((sec) => revealObserver.observe(sec));

  // 3. Animated Stubbornness Bar on Intersection
  const stubbornFill = document.querySelector('.stubborn-bar-fill');
  if (stubbornFill) {
    stubbornFill.style.width = '0%';
    const stubbornObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stubbornFill.style.width = '82%';
          }
        });
      },
      { threshold: 0.25 }
    );
    const stubbornBox = document.querySelector('.stubborn-box');
    if (stubbornBox) stubbornObserver.observe(stubbornBox);
  }

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 5. Character Card Interactive Quote Shake & Speech Preview
  const charCards = document.querySelectorAll('.char-card');
  charCards.forEach((card) => {
    card.addEventListener('click', () => {
      const quote = card.querySelector('.char-quote');
      if (quote) {
        quote.style.transform = 'scale(1.06)';
        quote.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
          quote.style.transform = 'scale(1)';
        }, 180);

        // Optional speech synthesis test for judges
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanText = quote.textContent.replace(/["']/g, '');
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.rate = 1.0;
          utterance.pitch = 1.1;
          window.speechSynthesis.speak(utterance);
        }
      }
    });
  });

  // 6. Console Easter Egg for Hackathon Judges & Tinkers
  console.log(
    '%cURULAKKUPPERI (ഉരുളക്കുപ്പേരി) %c— Project Journal',
    'font-size: 18px; font-weight: bold; color: #E99E1B; background: #2A170D; padding: 6px 12px; border-radius: 4px; border: 2px solid #E99E1B;',
    'font-size: 14px; font-weight: normal; color: #881919;'
  );
  console.log(
    '%c"Where every opinion is wrong."\n%cBuilt with caffeine, Kerala tea, and Google Gemini by Talarin Miranda & Sayoojya KS for TinkerHub Useless Projects 3.0.',
    'font-style: italic; font-weight: bold; color: #DF5624; font-size: 13px;',
    'color: #382417;'
  );
});
