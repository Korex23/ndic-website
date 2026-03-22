(function () {
  const track = document.getElementById("hero-track");
  const dotsContainer = document.getElementById("hero-dots");
  const carousel = document.getElementById("hero-carousel");

  const titleEl = document.getElementById("hero-title");
  const subtextEl = document.getElementById("hero-subtext");

  if (!track || !dotsContainer) return;

  const slides = [
    {
      title: `Protecting Depositors.<br />Strengthening Confidence.`,
      subtext: `We ensure the safety, stability, and <br />
                resilience of Nigeria's banking system.`,
      image: "assets/images/hero-building.png",
      alt: "NDIC Headquarters building",
    },
    {
      title: `Safeguarding Your Funds.<br />Securing The Future.`,
      subtext: `NDIC protects depositors and promotes <br />
                financial system stability across Nigeria.`,
      image: "assets/images/hero-building.png",
      alt: "NDIC Building exterior",
    },
  ];

  // Switch track to a stacking container
  track.classList.remove("flex");
  track.style.position = "relative";

  track.innerHTML = slides
    .map(
      (slide, i) => `
        <div
          class="carousel-slide absolute inset-0 rounded-2xl overflow-hidden"
          aria-label="Slide ${i + 1} of ${slides.length}"
          style="
            transition: opacity 0.6s ease, transform 0.6s ease;
            opacity: ${i === 0 ? "1" : "0.6"};
            transform: ${i === 0 ? "translate(0,0) scale(1)" : "translate(0%, -3%) scale(0.98)"};
            z-index: ${slides.length - i};
          "
        >
          <img
            src="${slide.image}"
            alt="${slide.alt}"
            class="w-full h-full object-cover"
            width="720"
            height="520"
            loading="${i === 0 ? "eager" : "lazy"}"
          />
        </div>
      `,
    )
    .join("");

  dotsContainer.innerHTML = slides
    .map(
      (_, i) => `
        <button
          role="tab"
          aria-selected="${i === 0}"
          class="carousel-dot ${
            i === 0 ? "active border-brand-primary" : "border-ndic-border"
          } w-3 h-3 rounded-sm border-2 transition-colors"
          aria-label="Slide ${i + 1}"
        ></button>
      `,
    )
    .join("");

  const dots = document.querySelectorAll(".carousel-dot");

  let current = 0;
  const total = slides.length;

  function updateText(index) {
    if (!titleEl || !subtextEl) return;

    titleEl.style.opacity = 0;
    subtextEl.style.opacity = 0;

    setTimeout(() => {
      titleEl.innerHTML = slides[index].title;
      subtextEl.innerHTML = slides[index].subtext;

      titleEl.style.opacity = 1;
      subtextEl.style.opacity = 1;
    }, 200);
  }

  function goTo(index) {
    current = (index + total) % total;

    const slideEls = track.querySelectorAll(".carousel-slide");
    slideEls.forEach((el, i) => {
      const offset = (i - current + total) % total;
      if (offset === 0) {
        el.style.opacity = "1";
        el.style.transform = "translate(0,0) scale(1)";
        el.style.zIndex = total;
      } else {
        el.style.opacity = "0.7";
        el.style.transform = "translate(-0%, -3%) scale(0.98)";
        el.style.zIndex = total - offset;
      }
    });

    dots.forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle("active", isActive);
      dot.classList.toggle("border-brand-primary", isActive);
      dot.classList.toggle("border-ndic-border", !isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });

    updateText(current);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  let timer = setInterval(() => goTo(current + 1), 5000);

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  carousel?.addEventListener("mouseenter", () => clearInterval(timer));
  carousel?.addEventListener("mouseleave", resetTimer);
  carousel?.addEventListener("focusin", () => clearInterval(timer));
  carousel?.addEventListener("focusout", resetTimer);

  updateText(0);
})();
/* ──────────────────────────────────────────────────────────
   News Accordion
────────────────────────────────────────────────────────── */

