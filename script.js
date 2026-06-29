document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 System Active: Sujal's Portfolio Framework Initialized.");

  /* ================= 1. PREMIUM LOGO LOADING SEQUENCE ================= */
  const progressFill = document.getElementById("progressFill");
  const progressPercent = document.getElementById("progressPercent");
  const preloader = document.getElementById("preloader");

  if (preloader && progressFill && progressPercent) {
    let currentPercentage = 0;
    const duration = 1800; // 1.8 seconds loading screen
    const intervalTime = 20; 
    const totalSteps = duration / intervalTime;
    const stepIncrement = 100 / totalSteps;

    const loaderInterval = setInterval(() => {
      currentPercentage += stepIncrement;
      if (currentPercentage >= 100) {
        currentPercentage = 100;
        clearInterval(loaderInterval);
        
        setTimeout(() => {
          preloader.style.opacity = "0";
          preloader.style.transform = "scale(1.02)";
          
          setTimeout(() => {
            preloader.style.display = "none";
            if (typeof heroTl !== 'undefined' && heroTl) {
              heroTl.play();
            }
          }, 800);
        }, 300);
      }
      
      const displayVal = Math.floor(currentPercentage);
      progressPercent.innerText = `${displayVal}%`;
      progressFill.style.width = `${displayVal}%`;
    }, intervalTime);
  }



  

  /* ================= 2. MOBILE MENU & HAMBURGER SYSTEM ================= */
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Hamburger to 'X' layout adjustment
      const bars = menuBtn.querySelectorAll('.bar');
      if (navLinks.classList.contains('active')) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });

    // Close menu when clicking any link item
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const bars = menuBtn.querySelectorAll('.bar');
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      });
    });
  }

  /* ================= 3. SYSTEM THEME CONTROLS (DARK/LIGHT) ================= */
  const themeBtn = document.getElementById("theme-btn");
  const body = document.body;

  // Local storage cache layout check
  if (localStorage.getItem("portfolio-theme") === "light") {
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    body.classList.add("dark");
    body.classList.remove("light"); // Default high-end dark aesthetic
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      if (body.classList.contains("light")) {
        body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem("portfolio-theme", "light");
      }
    });
  }

  /* ================= 3.2 PREMIUM CUSTOM CURSOR & ACCELERATION ================= */
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let isMagneticLocked = false;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (hasFinePointer && cursorDot && cursorFollower) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    const tickCursor = () => {
      if (!isMagneticLocked) {
        const lerpFactor = 0.12; // Physics lag inertia
        followerX += (mouseX - followerX) * lerpFactor;
        followerY += (mouseY - followerY) * lerpFactor;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
      }

      requestAnimationFrame(tickCursor);
    };
    requestAnimationFrame(tickCursor);

    // Dynamic Hover classes trigger
    const interactiveElements = document.querySelectorAll('a, button, .view-trigger, .case-study-btn, .filter-btn, .skills-filter-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!isMagneticLocked) {
          gsap.to(cursorFollower, {
            width: '60px',
            height: '60px',
            duration: 0.25,
            ease: "power2.out"
          });
        }
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
      });
      el.addEventListener('mouseleave', () => {
        if (!isMagneticLocked) {
          gsap.to(cursorFollower, {
            width: '40px',
            height: '40px',
            duration: 0.25,
            ease: "power2.out"
          });
        }
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });

    // Magnetic Button Attraction Mechanics
    const magneticElements = document.querySelectorAll('.nav-link, .logo, .social-icon, .execute-btn, .theme-btn, .btn, .filter-btn, .skills-filter-btn');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        isMagneticLocked = true;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        
        const strength = 14; // Subtle elegant attraction
        gsap.to(el, {
          x: (relX / rect.width) * strength,
          y: (relY / rect.height) * strength,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(cursorFollower, {
          left: rect.left + rect.width / 2 + 'px',
          top: rect.top + rect.height / 2 + 'px',
          width: rect.width + 12 + 'px',
          height: rect.height + 12 + 'px',
          borderRadius: window.getComputedStyle(el).borderRadius,
          duration: 0.2,
          overwrite: "auto"
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1.1, 0.4)"
        });

        gsap.to(cursorFollower, {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          duration: 0.3,
          overwrite: "auto",
          onComplete: () => {
            followerX = mouseX;
            followerY = mouseY;
            isMagneticLocked = false;
          }
        });
      });
    });
  }

  /* ================= 3.4 SCROLL CONTROLLER (PROGRESS, HIDE/REVEAL NAVBAR, SCROLL SPY) ================= */
  const scrollProgressBar = document.getElementById('scrollProgress');
  const navbarElement = document.querySelector('.navbar');
  const navSpyLinks = document.querySelectorAll('.nav-link');
  const spySections = document.querySelectorAll('section[id]');
  
  let lastScrollTop = 0;
  const navbarHeight = 80;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 1. Scroll Progress Bar
    if (scrollProgressBar) {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
      scrollProgressBar.style.width = scrolled + '%';
    }

    // 2. Hide / Reveal Navbar
    if (navbarElement) {
      if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        // Scrolling down - hide navbar
        navbarElement.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up - reveal navbar
        navbarElement.style.transform = 'translateY(0)';
      }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // 3. Scroll Spy Navigation Highlight
    let currentActiveSectionId = '';
    spySections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentActiveSectionId = section.getAttribute('id');
      }
    });

    if (currentActiveSectionId) {
      navSpyLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  /* ================= 3.6 AMBIENT SPOTLIGHT MOUSE TRACKING ================= */
  const auroraBlob3 = document.querySelector('.aurora-blob.blob-3');
  if (auroraBlob3 && hasFinePointer && typeof gsap !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(auroraBlob3, {
        left: x - 250 + 'px',
        top: y - 250 + 'px',
        duration: 2.2,
        ease: "power2.out"
      });
    });
  }

  /* ================= 3.8 GSAP SCROLLTRIGGER ANIMATION SYSTEM ================= */
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entrance Sequence
    window.heroTl = gsap.timeline({ paused: true });
    heroTl.from(".badge-status", { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" })
          .from(".hero-text h1", { opacity: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.6")
          .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-btns", { opacity: 0, y: 15, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(".hero-visual", { opacity: 0, scale: 0.95, duration: 1.2, ease: "power4.out" }, "-=0.9")
          .from(".orbit-nodes .node", { opacity: 0, scale: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.12 }, "-=0.5");

    // Bento Story Cards Staggered Entry
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    });

    // Statistics Increment Counters
    const statNums = document.querySelectorAll('.stat-num');
    if (statNums.length > 0) {
      ScrollTrigger.create({
        trigger: ".bento-stats-box",
        start: "top 80%",
        onEnter: () => {
          statNums.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                num.innerText = Math.floor(obj.val);
              }
            });
          });
        }
      });
    }

    // Skills Grid Cards Reveal
    gsap.from(".skill-card-v2", {
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 75%",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08
    });

    // Project Cards Slide/Fade Trigger
    const projectCards = document.querySelectorAll('.project-card-row');
    projectCards.forEach(card => {
      gsap.from(card.querySelector('.project-visual-side'), {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        opacity: 0,
        x: card.classList.contains('reverse') ? 40 : -40,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(card.querySelector('.project-narrative-side'), {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        opacity: 0,
        x: card.classList.contains('reverse') ? -40 : 40,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // Vertical Timeline track line filling
    gsap.to(".timeline-track-fill", {
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 40%",
        end: "bottom 60%",
        scrub: true
      },
      height: "100%",
      ease: "none"
    });

    // Vertical Timeline item details trigger
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      gsap.from(item.querySelector('.timeline-card-content'), {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(item.querySelector('.timeline-dot-marker'), {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)"
      });
    });

    // Certifications Slider Entrance
    gsap.from(".certifications-swiper-container", {
      scrollTrigger: {
        trigger: ".certifications-slider",
        start: "top 75%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out"
    });
  }



  /* ================= 5. INTERACTIVE 3D TILT EFFECT MECHANISM ================= */
  const elementsToTilt = document.querySelectorAll(".tilt");

  elementsToTilt.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rectBound = card.getBoundingClientRect();
      const inputX = e.clientX - rectBound.left;
      const inputY = e.clientY - rectBound.top;

      // Degree conversion boundaries
      const degreeX = ((inputY - rectBound.height / 2) / (rectBound.height / 2)) * -6; // Max 6deg
      const degreeY = ((inputX - rectBound.width / 2) / (rectBound.width / 2)) * 6;

      card.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  /* ================= 6. DYNAMIC PROJECTS CATEGORY FILTER ================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectEntries = document.querySelectorAll('.project-card-row');

  if (filterButtons.length > 0 && projectEntries.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const activeFilter = button.getAttribute('data-filter');

        projectEntries.forEach(entry => {
          const entryCategory = entry.getAttribute('data-category');
          if (activeFilter === 'all' || entryCategory === activeFilter) {
            entry.classList.remove('hide');
          } else {
            entry.classList.add('hide');
          }
        });
      });
    });
  }

  /* ================= 6.2 DYNAMIC SKILLS CATEGORY FILTER ================= */
  const skillFilterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card-v2');

  if (skillFilterBtns.length > 0 && skillCards.length > 0) {
    skillFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        skillFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const activeFilter = btn.getAttribute('data-skill-filter');

        skillCards.forEach(card => {
          const cardCats = card.getAttribute('data-skill-cat').split(' ');
          if (activeFilter === 'all' || cardCats.includes(activeFilter)) {
            card.style.display = "flex";
            setTimeout(() => { 
              card.style.opacity = "1"; 
              card.style.transform = "scale(1)"; 
            }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => { 
              card.style.display = "none"; 
            }, 300);
          }
        });
      });
    });
  }

  /* ================= 6.5 IMMERSIVE PROJECT CASE STUDY SYSTEM ================= */
  const projectCaseStudies = {
    guardianroute: {
      badge: "In Production",
      title: "GuardianRoute - Intelligent Transport System",
      desc: "Hardware-free, real-time tracking system developed for school transport fleets.",
      overview: "GuardianRoute is a production-deployed logistics and tracking platform designed for Mira-Bhayandar schools. It replaces expensive, proprietary tracking hardware with a secure web-based coordinate broadcasting framework. It connects drivers directly with administrators and parents through zero-latency synchronization.",
      problem: "Traditional transport tracking systems require dedicated OBD-II devices or GPS tracker hardware. These are costly to install, have fragile cellular antennas, and suffer from high network delay, leading to unreliable location tracking and panic among parents.",
      solution: "We engineered an elegant software-only web GPS pipeline. Drivers stream coordinates via their standard smartphone browsers using HTML5 Geolocation API, which is broadcasted instantly to transport coordinators and parents via Socket.io tunnels. It maps routes in real-time without hardware overhead.",
      architecture: "The application relies on a React-driven driver hub that publishes compressed coordinate JSON frames. A Node.js socket server acts as an active broker, managing client coordinate channels. It checks coordinates against virtual circular geo-zones and stores active session logs inside MongoDB.",
      challenges: "Cellular dropouts in dense urban areas led to socket disconnections and lost location packets. We solved this by implementing local coordinates buffering on the client browser (using LocalStorage index buffers) and coordinate interpolation on the map rendering side to prevent bus 'jumping'.",
      techStack: ["Node.js", "Express.js", "Socket.io", "Leaflet.js", "MongoDB", "HTML5 Geolocation"],
      type: "Full-Stack Web App",
      future: "Route optimization algorithms using historically collected traffic congestion patterns.",
      github: "https://github.com/Raccoon-UX/GuardianRoute-Transport-System-O",
      live: "https://raccoon-ux.github.io/GuardianRoute-Transport-System-O/"
    },
    verityai: {
      badge: "Completed",
      title: "Verity AI - AI Auditing & Hallucination Detection",
      desc: "Independent auditing ecosystem verifying Generative AI fact consistency in real-time.",
      overview: "Verity AI was created during the GDG Cloud Mumbai Hackathon to solve the critical business challenge of LLM reliability. It intercepts output tokens, checks factual claims, and rates factuality using a mathematical evaluation dashboard.",
      problem: "Large Language Models often produce realistic-sounding but completely incorrect statements (hallucinations). For financial and legal corporations, deploying LLMs without supervision poses massive compliance and reputational risks.",
      solution: "An API-driven middleware auditing pipeline. It parses LLM tokens in real-time, extracts major factual statements, performs fast vector searches against structured databases, and assigns a proprietary verification 'Gen Score' (0-100) based on confidence ratings.",
      architecture: "Built with Node.js and Python. Output texts are split into individual claims using Python NLP tokenizers. These statements are searched in parallel against Google Search API indexes and Wikipedia vector shards. The resulting context is scored and logged in MongoDB Atlas.",
      challenges: "Verifying facts in real-time adds unacceptable latency to user prompts. We mitigated this by auditing asynchronously: streaming the LLM output directly to the client while running the fact-checker in parallel background threads, highlighting suspect phrases dynamically as the audits complete.",
      techStack: ["Python", "Node.js", "MongoDB Atlas", "Google Cloud API", "JWT", "Express", "NLP Tokenizers"],
      type: "Machine Learning Middleware",
      future: "Support for custom corporate vector databases to check internal documents privately.",
      github: "https://github.com/Raccoon-UX/Verity-AI-GDG-Hackathon",
      live: "https://aryanubale7.github.io/verity-frontend/"
    },
    taskmanager: {
      badge: "Completed",
      title: "Student Task Manager - Productivity Dashboard",
      desc: "Full-stack academic scheduling app leveraging Gemini AI to break down complex projects.",
      overview: "The Student Task Manager is a responsive full-stack task manager built to simplify school project workflows. It integrates artificial intelligence directly into the student planner, allowing them to decompose large homework goals into simple visual checkpoints.",
      problem: "Students frequently procrastinate on large assignments because the first step seems too complex, and they lack clear breakdown pipelines to track progress visual metrics.",
      solution: "We integrated Google Gemini AI directly into the student task manager. When a student enters a long-term goal (e.g. 'Build a compilers project'), the Gemini model generates a sequential list of minor actionable sub-tasks. The app also features gamified progress cards and Recharts analytics.",
      architecture: "Constructed with a React SPA frontend and a Node/Express backend. AI parsing endpoints are wrapped in JWT authorization. Background cron jobs evaluate user streaks daily and clean completed transaction logs in MongoDB.",
      challenges: "Generative AI outputs are inherently unpredictable, causing JSON parse crashes when the model returned malformed lists. We resolved this by utilizing Gemini's structured schema parameters and implementing a fallback parser with automated regex cleanup.",
      techStack: ["React (Vite)", "MongoDB Atlas", "Google Gemini AI", "Recharts", "Axios", "Express", "JWT"],
      type: "Productivity Web App",
      future: "Shared student workspaces and collaborative task boards with real-time editing.",
      github: "https://github.com/Raccoon-UX/Student-Task-Manager-Prj-EngNow",
      live: "https://student-task-manager-prj-eng-now.vercel.app/login"
    },
    ecodetect: {
      badge: "Completed",
      title: "Eco-Detect - Smart Plant Disease Detection",
      desc: "Computer vision application for instant plant anomaly diagnosis and treatment recommendations.",
      overview: "Eco-Detect is a smart agricultural helper application designed to protect farm harvests. Farmers upload photos of crop leaves, and the application's vision system classifies the leaf state and prints a treatment outline.",
      problem: "Plant diseases spread rapidly in crops. Rural farmers often lack immediate access to agricultural experts, resulting in delayed leaf treatment and massive loss of food yields.",
      solution: "A mobile-first React dashboard integrated with OpenAI's Vision API. The user takes a quick photo of the leaf. The system processes the image, classifies the health level (healthy vs infected), identifies the specific disease, and lists organic/chemical treatments.",
      architecture: "Implemented using TypeScript, React, and Tailwind CSS. Image buffers are optimized on the frontend canvas before transmission to limit API bandwidth usage and ensure quick responses even on rural networks.",
      challenges: "Poor field lighting and camera focus blur created false diagnoses. We added client-side image enhancement filters (adjusting brightness and contrast) and validation checks that guide the farmer to retake the photo if it's too blurry.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "OpenAI Vision API", "HTML5 Canvas"],
      type: "AI Agricultural Web App",
      future: "Offline-first classification engine running locally on the device using TensorFlow.js.",
      github: "https://github.com/Raccoon-UX/EcoDetect",
      live: "https://eco-detect-plant-disease.netlify.app/"
    }
  };

  const caseStudyModal = document.getElementById("caseStudyModal");
  const modalProjBadge = document.getElementById("modalProjBadge");
  const modalProjTitle = document.getElementById("modalProjTitle");
  const modalProjDesc = document.getElementById("modalProjDesc");
  const modalOverview = document.getElementById("modalOverview");
  const modalProblem = document.getElementById("modalProblem");
  const modalSolution = document.getElementById("modalSolution");
  const modalArchitecture = document.getElementById("modalArchitecture");
  const modalChallenges = document.getElementById("modalChallenges");
  const modalTechStack = document.getElementById("modalTechStack");
  const modalProjType = document.getElementById("modalProjType");
  const modalFuture = document.getElementById("modalFuture");
  const modalGithubLink = document.getElementById("modalGithubLink");
  const modalLiveLink = document.getElementById("modalLiveLink");
  const closeCaseBtn = document.querySelector(".modal-close-btn");
  const caseStudyButtons = document.querySelectorAll(".case-study-btn");

  if (caseStudyModal && caseStudyButtons.length > 0) {
    caseStudyButtons.forEach(btn => {
      btn.addEventListener("click", function() {
        const projectId = this.getAttribute("data-project");
        const data = projectCaseStudies[projectId];

        if (data) {
          modalProjBadge.innerText = data.badge;
          modalProjTitle.innerText = data.title;
          modalProjDesc.innerText = data.desc;
          modalOverview.innerText = data.overview;
          modalProblem.innerText = data.problem;
          modalSolution.innerText = data.solution;
          modalArchitecture.innerText = data.architecture;
          modalChallenges.innerText = data.challenges;
          modalProjType.innerText = data.type;
          modalFuture.innerText = data.future;
          
          modalGithubLink.href = data.github;
          modalLiveLink.href = data.live;

          modalTechStack.innerHTML = "";
          data.techStack.forEach(tech => {
            const tag = document.createElement("span");
            tag.innerText = tech;
            modalTechStack.appendChild(tag);
          });

          caseStudyModal.style.display = "flex";
          setTimeout(() => {
            caseStudyModal.classList.add("active");
            document.body.style.overflow = "hidden";
          }, 10);
        }
      });
    });

    const closeCaseStudy = () => {
      caseStudyModal.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => {
        caseStudyModal.style.display = "none";
      }, 400);
    };

    if (closeCaseBtn) {
      closeCaseBtn.addEventListener("click", closeCaseStudy);
    }

    caseStudyModal.addEventListener("click", function(e) {
      if (e.target === caseStudyModal) {
        closeCaseStudy();
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && caseStudyModal.classList.contains("active")) {
        closeCaseStudy();
      }
    });
  }

  /* ================= 7. VERIFIED MILESTONE ARTIFACT LIGHTBOX ================= */
  const lightboxModal = document.getElementById("lightboxModal");
  const modalImgContainer = document.getElementById("modalImageContainer");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const dismissBtn = document.querySelector(".dismiss-btn");
  const triggers = document.querySelectorAll(".view-trigger");

  if (triggers.length > 0 && lightboxModal) {
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        
        // Find internal data hooks if images are added later
        const innerImg = this.querySelector("img");
        const parentCard = this.closest(".milestone-card, .carousel-card-wide, .timeline-item");
        const entryTitle = parentCard ? parentCard.querySelector("h3") : null;

        lightboxModal.style.display = "flex";
        setTimeout(() => { lightboxModal.classList.add("active"); }, 10);

        if (innerImg) {
          modalImgContainer.style.display = "block";
          modalImgContainer.src = innerImg.src;
        } else {
          // If no image is available, fallback layout is supported natively by CSS icons
          modalImgContainer.style.display = "none";
        }

        if (entryTitle) {
          lightboxCaption.innerText = entryTitle.innerText;
        }
      });
    });
  }

  function closeLightboxArray() {
    if (lightboxModal) {
      lightboxModal.classList.remove("active");
      setTimeout(() => { lightboxModal.style.display = "none"; }, 300);
    }
  }

  if (dismissBtn) dismissBtn.onclick = closeLightboxArray;
  window.addEventListener("click", (e) => { if (e.target == lightboxModal) closeLightboxArray(); });

  /* ================= 8. ACCREDITATION CAROUSEL INITIALIZATION ================= */
  if (typeof Swiper !== 'undefined') {
    new Swiper(".certifications-swiper-container", {
      slidesPerView: 1,
      spaceBetween: 25,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 25 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      }
    });
  }

  /* ================= 9. GLOBAL SYSTEM SCROLL REVEAL ARRAYS ================= */
  const scrollingReveals = document.querySelectorAll(".reveal");

  function processScrollReveal() {
    scrollingReveals.forEach((element) => {
      const windowViewportHeight = window.innerHeight;
      const elementTopPosition = element.getBoundingClientRect().top;
      const injectionTriggerPoint = 60; // Offset triggers

      if (elementTopPosition < windowViewportHeight - injectionTriggerPoint) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", processScrollReveal);
  processScrollReveal(); // Trigger immediately for above-the-fold layout checks

  /* ================= 10. ASYNCHRONOUS FORMSPREE EMAIL SUBMISSION ENGINE ================= */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Default page redirect reloading ko rokne ke liye
      
      const formData = new FormData(contactForm);
      
      // Initial state status loader updates
      if (formStatus) {
        formStatus.style.color = "var(--text-muted)";
        formStatus.innerText = "Transmitting packet data payload...";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success Response Handling Matrix
          if (formStatus) {
            formStatus.style.color = "#10b981"; // Success dynamic green active state
            formStatus.innerText = "Transmission successful! Your message has been routed to Sujal's Gmail inbox.";
          }
          contactForm.reset(); // Forms clear input layers instantly
        } else {
          // Error parsing engine from API layers
          const errorPayload = await response.json();
          if (formStatus) {
            formStatus.style.color = "#ef4444"; // Blazing error alerts red
            formStatus.innerText = errorPayload.errors 
              ? errorPayload.errors.map(err => err.message).join(", ") 
              : "Oops! There was a problem routing your message structural packet.";
          }
        }
      } catch (error) {
        // Fallback catch mechanisms for connection drops
        if (formStatus) {
          formStatus.style.color = "#ef4444";
          formStatus.innerText = "Network Error! Connection endpoint could not resolve submission parameters.";
        }
      }
    });
  }

  /* ================= 11. LENIS SMOOTH SCROLL SYSTEM ================= */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ================= 12. THREE.JS CINEMATIC BACKGROUND ENGINE (GPU SHADER GRID) ================= */
  const bgCanvas = document.getElementById("gravityGridCanvas");
  if (bgCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 180, 500);
    camera.lookAt(0, -30, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: bgCanvas,
      antialias: true,
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Optimized pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Initial background color based on theme
    const initialLight = document.body.classList.contains("light");
    scene.background = new THREE.Color(initialLight ? 0xf8fafc : 0x0b1220);
    scene.fog = new THREE.FogExp2(initialLight ? 0xf8fafc : 0x0b1220, 0.0015);

    // 12.1 GPU-deformed grid material
    const gridMaterial = new THREE.ShaderMaterial({
      transparent: true,
      fog: true,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib['fog'],
        {
          uMouse: { value: new THREE.Vector3(10000, 0, 10000) },
          uRadius: { value: 240.0 },
          uDepth: { value: -70.0 },
          uGridColor: { value: new THREE.Color(initialLight ? 0x2563eb : 0x60a5fa) },
          uOpacity: { value: initialLight ? 0.16 : 0.12 }
        }
      ]),
      vertexShader: `
        #include <fog_pars_vertex>
        uniform vec3 uMouse;
        uniform float uRadius;
        uniform float uDepth;
        varying vec3 vWorldPosition;

        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          
          float dist = distance(worldPosition.xz, uMouse.xz);
          if (dist < uRadius) {
            float force = pow(1.0 - (dist / uRadius), 2.0);
            worldPosition.y += uDepth * force;
            
            vec2 dir = normalize(uMouse.xz - worldPosition.xz);
            worldPosition.xz += dir * force * 35.0;
          }
          
          vWorldPosition = worldPosition.xyz;
          vec4 mvPosition = viewMatrix * worldPosition;
          gl_Position = projectionMatrix * mvPosition;
          
          #include <fog_vertex>
        }
      `,
      fragmentShader: `
        #include <fog_pars_fragment>
        varying vec3 vWorldPosition;
        uniform vec3 uGridColor;
        uniform float uOpacity;

        void main() {
          float size = 60.0;
          float thickness = 1.2;
          
          float fx = abs(fract(vWorldPosition.x / size - 0.5) - 0.5) / (thickness / size);
          float fz = abs(fract(vWorldPosition.z / size - 0.5) - 0.5) / (thickness / size);
          float grid = min(fx, fz);
          float line = 1.0 - min(grid, 1.0);
          
          if (line < 0.05) discard;
          
          vec4 diffuseColor = vec4(uGridColor, uOpacity * line);
          gl_FragColor = diffuseColor;
          
          #include <fog_fragment>
        }
      `
    });

    const gridGeometry = new THREE.PlaneGeometry(2400, 2400, 45, 45); // highly optimized density grid
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = 0;
    scene.add(gridMesh);

    // 12.2 Floating Background Elements
    const floatersGroup = new THREE.Group();
    scene.add(floatersGroup);

    const floaters = [];
    const floaterGeoms = [
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.IcosahedronGeometry(12, 1),
      new THREE.RingGeometry(10, 15, 6)
    ];

    for (let i = 0; i < 15; i++) { // reduced floater count for performance
      const geom = floaterGeoms[Math.floor(Math.random() * floaterGeoms.length)];
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x4f46e5 : 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: Math.random() * 0.12 + 0.04
      });
      
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 800,
        Math.random() * 200 - 50,
        (Math.random() - 0.5) * 800
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      const speed = {
        x: (Math.random() - 0.5) * 0.01,
        y: Math.random() * 0.15 + 0.04,
        rotX: (Math.random() - 0.5) * 0.005,
        rotY: (Math.random() - 0.5) * 0.005
      };

      floatersGroup.add(mesh);
      floaters.push({ mesh, speed });
    }

    // 12.3 Mouse Intersect Uniform Updates
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const currentMouse = new THREE.Vector3(10000, 0, 10000);
    const targetMouse = new THREE.Vector3(10000, 0, 10000);
    let targetCameraX = 0;
    let targetCameraY = 180;

    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      targetCameraX = (e.clientX / window.innerWidth - 0.5) * 60; // slightly reduced range for smoother feel
      targetCameraY = 180 + (e.clientY / window.innerHeight - 0.5) * 30;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
      targetCameraX = 0;
      targetCameraY = 180;
    });

    function resizeBg() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", resizeBg);

    function animateBg() {
      requestAnimationFrame(animateBg);

      const isLight = document.body.classList.contains("light");
      
      // Dynamic colors
      scene.background.setHex(isLight ? 0xf8fafc : 0x0b1220);
      scene.fog.color.setHex(isLight ? 0xf8fafc : 0x0b1220);
      gridMaterial.uniforms.uGridColor.value.setHex(isLight ? 0x2563eb : 0x60a5fa);
      gridMaterial.uniforms.uOpacity.value = isLight ? 0.16 : 0.12;

      // Parallax camera lerp
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, -30, 0);

      // Floaters animation
      floaters.forEach(fl => {
        fl.mesh.position.y += fl.speed.y;
        fl.mesh.position.x += fl.speed.x;
        fl.mesh.rotation.x += fl.speed.rotX;
        fl.mesh.rotation.y += fl.speed.rotY;

        if (fl.mesh.position.y > 250) {
          fl.mesh.position.y = -100;
          fl.mesh.position.x = (Math.random() - 0.5) * 800;
        }
      });

      // Lerp mouse uniforms on the GPU for infinite performance
      raycaster.setFromCamera(mouse, camera);
      const planeIntersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), planeIntersect);

      if (mouse.x > -0.96 && mouse.x < 0.96) {
        targetMouse.copy(planeIntersect);
      } else {
        targetMouse.set(10000, 0, 10000);
      }
      currentMouse.lerp(targetMouse, 0.12);
      gridMaterial.uniforms.uMouse.value.copy(currentMouse);

      renderer.render(scene, camera);
    }
    animateBg();
  }

  /* ================= 13. THREE.JS INTERACTIVE HERO STAGE ================= */
  const heroStage = document.getElementById("hero3dStage");
  if (heroStage && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 340 / 420, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(340, 420);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    heroStage.appendChild(renderer.domElement);

    function resizeHeroStage() {
      const rect = heroStage.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    }
    window.addEventListener("resize", resizeHeroStage);

    // Stage lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Hero Group containing orbiting items
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Glowing Wireframe Holographic Rings
    const ringGeom1 = new THREE.TorusGeometry(1.85, 0.015, 8, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    heroGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(2.05, 0.012, 8, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    heroGroup.add(ring2);

    // Orbiting Primitives
    const orbitCubeGeom = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const orbitCubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      roughness: 0.2,
      metalness: 0.5,
      transparent: true,
      opacity: 0.8
    });
    const orbitCube = new THREE.Mesh(orbitCubeGeom, orbitCubeMat);
    heroGroup.add(orbitCube);

    const orbitSphereGeom = new THREE.IcosahedronGeometry(0.14, 1);
    const orbitSphereMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true
    });
    const orbitSphere = new THREE.Mesh(orbitSphereGeom, orbitSphereMat);
    heroGroup.add(orbitSphere);

    // Mouse coordinates to sync tilt
    let targetRotX = 0;
    let targetRotY = 0;

    window.addEventListener("mousemove", (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      targetRotX = ny * 0.38;
      targetRotY = nx * 0.38;

      // Sync 3D tilt of the HTML profile image container
      gsap.to(".hero-profile-image-container", {
        rotateX: ny * -22,
        rotateY: nx * 22,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    window.addEventListener("mouseleave", () => {
      targetRotX = 0;
      targetRotY = 0;
      gsap.to(".hero-profile-image-container", {
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto"
      });
    });

    let clock = 0;
    function animateHeroStage() {
      requestAnimationFrame(animateHeroStage);

      clock += 0.01;

      // Tilt transitions
      heroGroup.rotation.x += (targetRotX - heroGroup.rotation.x) * 0.08;
      heroGroup.rotation.y += (targetRotY - heroGroup.rotation.y) * 0.08;

      // Rotate holographic rings
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;

      // Floating orbit paths
      orbitCube.position.x = Math.sin(clock * 1.5) * 1.8;
      orbitCube.position.y = Math.cos(clock * 1.5) * 1.3;
      orbitCube.position.z = Math.sin(clock * 1.5) * 0.5;
      orbitCube.rotation.x += 0.01;
      orbitCube.rotation.y += 0.015;

      orbitSphere.position.x = Math.cos(clock) * 2.1;
      orbitSphere.position.y = Math.sin(clock) * 1.5;
      orbitSphere.position.z = Math.cos(clock * 0.5) * 0.6;
      orbitSphere.rotation.x -= 0.01;

      renderer.render(scene, camera);
    }
    animateHeroStage();
  }
});