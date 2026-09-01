(function () {
  const hero = document.querySelector(".hero");
  if (hero) requestAnimationFrame(() => hero.classList.add("is-ready"));

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    reveals.forEach((el) => io.observe(el));
  }

  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased).toLocaleString("en-IN") + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => io.observe(el));
  }

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

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }
})();
