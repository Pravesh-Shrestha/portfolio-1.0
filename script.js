document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. Role Typing Animation (Tech & Marketing Roles)
     ========================================== */
  const rolesTech = [
    "Full-Stack Web Developer",
    "Computing & Software Engineer",
    "PERN Stack Specialist",
    "Android / Kotlin Dev"
  ];
  
  const rolesMarketing = [
    "UI/UX Designer",
    "Marketing Coordinator",
    "Growth Strategist",
    "Project Lead & Facilitator"
  ];

  let currentRoles = rolesTech; // Default starts as Tech mode
  let currentRoleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const roleTextEl = document.getElementById('role-text');
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 1500;

  function typeEffect() {
    if (!roleTextEl) return;
    const fullText = currentRoles[currentRoleIdx];
    
    if (isDeleting) {
      charIdx--;
      roleTextEl.textContent = fullText.substring(0, charIdx);
    } else {
      charIdx++;
      roleTextEl.textContent = fullText.substring(0, charIdx);
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === fullText.length) {
      isDeleting = true;
      speed = pauseTime; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      currentRoleIdx = (currentRoleIdx + 1) % currentRoles.length;
      speed = 200; // Pause before typing next word
    }

    setTimeout(typeEffect, speed);
  }

  if (roleTextEl) {
    typeEffect();
  }

  /* ==========================================
     2. Navigation Scrollspy & Sticky Header
     ========================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Header sticky styling
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy
    let currentActive = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 150)) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentActive) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================
     3. Mobile Navbar Toggle
     ========================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksList = document.getElementById('nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('mobile-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close mobile nav on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinksList.classList.remove('mobile-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ==========================================
     4. Skills Section Scroll Animation
     ========================================== */
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar');
  let skillsAnimated = false;

  function checkSkillsAnimation() {
    if (!skillsSection) return;
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (sectionTop < triggerPoint && !skillsAnimated) {
      skillBars.forEach(bar => {
        const skillItem = bar.closest('.skill-item');
        if (skillItem) {
          const percent = skillItem.getAttribute('data-percent');
          bar.style.width = percent + '%';
        }
      });
      skillsAnimated = true;
    }
  }

  window.addEventListener('scroll', checkSkillsAnimation);
  checkSkillsAnimation(); // initial run

  /* ==========================================
     5. Certifications Slider
     ========================================== */
  const slider = document.getElementById('certs-slider');
  const slides = document.querySelectorAll('.cert-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  let currentSlide = 0;

  if (slider && slides.length > 0) {
    // Generate dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function goToSlide(slideIdx) {
      currentSlide = slideIdx;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
      });
    }
  }

  /* ==========================================
     6. Experience & Project Modals Data
     ========================================== */
  const modalDetails = {
    // Experiences
    'exp-press1': {
      title: 'UI Designer & Marketing Officer',
      subtitle: 'PRESS1 Technologies (Denver, CO - Hybrid / Remote)',
      body: `
        <ul>
          <li><strong>UI/UX Prototyping:</strong> Conceptualized and designed wireframes, high-fidelity mockups, and responsive web workflows using Figma to optimize conversion metrics.</li>
          <li><strong>Development Collaboration:</strong> Handed off interactive templates to development teams and assisted in HTML/CSS/React structure validation.</li>
          <li><strong>Campaign Management:</strong> Spearheaded digital marketing strategies, structured search optimization, and directed visual graphics designs using Canva & Illustrator to scale brand outreach.</li>
        </ul>
      `,
      tech: ['Figma', 'React', 'HTML5', 'CSS3', 'Canva', 'Digital Growth']
    },
    'exp-digischool': {
      title: 'Project Lead & Facilitator',
      subtitle: 'DigiSchool Global (Kathmandu, Nepal - Remote)',
      body: `
        <ul>
          <li><strong>Roadmap Execution:</strong> Structured visual software guidelines and product roadmaps supporting DigiSchool Australia digital educational packages.</li>
          <li><strong>Frontend Optimization:</strong> Supported the internal software dev team as a Project Support Trainee and Frontend Developer, implementing dynamic UI components and resolving frontend defects.</li>
          <li><strong>Team Coordination:</strong> Managed progress meetings, resolved timeline blockers, and drove scrum iterations.</li>
        </ul>
      `,
      tech: ['React', 'JavaScript', 'NodeJS', 'Project Management', 'Agile']
    },
    'exp-hult': {
      title: 'Marketing Coordinator',
      subtitle: 'Hult Prize Nepal (Kathmandu, Nepal)',
      body: `
        <ul>
          <li><strong>Campaign Strategy:</strong> Created marketing strategies that boosted registration volumes and participant engagement by 40% year-over-year.</li>
          <li><strong>Brand Direction:</strong> Coordinated visual brand consistency across multiple college programs, hosting digital content launches and managing visual asset templates.</li>
        </ul>
      `,
      tech: ['Brand Strategy', 'Canva', 'Illustrator', 'Event Organizing']
    },
    'exp-ambassador': {
      title: 'IT Student Ambassador',
      subtitle: 'Tech & Trendy Student Partners (Kathmandu, Nepal)',
      body: `
        <ul>
          <li><strong>Community Outreach:</strong> Facilitated hands-on student workshops introducing AR/VR environments, graphic layout concepts, and drone tech.</li>
          <li><strong>Mentorship:</strong> Assisted junior computing students with programming projects and software configuration.</li>
        </ul>
      `,
      tech: ['Public Speaking', 'AR/VR', 'Design Concepts', 'Software Education']
    },
    'exp-hireo': {
      title: 'Hiring Manager',
      subtitle: 'HIREO (Nepal)',
      body: `
        <ul>
          <li><strong>Talent Sourcing:</strong> Filtered applications, conducted preliminary screening, and coordinated candidate assessments.</li>
          <li><strong>Onboarding:</strong> Aligned hires with specific task workflows and documented team roles.</li>
        </ul>
      `,
      tech: ['Recruitment', 'Operations', 'Team Leadership']
    },
    'exp-kanjirowa': {
      title: 'Admissions Counselor (Intern)',
      subtitle: 'Kanjirowa National School (Kathmandu, Nepal)',
      body: `
        <ul>
          <li><strong>Student Counseling:</strong> Guided prospective student profiles and managed administrative enrollment trackers.</li>
          <li><strong>Outreach Events:</strong> Facilitated open-house informational events and admission campaigns.</li>
        </ul>
      `,
      tech: ['Communication', 'Event Logistics', 'Database Entry']
    },

    // Projects
    'proj-karya': {
      title: 'Karya Connect Nepal',
      subtitle: 'Local Freelancing Marketplace Application',
      body: `
        <p>Karya Connect Nepal acts as a secure platform connecting local clients with highly skilled IT professionals across various domains in Nepal.</p>
        <ul>
          <li>Engineered native Android interface utilizing Kotlin for fluid UI responses.</li>
          <li>Integrated real-time database syncing, client reviews, and direct chat channels using Firebase.</li>
          <li>Designed responsive layouts matching modern mobile design guidelines.</li>
        </ul>
      `,
      tech: ['Kotlin', 'Android SDK', 'Firebase', 'Material Design']
    },
    'proj-bagaicha': {
      title: 'Bagaicha POS',
      subtitle: 'Flower Shop Point of Sale & Inventory Platform',
      body: `
        <p>Bagaicha POS is a custom-tailored database system helping local florists simplify catalog inventories, calculate invoices, and audit checkouts.</p>
        <ul>
          <li>Developed dynamic dashboard layouts using React for live inventory statistics.</li>
          <li>Engineered REST APIs with NodeJS and Express to catalog orders and inventory items.</li>
          <li>Designed robust schema models using MySQL to support product sales tracking.</li>
        </ul>
      `,
      tech: ['React', 'NodeJS', 'Express', 'MySQL', 'CSS3']
    },
    'proj-hajiri': {
      title: 'Hajiri Attendance Tracker',
      subtitle: 'Automated Academic Checking System',
      body: `
        <p>Hajiri helps academic institutions track attendance metrics, check-in schedules, and student attendance ratios automatically.</p>
        <ul>
          <li>Built checking consoles and profile records in React.</li>
          <li>Created automated monthly attendance percentage calculation scripts in NodeJS.</li>
          <li>Integrated simple data exports to generate printable reports.</li>
        </ul>
      `,
      tech: ['React', 'NodeJS', 'Express', 'PostgreSQL']
    },
    'proj-peerpicks': {
      title: 'PeerPicks Ecosystem',
      subtitle: 'Cross-platform Rating & Review Network',
      body: `
        <p>PeerPicks allows user communities to check and submit feedback, reviews, and star ratings for local stores, products, and retail options.</p>
        <ul>
          <li>Developed web application prototype using modular vanilla JavaScript.</li>
          <li>Built the companion native Android app utilizing Kotlin and the Android SDK.</li>
          <li>Managed state sync to keep ratings aligned between mobile and web clients.</li>
        </ul>
      `,
      tech: ['JavaScript', 'Kotlin', 'Android Studio', 'HTML5', 'CSS3']
    }
  };

  const modal = document.getElementById('detail-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalTech = document.getElementById('modal-tech');

  function openModal(dataId) {
    const data = modalDetails[dataId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.body;
    
    // Clear & add tags
    modalTech.innerHTML = "";
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.classList.add('tag');
      span.textContent = t;
      modalTech.appendChild(span);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
  }

  // Click listeners for items
  document.querySelectorAll('.timeline-item, .project-card').forEach(item => {
    item.addEventListener('click', () => {
      const dataId = item.getAttribute('data-id');
      if (dataId) openModal(dataId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Close modal clicking outside content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  /* ==========================================
     7. Footer Copyright Year
     ========================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================
     8. Perspective Switching Logic (Tech vs Marketing)
     ========================================== */
  const perspectiveSwitch = document.getElementById('perspective-switch');
  const btnTech = document.getElementById('btn-tech');
  const btnMarketing = document.getElementById('btn-marketing');

  function setPerspective(mode) {
    if (mode === 'marketing') {
      document.body.classList.add('mode-marketing');
      if (btnTech) { btnTech.classList.remove('active'); btnTech.setAttribute('aria-pressed', 'false'); }
      if (btnMarketing) { btnMarketing.classList.add('active'); btnMarketing.setAttribute('aria-pressed', 'true'); }
      currentRoles = rolesMarketing;
    } else {
      document.body.classList.remove('mode-marketing');
      if (btnMarketing) { btnMarketing.classList.remove('active'); btnMarketing.setAttribute('aria-pressed', 'false'); }
      if (btnTech) { btnTech.classList.add('active'); btnTech.setAttribute('aria-pressed', 'true'); }
      currentRoles = rolesTech;
    }
    
    // Reset typing animation variables
    currentRoleIdx = 0;
    charIdx = 0;
    isDeleting = false;
    if (roleTextEl) {
      roleTextEl.textContent = "";
    }
  }

  if (perspectiveSwitch && btnTech && btnMarketing) {
    btnTech.addEventListener('click', (e) => {
      e.stopPropagation();
      setPerspective('tech');
    });
    btnMarketing.addEventListener('click', (e) => {
      e.stopPropagation();
      setPerspective('marketing');
    });
    
    // Toggle on background click
    perspectiveSwitch.addEventListener('click', () => {
      const isMarketing = document.body.classList.contains('mode-marketing');
      setPerspective(isMarketing ? 'tech' : 'marketing');
    });
  }

  /* ==========================================
     9. Interactive Terminal Console CLI
     ========================================== */
  const termInput = document.getElementById('terminal-user-input');
  const termHistory = document.getElementById('terminal-history');

  const neofetchOutput = `
<br />
<strong>Pravesh Kumar Shrestha</strong><br />
-----------------------<br />
<strong>OS</strong>: Softwarica-Coventry Computing Linux v3.6<br />
<strong>SHELL</strong>: Zsh (React, NodeJS, Express, Python, Kotlin)<br />
<strong>IDE</strong>: Figma | Android Studio | VS Code<br />
<strong>ROLES</strong>: UI Designer & Marketing Officer @ PRESS1 Technologies<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Project Lead @ DigiSchool Global / DigiSchool Australia<br />
<strong>STATUS</strong>: Engineering PERN Stack, Mobile Apps & Cloud integrations 🚀<br />
<strong>MOTTO</strong>: "Bridging aesthetics with clean, functional code." 🎨
`;

  const helpOutput = `
Available terminal commands:<br />
&nbsp;&nbsp;<strong>neofetch</strong>&nbsp;&nbsp;&nbsp;&nbsp;- Display system statistics and bio profile<br />
&nbsp;&nbsp;<strong>skills</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show technical & creative capability metrics<br />
&nbsp;&nbsp;<strong>projects</strong>&nbsp;&nbsp;&nbsp;&nbsp;- List featured software & marketing repositories<br />
&nbsp;&nbsp;<strong>about</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Display personal mission statement<br />
&nbsp;&nbsp;<strong>contact</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show email, phone and location nodes<br />
&nbsp;&nbsp;<strong>mode</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Toggle site perspective theme (Tech/Marketing)<br />
&nbsp;&nbsp;<strong>clear</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Wipe terminal workspace history<br />
&nbsp;&nbsp;<strong>help</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List all available CLI operations
`;

  const skillsOutput = `
System Capability Ratings:<br />
&nbsp;&nbsp;[Frontend/App] React & Redux: 85% | Kotlin / Android: 80% | Flutter: 75%<br />
&nbsp;&nbsp;[Backend/Data] NodeJS: 80% | Python / Pandas: 75% | SQL DBs: 85%<br />
&nbsp;&nbsp;[Design/Growth] Figma: 90% | Canva/Illustrator: 90% | Growth Strategy: 80%
`;

  const projectsOutput = `
Featured Products & Software Repositories:<br />
&nbsp;&nbsp;1. <strong>Karya Connect</strong> - Kotlin/Firebase freelancing platform for local Nepalese IT clients.<br />
&nbsp;&nbsp;2. <strong>Bagaicha POS</strong> - Custom React/NodeJS inventory and invoice dashboard.<br />
&nbsp;&nbsp;3. <strong>Hajiri</strong> - Automated attendee logging console and statistical reporting.<br />
&nbsp;&nbsp;4. <strong>PeerPicks</strong> - Cross-platform rating network for user reviews.
`;

  const contactOutput = `
Connection Endpoint Nodes:<br />
&nbsp;&nbsp;Mail: <a href="mailto:sthapravesh12@gmail.com" style="color:var(--color-primary);">sthapravesh12@gmail.com</a><br />
&nbsp;&nbsp;Call: +977 9767224529<br />
&nbsp;&nbsp;Location: Kathmandu, Nepal
`;

  if (termInput && termHistory) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = termInput.value.trim();
        termInput.value = "";
        
        if (command === "") return;

        // Create line prompt in history
        const promptLine = document.createElement('div');
        const activePrompt = document.body.classList.contains('mode-marketing') ? 'guest@marketing-hq:~$' : 'guest@pravesh:~$';
        promptLine.innerHTML = `<span class="t-prompt">${activePrompt}</span> <span class="t-input">${escapeHTML(command)}</span>`;
        termHistory.appendChild(promptLine);

        // Process CLI commands
        const outputLine = document.createElement('div');
        outputLine.className = "t-output";

        const cleanCmd = command.toLowerCase().split(' ')[0];

        switch(cleanCmd) {
          case 'help':
            outputLine.innerHTML = helpOutput;
            break;
          case 'neofetch':
            outputLine.innerHTML = neofetchOutput;
            break;
          case 'clear':
            termHistory.innerHTML = "";
            return;
          case 'about':
          case 'cat':
            outputLine.innerHTML = `I leverage Design Thinking, gamification, and robust software architecture to solve complex problems and build engaging digital experiences that scale.`;
            break;
          case 'skills':
            outputLine.innerHTML = skillsOutput;
            break;
          case 'projects':
            outputLine.innerHTML = projectsOutput;
            break;
          case 'contact':
            outputLine.innerHTML = contactOutput;
            break;
          case 'mode':
            const currentMode = document.body.classList.contains('mode-marketing') ? 'tech' : 'marketing';
            setPerspective(currentMode);
            outputLine.innerHTML = `<span style="color:#10b981;">[SYSTEM] Workspace recompiled in ${currentMode.toUpperCase()} mode. Color variables transformed.</span>`;
            break;
          default:
            outputLine.innerHTML = `<span style="color:#ef4444;">Command not found: '${escapeHTML(cleanCmd)}'. Type 'help' for available options.</span>`;
        }

        termHistory.appendChild(outputLine);
        
        // Scroll to bottom
        const terminalBody = termHistory.closest('.terminal-body');
        if (terminalBody) {
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      }
    });

    // Prevent terminal click defocusing
    const terminalMock = termHistory.closest('.terminal-mock');
    if (terminalMock) {
      terminalMock.addEventListener('click', () => {
        termInput.focus();
      });
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  /* ==========================================
     10. Value Stream ROI Simulator
     ========================================== */
  const sliderDesign = document.getElementById('slider-design');
  const sliderSpeed = document.getElementById('slider-speed');
  const sliderMarketing = document.getElementById('slider-marketing');

  const valDesign = document.getElementById('val-design');
  const valSpeed = document.getElementById('val-speed');
  const valMarketing = document.getElementById('val-marketing');

  const resConversion = document.getElementById('res-conversion');
  const resRetention = document.getElementById('res-retention');
  const resScore = document.getElementById('res-score');

  function calculateROI() {
    if (!sliderDesign || !sliderSpeed || !sliderMarketing) return;

    const design = parseFloat(sliderDesign.value);
    const speed = parseFloat(sliderSpeed.value);
    const marketing = parseFloat(sliderMarketing.value);

    // Update slider UI value labels
    valDesign.textContent = design + '%';
    valSpeed.textContent = speed + '%';
    valMarketing.textContent = marketing + '%';

    // Interactive Business ROI Formulas
    const conversionBoost = ((design * 0.16) + (speed * 0.09) + (marketing * 0.13)).toFixed(1);
    const retentionLift = Math.round((design * 0.22) + (speed * 0.28) + (marketing * 0.05));
    const integratedScore = Math.round((design * 0.3) + (speed * 0.4) + (marketing * 0.3));

    // Update Result elements
    resConversion.textContent = '+' + conversionBoost + '%';
    resRetention.textContent = '+' + retentionLift + '%';
    resScore.textContent = integratedScore + '/100';
  }

  if (sliderDesign && sliderSpeed && sliderMarketing) {
    [sliderDesign, sliderSpeed, sliderMarketing].forEach(slider => {
      slider.addEventListener('input', calculateROI);
    });
    // Run calculation once on load
    calculateROI();
  }

  /* ==========================================
     11. Stack Architecture Compiler Lab
     ========================================== */
  const compilerNodes = document.querySelectorAll('.compiler-node');
  const compileBtn = document.getElementById('compiler-action-btn');
  const consoleOutput = document.getElementById('compiler-console-output');

  if (compilerNodes) {
    compilerNodes.forEach(node => {
      node.addEventListener('click', () => {
        node.classList.toggle('active');
      });
    });
  }

  if (compileBtn && consoleOutput) {
    compileBtn.addEventListener('click', () => {
      // Clear console
      consoleOutput.innerHTML = '<div class="line info">[SYSTEM] Initiating capability model compilation...</div>';
      
      const activeNodes = [];
      compilerNodes.forEach(node => {
        if (node.classList.contains('active')) {
          activeNodes.push(node.getAttribute('data-node'));
        }
      });

      let lineIndex = 0;
      const logs = [
        { text: '[INIT] Resolving module dependencies...', delay: 400, type: 'info' },
        { text: '[BUILD] Packaging UI framework templates...', delay: 800, type: 'default' }
      ];

      // Insert logs based on active nodes
      if (activeNodes.includes('figma')) {
        logs.push({ text: '[COMPILE] Figma prototyping nodes synced. Visual grid layout verified.', delay: 1200, type: 'success' });
      }
      if (activeNodes.includes('react')) {
        logs.push({ text: '[COMPILE] React client rendering initialized. Redux state slice wired.', delay: 1600, type: 'success' });
      }
      if (activeNodes.includes('node')) {
        logs.push({ text: '[COMPILE] NodeJS backend services initialized. REST controllers mapped.', delay: 2000, type: 'success' });
      }
      if (activeNodes.includes('postgres')) {
        logs.push({ text: '[DB] SQL tables generated. Connection pools validated.', delay: 2400, type: 'success' });
      }
      if (activeNodes.includes('kotlin')) {
        logs.push({ text: '[COMPILE] Kotlin Android source compiled. Gradle build successful.', delay: 2800, type: 'success' });
      }
      if (activeNodes.includes('growth')) {
        logs.push({ text: '[CAMPAIGN] Creative assets loaded. Target market demographics bound.', delay: 3200, type: 'success' });
      }

      // Check final state
      if (activeNodes.length === 0) {
        logs.push({ text: '[WARN] Compilation failed: No components selected. System stack is empty.', delay: 3600, type: 'warn' });
      } else if (activeNodes.length === compilerNodes.length) {
        logs.push({ text: '[SUCCESS] Fully integrated Stack Compiled! UI/UX + Full-Stack Dev + Marketing Growth engines online. Running 100% efficient.', delay: 3600, type: 'success' });
      } else {
        logs.push({ text: `[SUCCESS] Partial stack compiled. (${activeNodes.length}/6 layers verified). Deployment finished.`, delay: 3600, type: 'info' });
      }

      // Log display loop using timeouts
      logs.forEach(log => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = `line ${log.type}`;
          div.textContent = log.text;
          consoleOutput.appendChild(div);
          consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }, log.delay);
      });
    });
  }

  // Interactive Labs Play Tab Switching
  const tabRoiBtn = document.getElementById('tab-roi-btn');
  const tabCompileBtn = document.getElementById('tab-compile-btn');
  const paneRoi = document.getElementById('pane-roi');
  const paneCompile = document.getElementById('pane-compile');

  if (tabRoiBtn && tabCompileBtn && paneRoi && paneCompile) {
    tabRoiBtn.addEventListener('click', () => {
      tabRoiBtn.classList.add('active');
      tabCompileBtn.classList.remove('active');
      paneRoi.classList.add('active');
      paneCompile.classList.remove('active');
    });

    tabCompileBtn.addEventListener('click', () => {
      tabCompileBtn.classList.add('active');
      tabRoiBtn.classList.remove('active');
      paneCompile.classList.add('active');
      paneRoi.classList.remove('active');
    });
  }

  /* ==========================================
     12. Mouse Cursor Card Spotlight Effect
     ========================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================
     13. Scroll Reveal Intersection Observer (Tactile Spring Reveals)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-element');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* ==========================================
     14. Timeline Progress Line Scroll Drawing
     ========================================== */
  const timelineSection = document.getElementById('experience');
  const timelineProgress = document.getElementById('timeline-progress');

  function updateTimelineProgress() {
    if (!timelineSection || !timelineProgress) return;
    
    const rect = timelineSection.getBoundingClientRect();
    const sectionHeight = timelineSection.offsetHeight;
    
    // Calculate how much of the section has scrolled past the middle of the viewport
    const viewportHeight = window.innerHeight;
    const progressStart = viewportHeight / 2;
    
    // Distance from the top of the section to the trigger line
    const scrolledOffset = progressStart - rect.top;
    
    // Draw the progress line
    let scrollPercent = (scrolledOffset / (sectionHeight - 120)) * 100;
    scrollPercent = Math.max(0, Math.min(100, scrollPercent)); // clamp between 0 and 100
    
    timelineProgress.style.height = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateTimelineProgress);
  updateTimelineProgress(); // initial trigger
});
