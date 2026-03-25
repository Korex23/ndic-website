// ══════════════════════════════════════════════════════
// STATS COUNTER — IntersectionObserver + rAF ease-out
// ══════════════════════════════════════════════════════
(function () {
  const section = document.getElementById("stats-section");
  if (!section) return;
  let animated = false;

  new IntersectionObserver(
    function (entries, obs) {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        obs.disconnect();
        var els = section.querySelectorAll(".stat-number");
        var duration = 1800;
        var start = performance.now();

        function tick(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          els.forEach(function (el) {
            var target = parseInt(el.dataset.target, 10);
            el.textContent =
              (el.dataset.prefix || "") +
              Math.round(eased * target) +
              (el.dataset.suffix || "");
          });
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.4 },
  ).observe(section);
})();

// ══════════════════════════════════════════════════════
// GALLERY — sticky wrapper → horizontal translateX
// ══════════════════════════════════════════════════════
(function () {
  var wrapper = document.getElementById("gallery-sticky-wrapper");
  var track = document.getElementById("gallery-track");
  var progBar = document.getElementById("gallery-progress");
  var counter = document.getElementById("gallery-counter");
  if (!wrapper || !track) return;

  var CARD_W = 300;
  var GAP = 16;
  var SIDE_PAD = 48;
  var totalCards = track.querySelectorAll(".gallery-card").length;
  var maxT = 0;

  function setup() {
    maxT = totalCards * (CARD_W + GAP) - window.innerWidth + SIDE_PAD * 2;
    if (maxT < 0) maxT = 0;
    wrapper.style.height = maxT + window.innerHeight + "px";
  }

  setup();
  window.addEventListener("resize", setup);

  window.addEventListener(
    "scroll",
    function () {
      var rect = wrapper.getBoundingClientRect();
      var scrolled = -rect.top;
      var range = wrapper.offsetHeight - window.innerHeight;
      var p = range > 0 ? Math.max(0, Math.min(1, scrolled / range)) : 0;

      track.style.transform = "translateX(-" + p * maxT + "px)";
      progBar.style.width = p * 100 + "%";

      var idx = Math.min(Math.floor(p * totalCards), totalCards - 1);
      counter.textContent = Math.max(0, idx) + 1 + " / " + totalCards;
    },
    { passive: true },
  );
})();

// ══════════════════════════════════════════════════════
// HISTORY — data array (add / remove entries here)
// ══════════════════════════════════════════════════════

var historySlides = [
  {
    year: "1988",
    heading: "Background &amp; <br/> Establishment",
    body: '<p>The Nigeria Deposit Insurance Corporation (NDIC) traces its origin to a 1983 committee set up by the Board of the Central Bank of Nigeria (CBN) to review the Nigerian banking system.</p><p class="mt-3">The committee recommended the creation of a Depositors’ Protection Fund, which led to the establishment of NDIC through Decree No. 22 of June 15, 1988.</p><p class="mt-3">This move was part of broader economic reforms following Nigeria’s 1986 Structural Adjustment Programme (SAP), aimed at strengthening financial stability and supporting a liberalized banking environment.</p> ',
    imgSrc: "./assets/images/hero-building.webp",
    imgAlt: "NDIC Headquarters",
    backdrop: "rgba(44, 46, 129, 0.07)",
  },
  {
    year: "1989",
    heading: "The Banking Crisis Era <br/> (Late 1980s – 1990s)",
    body: '<p>Following deregulation, Nigeria experienced rapid growth in the banking sector — from 40 banks in 1986 to 120 in 1992.</p><p class="mt-3">However, this expansion led to serious challenges:<ul class="mt-3 list-disc list-inside space-y-1"><li>Intense and unhealthy competition among banks</li><li>Entry of unqualified and unethical operators</li><li>Inadequate skilled manpower</li><li>Weak corporate governance and internal conflicts</li></ul> </p><p class="mt-3">Combined with economic instability and political uncertainty, the sector became highly distressed even before NDIC began operations in March 1989.</p>',
    imgSrc: "./assets/images/news-handshake.webp",
    imgAlt: "NDIC officials",
    backdrop: "rgba(254, 146, 57, 0.07)",
  },
  // {
  //   year: "1995",
  //   heading: "Early Intervention Measures",
  //   body: '<p>Between 1995 and 2004, NDIC developed robust early warning systems to identify at-risk banks before failure. Key frameworks introduced:</p><ul class="mt-3 list-disc list-inside space-y-1"><li>Deposit Insurance System (DIS) refinement</li><li>Mandatory Distress Resolution (MDR) framework</li><li>Proactive technical assistance to at-risk banks</li></ul>',
  //   imgSrc: "./assets/images/event-signing.webp",
  //   imgAlt: "NDIC signing ceremony",
  //   backdrop: "rgba(44, 46, 129, 0.07)",
  // },
  // {
  //   year: "2005",
  //   heading: "Banking Consolidation",
  //   body: '<p>In 2005, the CBN launched a landmark banking consolidation programme. The number of commercial banks shrank from 89 to 25 as weaker institutions merged or were absorbed. NDIC protected depositors throughout the entire transition.</p><p class="mt-3">The exercise strengthened Nigeria\'s banking capital base, improved governance standards, and positioned the sector to better withstand external shocks.</p>',
  //   imgSrc: "./assets/images/event-speaker.webp",
  //   imgAlt: "NDIC address",
  //   backdrop: "rgba(254, 146, 57, 0.07)",
  // },
  // {
  //   year: "2006",
  //   heading: "Deposit Insurance Extended",
  //   body: '<p>From 2006 to 2019, NDIC progressively extended deposit insurance coverage to:</p><ul class="mt-3 list-disc list-inside space-y-1"><li>Microfinance banks</li><li>Primary mortgage banks</li><li>Mobile money operators</li></ul><p class="mt-3">This expansion reflected Nigeria\'s growing financial inclusion agenda and NDIC\'s evolving mandate.</p>',
  //   imgSrc: "./assets/images/event-group-women.webp",
  //   imgAlt: "NDIC staff",
  //   backdrop: "rgba(44, 46, 129, 0.07)",
  // },
  // {
  //   year: "2023",
  //   heading: "Legacy &amp; Impact",
  //   body: '<p>The NDIC Act 2023 ushered in a new era with significant milestones:</p><ul class="mt-3 list-disc list-inside space-y-1"><li>Maximum insured sum raised to ₦5 million per depositor per bank</li><li>Enhanced resolution powers introduced</li><li>Mandate strengthened for the digital banking age</li></ul><p class="mt-3">Today, NDIC covers over 3,000 financial institutions across commercial, microfinance, mortgage, and mobile money sectors.</p>',
  //   imgSrc: "./assets/images/event-banner.webp",
  //   imgAlt: "NDIC event banner",
  //   backdrop: "rgba(254, 146, 57, 0.07)",
  // },
];

// ══════════════════════════════════════════════════════
// HISTORY — render + sticky scroll swap
// ══════════════════════════════════════════════════════
(function () {
  var wrapper = document.getElementById("history-sticky-wrapper");
  var container = document.getElementById("history-sticky");
  if (!wrapper || !container) return;

  var total = historySlides.length;

  // Build dots HTML
  function buildDots(activeIdx) {
    return historySlides
      .map(function (_, i) {
        return (
          '<div class="h-dot' + (i === activeIdx ? " on" : "") + '"></div>'
        );
      })
      .join("");
  }

  // Render all slides into #history-sticky
  container.innerHTML = historySlides
    .map(function (s, i) {
      return (
        '<div class="history-slide ndic-container' +
        (i === 0 ? " active" : "") +
        '">' +
        '<div class="mx-auto px-6 sm:pl-8 md:pl-10 lg:pl-12 xl:pl-14 w-full flex flex-col justify-center h-full">' +
        // — Heading row (full width, top) —
        '<div class="relative mb-6">' +
        '<span class="slide-year">' +
        s.year +
        "</span>" +
        '<div class="relative z-[1]">' +
        '<h2 class="font-heading leading-tight text-brand-dark text-6xl">' +
        s.heading +
        "</h2>" +
        "</div>" +
        "</div>" +
        // — Body + Image row (bottom-aligned) —
        '<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">' +
        "<div>" +
        '<div class="slide-body font-body text-[20px] text-ndic-secondary" style="line-height: 1.85">' +
        s.body +
        "</div>" +
        '<div class="flex gap-2 mt-6">' +
        buildDots(i) +
        "</div>" +
        "</div>" +
        '<div class="relative hidden lg:block">' +
        '<div class="slide-backdrop" style="background: ' +
        s.backdrop +
        '"></div>' +
        '<img src="' +
        s.imgSrc +
        '" alt="' +
        s.imgAlt +
        '" class="slide-img relative rounded-xl w-full object-cover" />' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  var slides = Array.from(container.querySelectorAll(".history-slide"));
  var SLIDE_H = window.innerHeight * 0.75;
  var PER_SLIDE = 350;

  function setWrapperHeight() {
    wrapper.style.height = total * PER_SLIDE + window.innerHeight + "px";
  }
  setWrapperHeight();
  window.addEventListener("resize", setWrapperHeight);

  var current = 0;

  window.addEventListener(
    "scroll",
    function () {
      var rect = wrapper.getBoundingClientRect();
      var scrolled = -rect.top;
      if (scrolled < 0) return;
      var idx = Math.max(
        0,
        Math.min(total - 1, Math.floor(scrolled / PER_SLIDE)),
      );

      if (idx !== current) {
        slides[current].classList.remove("active");
        slides[idx].classList.add("active");
        current = idx;
      }
    },
    { passive: true },
  );
})();

// ══════════════════════════════════════════════════════
// VISION / MISSION — fly-in on scroll
// ══════════════════════════════════════════════════════
(function () {
  var targets = [
    { selector: "#vision-watermark", from: "left" },
    { selector: "#vision-text", from: "right" },
    { selector: "#mission-text", from: "left" },
    { selector: "#mission-watermark", from: "right" },
  ];

  targets.forEach(function (t) {
    var el = document.querySelector(t.selector);
    if (!el) return;
    var dir = t.from === "left" ? "-60px" : "60px";
    el.style.cssText +=
      "opacity:0;transform:translateX(" +
      dir +
      ");transition:opacity 0.7s ease, transform 0.7s ease;";

    new IntersectionObserver(
      function (entries, obs) {
        if (entries[0].isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    ).observe(el);
  });
})();
