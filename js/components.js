(function () {
  const page = document.body.dataset.page || "";
  const isHome = page === "home";

  // --- DEMO MODE START ---
  if (!isHome) {
    const path = window.location.pathname;
    if (!path.endsWith('index.html') && path !== '/' && !path.endsWith('/')) {
      window.location.replace('index.html');
    }
  }

  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && href !== 'index.html' && !href.startsWith('javascript:')) {
        e.preventDefault();
      }
    }
  });
  // --- DEMO MODE END ---

  const nav = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "programs.html", label: "Programs", key: "programs" },
    { href: "programs.html#certifications", label: "Certifications", key: "certs" },
    { href: "success-stories.html", label: "Success Stories", key: "stories" },
    { href: "calculators.html", label: "Calculators", key: "calculators" },
    { href: "blogs.html", label: "Blog", key: "blog" },
    { href: "contact.html", label: "Contact", key: "contact" }
  ];

  function activeClass(key) {
    if (page === "home") {
      const isAbout = window.location.hash.includes("about");
      if (isAbout && key === "about") return " active";
      if (!isAbout && key === "home") return " active";
      return "";
    }
    const map = {
      about: "about",
      programs: "programs",
      stories: "stories",
      calculators: "calculators",
      blog: "blog",
      contact: "contact",
      gallery: "",
      terms: "",
      privacy: ""
    };
    return map[page] === key ? " active" : "";
  }

  const logoSrc = "assets/images/maya/maya-logo.png";

  const headerClass = isHome ? "site-header is-hero" : "site-header solid";

  const header = `
    <header class="${headerClass}" id="siteHeader">
      <div class="header-inner">
        <a class="brand-logo" href="index.html" aria-label="Maya Sharma home">
          <img src="${logoSrc}" alt="Maya Sharma Financial logo" width="220" height="56">
        </a>
        <nav class="nav-desktop" aria-label="Primary">
          ${nav.map((item) => `<a class="nav-link${activeClass(item.key)}" href="${item.href}">${item.label}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <a class="btn-ms btn-gold" href="programs.html#programs">Enroll Now</a>
          <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-nav" id="mobileNav" hidden>
      <button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>
      ${nav.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
      <a href="contact.html">Book Consultation</a>
      <a class="btn-ms btn-gold mt-4" href="programs.html#programs">Enroll Now</a>
    </div>
  `;

  const ticker = `
    <div class="market-ticker" role="region" aria-label="Live market ticker, demo data">
      <div class="ticker-label">LIVE MARKET</div>
      <div class="ticker-track-wrap">
        <div class="ticker-track" id="tickerTrack"></div>
      </div>
    </div>
  `;

  const footer = `
    <footer class="site-footer">
      <div class="container-ms footer-grid">
        <div class="footer-brand">
          <a class="footer-logo-link" href="index.html">
            <img src="${logoSrc}" alt="Maya Sharma Financials Logo" class="footer-logo-img">
          </a>
          <strong>MAYA SHARMA</strong>
          <p>Financial Educator · Investor · TEDx Speaker</p>
          <p>Making financial education simple, practical and accessible.</p>
          <div class="socials">
            <a href="https://www.linkedin.com/in/maya-sharma-financial-coach" aria-label="LinkedIn" target="_blank" rel="noopener"><i class="bi bi-linkedin"></i></a>
            <a href="https://www.instagram.com/msfinancials_" aria-label="Instagram" target="_blank" rel="noopener"><i class="bi bi-instagram"></i></a>
            <a href="https://www.youtube.com/@msfinancial" aria-label="YouTube" target="_blank" rel="noopener"><i class="bi bi-youtube"></i></a>
            <a href="https://www.facebook.com/MSFinancials2008" aria-label="Facebook" target="_blank" rel="noopener"><i class="bi bi-facebook"></i></a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <p><a href="about.html">About</a></p>
          <p><a href="programs.html">Programs</a></p>
          <p><a href="programs.html#certifications">Certifications</a></p>
          <p><a href="success-stories.html">Success Stories</a></p>
          <p><a href="blogs.html">Blog</a></p>
          <p><a href="contact.html">Contact</a></p>
        </div>
        <div>
          <h3>Resources</h3>
          <p><a href="calculators.html">Calculators</a></p>
          <p><a href="programs.html#faq">FAQ</a></p>
          <p><a href="gallery.html">Gallery</a></p>
        </div>
        <div>
          <h3>Connect</h3>
          <p><a href="tel:+919831352591">+91-9831352591</a></p>
          <p><a href="mailto:info@mayasharmafinancials.in">info@mayasharmafinancials.in</a></p>
          <p>2nd floor 2A, 450, SN Roy Rd, Sahapur, New Alipore, Kolkata, West Bengal 700038</p>
        </div>
      </div>
      <div class="container-ms footer-bottom">
        <span>© 2026 Maya Sharma. All Rights Reserved.</span>
        <span>
          <a href="privacy.html">Privacy Policy</a> ·
          <a href="terms.html">Terms &amp; Conditions</a>
        </span>
      </div>
    </footer>
    <div class="fab-stack">
      <a class="fab fab-wa" href="https://wa.me/919831352591" aria-label="WhatsApp Maya Sharma" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i></a>
      <a class="fab fab-call" href="tel:+919831352591" aria-label="Call Maya Sharma"><i class="bi bi-telephone"></i></a>
    </div>
    <nav class="mobile-cta-bar" aria-label="Quick actions">
      <a href="https://wa.me/919831352591" target="_blank" rel="noopener">WhatsApp</a>
      <a href="tel:+919831352591">Call</a>
      <a class="enroll" href="programs.html#programs">Enroll Now</a>
    </nav>
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightboxTitle" hidden>
      <div class="lightbox-inner">
        <div class="lightbox-frame" id="lightboxFrame">[IMAGE TO BE PROVIDED]</div>
        <h3 id="lightboxTitle"></h3>
        <p id="lightboxCaption"></p>
        <div class="lightbox-controls">
          <button type="button" data-lb="prev" aria-label="Previous">‹</button>
          <button type="button" data-lb="close" aria-label="Close">×</button>
          <button type="button" data-lb="next" aria-label="Next">›</button>
        </div>
      </div>
    </div>
  `;

  const tickerMount = document.getElementById("ticker-root");
  const headerMount = document.getElementById("header-root");
  const footerMount = document.getElementById("footer-root");
  if (tickerMount) tickerMount.innerHTML = ticker;
  if (headerMount) headerMount.innerHTML = header;
  if (footerMount) footerMount.innerHTML = footer;

  const headerEl = document.getElementById("siteHeader");
  const logoImg = headerEl && headerEl.querySelector(".brand-logo img");

  function onScroll() {
    if (!headerEl) return;
    if (!isHome) return; // Non-home pages: header is always sticky, no need for transitions or layout shifts
    const scrolled = window.scrollY > 24;
    headerEl.classList.toggle("is-scrolled", scrolled);
    headerEl.classList.toggle("is-hero", !scrolled);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const mobileNav = document.getElementById("mobileNav");
  const menuToggle = document.getElementById("menuToggle");
  const mobileClose = document.getElementById("mobileClose");

  function openMenu() {
    mobileNav.hidden = false;
    requestAnimationFrame(() => mobileNav.classList.add("open"));
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(() => { mobileNav.hidden = true; }, 400);
  }

  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  window.MSLightbox = (function () {
    let items = [];
    let index = 0;
    const box = document.getElementById("lightbox");
    const title = document.getElementById("lightboxTitle");
    const caption = document.getElementById("lightboxCaption");
    const frame = document.getElementById("lightboxFrame");

    function render() {
      const item = items[index];
      if (!item) return;
      title.textContent = item.title || "";
      caption.textContent = item.caption || "";
      if (item.src) {
        if (item.src.includes("youtube.com") || item.src.includes("youtu.be")) {
          let videoId = "";
          if (item.src.includes("youtube.com/watch")) {
            const parts = item.src.split("v=");
            if (parts.length > 1) {
              videoId = parts[1].split("&")[0];
            }
          } else if (item.src.includes("youtu.be/")) {
            videoId = item.src.split("youtu.be/")[1].split("?")[0].split("&")[0];
          } else if (item.src.includes("youtube.com/embed/")) {
            videoId = item.src.split("youtube.com/embed/")[1].split("?")[0].split("&")[0];
          }
          frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 50vh; border-radius: 12px; background: #000;"></iframe>`;
        } else if (item.src.toLowerCase().endsWith(".mp4")) {
          frame.innerHTML = `<video src="${item.src}" controls autoplay playsinline style="width: 100%; max-height: 70vh; border-radius: 12px; background: #000;"></video>`;
        } else {
          frame.innerHTML = `<img src="${item.src}" alt="${item.title || ""}">`;
        }
      } else {
        frame.textContent = item.placeholder || "[IMAGE TO BE PROVIDED]";
      }
    }

    function open(list, start) {
      items = list;
      index = start || 0;
      box.hidden = false;
      box.classList.add("open");
      render();
      box.querySelector('[data-lb="close"]').focus();
    }

    function close() {
      box.classList.remove("open");
      box.hidden = true;
      frame.innerHTML = "";
    }

    function next() {
      index = (index + 1) % items.length;
      render();
    }

    function prev() {
      index = (index - 1 + items.length) % items.length;
      render();
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lb]");
      if (!btn) return;
      const action = btn.dataset.lb;
      if (action === "close") close();
      if (action === "next") next();
      if (action === "prev") prev();
    });

    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    return { open, close };
  })();
})();
