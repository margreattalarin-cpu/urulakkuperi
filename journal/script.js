/* ===================================================================
   URULAKKUPPERI PROJECT JOURNAL — INTERACTIVE LOGIC
   Features: Reading progress, scroll animations, interactive widgets
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

  // 2. Animated Progress Bar on Intersection
  const stubbornFill = document.querySelector('.stubborn-bar-fill');
  if (stubbornFill) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stubbornFill.style.width = '82%';
          }
        });
      },
      { threshold: 0.3 }
    );
    const stubbornBox = document.querySelector('.stubborn-box');
    if (stubbornBox) observer.observe(stubbornBox);
  }

  // 3. Smooth anchor scrolling
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

  // 4. Character Card Interactive Quote Shake
  const charCards = document.querySelectorAll('.char-card');
  charCards.forEach((card) => {
    card.addEventListener('click', () => {
      const quote = card.querySelector('.char-quote');
      if (quote) {
        quote.style.transform = 'scale(1.05)';
        quote.style.transition = 'transform 0.15s ease';
        setTimeout(() => {
          quote.style.transform = 'scale(1)';
        }, 180);
      }
    });
  });

  // 5. Console Easter Egg for Tinkers & Judges
  console.log(
    '%cURULAKKUPPERI (ഉരുളക്കുപ്പേരി) %c— Project Journal',
    'font-size: 18px; font-weight: bold; color: #E99E1B; background: #2A170D; padding: 4px 8px; border-radius: 4px;',
    'font-size: 14px; font-weight: normal; color: #881919;'
  );
  console.log(
    '%c"Where every opinion is wrong." %c\nBuilt with relentless contrarian energy by Talarin Miranda & Sayoojya KS for TinkerHub Useless Projects 3.0.',
    'font-style: italic; color: #DF5624;',
    'color: #382417;'
  );
});
