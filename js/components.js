(function () {
  const page = document.body.dataset.page || "";
  const isHome = page === "home";

  const nav = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "index.html#about", label: "About", key: "about" },
    { href: "programs.html", label: "Programs", key: "programs" },
    { href: "programs.html#certifications", label: "Certifications", key: "certs" },
    { href: "success-stories.html", label: "Success Stories", key: "stories" },
    { href: "calculators.html", label: "Calculators", key: "calculators" },
    { href: "blogs.html", label: "Blog", key: "blog" },
    { href: "contact.html", label: "Contact", key: "contact" }
  ];

  function activeClass(key) {
    const map = {
      home: "home",
      programs: "programs",
      stories: "stories",
      calculators: "calculators",
      blog: "blog",
      contact: "contact"
    };
    return map[page] === key ? " active" : "";
  }

  const logoSrc = "assets/images/maya/maya-logo.png";

  const headerClass = isHome ? "site-header is-hero" : "site-header solid";

  const header = `
    <header class="${headerClass}" id="siteHeader">
      <div class="header-inner">
        <a class="brand-logo" href="index.html" aria-label="Maya A Sharma home">
          <img src="${logoSrc}" alt="Maya A Sharma Financial logo" width="220" height="56">
        </a>
        <nav class="nav-desktop" aria-label="Primary">
          ${nav.map((item) => `<a class="nav-link${activeClass(item.key)}" data-key="${item.key}" href="${item.href}">${item.label}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <a class="header-call" href="tel:+919831352591" title="Call Maya A Sharma">
            <span class="header-call-icon"><i class="bi bi-telephone-fill"></i></span>
            <span class="header-call-text"><small>Call us</small><strong>+91-9831352591</strong></span>
          </a>
          <a class="btn-ms btn-gold btn-enroll" href="contact.html#enquiry-form">Enroll Now</a>
          <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-nav" id="mobileNav" hidden>
      <div class="mobile-nav-top">
        <a class="brand-logo" href="index.html" aria-label="Maya A Sharma home">
          <img src="${logoSrc}" alt="Maya A Sharma Financial logo" width="180" height="46">
        </a>
        <button class="mobile-close" id="mobileClose" aria-label="Close menu">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <nav class="mobile-nav-links" aria-label="Mobile primary navigation">
        ${nav.map((item) => `<a class="mobile-nav-link${activeClass(item.key)}" data-key="${item.key}" href="${item.href}">${item.label}</a>`).join("")}
      </nav>
      <div class="mobile-nav-contact">
        <a class="mobile-contact-link" href="tel:+919831352591">
          <i class="bi bi-telephone-fill"></i>
          <span>+91-9831352591</span>
        </a>
        <a class="mobile-contact-link" href="mailto:info@mayasharmafinancials.in">
          <i class="bi bi-envelope-fill"></i>
          <span>info@mayasharmafinancials.in</span>
        </a>
      </div>
      <div class="mobile-nav-cta">
        <a class="btn-ms btn-gold w-100" href="contact.html#enquiry-form">Enroll Now</a>
      </div>
    </div>
  `;

  const ticker = `
    <div class="market-ticker" role="region" aria-label="Market ticker, demo data">
      <div class="ticker-track-wrap">
        <div class="ticker-track" id="tickerTrack"></div>
      </div>
    </div>
  `;

  const footer = `
    <footer class="site-footer">
      <div class="container-ms ft-cta">
        <div>
          <p class="ft-cta-eyebrow">Learn Earn Invest</p>
          <h2>Start your financial journey <span>with Maya A Sharma.</span></h2>
        </div>
        <div class="ft-cta-actions">
          <a class="ft-btn ft-btn-gold" href="contact.html#enquiry-form">Book Free Consultation <i class="bi bi-arrow-right"></i></a>
          <a class="ft-btn ft-btn-ghost" href="https://wa.me/919831352591" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> WhatsApp Us</a>
        </div>
      </div>
      <div class="container-ms footer-grid ft-grid">
        <div class="footer-brand">
          <a class="footer-logo-link" href="index.html">
            <img src="${logoSrc}" alt="Maya A Sharma Financials Logo" class="footer-logo-img">
          </a>
          <strong>MAYA A SHARMA</strong>
          <p>Making financial education simple, practical and accessible.</p>
          <ul class="ft-contact">
            <li><i class="bi bi-telephone"></i><a href="tel:+919831352591">+91-9831352591</a></li>
            <li><i class="bi bi-envelope"></i><a href="mailto:info@mayasharmafinancials.in">info@mayasharmafinancials.in</a></li>
            <li><i class="bi bi-geo-alt"></i><span>2nd floor 2A, 450, SN Roy Rd, Sahapur, New Alipore, Kolkata 700038</span></li>
          </ul>
          <div class="socials">
            <a href="https://www.linkedin.com/in/maya-sharma-financial-coach" aria-label="LinkedIn" target="_blank" rel="noopener"><i class="bi bi-linkedin"></i></a>
            <a href="https://www.instagram.com/msfinancials_" aria-label="Instagram" target="_blank" rel="noopener"><i class="bi bi-instagram"></i></a>
            <a href="https://www.youtube.com/@msfinancial" aria-label="YouTube" target="_blank" rel="noopener"><i class="bi bi-youtube"></i></a>
            <a href="https://www.facebook.com/MSFinancials2008" aria-label="Facebook" target="_blank" rel="noopener"><i class="bi bi-facebook"></i></a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <p><a href="index.html#about">About</a></p>
          <p><a href="programs.html">Programs</a></p>
          <p><a href="programs.html#certifications">Certifications</a></p>
          <p><a href="success-stories.html">Success Stories</a></p>
          <p><a href="blogs.html">Blog</a></p>
          <p><a href="contact.html">Contact</a></p>
        </div>
        <div>
          <h3>Resources</h3>
          <p><a href="calculators.html">Calculators</a></p>
          <p><a href="success-stories.html#faq">FAQ</a></p>
          <p><a href="gallery.html">Gallery</a></p>
        </div>
        <div class="ft-form-col">
          <h3>Get in touch</h3>
          <p class="ft-form-sub">Leave your details and our team will call you back.</p>
          <form class="ft-form" id="footerEnquiry" novalidate>
            <input type="text" name="name" autocomplete="name" placeholder="Full name *" aria-label="Full name" required>
            <input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="Phone number *" aria-label="Phone number" pattern="[0-9+ ()-]{8,}" required>
            <input type="email" name="email" autocomplete="email" placeholder="Email address" aria-label="Email address">
            <select name="interest" aria-label="Interested in">
              <option value="" selected disabled>Interested in</option>
              <option>Financial Literacy Foundation</option>
              <option>Stock Market Essentials</option>
              <option>Wealth Creation Masterclass</option>
              <option>Women Investor Program</option>
              <option>Free Consultation</option>
            </select>
            <button type="submit">Send <i class="bi bi-arrow-right"></i></button>
          </form>
        </div>
      </div>
      <div class="container-ms footer-bottom">
        <span>© 2026 Maya A Sharma · MS Financials. All Rights Reserved.</span>
        <span class="ft-legal">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms &amp; Conditions</a>
        </span>
      </div>
      <div class="ft-watermark" aria-hidden="true">LEARN EARN INVEST</div>
    </footer>
    <div class="fab-stack" aria-label="Direct contact">
      <a class="fab fab-wa" href="https://wa.me/919831352591" aria-label="WhatsApp Maya A Sharma" title="WhatsApp" target="_blank" rel="noopener">
        <i class="bi bi-whatsapp"></i>
      </a>
      <a class="fab fab-call" href="tel:+919831352591" aria-label="Call Maya A Sharma" title="Call">
        <i class="bi bi-telephone"></i>
      </a>
    </div>
    <nav class="mobile-cta-bar" aria-label="Quick actions">
      <a href="https://wa.me/919831352591" target="_blank" rel="noopener">WhatsApp</a>
      <a href="tel:+919831352591">Call</a>
      <a class="enroll" href="contact.html#enquiry-form">Enroll Now</a>
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

  // Footer enquiry: no backend, so hand the details to WhatsApp as a ready-to-send message.
  const footerForm = document.getElementById("footerEnquiry");
  if (footerForm) {
    footerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!footerForm.checkValidity()) {
        footerForm.reportValidity();
        return;
      }
      const data = new FormData(footerForm);
      const text = [
        "Hello Maya ji, I'd like to know more.",
        "Name: " + data.get("name").trim(),
        "Phone: " + data.get("phone").trim(),
        data.get("email").trim() ? "Email: " + data.get("email").trim() : "",
        data.get("interest") ? "Interested in: " + data.get("interest") : "",
      ].filter(Boolean).join("\n");
      window.open("https://wa.me/919831352591?text=" + encodeURIComponent(text), "_blank", "noopener");
      footerForm.reset();
    });
  }

  const headerEl = document.getElementById("siteHeader");
  const logoImg = headerEl && headerEl.querySelector(".brand-logo img");

  function onScroll() {
    if (!headerEl) return;
    const scrolled = window.scrollY > 20;
    headerEl.classList.toggle("is-scrolled", scrolled);
    if (isHome) {
      headerEl.classList.toggle("is-hero", !scrolled);
    }
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

  // Section links (e.g. index.html#about) scroll smoothly and keep the "#" out of the address bar.
  function headerOffset() {
    const header = document.getElementById("siteHeader");
    const ticker = document.querySelector(".market-ticker");
    return (header ? header.offsetHeight : 0) + (ticker ? ticker.offsetHeight : 0) + 12;
  }

  function scrollToSection(id, smooth) {
    const target = id && document.getElementById(id);
    if (!target) return false;
    // Reveal it first so its fade-in offset doesn't skew the scroll position.
    if (target.classList.contains("scroll-reveal")) target.classList.add("is-visible");
    const shift = new DOMMatrix(getComputedStyle(target).transform).m42 || 0;
    const top = target.getBoundingClientRect().top - shift + window.scrollY - headerOffset();
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    target.classList.add("is-target");
    setTimeout(() => target.classList.remove("is-target"), 2600);
    return true;
  }

  function cleanUrl() {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href*='#']");
    if (!link) return;
    const url = new URL(link.getAttribute("href"), window.location.href);
    if (url.pathname !== window.location.pathname || !url.hash) return;
    if (scrollToSection(decodeURIComponent(url.hash.slice(1)), true)) {
      e.preventDefault();
      cleanUrl();
    }
  });

  if (window.location.hash) {
    const id = decodeURIComponent(window.location.hash.slice(1));
    window.addEventListener("load", () => {
      if (scrollToSection(id, false)) cleanUrl();
    });
  }

  // On the home page, highlight "About" in the menu while the About sections are on screen.
  if (isHome) {
    const aboutIds = ["about", "journey", "awards", "tedx", "mission"];
    const sections = aboutIds.map((id) => document.getElementById(id)).filter(Boolean);
    const navLinks = document.querySelectorAll(".nav-link[data-key], .mobile-nav-link[data-key]");
    const setActive = (key) => navLinks.forEach((a) => a.classList.toggle("active", a.dataset.key === key));
    const spy = () => {
      const y = window.scrollY + headerOffset() + 80;
      const inAbout = sections.some((s) => y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
      setActive(inAbout ? "about" : "home");
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
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

    // Clicking the dark backdrop (outside the photo/video) also closes it.
    box.addEventListener("click", (e) => {
      if (e.target === box || e.target.classList.contains("lightbox-inner")) close();
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
