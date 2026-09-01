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

  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector("button");
    button.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((other) => {
        other.classList.remove("open");
        other.querySelector("button").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

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

  document.querySelectorAll("[data-gallery]").forEach((el, i, list) => {
    const items = Array.from(list).map((node) => ({
      title: node.dataset.title || "Gallery",
      caption: node.dataset.caption || "[IMAGE TO BE PROVIDED]",
      src: node.dataset.src || ""
    }));
    el.addEventListener("click", () => window.MSLightbox.open(items, i));
  });

  const form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const success = document.getElementById("formSuccess");
      success.style.display = "block";
      form.reset();
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
        speed: 700,
        autoplay: {
          delay: 4500,
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
        slidesPerView: 1.2,
        spaceBetween: 20,
        pagination: {
          el: ".video-pagination",
          clickable: true,
        },
        breakpoints: {
          768: { slidesPerView: 2.3, spaceBetween: 24 },
          1200: { slidesPerView: 4, spaceBetween: 24 }
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
          640:  { slidesPerView: 2, spaceBetween: 24 },
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
      document.title = data.title + " — Maya Sharma";
    }
  }

  // Scroll Animations (Intersection Observer)
  const revealElements = document.querySelectorAll(".scroll-reveal");
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
})();
