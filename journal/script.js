/* ===================================================================
   URULAKKUPPERI PROJECT JOURNAL — INTERACTIVE LOGIC & LIVE ARENA
   Features:
   1. Smart "ENTER THE ARGUMENT" router (Localhost -> React App 5173, Remote -> In-Page Arena)
   2. Full in-page Live Argument Arena with Gemini API + Fallback Contrarian Engine
   3. Web Speech API (Voice Synthesis TTS + Push-to-talk Speech Recognition STT)
   4. Dynamic stubbornness meter, quick argument chips, character switcher
   5. Reading progress, scroll reveals, character quotes & hackathon console easter egg
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const isLocal = window.location.hostname === 'localhost' ||
                  window.location.hostname === '127.0.0.1' ||
                  window.location.protocol === 'file:';

  // =================================================================
  // 1. SMART "ENTER THE ARGUMENT" ROUTING
  // =================================================================
  const enterArgButtons = document.querySelectorAll('.btn-enter-argument, .nav-cta-btn');

  enterArgButtons.forEach((btn) => {
    // If running in local dev environment where Vite runs on 5173
    if (isLocal) {
      btn.setAttribute('href', 'http://localhost:5173');
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    } else {
      // On static deployment (e.g. GitHub Pages), point directly to the in-page arena
      if (!btn.getAttribute('href') || btn.getAttribute('href').includes('5173') || btn.getAttribute('href').includes('../index.html')) {
        btn.setAttribute('href', '#showcase');
      }
    }

    btn.addEventListener('click', (e) => {
      if (isLocal) {
        // Direct navigation or new tab to local running Vite app
        try {
          const opened = window.open('http://localhost:5173', '_blank');
          if (!opened || opened.closed || typeof opened.closed === 'undefined') {
            window.location.href = 'http://localhost:5173';
          }
          e.preventDefault();
        } catch (err) {
          window.location.href = 'http://localhost:5173';
        }
      } else {
        // On static hosting (e.g. GitHub Pages), smoothly scroll to the in-page debate arena
        e.preventDefault();
        const showcase = document.getElementById('showcase');
        if (showcase) {
          showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const input = document.getElementById('arena-input');
          const arenaContainer = document.getElementById('arena-container');
          if (arenaContainer) {
            arenaContainer.style.boxShadow = '0 0 0 4px var(--color-orange), 6px 6px 0 var(--color-brown)';
            setTimeout(() => {
              arenaContainer.style.boxShadow = '';
            }, 1600);
          }
          if (input) setTimeout(() => input.focus(), 650);
        }
      }
    });
  });

  // =================================================================
  // 2. LIVE IN-PAGE DEBATE ARENA CONTROLLER
  // =================================================================
  const CHARACTERS = {
    ammachi: {
      id: 'ammachi',
      name: '👵 Ammachi',
      title: 'Ammachi (Grandmotherly Contempt)',
      quote: '"I was making parotta before your father was born."',
      stubbornness: 89,
      pitch: 1.25,
      rate: 0.95,
      fallacies: ['Generational Invalidation', 'Cooking Hegemony', 'Ayyo Disappointment'],
      welcome: "Enthaadaa ithu? Innathe pillere kandal thanne ariyaam onnum ariyilla ennu. Enna parayeda, kelkkate!",
      fallbacks: [
        "Ayyeda! Ninakku enthu ariyaam? Ninte appan janikkunnathinu munpe njaan ivide parotta adikkunnu!",
        "Pinne! UNESCO alla, WHO paranjaalum njan sammathikkilla. Poyi nallonam vellam kudi!",
        "Athoke ninte puthiya kaalathe thonnyavasam. Pazhaya aalkarkku ithilum budhi undaayirunnu.",
        "Ingane tharkkikkan aanel poyi randu pathiri chudeda, pinne parayam ninte logic!"
      ]
    },
    whatsapp_uncle: {
      id: 'whatsapp_uncle',
      name: '🧔 WhatsApp Uncle',
      title: 'WhatsApp Uncle (Forwarded Many Times)',
      quote: '"UNESCO has verified this."',
      stubbornness: 82,
      pitch: 0.95,
      rate: 1.05,
      fallacies: ['Unverified UNESCO Claim', 'NASA Satellite Proof', 'Forwarded as Received'],
      welcome: "UNESCO just declared Kerala tea shops the 8th Wonder of the World. Don't argue, I have the PDF.",
      fallbacks: [
        "That's exactly what people who don't read WhatsApp forwards say. UNESCO clearly issued a press release at 4:30 AM!",
        "Bro, NASA satellite images have proven this since 1998. Please don't spread fake news without researching in our family group.",
        "Forwarded as received from retired ISRO scientist. If you disagree, you are disrespecting ancient cultural heritage! 🤦‍♂️",
        "My batchmate in Kuwait sent this video. The media will never show you this truth!"
      ]
    },
    aunty: {
      id: 'aunty',
      name: '🧕 Judgemental Aunty',
      title: 'Judgemental Aunty (Neighborhood Quality Control)',
      quote: '"Sharmaji\'s son got 99.8%. What did you get?"',
      stubbornness: 94,
      pitch: 1.3,
      rate: 1.1,
      fallacies: ['Sharmaji Comparison', 'Relative Reputation Anxiety', 'Marriage Eligibility Void'],
      welcome: "Look at you arguing on the internet. Have you started preparing for PSC or bank coaching yet?",
      fallbacks: [
        "Such loud opinions! If you put 10% of this energy into UPSC coaching, we could have given a celebration in the parish!",
        "Sharmaji's son never argues about this. He just cracked Google Bangalore with 45 LPA. What about you?",
        "Ayyo, if prospective marriage proposals hear you talk like this, they will run to Tamil Nadu!",
        "At your age, your uncle already had two plots in Aluva and a government pension. Stop debating food!"
      ]
    },
    tech_bro: {
      id: 'tech_bro',
      name: '💻 Bangalore Tech Bro',
      title: 'Bangalore Tech Bro (HSR Layout Evangelist)',
      quote: '"Bro, this does not scale to 100M users."',
      stubbornness: 78,
      pitch: 1.0,
      rate: 1.18,
      fallacies: ['Scale Invalidation', 'VC Buzzword Overkill', 'HSR Paradigm Shift'],
      welcome: "Let's align asynchronously. But first, whatever your thesis is, it is definitely not product-market fit.",
      fallbacks: [
        "Bro, fundamentally your thesis is zero-MOAT. You're solving an edge case that doesn't monetize!",
        "Let's double-click on that. It simply does not scale to 100M MAU without substantial latency regression.",
        "Honestly bro, you have classic pre-Series A mindset. In Bangalore we decoupled that three sprints ago.",
        "Bro, I talked to a Sequoia scout over kombucha in Indiranagar. Your entire framework is deprecated."
      ]
    },
    malayali: {
      id: 'malayali',
      name: '🌴 Average Malayali',
      title: 'Average Malayali (Evening Tea Stall Veteran)',
      quote: '"Ninne aaranu ithoke padipiche?"',
      stubbornness: 85,
      pitch: 1.0,
      rate: 1.0,
      fallacies: ['Tea Shop Ad Hominem', 'KSRTC Common Sense', 'Gulf Return Skepticism'],
      welcome: "Chaya kudichu kazhinjenkil para, enthinaanu nee ingane veruthe kidannu thullunne?",
      fallbacks: [
        "Ninne aaraada ithoke padipiche? Chaya kudichu kazhinjenkil poyi vere valla paniyum nokkeda!",
        "Oru choodu chayakku polum vilayillaatha varthamanam aanallo nee ee parayunne.",
        "Ithrem kaalam aayi njan KSRTC busil pokunnu, ithuvare inganoru mandatharam aarum paranjittilla!",
        "Enthoru thallu! Gulf-il 20 varsham ninnittum njan polum ithra valiya kadha thalliyittilla!"
      ]
    }
  };

  let activeCharKey = 'whatsapp_uncle';
  let conversationMemory = [];
  let currentStubbornness = CHARACTERS.whatsapp_uncle.stubbornness;

  // DOM Elements
  const dialogueArena = document.getElementById('arena-dialogue');
  const arenaInput = document.getElementById('arena-input');
  const arenaForm = document.getElementById('arena-form');
  const arenaMicBtn = document.getElementById('arena-mic-btn');
  const opponentNameEl = document.getElementById('arena-opponent-name');
  const catchphraseEl = document.getElementById('arena-catchphrase');
  const stubbornValEl = document.getElementById('arena-stubborn-val');
  const stubbornBadgeEl = document.getElementById('arena-stubborn-badge');
  const serverStatusEl = document.getElementById('arena-server-status');
  const statusTextEl = document.getElementById('arena-status-text');

  // Check Backend Connection
  async function checkBackend() {
    try {
      const res = await fetch('http://localhost:3001/api/health', { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        if (serverStatusEl) {
          serverStatusEl.textContent = '● Gemini AI Live (3001)';
          serverStatusEl.className = 'server-status-pill online';
        }
        return true;
      }
    } catch (e) {
      // Backend not running (or remote GitHub Pages)
    }
    if (serverStatusEl) {
      serverStatusEl.textContent = '● Kerala Contrarian Engine (Ready)';
      serverStatusEl.className = 'server-status-pill offline';
    }
    return false;
  }
  checkBackend();

  // Switch Character
  const charPillButtons = document.querySelectorAll('.mockup-char-pill');
  charPillButtons.forEach((pill) => {
    pill.addEventListener('click', () => {
      const charKey = pill.getAttribute('data-char');
      if (!CHARACTERS[charKey]) return;

      charPillButtons.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      activeCharKey = charKey;
      const char = CHARACTERS[charKey];
      currentStubbornness = char.stubbornness;

      if (opponentNameEl) opponentNameEl.textContent = char.name;
      if (catchphraseEl) catchphraseEl.textContent = char.quote;
      if (stubbornValEl) stubbornValEl.textContent = `${currentStubbornness}%`;

      // Clear & append welcome retort
      if (dialogueArena) {
        dialogueArena.innerHTML = `
          <div class="mockup-bubble ai">
            <span class="bubble-sender">URULAKKUPPERI (${char.name})</span>
            <span class="bubble-text">"${char.welcome}"</span>
            <span class="fallacy-badge">Persona: ${char.fallacies[0]}</span>
          </div>
        `;
      }

      speakText(char.welcome, char.rate, char.pitch);
    });
  });

  // Handle Quick Chips
  const quickChips = document.querySelectorAll('.quick-chip-btn');
  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const arg = chip.getAttribute('data-arg');
      if (arg && arenaInput) {
        arenaInput.value = arg;
        submitArgument(arg);
      }
    });
  });

  // Form Submit
  if (arenaForm) {
    arenaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = arenaInput ? arenaInput.value.trim() : '';
      if (val) submitArgument(val);
    });
  }

  // Submit Argument Core Routine
  async function submitArgument(userText) {
    if (!userText || !dialogueArena) return;

    const char = CHARACTERS[activeCharKey] || CHARACTERS.whatsapp_uncle;

    // 1. Append User Bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'mockup-bubble user';
    userBubble.innerHTML = `
      <span class="bubble-sender">You (The Brave Contender)</span>
      <span class="bubble-text">"${escapeHtml(userText)}"</span>
    `;
    dialogueArena.appendChild(userBubble);
    if (arenaInput) arenaInput.value = '';
    dialogueArena.scrollTop = dialogueArena.scrollHeight;

    // 2. Add Typing Indicator Bubble
    const typingBubble = document.createElement('div');
    typingBubble.className = 'mockup-bubble ai typing-bubble';
    typingBubble.innerHTML = `
      <span>${char.name} is formulating a rebuttal</span>
      <span class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </span>
    `;
    dialogueArena.appendChild(typingBubble);
    dialogueArena.scrollTop = dialogueArena.scrollHeight;

    let aiReply = '';
    let fallacyName = char.fallacies[Math.floor(Math.random() * char.fallacies.length)];

    // 3. Try Calling Live Backend
    try {
      const response = await fetch('http://localhost:3001/api/argument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId: activeCharKey,
          message: userText,
          conversationHistory: conversationMemory.slice(-4),
          currentStubbornness: currentStubbornness
        }),
        signal: AbortSignal.timeout(4500)
      });

      if (response.ok) {
        const data = await response.json();
        if (data && (data.counterargument || data.reply)) {
          aiReply = data.counterargument || data.reply;
          if (data.fallacy) fallacyName = data.fallacy;
          if (data.newStubbornness) currentStubbornness = data.newStubbornness;
        }
      }
    } catch (err) {
      // Backend not accessible; fallback smoothly
    }

    // 4. Fallback if no backend reply
    if (!aiReply) {
      const fallbackList = char.fallbacks;
      aiReply = fallbackList[Math.floor(Math.random() * fallbackList.length)];
      currentStubbornness = Math.min(99, currentStubbornness + Math.floor(Math.random() * 5) + 3);
    }

    // Remove typing bubble
    if (typingBubble.parentNode) {
      dialogueArena.removeChild(typingBubble);
    }

    // 5. Append AI Bubble
    const aiBubble = document.createElement('div');
    aiBubble.className = 'mockup-bubble ai';
    aiBubble.innerHTML = `
      <span class="bubble-sender">URULAKKUPPERI (${char.name})</span>
      <span class="bubble-text">"${escapeHtml(aiReply)}"</span>
      <span class="fallacy-badge">Fallacy: ${escapeHtml(fallacyName)}</span>
    `;
    dialogueArena.appendChild(aiBubble);
    dialogueArena.scrollTop = dialogueArena.scrollHeight;

    // Update Stubbornness Meter
    if (stubbornValEl) stubbornValEl.textContent = `${currentStubbornness}%`;
    if (stubbornBadgeEl) {
      stubbornBadgeEl.style.transform = 'scale(1.1)';
      setTimeout(() => { stubbornBadgeEl.style.transform = 'scale(1)'; }, 250);
    }

    // Save to local session memory
    conversationMemory.push({ role: 'user', content: userText });
    conversationMemory.push({ role: 'assistant', content: aiReply });

    // 6. Speak Comeback Aloud
    speakText(aiReply, char.rate, char.pitch);
  }

  // Speech-to-Text (Microphone)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition && arenaMicBtn) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // Recognizes Indian English & common Manglish phonetics

    let isListening = false;

    arenaMicBtn.addEventListener('click', () => {
      if (!isListening) {
        try {
          recognition.start();
          isListening = true;
          arenaMicBtn.classList.add('listening');
          if (statusTextEl) statusTextEl.textContent = '🎙️ LISTENING... Speak your controversial opinion now!';
        } catch (e) {
          isListening = false;
        }
      } else {
        recognition.stop();
        isListening = false;
        arenaMicBtn.classList.remove('listening');
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (arenaInput && transcript) {
        arenaInput.value = transcript;
        submitArgument(transcript);
      }
    };

    recognition.onerror = () => {
      isListening = false;
      arenaMicBtn.classList.remove('listening');
      if (statusTextEl) statusTextEl.textContent = '🔊 VOICE ENGINE READY • Push mic to speak';
    };

    recognition.onend = () => {
      isListening = false;
      arenaMicBtn.classList.remove('listening');
      if (statusTextEl) statusTextEl.textContent = '🔊 VOICE ENGINE READY • Spoken in Malayalam/Manglish';
    };
  } else if (arenaMicBtn) {
    arenaMicBtn.title = 'Voice input not supported in this browser (Use Chrome or Edge)';
  }

  // Text-to-Speech (TTS)
  function speakText(text, rate = 1.0, pitch = 1.0) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean text of emojis and special characters for speech engine
    const clean = text.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}]/gu, '').replace(/["']/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Pick Indian English or Malayalam voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('ml') || v.lang.startsWith('en-IN') || v.name.includes('India') || v.name.includes('Sobhana') || v.name.includes('Neerja'));
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =================================================================
  // 3. READING PROGRESS & BACK TO TOP
  // =================================================================
  const progressBar = document.getElementById('reading-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0 && progressBar) {
      const progress = (window.scrollY / totalScroll) * 100;
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // =================================================================
  // 4. SCROLL REVEAL ANIMATIONS
  // =================================================================
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

  // =================================================================
  // 5. ANIMATED STUBBORNNESS BAR ON INTERSECTION
  // =================================================================
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

  // =================================================================
  // 6. SMOOTH ANCHOR SCROLLING
  // =================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || this.classList.contains('btn-enter-argument')) return;
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

  // =================================================================
  // 7. CHARACTER CARD INTERACTIVE QUOTE SHAKE & TTS PREVIEW
  // =================================================================
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

        const cleanText = quote.textContent.replace(/["']/g, '');
        speakText(cleanText, 1.05, 1.0);
      }
    });
  });

  // =================================================================
  // 8. CONSOLE EASTER EGG FOR HACKATHON JUDGES
  // =================================================================
  console.log(
    '%cURULAKKUPPERI (ഉരുളക്കുപ്പേരി) %c— Live Debate Arena & Project Journal',
    'font-size: 18px; font-weight: bold; color: #E99E1B; background: #2A170D; padding: 6px 12px; border-radius: 4px; border: 2px solid #E99E1B;',
    'font-size: 14px; font-weight: normal; color: #881919;'
  );
  console.log(
    '%c"Where every opinion is wrong."\n%cBuilt during an 18-hour overnight make-a-thon with caffeine, Kerala tea, and Google Gemini by Talarin Miranda & Sayoojya KS for TinkerHub Useless Projects 3.0.',
    'font-style: italic; font-weight: bold; color: #DF5624; font-size: 13px;',
    'color: #382417;'
  );
});
