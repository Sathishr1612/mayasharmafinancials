(function () {
  document.querySelectorAll(".why-principle").forEach((item) => {
    const makeActive = () => {
      document.querySelectorAll(".why-principle").forEach((other) => other.classList.remove("active"));
      item.classList.add("active");
    };
    item.addEventListener("mouseenter", makeActive);
    item.addEventListener("focusin", makeActive);
    item.addEventListener("click", makeActive);
  });

  document.querySelectorAll("[data-video-src]").forEach((el) => {
    el.setAttribute("tabindex", "0");
    const openVideo = () => {
      const src = el.dataset.videoSrc;
      const title = el.dataset.videoTitle || "";
      const caption = el.dataset.videoCaption || "";
      if (src && window.MSLightbox) {
        window.MSLightbox.open([{ src, title, caption }], 0);
      }
    };
    el.addEventListener("click", openVideo);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openVideo();
      }
    });
  });

  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      document.querySelectorAll("[data-mode]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".mode-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === "mode-" + mode);
      });
    });
  });

  // FAQ Accordion
  const faqWrap = document.querySelector(".faq-wrap");
  if (faqWrap) {
    const allItems = faqWrap.querySelectorAll(".faq-item");

    // Ensure first item is open by default
    if (allItems.length > 0 && !faqWrap.querySelector(".faq-item.open")) {
      allItems[0].classList.add("open");
      const b0 = allItems[0].querySelector("button");
      if (b0) b0.setAttribute("aria-expanded", "true");
    }

    faqWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      if (!item) return;

      const isOpen = item.classList.contains("open");

      // Close all other items
      allItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const b = other.querySelector("button");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  }

  const awardItems = [
    { title: "TEDx GPCET 2024", caption: "Talk on financial awareness and long-term wealth creation.", src: "assets/images/awards/awards-maya-gpect.jpg" },
    { title: "TED Talk Mastery & Train The Trainer", caption: "Certification in public speaking and training.", src: "assets/images/awards/award-maya-sharma.jpg" },
    { title: "Super Speaker 2000", caption: "Recognition of Excellence", src: "assets/images/awards/speaker-mayasharma.jpg" },
    { title: "Zee Business Recognition", caption: "Media Recognition", src: "assets/images/awards/maya-awards-tedx.jpg" },
    { title: "CAFÉ PEHCHAAN 5.0", caption: "Indcap Rising Star Award", src: "assets/images/awards/awards-mayasharma-suresh.jpg" },
    { title: "Apni Pehchaan – Naari Sammaan", caption: "Women Empowerment Recognition", src: "assets/images/awards/maya-sharma.JPG" },
    { title: "Financial Gurukul Certifications", caption: "Professional Certifications", src: "assets/images/awards/award-maya-education-reg.jpg" },
    { title: "Winning Stree 2023", caption: "Strees of Excellence", src: "assets/images/awards/tedx-award-maya.JPG" }
  ];

  document.querySelectorAll("[data-award]").forEach((el) => {
    el.addEventListener("click", () => {
      const i = Number(el.dataset.award);
      window.MSLightbox.open(awardItems, i);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.MSLightbox.open(awardItems, Number(el.dataset.award));
      }
    });
  });

  // Lightbox galleries: items sharing the same data-gallery value browse together.
  const galleryItem = (node) => {
    const img = node.querySelector("img");
    return {
      title: node.dataset.title || (img && img.alt) || "",
      caption: node.dataset.caption || "",
      src: node.dataset.src || (img && img.getAttribute("src")) || ""
    };
  };
  document.querySelectorAll("[data-gallery]").forEach((el) => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    const open = () => {
      const group = Array.from(document.querySelectorAll(`[data-gallery="${el.dataset.gallery}"]`))
        .filter((node) => !node.classList.contains("is-hidden"));
      window.MSLightbox.open(group.map(galleryItem), Math.max(0, group.indexOf(el)));
    };
    el.addEventListener("click", open);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  // Gallery filter buttons
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("active", b === btn));
      document.querySelectorAll("[data-cat]").forEach((item) => {
        item.classList.toggle("is-hidden", f !== "all" && item.dataset.cat !== f);
      });
    });
  });

  // "Read more" toggles
  document.querySelectorAll("[data-more]").forEach((btn) => {
    const panel = document.getElementById(btn.dataset.more);
    if (!panel) return;
    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Read Less" : "Read Full Story";
    });
  });

  // Mini SIP calculator
  document.querySelectorAll("[data-sip-mini]").forEach((box) => {
    const inputs = box.querySelectorAll("input[type='range']");
    const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
    const calc = () => {
      const v = {};
      inputs.forEach((input) => {
        v[input.name] = Number(input.value);
        const out = box.querySelector(`output[for='${input.id}']`);
        if (out) out.textContent = input.name === "monthly" ? inr(input.value) : input.value + (input.name === "rate" ? "%" : " yrs");
      });
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const future = r === 0 ? v.monthly * n : v.monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = v.monthly * n;
      const gains = Math.max(0, future - invested);
      box.querySelector("[data-out='invested']").textContent = inr(invested);
      box.querySelector("[data-out='gains']").textContent = inr(gains);
      box.querySelector("[data-out='total']").textContent = inr(future);
      box.querySelector(".sip-bar .inv").style.width = (invested / future) * 100 + "%";
      box.querySelector(".sip-bar .ret").style.width = (gains / future) * 100 + "%";
    };
    inputs.forEach((input) => input.addEventListener("input", calc));
    calc();
  });

  // Home hero photo slider
  document.querySelectorAll("[data-hero-slider]").forEach((hero) => {
    const slides = hero.querySelectorAll(".hs-slide");
    const bars = hero.querySelectorAll(".hs-bars button");
    const current = hero.querySelector("[data-hs-current]");
    const duration = 6000;
    let index = 0;
    let timer = null;
    hero.style.setProperty("--hs-duration", duration / 1000 + "s");

    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
      bars.forEach((b, i) => {
        b.classList.remove("is-active");
        b.classList.toggle("is-done", i < index);
      });
      // Restart the progress bar animation on the active bar
      if (bars[index]) {
        void bars[index].offsetWidth;
        bars[index].classList.add("is-active");
      }
      if (current) current.textContent = String(index + 1).padStart(2, "0");
    };

    const start = () => {
      clearInterval(timer);
      timer = setInterval(() => show(index + 1), duration);
    };

    bars.forEach((b, i) => b.addEventListener("click", () => { show(i); start(); }));
    const prev = hero.querySelector("[data-hs-prev]");
    const next = hero.querySelector("[data-hs-next]");
    if (prev) prev.addEventListener("click", () => { show(index - 1); start(); });
    if (next) next.addEventListener("click", () => { show(index + 1); start(); });

    // Pause while the tab is hidden so slides don't race when it comes back
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(timer);
        hero.classList.add("is-paused");
      } else {
        hero.classList.remove("is-paused");
        show(index);
        start();
      }
    });

    show(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
  });

  // Subtle 3D tilt on cards (desktop pointers only)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  const form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // No backend: hand the enquiry to WhatsApp as a ready-to-send message.
      const data = new FormData(form);
      const text = [
        "Hello Maya ji, I'd like to know more.",
        "Name: " + data.get("name").trim(),
        "Phone: " + data.get("phone").trim(),
        "Email: " + data.get("email").trim(),
        "Course: " + data.get("program"),
        "Message: " + data.get("message").trim(),
      ].join("\n");
      window.open("https://wa.me/919831352591?text=" + encodeURIComponent(text), "_blank", "noopener");
      const success = document.getElementById("formSuccess");
      success.textContent = "Thank you. WhatsApp has opened with your enquiry. Just press send.";
      success.style.display = "block";
      form.reset();
    });

    // Auto-select course from URL parameter (?course=...) and smooth scroll to form
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get("course");
    const programSelect = document.getElementById("program");
    if (courseParam && programSelect) {
      for (let i = 0; i < programSelect.options.length; i++) {
        if (programSelect.options[i].value.toLowerCase().includes(courseParam.toLowerCase()) ||
            programSelect.options[i].text.toLowerCase().includes(courseParam.toLowerCase())) {
          programSelect.selectedIndex = i;
          break;
        }
      }
    }

    function scrollToEnquiry() {
      const formCard = document.getElementById("enquiry-form") || form;
      if (formCard) {
        formCard.scrollIntoView({ behavior: "smooth", block: "center" });
        const firstInput = form.querySelector("input");
        if (firstInput) setTimeout(() => firstInput.focus(), 400);
      }
    }

    if (window.location.hash === "#enquiry-form" || courseParam) {
      setTimeout(scrollToEnquiry, 350);
    }

    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#enquiry-form") scrollToEnquiry();
    });
  }

  if (window.Swiper) {
    if (document.querySelector(".awards-swiper")) {
      new Swiper(".awards-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        speed: 6000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 24 }
        }
      });
    }
    if (document.querySelector(".testimonials-swiper")) {
      new Swiper(".testimonials-swiper", {
        slidesPerView: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        grabCursor: true,
        speed: 600,
        roundLengths: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: ".testimonials-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".testimonials-button-next",
          prevEl: ".testimonials-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            centeredSlides: false,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 28,
          }
        }
      });
    }
    if (document.querySelector(".video-swiper")) {
      new Swiper(".video-swiper", {
        slidesPerView: 1.1,
        spaceBetween: 16,
        grabCursor: true,
        pagination: {
          el: ".video-pagination",
          clickable: true,
        },
        breakpoints: {
          768: { slidesPerView: 1.6, spaceBetween: 24 },
          1100: { slidesPerView: 2, spaceBetween: 32 }
        }
      });
    }
    if (document.querySelector(".cert-swiper")) {
      new Swiper(".cert-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: ".cert-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".cert-button-next",
          prevEl: ".cert-button-prev",
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 }
        }
      });
    }
  }

  const params = new URLSearchParams(window.location.search);
  const article = params.get("article");
  const template = document.getElementById("articleView");
  const listing = document.getElementById("blogListing");
  if (article && template && listing) {
    const articles = {
      compounding: {
        title: "How Compounding Creates Wealth",
        cat: "Wealth Creation",
        body: "[ARTICLE CONTENT TO BE PROVIDED]"
      },
      sip: {
        title: "SIP vs Stocks",
        cat: "Market Education",
        body: "[ARTICLE CONTENT TO BE PROVIDED]"
      },
      mistakes: {
        title: "Common Trading Mistakes",
        cat: "Market Education",
        body: "[ARTICLE CONTENT TO BE PROVIDED]"
      },
      literacy: {
        title: "Financial Literacy for Beginners",
        cat: "Financial Literacy",
        body: "[ARTICLE CONTENT TO BE PROVIDED]"
      }
    };
    const data = articles[article];
    if (data) {
      listing.hidden = true;
      template.hidden = false;
      template.querySelector("[data-article-title]").textContent = data.title;
      template.querySelector("[data-article-cat]").textContent = data.cat;
      template.querySelector("[data-article-body]").textContent = data.body;
      document.title = data.title + " | Maya A Sharma";
    }
  }

  // Scroll Animations (Intersection Observer)
  const revealElements = document.querySelectorAll(".scroll-reveal, .img-reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Awards coverflow: centred 3D slider with a caption that follows the active award.
  const awardsFlow = document.querySelector(".af-swiper");
  if (awardsFlow && window.Swiper) {
    const slides = awardsFlow.querySelectorAll(".af-slide");
    slides.forEach((s) => {
      const img = s.querySelector("img");
      if (img) s.style.setProperty("--slide-bg", `url("${img.src}")`);
    });

    const caption = document.querySelector(".af-caption");
    const nameEl = document.querySelector("[data-af-name]");
    const orgEl = document.querySelector("[data-af-org]");
    const currentEl = document.querySelector("[data-af-current]");

    const flow = new Swiper(awardsFlow, {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      grabCursor: true,
      speed: 700,
      keyboard: { enabled: true },
      autoplay: { delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true },
      coverflowEffect: { rotate: 28, stretch: 0, depth: 220, modifier: 1, slideShadows: false },
      navigation: { nextEl: ".af-next", prevEl: ".af-prev" },
      on: {
        slideChange(sw) {
          const slide = sw.slides[sw.activeIndex];
          if (!slide || !caption) return;
          nameEl.textContent = slide.dataset.name || "";
          orgEl.textContent = slide.dataset.org || "";
          currentEl.textContent = String(sw.realIndex + 1).padStart(2, "0");
          caption.classList.remove("is-changing");
          void caption.offsetWidth; // restart the fade-in
          caption.classList.add("is-changing");
        }
      }
    });

    // Clicking a side slide brings it to the centre instead of opening the lightbox;
    // a drag never opens it either. Runs in capture phase, before the gallery handler.
    awardsFlow.addEventListener("click", (e) => {
      const slide = e.target.closest(".af-slide");
      if (!slide) return;
      if (!flow.allowClick || !slide.classList.contains("swiper-slide-active")) {
        e.stopPropagation();
        if (flow.allowClick) flow.slideToLoop(Number(slide.dataset.swiperSlideIndex));
      }
    }, true);
  }

  // Certificate deck: level buttons bring a certificate to the front of the fanned stack.
  document.querySelectorAll("[data-cert-deck]").forEach((root) => {
    const cards = Array.from(root.querySelectorAll(".cs-card"));
    const levels = Array.from(root.querySelectorAll(".cs-levels li"));
    const deck = root.querySelector(".cs-deck");
    let index = 0;
    let timer = null;

    const show = (i) => {
      index = (i + cards.length) % cards.length;
      cards.forEach((c, n) => { c.dataset.pos = (n - index + cards.length) % cards.length; });
      levels.forEach((li, n) => li.classList.toggle("is-active", n === index));
      // On phones the levels are a sideways row: keep the active one in view.
      const row = levels[index] && levels[index].parentElement;
      if (row && row.scrollWidth > row.clientWidth) {
        row.scrollTo({ left: levels[index].offsetLeft - parseFloat(getComputedStyle(row).paddingLeft), behavior: "smooth" });
      }
    };
    const schedule = () => {
      clearInterval(timer);
      timer = setInterval(() => show(index + 1), 4000);
    };

    levels.forEach((li, n) => li.querySelector("button").addEventListener("click", () => { show(n); schedule(); }));

    // A card behind the front one comes forward instead of opening the lightbox.
    deck.addEventListener("click", (e) => {
      const card = e.target.closest(".cs-card");
      if (card && card.dataset.pos !== "0") {
        e.stopPropagation();
        show(cards.indexOf(card));
        schedule();
      }
    }, true);

    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", schedule);

    show(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) schedule();
  });

  // Testimonial marquee: repeat the cards until one set is wider than the screen,
  // then duplicate that set so the -50% scroll loops seamlessly.
  document.querySelectorAll("[data-marquee]").forEach((row) => {
    const track = row.querySelector(".tq-track");
    const originals = Array.from(track.children);
    const cloneSet = () => originals.forEach((card) => {
      const copy = card.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
    let guard = 0;
    while (track.scrollWidth < window.innerWidth && guard++ < 6) cloneSet();
    const setCount = track.children.length;
    for (let i = 0; i < setCount; i++) {
      const copy = track.children[i].cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    }
    // Constant speed (~40px per second) whatever the number of cards.
    track.style.setProperty("--tq-duration", `${Math.round(track.scrollWidth / 2 / 40)}s`);
  });
})();
