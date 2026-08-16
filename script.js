/**
 * ==========================================================================
 * ANUSHKA TIWARI - 80s SYNTHWAVE & CYBERPUNK HUD JAVASCRIPT ENGINE
 * Features:
 *  - 80s Synthwave Canvas Horizon Grid & Retro Sun Animation
 *  - Web Audio API 8-Bit Retro Sound Synthesizer (Zero external dependencies)
 *  - Live Interactive Simulators (Voice Assistant, BMI Calc, CSPRNG Keygen, Weather)
 *  - Interactive 80s CLI Mainframe Terminal
 *  - Category Filter Engine & Smooth Navigation
 *  - Dynamic Typing Text & Number Counter Animations
 *  - Interactive Resume Viewer & Print Generator
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. 8-BIT RETRO SOUND SYNTHESIZER (Web Audio API)
  // ==========================================
  let audioCtx = null;
  let sfxEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthSound(type) {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'hover') {
        // High soft blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'click') {
        // Laser retro click
        osc.type = 'square';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        // 80s arcade power-up chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.06);
        osc.frequency.setValueAtTime(659.25, now + 0.12);
        osc.frequency.setValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'cmd') {
        // Terminal keystroke chirp
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(950, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch (e) {
      // Audio context policy fallback
    }
  }

  // SFX Toggle Handler
  const sfxToggleBtn = document.getElementById('sfxToggleBtn');
  const sfxIcon = document.getElementById('sfxIcon');
  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      const textSpan = sfxToggleBtn.querySelector('.btn-text');
      if (sfxEnabled) {
        textSpan.textContent = 'SFX: ON';
        sfxIcon.className = 'fa-solid fa-volume-high';
        playSynthSound('success');
      } else {
        textSpan.textContent = 'SFX: OFF';
        sfxIcon.className = 'fa-solid fa-volume-xmark';
      }
    });
  }

  // Bind sound attributes across interactive elements
  document.querySelectorAll('[data-sound]').forEach(el => {
    const soundType = el.getAttribute('data-sound');
    if (soundType === 'hover') {
      el.addEventListener('mouseenter', () => playSynthSound('hover'));
    } else if (soundType === 'click') {
      el.addEventListener('click', () => playSynthSound('click'));
    }
  });


  // ==========================================
  // 2. CRT SCANLINES TOGGLE
  // ==========================================
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  const crtIcon = document.getElementById('crtIcon');
  if (crtToggleBtn) {
    crtToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('crt-active');
      const isCrt = document.body.classList.contains('crt-active');
      const textSpan = crtToggleBtn.querySelector('.btn-text');
      textSpan.textContent = isCrt ? 'CRT: ON' : 'CRT: OFF';
      crtIcon.className = isCrt ? 'fa-solid fa-tv' : 'fa-solid fa-desktop';
      playSynthSound('click');
    });
  }


  // ==========================================
  // 3. 80s SYNTHWAVE HORIZON GRID CANVAS
  // ==========================================
  const canvas = document.getElementById('synthwaveCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let gridOffset = 0;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawSynthwave() {
      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.52;

      // 1. Draw 80s Retro Neon Sun with horizontal scan cuts
      const sunRadius = Math.min(width, height) * 0.16;
      const sunX = width * 0.5;
      const sunY = horizonY - sunRadius * 0.45;

      const sunGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
      sunGrad.addColorStop(0, '#ffe600');
      sunGrad.addColorStop(0.5, '#ff2a85');
      sunGrad.addColorStop(1, '#9d00ff');

      ctx.save();
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.shadowColor = '#ff2a85';
      ctx.shadowBlur = 40;
      ctx.fill();
      ctx.restore();

      // Sun horizontal slice cuts
      ctx.fillStyle = '#090514';
      const sliceCount = 8;
      for (let i = 0; i < sliceCount; i++) {
        const sliceY = sunY + (i / sliceCount) * sunRadius;
        const sliceH = (i + 1) * 1.8;
        if (sliceY > sunY - sunRadius * 0.1) {
          ctx.fillRect(sunX - sunRadius - 10, sliceY, (sunRadius + 10) * 2, sliceH);
        }
      }

      // 2. Synthwave Horizon Line
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      // 3. Perspective Moving Ground Grid
      gridOffset = (gridOffset + 0.4) % 30;

      // Horizontal grid lines (exponential spacing towards horizon)
      const maxLines = 18;
      for (let i = 0; i < maxLines; i++) {
        const progress = (i + gridOffset / 30) / maxLines;
        const y = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
        const lineAlpha = progress * 0.5;

        ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical perspective lines originating from vanishing point
      const vLines = 24;
      const vSpan = width * 1.6;
      for (let i = 0; i <= vLines; i++) {
        const bottomX = (width - vSpan) / 2 + (i / vLines) * vSpan;
        const topX = sunX + (bottomX - sunX) * 0.05;

        ctx.strokeStyle = 'rgba(255, 42, 133, 0.28)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(topX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      requestAnimationFrame(drawSynthwave);
    }
    requestAnimationFrame(drawSynthwave);
  }


  // ==========================================
  // 4. DYNAMIC TYPING HEADLINE ANIMATION
  // ==========================================
  const typedTextEl = document.getElementById('typedText');
  if (typedTextEl) {
    const phrases = [
      'AI & ML Undergraduate',
      'Python & Data Science Developer',
      'Oasis Infobyte Fellow',
      'Prodigy InfoTech Intern',
      'Generative AI & Prompt Specialist',
      'NCC & NSS Cadet Leader'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const holdTime = 1800;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];
      if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, holdTime);
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, 400);
      } else {
        setTimeout(typeLoop, isDeleting ? deleteSpeed : typeSpeed);
      }
    }
    setTimeout(typeLoop, 600);
  }


  // ==========================================
  // 5. ANIMATED NUMERICAL COUNTERS
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  function runCounterAnimation() {
    if (animatedStats) return;
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 20));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target + '+';
          clearInterval(interval);
        } else {
          stat.textContent = current;
        }
      }, 50);
    });
    animatedStats = true;
  }
  runCounterAnimation();


  // ==========================================
  // 6. INTERACTIVE SIMULATOR 1: SYNTHVOICE AI ASSISTANT
  // ==========================================
  const voiceAssistantLog = document.getElementById('voiceAssistantLog');
  const voiceInput = document.getElementById('voiceInput');
  const voiceSendBtn = document.getElementById('voiceSendBtn');
  const voiceMicBtn = document.getElementById('voiceMicBtn');
  const voiceStatus = document.getElementById('voiceStatus');

  function appendVoiceLog(sender, text, cssClass) {
    if (!voiceAssistantLog) return;
    const line = document.createElement('div');
    line.className = `log-line ${cssClass}`;
    line.textContent = `> [${sender}] ${text}`;
    voiceAssistantLog.appendChild(line);
    voiceAssistantLog.scrollTop = voiceAssistantLog.scrollHeight;
  }

  function speakText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices.find(v => v.lang.includes('en')) || voices[0];
      }
      window.speechSynthesis.speak(utterance);
    }
  }

  function processVoiceQuery(query) {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim().toLowerCase();
    appendVoiceLog('USER', query, 'user');
    playSynthSound('cmd');

    if (voiceStatus) voiceStatus.textContent = 'PROCESSING...';

    setTimeout(() => {
      let responseText = '';

      if (cleanQuery.includes('time') || cleanQuery.includes('date')) {
        const now = new Date();
        responseText = `Current time is ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} on ${now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}.`;
      } else if (cleanQuery.includes('hello') || cleanQuery.includes('hi') || cleanQuery.includes('greeting')) {
        responseText = 'Hello! I am SynthVoice, Anushka Tiwari\'s Python-based AI assistant. How may I assist your mission today?';
      } else if (cleanQuery.includes('weather')) {
        responseText = 'Lucknow live radar: 28°C, Clear Sky, Humidity 64%, Wind 12 km/h. Perfect coding weather!';
      } else if (cleanQuery.includes('search') || cleanQuery.includes('google')) {
        const topic = query.replace(/search|for|google/gi, '').trim() || 'Python AI Development';
        responseText = `Launching browser search protocol for: "${topic}".`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(topic)}`, '_blank');
      } else if (cleanQuery.includes('who are you') || cleanQuery.includes('anushka')) {
        responseText = 'Anushka Tiwari is an AI & ML undergraduate at AKTU with expertise in Python, Data Science, AWS Cloud, and Generative AI.';
      } else if (cleanQuery.includes('reminder') || cleanQuery.includes('timer')) {
        responseText = 'Timer protocol initiated: An audible alert has been scheduled.';
        playSynthSound('success');
      } else {
        responseText = `Command recognized: "${query}". Intent parsed via NLP model and executed successfully.`;
      }

      appendVoiceLog('SYNTHVOICE', responseText, 'bot');
      speakText(responseText);
      playSynthSound('success');
      if (voiceStatus) voiceStatus.textContent = 'READY';
      if (voiceInput) voiceInput.value = '';
    }, 450);
  }

  if (voiceSendBtn && voiceInput) {
    voiceSendBtn.addEventListener('click', () => processVoiceQuery(voiceInput.value));
    voiceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') processVoiceQuery(voiceInput.value);
    });
  }

  document.querySelectorAll('.voice-cmd-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (voiceInput) voiceInput.value = cmd;
      processVoiceQuery(cmd);
    });
  });

  // Web Speech Recognition for TALK button
  if (voiceMicBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        if (voiceStatus) voiceStatus.textContent = 'LISTENING...';
        playSynthSound('hover');
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (voiceInput) voiceInput.value = transcript;
        processVoiceQuery(transcript);
      };
      recognition.onerror = () => {
        if (voiceStatus) voiceStatus.textContent = 'ERROR / RETRY';
      };
      recognition.onend = () => {
        if (voiceStatus && voiceStatus.textContent === 'LISTENING...') voiceStatus.textContent = 'READY';
      };

      voiceMicBtn.addEventListener('click', () => {
        try {
          recognition.start();
        } catch (e) {
          processVoiceQuery('What is the current time and date?');
        }
      });
    } else {
      voiceMicBtn.addEventListener('click', () => {
        processVoiceQuery('What is the current time and date?');
      });
    }
  }


  // ==========================================
  // 7. INTERACTIVE SIMULATOR 2: CYBER BMI CALCULATOR
  // ==========================================
  const bmiWeightInput = document.getElementById('bmiWeight');
  const bmiHeightInput = document.getElementById('bmiHeight');
  const calcBmiBtn = document.getElementById('calcBmiBtn');
  const bmiScoreVal = document.getElementById('bmiScoreVal');
  const bmiCatBadge = document.getElementById('bmiCatBadge');
  const bmiPointer = document.getElementById('bmiPointer');

  function computeBMI() {
    const weight = parseFloat(bmiWeightInput?.value);
    const heightCm = parseFloat(bmiHeightInput?.value);

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
      alert('Please enter valid positive numbers for weight (kg) and height (cm).');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM));
    const bmiRounded = bmi.toFixed(2);

    if (bmiScoreVal) bmiScoreVal.textContent = bmiRounded;

    let category = '';
    let catClass = '';
    let pointerPercent = 50;

    if (bmi < 18.5) {
      category = 'UNDERWEIGHT (< 18.5)';
      catClass = 'under';
      pointerPercent = Math.max(8, (bmi / 18.5) * 25);
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = 'NORMAL WEIGHT (18.5 - 24.9)';
      catClass = 'normal';
      pointerPercent = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25;
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = 'OVERWEIGHT (25.0 - 29.9)';
      catClass = 'over';
      pointerPercent = 50 + ((bmi - 25) / (29.9 - 25)) * 25;
    } else {
      category = 'OBESE (≥ 30.0)';
      catClass = 'obese';
      pointerPercent = Math.min(92, 75 + ((bmi - 30) / 15) * 25);
    }

    if (bmiCatBadge) {
      bmiCatBadge.textContent = category;
      bmiCatBadge.className = `bmi-cat-badge font-mono ${catClass}`;
    }
    if (bmiPointer) {
      bmiPointer.style.left = `${pointerPercent}%`;
    }

    playSynthSound('success');
  }

  if (calcBmiBtn) {
    calcBmiBtn.addEventListener('click', computeBMI);
  }


  // ==========================================
  // 8. INTERACTIVE SIMULATOR 3: QUANTUM CSPRNG PASSWORD GENERATOR
  // ==========================================
  const passLengthSlider = document.getElementById('passLengthSlider');
  const lengthValue = document.getElementById('lengthValue');
  const chkUpper = document.getElementById('chkUpper');
  const chkLower = document.getElementById('chkLower');
  const chkNumbers = document.getElementById('chkNumbers');
  const chkSymbols = document.getElementById('chkSymbols');
  const chkExcludeAmbiguous = document.getElementById('chkExcludeAmbiguous');
  const generatePassBtn = document.getElementById('generatePassBtn');
  const generatedPassword = document.getElementById('generatedPassword');
  const copyPassBtn = document.getElementById('copyPassBtn');
  const strengthLabel = document.getElementById('strengthLabel');
  const strengthBar = document.getElementById('strengthBar');

  if (passLengthSlider && lengthValue) {
    passLengthSlider.addEventListener('input', (e) => {
      lengthValue.textContent = e.target.value;
      generateSecurePassword();
    });
  }

  function generateSecurePassword() {
    const length = parseInt(passLengthSlider?.value || 16, 10);
    const useUpper = chkUpper?.checked ?? true;
    const useLower = chkLower?.checked ?? true;
    const useNum = chkNumbers?.checked ?? true;
    const useSym = chkSymbols?.checked ?? true;
    const excludeAmbiguous = chkExcludeAmbiguous?.checked ?? false;

    let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    let numChars = '0123456789';
    let symChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      upperChars = upperChars.replace(/[O]/g, '');
      lowerChars = lowerChars.replace(/[l]/g, '');
      numChars = numChars.replace(/[01]/g, '');
    }

    let charPool = '';
    const guaranteedChars = [];

    // Web Crypto CSPRNG helper
    function getRandomChar(str) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return str[array[0] % str.length];
    }

    if (useUpper) { charPool += upperChars; guaranteedChars.push(getRandomChar(upperChars)); }
    if (useLower) { charPool += lowerChars; guaranteedChars.push(getRandomChar(lowerChars)); }
    if (useNum) { charPool += numChars; guaranteedChars.push(getRandomChar(numChars)); }
    if (useSym) { charPool += symChars; guaranteedChars.push(getRandomChar(symChars)); }

    if (charPool === '') {
      if (generatedPassword) generatedPassword.value = 'SELECT >= 1 CHARSET';
      return;
    }

    let password = [...guaranteedChars];
    for (let i = password.length; i < length; i++) {
      password.push(getRandomChar(charPool));
    }

    // Cryptographic Shuffle (Fisher-Yates via CSPRNG)
    for (let i = password.length - 1; i > 0; i--) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const j = array[0] % (i + 1);
      [password[i], password[j]] = [password[j], password[i]];
    }

    const finalPass = password.join('');
    if (generatedPassword) generatedPassword.value = finalPass;

    // Evaluate Strength
    let poolSize = charPool.length;
    const entropy = Math.round(length * Math.log2(poolSize));

    if (entropy < 45) {
      if (strengthLabel) strengthLabel.textContent = `WEAK (${entropy}-bit entropy)`;
      if (strengthBar) { strengthBar.className = 'meter-bar-fill weak'; strengthBar.style.width = '30%'; }
    } else if (entropy < 75) {
      if (strengthLabel) strengthLabel.textContent = `MEDIUM (${entropy}-bit entropy)`;
      if (strengthBar) { strengthBar.className = 'meter-bar-fill medium'; strengthBar.style.width = '65%'; }
    } else {
      if (strengthLabel) strengthLabel.textContent = `VERY STRONG (${entropy}-bit CSPRNG)`;
      if (strengthBar) { strengthBar.className = 'meter-bar-fill strong'; strengthBar.style.width = '100%'; }
    }
  }

  if (generatePassBtn) {
    generatePassBtn.addEventListener('click', () => {
      generateSecurePassword();
      playSynthSound('click');
    });
  }

  [chkUpper, chkLower, chkNumbers, chkSymbols, chkExcludeAmbiguous].forEach(chk => {
    if (chk) chk.addEventListener('change', generateSecurePassword);
  });

  if (copyPassBtn && generatedPassword) {
    copyPassBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(generatedPassword.value).then(() => {
        copyPassBtn.innerHTML = '<i class="fa-solid fa-check"></i> COPIED!';
        playSynthSound('success');
        setTimeout(() => {
          copyPassBtn.innerHTML = '<i class="fa-regular fa-copy"></i> COPY';
        }, 1800);
      });
    });
  }

  // Initial call
  generateSecurePassword();


  // ==========================================
  // 9. INTERACTIVE SIMULATOR 4: NEON WEATHER RADAR
  // ==========================================
  const weatherCityInput = document.getElementById('weatherCityInput');
  const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
  const weatherCityName = document.getElementById('weatherCityName');
  const weatherDesc = document.getElementById('weatherDesc');
  const weatherTemp = document.getElementById('weatherTemp');
  const weatherHumidity = document.getElementById('weatherHumidity');
  const weatherWind = document.getElementById('weatherWind');
  const weatherPressure = document.getElementById('weatherPressure');
  const weatherIcon = document.getElementById('weatherIcon');
  const unitCBtn = document.getElementById('unitCBtn');
  const unitFBtn = document.getElementById('unitFBtn');
  const fTemp1 = document.getElementById('fTemp1');
  const fTemp2 = document.getElementById('fTemp2');
  const fTemp3 = document.getElementById('fTemp3');

  let currentTempC = 28;
  let isCelsius = true;

  const mockCityData = {
    'lucknow': { temp: 28, desc: 'Clear Sky & Mild Breeze', humidity: '64%', wind: '12 km/h', pressure: '1012 hPa', icon: 'fa-sun' },
    'varanasi': { temp: 30, desc: 'Hazy Sunshine', humidity: '70%', wind: '9 km/h', pressure: '1010 hPa', icon: 'fa-cloud-sun' },
    'delhi': { temp: 32, desc: 'Sunny & Warm', humidity: '55%', wind: '14 km/h', pressure: '1008 hPa', icon: 'fa-sun' },
    'mumbai': { temp: 29, desc: 'Coastal Humid & Scattered Clouds', humidity: '82%', wind: '18 km/h', pressure: '1013 hPa', icon: 'fa-cloud-sun' },
    'london': { temp: 18, desc: 'Light Drizzle & Fog', humidity: '88%', wind: '15 km/h', pressure: '1016 hPa', icon: 'fa-cloud-rain' },
    'new york': { temp: 22, desc: 'Partly Cloudy', humidity: '60%', wind: '16 km/h', pressure: '1015 hPa', icon: 'fa-cloud' },
    'tokyo': { temp: 24, desc: 'Clear Night Sky', humidity: '65%', wind: '10 km/h', pressure: '1014 hPa', icon: 'fa-moon' }
  };

  function updateWeatherUI(cityName, data) {
    currentTempC = data.temp;
    const displayTemp = isCelsius ? `${currentTempC}°C` : `${Math.round(currentTempC * 1.8 + 32)}°F`;

    if (weatherCityName) weatherCityName.textContent = cityName.toUpperCase();
    if (weatherDesc) weatherDesc.textContent = data.desc;
    if (weatherTemp) weatherTemp.textContent = displayTemp;
    if (weatherHumidity) weatherHumidity.textContent = data.humidity;
    if (weatherWind) weatherWind.textContent = data.wind;
    if (weatherPressure) weatherPressure.textContent = data.pressure;
    if (weatherIcon) weatherIcon.className = `fa-solid ${data.icon}`;

    if (fTemp1) fTemp1.textContent = isCelsius ? `${currentTempC + 1}°C` : `${Math.round((currentTempC + 1) * 1.8 + 32)}°F`;
    if (fTemp2) fTemp2.textContent = isCelsius ? `${currentTempC + 3}°C` : `${Math.round((currentTempC + 3) * 1.8 + 32)}°F`;
    if (fTemp3) fTemp3.textContent = isCelsius ? `${currentTempC - 1}°C` : `${Math.round((currentTempC - 1) * 1.8 + 32)}°F`;
  }

  function fetchWeather() {
    const city = (weatherCityInput?.value || 'Lucknow').trim().toLowerCase();
    playSynthSound('cmd');

    const matchedData = mockCityData[city] || {
      temp: 26 + (city.length % 7),
      desc: 'Satellite Radar Feed Online',
      humidity: `${55 + (city.length * 3) % 30}%`,
      wind: `${10 + (city.length * 2) % 15} km/h`,
      pressure: '1012 hPa',
      icon: 'fa-cloud-sun'
    };

    updateWeatherUI(city, matchedData);
    playSynthSound('success');
  }

  if (fetchWeatherBtn) {
    fetchWeatherBtn.addEventListener('click', fetchWeather);
  }
  if (weatherCityInput) {
    weatherCityInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') fetchWeather();
    });
  }

  if (unitCBtn && unitFBtn) {
    unitCBtn.addEventListener('click', () => {
      if (!isCelsius) {
        isCelsius = true;
        unitCBtn.classList.add('active');
        unitFBtn.classList.remove('active');
        fetchWeather();
      }
    });

    unitFBtn.addEventListener('click', () => {
      if (isCelsius) {
        isCelsius = false;
        unitFBtn.classList.add('active');
        unitCBtn.classList.remove('active');
        fetchWeather();
      }
    });
  }


  // ==========================================
  // 10. PROJECT FILTERING ENGINE
  // ==========================================
  const filterBtns = document.querySelectorAll('#projectFilterGroup .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-bento-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playSynthSound('click');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ==========================================
  // 11. 80s RETRO CLI MAINFRAME TERMINAL
  // ==========================================
  const cliInput = document.getElementById('cliInput');
  const cliScreen = document.getElementById('cliScreen');
  const quickTerminalBtn = document.getElementById('quickTerminalBtn');

  function appendCliLine(text, type = 'resp') {
    if (!cliScreen) return;
    const line = document.createElement('div');
    line.className = `cli-line ${type}`;
    line.innerHTML = text;
    cliScreen.appendChild(line);
    cliScreen.scrollTop = cliScreen.scrollHeight;
  }

  function handleCliCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    appendCliLine(`guest@anushka-os:~$ ${cmd}`, 'user-cmd');
    playSynthSound('cmd');

    const commands = {
      'help': `>> AVAILABLE MAINFRAME COMMANDS:<br>
&nbsp;&nbsp;• <strong>projects</strong> &nbsp;&nbsp;&nbsp;&nbsp;: List Python & GitHub engineering projects<br>
&nbsp;&nbsp;• <strong>skills</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Inspect technical capability matrix<br>
&nbsp;&nbsp;• <strong>internships</strong> : Display Oasis Infobyte & Prodigy InfoTech records<br>
&nbsp;&nbsp;• <strong>creds</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: View certified credentials (IIT Madras, AWS, HP LIFE)<br>
&nbsp;&nbsp;• <strong>resume</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Launch CV inspection dialog<br>
&nbsp;&nbsp;• <strong>matrix</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Trigger 80s cyber visualizer effect<br>
&nbsp;&nbsp;• <strong>github</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Open official GitHub profile in new tab<br>
&nbsp;&nbsp;• <strong>contact</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Show email and phone coordinates<br>
&nbsp;&nbsp;• <strong>clear</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Purge terminal viewport`,

      'projects': `>> PYTHON & GITHUB REPOSITORIES SUITE:<br>
1. <strong>SynthVoice AI Assistant</strong> (Python, SpeechRecognition, pyttsx3, NLP)<br>
2. <strong>Cyber BMI Health Matrix</strong> (Python, Tkinter, Matplotlib, SQLite)<br>
3. <strong>Quantum CSPRNG Keygen</strong> (Python secrets, CSPRNG, Tkinter)<br>
4. <strong>Neon Meteo Radar Station</strong> (Python, Requests, OpenWeather REST API)<br>
5. <strong>DataScience-Analytics-Lab</strong> (Jupyter, Pandas, Scikit-Learn)<br>
>> Direct Codebase: <a href="https://github.com/tiwarianushka242-glitch" target="_blank" style="color:var(--neon-cyan)">github.com/tiwarianushka242-glitch</a>`,

      'skills': `>> TECHNICAL STACK REPORT:<br>
• Languages: Python (92%), C Programming (85%), OOP Fundamentals (90%)<br>
• AI / Data : Machine Learning, Data Analytics, Generative AI, Prompt Engineering<br>
• Cloud/Tools: AWS Fundamentals, Amazon Q, Git, GitHub, VS Code, Linux CLI`,

      'internships': `>> VERIFIED INTERNSHIP RECORDS:<br>
1. <strong>OASIS INFOBYTE</strong> [OIB/T2/IP3403]: Python Programming Fellow (Aug 2026)<br>
2. <strong>PRODIGY INFOTECH</strong> [CIN: PIT/AUG26/01174]: Data Science Intern (Aug 2026)`,

      'creds': `>> CREDENTIALS VAULT:<br>
• NPTEL IIT Madras: Python for Data Science (Elite)<br>
• HP LIFE: AI for Business Professionals & Data Science Analytics<br>
• AWS: Amazon Q Learning Plan<br>
• NoviTech: Data Analytics & Full Stack MasterClass<br>
• EduPyramids / SINE IIT Bombay: C Programming Certification<br>
• NIELIT & NCC: Basic Cyber Course`,

      'contact': `>> TRANSMISSION COORDINATES:<br>
• Email: tiwarianushka242@gmail.com<br>
• Phone: +91 9696489045<br>
• LeetCode: leetcode.com/u/9696anusHka-23<br>
• HackerRank: hackerrank.com/profile/tiwarianushka242`,

      'github': `>> Opening GitHub repository portal...`,

      'resume': `>> Launching CV modal...`,

      'matrix': `>> [SYS_MSG] 80s Synthwave grid frequency overclocked to 1986 MHz! ⚡`,

      'clear': '__CLEAR__'
    };

    if (trimmed === 'clear') {
      if (cliScreen) cliScreen.innerHTML = '';
      return;
    }

    if (trimmed === 'resume') {
      openResumeModal();
      appendCliLine(commands['resume'], 'sys');
      return;
    }

    if (trimmed === 'github') {
      window.open('https://github.com/tiwarianushka242-glitch', '_blank');
      appendCliLine(commands['github'], 'sys');
      return;
    }

    if (commands[trimmed]) {
      appendCliLine(commands[trimmed], 'resp');
      playSynthSound('success');
    } else {
      appendCliLine(`>> Unrecognized command: '${cmd}'. Type <span class="cmd-highlight">'help'</span> for instructions.`, 'err');
    }
  }

  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cliInput.value;
        cliInput.value = '';
        handleCliCommand(val);
      }
    });
  }

  if (quickTerminalBtn) {
    quickTerminalBtn.addEventListener('click', () => {
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { if (cliInput) cliInput.focus(); }, 600);
      }
      playSynthSound('click');
    });
  }


  // ==========================================
  // 12. CONTACT FORM SIMULATOR
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Guest';
      const email = document.getElementById('contactEmail')?.value;
      const subject = document.getElementById('contactSubject')?.value;
      const msg = document.getElementById('contactMsg')?.value;

      playSynthSound('success');
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<i class="fa-solid fa-check-circle"></i> TRANSMISSION CONFIRMED! Thank you ${name}. Your packet has been received. You can also directly reach Anushka at <strong>tiwarianushka242@gmail.com</strong>.`;
      }
      contactForm.reset();
    });
  }


  // ==========================================
  // 13. INTERACTIVE RESUME MODAL & PRINT HANDLER
  // ==========================================
  const resumeModal = document.getElementById('resumeModal');
  const openResumeModalBtn = document.getElementById('openResumeModalBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const resumeBackdrop = document.getElementById('resumeBackdrop');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      resumeModal.setAttribute('aria-hidden', 'false');
      playSynthSound('click');
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      resumeModal.setAttribute('aria-hidden', 'true');
      playSynthSound('click');
    }
  }

  if (openResumeModalBtn) openResumeModalBtn.addEventListener('click', openResumeModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResumeModal);
  if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResumeModal);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('open')) {
      closeResumeModal();
    }
  });


  // ==========================================
  // 14. ACTIVE SECTION HIGHLIGHT ON SCROLL
  // ==========================================
  const navLinks = document.querySelectorAll('.hud-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  });

});
