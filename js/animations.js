/**
 * Maya Sharma Financials - Luxury Motion Engine (50 Lacs / Figma Designer Grade)
 * Silky scroll reveals, directional left/right transitions, 3D card tilt & parallax.
 */
(function () {
  "use strict";

  // 1. Initialise Hero animations immediately
  const hero = document.querySelector(".hero");
  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.add("is-ready");
    });
  }

  // 2. High-Performance Intersection Observer for Scroll Reveals
  const revealSelector = ".scroll-reveal, .reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-left-soft, .reveal-right-soft, .img-reveal";
  const reveals = document.querySelectorAll(revealSelector);

  if (reveals.length > 0) {
    // Check elements already in or near viewport on initial load to avoid flash
    const checkImmediate = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach((el) => {
        // Elements in the impact section should reveal dynamically on scroll
        if (window.scrollY < 40 && el.closest(".impact")) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.95 && rect.bottom >= 0) {
          el.classList.add("is-visible", "is-in");
        }
      });
    };
    checkImmediate();

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("is-visible", "is-in");
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08
      }
    );

    reveals.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        io.observe(el);
      }
    });
  }

  // 3. Animated Metric Counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const startCounter = (el, delay = 0) => {
      if (el._hasAnimated) return;
      el._hasAnimated = true;
      const end = el.dataset.since
        ? new Date().getFullYear() - Number(el.dataset.since)
        : Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;

      setTimeout(() => {
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          // Ultra-smooth quintic ease-out curve
          const eased = 1 - Math.pow(1 - progress, 5);
          el.textContent = Math.round(end * eased).toLocaleString("en-IN") + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      }, delay);
    };

    // Synchronize impact counters with the impact section reveal cascade
    const impactPanel = document.querySelector(".impact-panel");
    if (impactPanel) {
      const impactObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const impactCounters = impactPanel.querySelectorAll("[data-count]");
              impactCounters.forEach((el, index) => {
                startCounter(el, 220 + index * 120);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      impactObserver.observe(impactPanel);
    }

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (!el.closest(".impact-panel")) {
            startCounter(el, 0);
          }
          observer.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((el) => {
      if (!el.closest(".impact-panel")) {
        counterObserver.observe(el);
      }
    });
  }

  // 4. Interactive 3D Card Tilt & Mouse Spotlight (Figma Prototype feel)
  // Only enabled for desktop pointer devices to preserve smooth touch experience on mobile
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (supportsFinePointer && !prefersReducedMotion) {
    const tiltElements = document.querySelectorAll(".lw-photo, .pg-item, .cs-card, .wh-arch, .jb-cards li");

    tiltElements.forEach((card) => {
      let isHovered = false;
      let targetRotX = 0;
      let targetRotY = 0;
      let curRotX = 0;
      let curRotY = 0;
      let rafId = null;

      const animateTilt = () => {
        // Soft spring damping
        curRotX += (targetRotX - curRotX) * 0.12;
        curRotY += (targetRotY - curRotY) * 0.12;

        if (isHovered || Math.abs(curRotX) > 0.05 || Math.abs(curRotY) > 0.05) {
          card.style.transform = `perspective(1000px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg) translate3d(0, ${isHovered ? "-10px" : "0px"}, 0)`;
          rafId = requestAnimationFrame(animateTilt);
        } else {
          card.style.transform = "";
          rafId = null;
        }
      };

      card.addEventListener("mouseenter", () => {
        isHovered = true;
        if (!rafId) rafId = requestAnimationFrame(animateTilt);
      });

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle, elegant 3D tilt angles (max +/- 6 deg)
        targetRotX = ((centerY - y) / centerY) * 5.5;
        targetRotY = ((x - centerX) / centerX) * 5.5;
      });

      card.addEventListener("mouseleave", () => {
        isHovered = false;
        targetRotX = 0;
        targetRotY = 0;
      });
    });
  }

  // 5. Timeline Progress Scroll
  const timeline = document.querySelector(".timeline");
  const progress = document.querySelector(".timeline-progress");
  if (timeline && progress) {
    const update = () => {
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const total = rect.height;
      const scrolled = start - rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      progress.style.height = pct * 100 + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // 6. GSAP ScrollTrigger Integration for Parallax Depth
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on TEDx video stage image
    const tcImg = document.querySelector(".tc-video img");
    if (tcImg) {
      gsap.to(tcImg, {
        y: "8%",
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: ".tc-video",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }
  }
})();
