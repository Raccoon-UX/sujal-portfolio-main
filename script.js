document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 System Active: Sujal's Portfolio Framework Initialized.");

  /* ================= 1. AUTOMATIC PRELOADER DISMISSAL ================= */
  /* ================= 1. FUTURISTIC TERMINAL INITIALIZING ENGINE ================= */
  const logContainer = document.getElementById("terminalLogs");
  const progressFill = document.getElementById("progressFill");
  const progressPercent = document.getElementById("progressPercent");
  const preloader = document.getElementById("preloader");

  // Custom log files layout packets
  const systemBootLogs = [
    { text: ">> Initializing asynchronous network protocols...", class: "text-blue" },
    { text: ">> Resolving local endpoints @ Mumbai Secure Node...", class: "text-blue" },
    { text: ">> Compiling core toolkit: MongoDB, Express, React, Node...", class: "text-purple" },
    { text: ">> Injecting intelligent AI model token vectors...", class: "text-purple" },
    { text: ">> Parsing mathematical analytics scoring engines...", class: "text-blue" },
    { text: ">> Pipeline Pro: Automation arrays established.", class: "text-green" },
    { text: ">> GuardianRoute: Zero-latency Socket tunnels active.", class: "text-green" },
    { text: ">> Jal Dhara: Smart database shards online.", class: "text-green" },
    { text: ">> Verity AI: Audit environment strictly secured.", class: "text-green" },
    { text: ">> Environment status optimization: 100% COMPLETE.", class: "text-green" },
    { text: ">> CRITICAL COMPILATION SUCCESSFUL. ACCESS GRANTED.", class: "text-green" }
  ];

  if (preloader && logContainer && progressFill && progressPercent) {
    let currentLogIndex = 0;
    let currentPercentage = 0;
    
    // Total animation timer bounds setup
    const totalDuration = 3200; 
    const stepInterval = totalDuration / systemBootLogs.length;

    function bootSequenceTracker() {
      if (currentLogIndex < systemBootLogs.length) {
        // dynamic html row tags append engine
        const logData = systemBootLogs[currentLogIndex];
        const logPara = document.createElement("p");
        logPara.className = `log-line ${logData.class}`;
        logPara.innerText = logData.text;
        logContainer.appendChild(logPara);
        
        // Auto-scroll logic inside the container box
        logContainer.scrollTop = logContainer.scrollHeight;
        currentLogIndex++;

        // Sync numeric loading bar metrics smoothly
        let targetPercent = Math.floor((currentLogIndex / systemBootLogs.length) * 100);
        let percentInterval = setInterval(() => {
          if (currentPercentage < targetPercent) {
            currentPercentage++;
            progressPercent.innerText = `${currentPercentage}%`;
            progressFill.style.width = `${currentPercentage}%`;
          } else {
            clearInterval(percentInterval);
          }
        }, stepInterval / (targetPercent - currentPercentage));

        setTimeout(bootSequenceTracker, stepInterval);
      } else {
        // Fade exit transitions out once sequence terminates
        setTimeout(() => {
          preloader.style.opacity = "0";
          preloader.style.transform = "scale(1.05)"; /* Sleek zooming matrix snap */
          setTimeout(() => {
            preloader.style.display = "none";
          }, 800);
        }, 400);
      }
    }

    // Sequence execution entry trigger
    setTimeout(bootSequenceTracker, 200);
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
  } else {
    body.classList.add("dark"); // Default high-end dark aesthetic
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      
      if (body.classList.contains("dark")) {
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        localStorage.setItem("portfolio-theme", "light");
      }
    });
  }

  /* ================= 4. ADAPTIVE SMART MATRIX RAIN SYSTEM ================= */
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const matrixChars = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}=+-$#@".split("");
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops = Array(Math.floor(columns)).fill(1);

    function drawMatrixEngine() {
      const isDarkTheme = body.classList.contains("dark");

      // Trail matrix rendering engine
      if (isDarkTheme) {
        ctx.fillStyle = "rgba(3, 7, 18, 0.05)"; // Deep dark fade trail
      } else {
        ctx.fillStyle = "rgba(248, 250, 252, 0.1)"; // Clean light mode fade trail
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Font rendering states
      if (isDarkTheme) {
        ctx.fillStyle = "#818cf8"; // Adaptive neon tone
      } else {
        ctx.fillStyle = "#4f46e5"; // Deep clear slate tone
      }
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const textChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(textChar, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrixEngine, 35);
  }

  /* ================= 5. INTERACTIVE 3D TILT EFFECT MECHANISM ================= */
  const elementsToTilt = document.querySelectorAll(".tilt, .glass-card-3d");

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
        const parentCard = this.closest(".milestone-card, .carousel-card-wide");
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
});