const accordionData = [
  {
    label: "Publication",
    title:
      "NDIC announces disbursement of ₦54.6 billion to 691,418 depositors...",
    open: false,
    content: `
      <div class="accordion-expanded-inner">
        <p class="font-body text-[13px] text-ndic-secondary leading-relaxed">
          NDIC announces disbursement of ₦54.6 billion to 691,418 depositors...
        </p>
        <a href="#" class="font-body font-bold text-[13px] text-brand-primary uppercase mt-2 inline-block hover:underline">
          Read More
        </a>
      </div>
    `,
  },
  {
    label: "News",
    title:
      "NDIC's management received a courtesy visit from leaders of business recovery practitioners.",
    open: false,
    content: `
      <div class="accordion-expanded-inner">
        <div class="relative w-full rounded-md overflow-hidden bg-slate-200 h-72">
          <img src="assets/images/news-handshake.png"
               class="w-full h-full object-cover"
               alt="news image"/>
        </div>

        <p class="font-body text-[13px] text-ndic-secondary mt-3 leading-relaxed">
          NDIC's management received a courtesy visit from leaders of business recovery practitioners.
        </p>

        <a href="#" class="font-body font-bold text-[13px] text-brand-primary uppercase mt-2 inline-block hover:underline">
          Read More
        </a>
      </div>
    `,
  },
  {
    label: "Publication",
    title:
      "Announcement of 100% liquidation dividend to depositors of 20 failed banks",
    open: false,
    content: `<div class="accordion-expanded-inner">
        <p class="font-body text-[13px] text-ndic-secondary leading-relaxed">
          NDIC announces disbursement of ₦54.6 billion to 691,418 depositors...
        </p>
        <a href="#" class="font-body font-bold text-[13px] text-brand-primary uppercase mt-2 inline-block hover:underline">
          Read More
        </a>
      </div>`,
  },
  {
    label: "Article",
    title: "NDIC engaged judiciary stakeholders in a sensitization seminar...",
    open: false,
    content: `<div class="accordion-expanded-inner">
        <p class="font-body text-[13px] text-ndic-secondary leading-relaxed">
          NDIC announces disbursement of ₦54.6 billion to 691,418 depositors...
        </p>
        <a href="#" class="font-body font-bold text-[13px] text-brand-primary uppercase mt-2 inline-block hover:underline">
          Read More
        </a>
      </div>`,
  },
];

(function () {
  const container = document.getElementById("news-accordion");

  const PLUS_SVG = `<svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.33289 13H21.6662" stroke="#141313" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 4.33423V21.6676" stroke="#141313" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const MINUS_SVG = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66602 20H33.3327" stroke="#141313" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  container.innerHTML = accordionData
    .map(
      (item) => `
        <div class="accordion-item">
          <button class="accordion-trigger w-full py-5 text-left" aria-expanded="${item.open}">
            <div class="label-col">
              <span class="active bg-brand-primary w-3 h-3 rounded-sm border-2 flex-shrink-0"></span>
              <span class="font-body font-bold text-[18px] sm:text-[20px] text-ndic-text tracking-wider uppercase px-2">
                ${item.label}
              </span>
            </div>
            <span class="text-col font-body text-sm sm:text-base md:text-lg lg:text-xl lg:translate-x-10 text-ndic-text leading-relaxed">
              ${item.title}
            </span>
            <div class="icon-col text-brand-primary">
              ${item.open ? MINUS_SVG : PLUS_SVG}
            </div>
          </button>
          <div class="accordion-content lg:translate-x-10 ${item.open ? "open" : ""}">
              ${item.content}
          </div>
        </div>
      `,
    )
    .join("");

  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      const isOpen = content.classList.contains("open");

      // Close all others
      document.querySelectorAll(".accordion-content.open").forEach((c) => {
        if (c !== content) {
          c.classList.remove("open");
          const t = c.previousElementSibling;
          t?.setAttribute("aria-expanded", "false");
          const ic = t?.querySelector(".icon-col");
          if (ic) ic.innerHTML = PLUS_SVG;
        }
      });

      // Toggle current
      content.classList.toggle("open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
      const icon = trigger.querySelector(".icon-col");
      if (icon) icon.innerHTML = isOpen ? PLUS_SVG : MINUS_SVG;
    });
  });
})();
