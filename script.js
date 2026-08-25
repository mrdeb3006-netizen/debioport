/**
 * ============================================================================
 * MR DEB - FUTURISTIC PORTFOLIO ENGINE & INTERACTIVE SYSTEMS
 * ============================================================================
 */

(function() {
  'use strict';

  // ==========================================================================
  // 1. DOCTOR STRANGE MYSTIC RING CURSOR SYSTEM (Compact & Subtle Magic)
  // ==========================================================================
  class DoctorStrangeCursor {
    constructor() {
      this.container = document.getElementById('magic-cursor-container');
      this.canvas = document.getElementById('magic-cursor-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.sparks = [];

      // Coordinates
      this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.lastPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.speed = 0;

      // Rotation & Angles
      this.angleOuter = 0;
      this.angleInner = 0;
      this.angleMiddle = 0;

      // Interaction States (Compact 18px Base Radius)
      this.isHovering = false;
      this.isClicking = false;
      this.baseRadius = 18;
      this.currentRadius = 18;
      this.targetRadius = 18;
      this.hoverMultiplier = 1;

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());

      // Track Mouse
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.emitMovementSparks(e.clientX, e.clientY);
      });

      // Mouse Down / Up (Subtle Spell Burst)
      window.addEventListener('mousedown', () => {
        this.isClicking = true;
        this.createSpellBurst(this.pos.x, this.pos.y);
      });

      window.addEventListener('mouseup', () => {
        this.isClicking = false;
      });

      // Hover Detections for Interactive Elements
      this.setupHoverListeners();

      // Start Render Loop
      this.render();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    setupHoverListeners() {
      const interactiveSelector = 'a, button, input, textarea, .interactive-skill-tag, .social-icon-btn, .nav-link, .btn-primary, .btn-secondary, .btn-talk, [role="button"]';
      
      const addListeners = () => {
        const elements = document.querySelectorAll(interactiveSelector);
        elements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            this.isHovering = true;
            this.targetRadius = 26;
            this.hoverMultiplier = 1.4;
          });
          el.addEventListener('mouseleave', () => {
            this.isHovering = false;
            this.targetRadius = 18;
            this.hoverMultiplier = 1;
          });
        });
      };

      addListeners();
      const observer = new MutationObserver(() => addListeners());
      observer.observe(document.body, { childList: true, subtree: true });
    }

    emitMovementSparks(x, y) {
      const dist = Math.hypot(x - this.lastPos.x, y - this.lastPos.y);
      this.speed = dist;
      this.lastPos.x = x;
      this.lastPos.y = y;

      const count = Math.min(Math.floor(dist * 0.25) + (this.isHovering ? 1 : 0), 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * (dist * 0.08 + 1.2) + 0.8;
        const sparkType = Math.random() > 0.4 ? 'gold' : (Math.random() > 0.5 ? 'cyan' : 'orange');
        
        this.sparks.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 2.2 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.035 + 0.02,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.2,
          type: sparkType
        });
      }
    }

    createSpellBurst(x, y) {
      const burstCount = 14;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 4.5 + 2.5;
        this.sparks.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.8,
          alpha: 1,
          decay: Math.random() * 0.04 + 0.025,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.3,
          type: i % 2 === 0 ? 'cyan' : 'magenta'
        });
      }

      this.particles.push({
        x: x,
        y: y,
        radius: this.currentRadius * 0.8,
        maxRadius: this.currentRadius * 2.5,
        alpha: 0.9,
        decay: 0.05
      });
    }

    drawTaoMandalaRing(x, y, radius) {
      const ctx = this.ctx;
      ctx.save();
      ctx.translate(x, y);

      const rotSpeed = (0.018 + this.speed * 0.0006) * this.hoverMultiplier;
      this.angleOuter += rotSpeed;
      this.angleInner -= rotSpeed * 1.35;
      this.angleMiddle += rotSpeed * 0.85;

      // 1. Outer Sparkle Track Ring
      ctx.save();
      ctx.rotate(this.angleOuter);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      const glyphCount = 6;
      for (let i = 0; i < glyphCount; i++) {
        const theta = (Math.PI * 2 / glyphCount) * i;
        const gx = Math.cos(theta) * radius;
        const gy = Math.sin(theta) * radius;

        ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#d946ef';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. Middle Geometric Star
      ctx.save();
      ctx.rotate(this.angleMiddle);
      const innerR = radius * 0.72;
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.85)';
      ctx.shadowColor = '#d946ef';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 4]);

      ctx.beginPath();
      ctx.arc(0, 0, innerR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const theta = (Math.PI / 2) * i;
        const x1 = Math.cos(theta) * innerR;
        const y1 = Math.sin(theta) * innerR;
        const x2 = Math.cos(theta + Math.PI / 2) * innerR;
        const y2 = Math.sin(theta + Math.PI / 2) * innerR;
        if (i === 0) ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.restore();

      // 3. Center Core Spell Focus
      ctx.save();
      ctx.rotate(this.angleInner);
      const coreR = radius * 0.38;
      ctx.strokeStyle = '#fff3b0';
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = this.isHovering ? '#00f0ff' : '#ffffff';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();
    }

    drawSparks() {
      const ctx = this.ctx;

      for (let i = this.sparks.length - 1; i >= 0; i--) {
        const s = this.sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05;
        s.vx *= 0.97;
        s.alpha -= s.decay;
        s.rotation += s.spin;

        if (s.alpha <= 0) {
          this.sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = Math.max(0, s.alpha);

        let color = '#ffb703';
        let glow = '#fb8500';
        if (s.type === 'cyan') {
          color = '#00f0ff';
          glow = '#0099ff';
        } else if (s.type === 'magenta') {
          color = '#d946ef';
          glow = '#9d4edd';
        } else if (s.type === 'gold') {
          color = '#fff3b0';
          glow = '#ffb703';
        }

        ctx.fillStyle = color;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(0, -s.size);
        ctx.lineTo(s.size * 0.5, 0);
        ctx.lineTo(0, s.size);
        ctx.lineTo(-s.size * 0.5, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    drawShockwaves() {
      const ctx = this.ctx;
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.radius += (p.maxRadius - p.radius) * 0.14 + 0.8;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.8 * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const lerpFactor = 0.24;
      this.pos.x += (this.mouse.x - this.pos.x) * lerpFactor;
      this.pos.y += (this.mouse.y - this.pos.y) * lerpFactor;

      this.currentRadius += (this.targetRadius - this.currentRadius) * 0.18;

      this.drawSparks();
      this.drawShockwaves();
      this.drawTaoMandalaRing(this.pos.x, this.pos.y, this.currentRadius);

      requestAnimationFrame(() => this.render());
    }
  }

  // ==========================================================================
  // 2. HUD SCROLL PROGRESS & SCROLL REVEAL OBSERVER
  // ==========================================================================
  function setupScrollInteractions() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // 1. Reveal on scroll observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Scroll Spy & Progress Bar
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (progressBar && docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        progressBar.style.width = `${progress}%`;
      }

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            if (link.dataset.nav === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    });
  }

  // ==========================================================================
  // 3. SPECULAR LIGHTING TRACKER FOR CARDS
  // ==========================================================================
  function setupSpecularLighting() {
    const cards = document.querySelectorAll('.info-block-card, .case-study-item, .experience-card-item, .skill-category-card, .contact-info-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // ==========================================================================
  // 4. CASE STUDY 01: CONSTELLATION CANVAS SIMULATION
  // ==========================================================================
  function setupConstellationCanvas() {
    const canvas = document.getElementById('canvas-case-01');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 28;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    }

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(0, 240, 255, 0.8)' : 'rgba(217, 70, 239, 0.8)'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ==========================================================================
  // 5. CASE STUDY 02: LIVE DSA SORTING VISUALIZER ENGINE
  // ==========================================================================
  function setupDsaVisualizer() {
    const container = document.getElementById('sorting-bars-container');
    const algoLabel = document.getElementById('dsa-algo-name');
    const statsLabel = document.getElementById('dsa-stats');
    const btnQuick = document.getElementById('viz-btn-quick');
    const btnBubble = document.getElementById('viz-btn-bubble');
    const btnShuffle = document.getElementById('viz-btn-shuffle');

    if (!container) return;

    const numBars = 16;
    let array = [];
    let isSorting = false;
    let comparisons = 0;
    let swaps = 0;

    function initArray() {
      if (isSorting) return;
      array = [];
      comparisons = 0;
      swaps = 0;
      updateStats();

      for (let i = 0; i < numBars; i++) {
        array.push(Math.floor(Math.random() * 75) + 20);
      }
      renderBars();
    }

    function renderBars() {
      container.innerHTML = '';
      array.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'sort-bar';
        bar.id = `sort-bar-${idx}`;
        bar.style.height = `${val}%`;
        container.appendChild(bar);
      });
    }

    function updateStats(algo = 'Ready') {
      if (statsLabel) {
        statsLabel.textContent = `Comparisons: ${comparisons} | Swaps: ${swaps}`;
      }
      if (algoLabel && algo !== 'Ready') {
        algoLabel.textContent = algo;
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function bubbleSort() {
      if (isSorting) return;
      isSorting = true;
      updateStats('Algorithm: BubbleSort / O(N²)');
      btnBubble.classList.add('viz-btn-active');
      btnQuick.classList.remove('viz-btn-active');

      const n = array.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          const bar1 = document.getElementById(`sort-bar-${j}`);
          const bar2 = document.getElementById(`sort-bar-${j + 1}`);

          if (bar1 && bar2) {
            bar1.classList.add('sort-comparing');
            bar2.classList.add('sort-comparing');
          }

          await sleep(55);

          if (array[j] > array[j + 1]) {
            swaps++;
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;

            if (bar1 && bar2) {
              bar1.classList.add('sort-swapping');
              bar2.classList.add('sort-swapping');
              bar1.style.height = `${array[j]}%`;
              bar2.style.height = `${array[j + 1]}%`;
            }
            await sleep(55);
          }

          if (bar1 && bar2) {
            bar1.classList.remove('sort-comparing', 'sort-swapping');
            bar2.classList.remove('sort-comparing', 'sort-swapping');
          }
          updateStats('Algorithm: BubbleSort / O(N²)');
        }
        const sortedBar = document.getElementById(`sort-bar-${n - 1 - i}`);
        if (sortedBar) sortedBar.classList.add('sort-sorted');
      }

      const firstBar = document.getElementById('sort-bar-0');
      if (firstBar) firstBar.classList.add('sort-sorted');

      isSorting = false;
      updateStats('BubbleSort Complete! ✓');
    }

    async function partition(low, high) {
      const pivot = array[high];
      const pivotBar = document.getElementById(`sort-bar-${high}`);
      if (pivotBar) pivotBar.classList.add('sort-comparing');

      let i = low - 1;
      for (let j = low; j < high; j++) {
        comparisons++;
        const barJ = document.getElementById(`sort-bar-${j}`);
        if (barJ) barJ.classList.add('sort-comparing');

        await sleep(50);

        if (array[j] < pivot) {
          i++;
          swaps++;
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;

          const barI = document.getElementById(`sort-bar-${i}`);
          if (barI && barJ) {
            barI.style.height = `${array[i]}%`;
            barJ.style.height = `${array[j]}%`;
            barI.classList.add('sort-swapping');
          }
          await sleep(50);
          if (barI) barI.classList.remove('sort-swapping');
        }

        if (barJ) barJ.classList.remove('sort-comparing');
        updateStats('Algorithm: QuickSort / O(N log N)');
      }

      swaps++;
      const temp = array[i + 1];
      array[i + 1] = array[high];
      array[high] = temp;

      const barNext = document.getElementById(`sort-bar-${i + 1}`);
      if (barNext && pivotBar) {
        barNext.style.height = `${array[i + 1]}%`;
        pivotBar.style.height = `${array[high]}%`;
        barNext.classList.add('sort-sorted');
      }

      if (pivotBar) pivotBar.classList.remove('sort-comparing');
      await sleep(50);

      return i + 1;
    }

    async function quickSortRecursive(low, high) {
      if (low < high) {
        const pi = await partition(low, high);
        await quickSortRecursive(low, pi - 1);
        await quickSortRecursive(pi + 1, high);
      } else if (low >= 0 && low < array.length) {
        const singleBar = document.getElementById(`sort-bar-${low}`);
        if (singleBar) singleBar.classList.add('sort-sorted');
      }
    }

    async function runQuickSort() {
      if (isSorting) return;
      isSorting = true;
      btnQuick.classList.add('viz-btn-active');
      btnBubble.classList.remove('viz-btn-active');
      updateStats('Algorithm: QuickSort / O(N log N)');

      await quickSortRecursive(0, array.length - 1);

      document.querySelectorAll('.sort-bar').forEach(b => b.classList.add('sort-sorted'));
      isSorting = false;
      updateStats('QuickSort Complete! ✓');
    }

    initArray();

    if (btnShuffle) btnShuffle.addEventListener('click', () => initArray());
    if (btnBubble) btnBubble.addEventListener('click', () => bubbleSort());
    if (btnQuick) btnQuick.addEventListener('click', () => runQuickSort());
  }

  // ==========================================================================
  // 6. CASE STUDY 03: NEXUS AI PROMPT STREAMER
  // ==========================================================================
  function setupNexusAiSimulator() {
    const chips = document.querySelectorAll('.nexus-chip');
    const userBubble = document.getElementById('nexus-user-bubble');
    const aiText = document.getElementById('nexus-ai-text');
    const metrics = document.getElementById('nexus-metrics');

    if (!chips.length || !aiText) return;

    const responses = {
      'dsa': {
        prompt: '> Explain Data Structures in 1 sentence',
        response: 'Data Structures organize memory efficiently so algorithms can process, query, and transform information with optimal time and space complexity.'
      },
      'clean-code': {
        prompt: '> What is Clean Code Rule #1?',
        response: 'Write code for humans first: clarity, readability, and predictable behavior always trump cleverness or unnecessary obscurity.'
      },
      'future': {
        prompt: '> What defines the future of software engineering?',
        response: 'Engineers orchestrating intelligent multi-agent systems, designing resilient architectures, and combining algorithmic depth with fluid human experiences.'
      }
    };

    let isTyping = false;

    async function streamResponse(key) {
      if (isTyping || !responses[key]) return;
      isTyping = true;

      const data = responses[key];
      if (userBubble) userBubble.textContent = data.prompt;
      aiText.textContent = '';
      if (metrics) metrics.innerHTML = '<span>Latency: 8ms</span> • <span style="color: #00f0ff;">Status: Streaming Response...</span>';

      const text = data.response;
      for (let i = 0; i < text.length; i++) {
        aiText.textContent += text[i];
        await new Promise(r => setTimeout(r, 14));
      }

      if (metrics) {
        metrics.innerHTML = '<span>Latency: 8ms</span> • <span>Tokens/s: 154.2</span> • <span style="color: #22c55e;">Status: Complete ✓</span>';
      }
      isTyping = false;
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const pKey = chip.dataset.prompt;
        streamResponse(pKey);
      });
    });
  }

  // ==========================================================================
  // 7. CASE STUDY 04: INTERACTIVE CLI TERMINAL
  // ==========================================================================
  function setupTerminalSimulator() {
    const history = document.getElementById('term-history');
    const input = document.getElementById('term-input');
    const cmdBtns = document.querySelectorAll('.term-btn-cmd');

    if (!history || !input) return;

    function executeCommand(rawCmd) {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      const userLine = document.createElement('div');
      userLine.className = 'term-line';
      userLine.innerHTML = `<span class="term-green">$</span> ${rawCmd}`;
      history.appendChild(userLine);

      let responseHtml = '';
      switch (cmd) {
        case 'status':
          responseHtml = '<div class="term-line term-cyan">[OK] All services running at 100% efficiency. 0 active alerts.</div>';
          break;
        case 'benchmark':
        case 'bench':
          responseHtml = '<div class="term-line term-dim">[BENCH] Execution time: 1.4ms | Memory: 42MB | CPU: 0.8%</div>';
          break;
        case 'clean':
          responseHtml = '<div class="term-line term-green">[CLEAN] Workspace cache cleared (18 temporary artifacts removed).</div>';
          break;
        case 'help':
          responseHtml = '<div class="term-line term-dim">Available commands: status, benchmark, clean, clear, whoami, skills, help</div>';
          break;
        case 'whoami':
          responseHtml = '<div class="term-line term-cyan">Debendra (MR DEB) • Developer • Problem Solver</div>';
          break;
        case 'skills':
          responseHtml = '<div class="term-line term-dim">Java, Python, C, DSA, Algorithms, Web Dev, Canvas 2D, Git</div>';
          break;
        case 'clear':
          history.innerHTML = '';
          return;
        default:
          responseHtml = `<div class="term-line term-dim">Command '${rawCmd}' executed. Type 'help' for available commands.</div>`;
          break;
      }

      const respDiv = document.createElement('div');
      respDiv.innerHTML = responseHtml;
      history.appendChild(respDiv);
      history.scrollTop = history.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        input.value = '';
        executeCommand(val);
      }
    });

    cmdBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        executeCommand(btn.dataset.cmd);
      });
    });
  }

  // ==========================================================================
  // 8. PROJECT DEEP-DIVE MODAL SYSTEM
  // ==========================================================================
  function setupProjectModals() {
    const modal = document.getElementById('modal-project-detail');
    const badge = document.getElementById('project-detail-badge');
    const title = document.getElementById('project-detail-title');
    const overview = document.getElementById('project-detail-overview');
    const highlights = document.getElementById('project-detail-highlights');
    const tags = document.getElementById('project-detail-tags');

    if (!modal) return;

    const projectData = {
      '01': {
        badge: '// CASE STUDY 01',
        title: 'PORTFOLIO WEBSITE & INTERACTIVE ENGINE',
        overview: 'An editorial, high-performance portfolio crafted from scratch without bloated frameworks. Integrates custom Canvas 2D particle simulation, responsive typography, and fluid visual hierarchy.',
        highlights: [
          'Engineered custom Doctor Strange Tao Mandala mathematical particle cursor in 60fps Canvas 2D.',
          'Zero cumulative layout shift (CLS 0) with modular CSS custom property design system.',
          'Fluid scroll spy and subtle hardware-accelerated entrance reveals.'
        ],
        tags: ['JAVA', 'WEB DEV', 'CANVAS 2D', 'DESIGN', 'HTML5 / CSS3']
      },
      '02': {
        badge: '// CASE STUDY 02',
        title: 'ALGORITHM & DSA VISUALIZER',
        overview: 'An interactive algorithm simulator designed to help students and developers visualize data structure transformations, sorting efficiency, and asymptotic complexity in real time.',
        highlights: [
          'Visualizes QuickSort, BubbleSort, and Tree Traversals with color-coded comparison states.',
          'Tracks real-time telemetry: element swap counts, comparison overhead, and runtime step delays.',
          'Clean object-oriented algorithmic implementations in Java and Python.'
        ],
        tags: ['JAVA', 'PYTHON', 'DATA STRUCTURES', 'ALGORITHMS', 'JAVASCRIPT']
      },
      '03': {
        badge: '// CASE STUDY 03',
        title: 'NEXUS AI CONVERSATIONAL HUB',
        overview: 'A full-stack conversational intelligence client integrating modern generative AI models, streaming responses, and responsive UI controls.',
        highlights: [
          'Live token streaming using asynchronous fetch and server-sent events.',
          'Sub-20ms interface latency simulation with graceful loading and markdown formatting.',
          'Structured prompt templates designed for developer productivity and learning.'
        ],
        tags: ['PYTHON', 'JAVASCRIPT', 'REST APIS', 'GEMINI API', 'ASYNC IO']
      },
      '04': {
        badge: '// CASE STUDY 04',
        title: 'CYBER AUTOMATION SUITE',
        overview: 'A suite of developer productivity tools and shell scripts engineered to streamline repetitive batch tasks, workspace directory transforms, and build pipelines.',
        highlights: [
          'CLI utility architecture handling batch file conversions and format verification.',
          'Interactive web terminal simulation for real-time telemetry inspection.',
          'Portable execution scripts written in Python, Java, and Bash.'
        ],
        tags: ['PYTHON', 'JAVA', 'BASH', 'GIT', 'PROBLEM SOLVING']
      }
    };

    function openProject(id) {
      const p = projectData[id];
      if (!p) return;

      badge.textContent = p.badge;
      title.textContent = p.title;
      overview.textContent = p.overview;

      highlights.innerHTML = '';
      p.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        highlights.appendChild(li);
      });

      tags.innerHTML = '';
      p.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'case-tech-pill';
        span.textContent = t;
        tags.appendChild(span);
      });

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    document.querySelectorAll('.open-project-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.dataset.projectTarget;
        openProject(targetId);
      });
    });
  }

  // ==========================================================================
  // 9. INTERACTIVE SKILL MATRIX & FILTERING
  // ==========================================================================
  function setupSkillFilter() {
    const skillTags = document.querySelectorAll('.interactive-skill-tag');
    const projectCards = document.querySelectorAll('.case-study-item');

    skillTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const filter = tag.dataset.skillFilter;
        const isActive = tag.classList.contains('active-filter');

        skillTags.forEach(t => t.classList.remove('active-filter'));
        projectCards.forEach(c => c.classList.remove('highlight-match'));

        if (!isActive && filter) {
          tag.classList.add('active-filter');

          // Highlight matching projects
          projectCards.forEach(card => {
            const techPills = Array.from(card.querySelectorAll('.case-tech-pill')).map(p => p.textContent.toLowerCase());
            const desc = card.textContent.toLowerCase();

            if (techPills.some(t => t.includes(filter)) || desc.includes(filter)) {
              card.classList.add('highlight-match');
            }
          });
        }
      });
    });
  }

  // ==========================================================================
  // 10. UI INTERACTIONS, EMAIL COPY, MODALS & RESUME DOWNLOAD
  // ==========================================================================
  function setupUI() {
    // 1. Email One-Click Copy
    const emailCard = document.getElementById('contact-email-card');
    const emailVal = document.getElementById('contact-email-val');
    const emailIcon = document.getElementById('email-copy-icon');

    if (emailCard && emailVal) {
      emailCard.addEventListener('click', () => {
        const textToCopy = emailVal.textContent.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
          emailCard.classList.add('copied');
          if (emailIcon) emailIcon.textContent = '✓ COPIED!';
          setTimeout(() => {
            emailCard.classList.remove('copied');
            if (emailIcon) emailIcon.textContent = '📋';
          }, 2400);
        }).catch(() => {
          // Fallback
          emailCard.classList.add('copied');
          if (emailIcon) emailIcon.textContent = '✓';
          setTimeout(() => {
            emailCard.classList.remove('copied');
            if (emailIcon) emailIcon.textContent = '📋';
          }, 2400);
        });
      });
    }

    // 2. CV Modal
    const modalCv = document.getElementById('modal-cv');
    const btnDownloadCv = document.getElementById('btn-download-cv');
    const triggerCvModalBtn = document.getElementById('trigger-cv-modal-btn');
    const triggerTalkAction = document.getElementById('trigger-talk-action');

    function openModal(m) {
      if (m) {
        m.classList.add('open');
        m.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModal() {
      document.querySelectorAll('.drawer-modal').forEach(m => {
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    }

    if (btnDownloadCv) {
      btnDownloadCv.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modalCv);
      });
    }

    if (triggerCvModalBtn) {
      triggerCvModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modalCv);
      });
    }

    if (triggerTalkAction) {
      triggerTalkAction.addEventListener('click', () => {
        const contactInput = document.getElementById('contact-name');
        if (contactInput) contactInput.focus();
      });
    }

    document.querySelectorAll('[data-close]').forEach(closeEl => {
      closeEl.addEventListener('click', closeModal);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // 3. Mobile Menu
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-talk-btn');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
        });
      });
    }

    // 4. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm && formStatus) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.form-submit-button');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting...</span>';

        setTimeout(() => {
          formStatus.innerHTML = '<span style="color: #00f0ff; font-weight: 600;">✓ Message received! Debendra will get back to you shortly.</span>';
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span class="btn-text">Send Message</span> <span class="btn-icon">→</span>';
          
          setTimeout(() => {
            formStatus.innerHTML = '';
          }, 4000);
        }, 1000);
      });
    }

    // 5. Resume Download Generation
    const triggerCvDownload = document.getElementById('trigger-cv-download');
    if (triggerCvDownload) {
      triggerCvDownload.addEventListener('click', () => {
        const cvText = `=====================================================
DEBENDRA (MR DEB) - RESUME / CURRICULUM VITAE
Computer Science Student • Developer • Problem Solver
Contact: debendra@example.com
Portfolio: https://mrdeb.dev
=====================================================

ABOUT
I'm Debendra — a developer and problem solver who enjoys
turning ideas into useful digital experiences. Currently
building my foundation in programming, computer science,
web development, and hands-on algorithmic problem solving.

EDUCATION & FOUNDATIONS
- Computer Science / Engineering (2026 — Present)
- Focus: Object-Oriented Programming, Data Structures,
  Algorithms, Computer Systems Architecture.

TECHNICAL COMPETENCIES
- Programming: Java, Python, C
- Computer Science: Data Structures, Algorithms, OOP, Problem Solving
- Web: HTML5, CSS3, JavaScript (ESNext), Canvas 2D, Responsive UI
- Tools: Git, GitHub, VS Code, Figma, AI Tools, Bash

SELECTED PROJECT CASE STUDIES
1. Portfolio Website & Interactive Experience (Java, Canvas 2D, HTML/CSS)
2. Algorithm & DSA Visualizer (Java, Python, Data Structures)
3. Nexus AI Conversational Hub (Python, JavaScript, REST APIs)
4. Cyber Automation Suite & CLI Tools (Python, Java, Bash)

=====================================================`;
        const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Debendra_MrDeb_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        triggerCvDownload.innerHTML = '<span>Downloaded! ✓</span>';
        setTimeout(() => {
          triggerCvDownload.innerHTML = '<span>Download Resume</span> <span class="btn-icon">↓</span>';
        }, 2500);
      });
    }
  }

  // ==========================================================================
  // 11. APPLICATION INITIALIZATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('loading-state');
    new DoctorStrangeCursor();
    setupScrollInteractions();
    setupSpecularLighting();
    setupConstellationCanvas();
    setupDsaVisualizer();
    setupNexusAiSimulator();
    setupTerminalSimulator();
    setupProjectModals();
    setupSkillFilter();
    setupUI();
  });

})();
