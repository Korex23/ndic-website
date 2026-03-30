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
// GALLERY — infinite auto-scroll carousel
// ══════════════════════════════════════════════════════
(function () {
  var track = document.getElementById("gallery-auto-track");
  if (!track) return;

  var CARD_W = 300;
  var GAP = 16;
  var SPEED = 1;
  var offset = 0;
  var halfW = 6 * (CARD_W + GAP);
  var paused = false;

  function step() {
    if (!paused) {
      offset += SPEED;
      if (offset >= halfW) offset -= halfW;
      track.style.transform = "translateX(-" + offset + "px)";
    }
    requestAnimationFrame(step);
  }

  track.addEventListener("mouseenter", function () {
    paused = true;
  });
  track.addEventListener("mouseleave", function () {
    paused = false;
  });

  requestAnimationFrame(step);
})();

// ══════════════════════════════════════════════════════
// HISTORY — data array
// ══════════════════════════════════════════════════════
var historySlides = [
  {
    year: "1988",
    heading: "Background &amp; <br/> Establishment",
    body: '<p>The Nigeria Deposit Insurance Corporation (NDIC) traces its origin to a 1983 committee set up by the Board of the Central Bank of Nigeria (CBN) to review the Nigerian banking system.</p><p class="mt-2">The committee recommended the creation of a Depositors’ Protection Fund, which led to the establishment of NDIC through Decree No. 22 of June 15, 1988.</p><p class="mt-2">This move was part of broader economic reforms following Nigeria’s 1986 Structural Adjustment Programme (SAP), aimed at strengthening financial stability and supporting a liberalized banking environment.</p> ',
    imgSrc: "./assets/images/hero-building.webp",
    imgAlt: "NDIC Headquarters",
    backdrop: "rgba(44, 46, 129, 0.07)",
  },
  {
    year: "1989",
    heading: "The Banking Crisis Era <br/> (Late 1980s – 1990s)",
    body: '<p>Following deregulation, Nigeria experienced rapid growth in the banking sector — from 40 banks in 1986 to 120 in 1992.</p><p class="mt-2">However, this expansion led to serious challenges:<ul class="mt-2 list-disc list-inside space-y-1"><li>Intense and unhealthy competition among banks</li><li>Entry of unqualified and unethical operators</li><li>Inadequate skilled manpower</li><li>Weak corporate governance and internal conflicts</li></ul> </p><p class="mt-2">Combined with economic instability and political uncertainty, the sector became highly distressed even before NDIC began operations in March 1989.</p>',
    imgSrc: "./assets/images/news-handshake.webp",
    imgAlt: "NDIC officials",
    backdrop: "rgba(254, 146, 57, 0.07)",
  },
  {
    year: "1995",
    heading: "Early Intervention Measures",
    body: `<p>At inception, NDIC was immediately tasked with stabilizing the financial system and protecting depositors.</p>
  <p class="mt-2">Key interventions included:</p>
  <ul class="mt-2 list-disc list-inside space-y-1">
    <li>Regulatory engagement through continuous dialogue with bank owners and managers</li>
    <li>Holding actions on about 52 distressed banks to enforce restructuring</li>
    <li>₦2.3 billion liquidity support (with CBN) to 10 banks in 1989</li>
    <li>Management takeovers of 24 distressed banks between 1991 and 1996</li>
    <li>Acquisition and recapitalization of 7 banks between 1999 and 2000</li>
    <li>Asset recovery of ₦3.3 billion by 1996 under the Failed Banks Decree</li>
  </ul>
  <p class="mt-2">These actions helped prevent a system-wide financial collapse and restored confidence in the banking system.</p>`,
    imgSrc: "./assets/images/event-signing.webp",
    imgAlt: "NDIC intervention",
    backdrop: "rgba(44, 46, 129, 0.07)",
  },
  {
    year: "1988",
    heading: "Why Nigeria Established <br/> Deposit Insurance",
    body: `<p>The creation of NDIC and the deposit insurance scheme was driven by key historical and economic factors:</p>
  <ul class="mt-2 list-disc list-inside space-y-1">
    <li><strong>Lessons from past bank failures:</strong> In the 1950s, 21 out of 25 indigenous banks collapsed, causing hardship for depositors</li>
    <li><strong>Global best practices:</strong> Countries like Czechoslovakia (1924) and the United States (1933) adopted deposit insurance frameworks</li>
    <li><strong>Economic liberalization (SAP):</strong> The 1986 reforms increased bank licensing and the need for stronger supervision</li>
    <li><strong>Need for structured bank failure management:</strong> Previously, weak banks were continuously supported, creating inefficiencies and systemic risk</li>
  </ul>
  <p class="mt-2">NDIC was established to protect depositors, manage failed banks effectively, and introduce structured resolution mechanisms.</p>`,
    imgSrc: "./assets/images/event-speaker.webp",
    imgAlt: "Banking system reform",
    backdrop: "rgba(254, 146, 57, 0.07)",
  },
  {
    year: "2023",
    heading: "Legacy &amp; Impact",
    body: `<p>Since commencing operations in 1989, NDIC has played a critical role in Nigeria’s financial system:</p>
  <ul class="mt-2 list-disc list-inside space-y-1">
    <li>Strengthening public confidence in the banking system</li>
    <li>Enhancing regulatory oversight alongside the Central Bank</li>
    <li>Ensuring safer and more resilient banking practices</li>
    <li>Providing a structured and effective response to bank failures</li>
  </ul>`,
    imgSrc: "./assets/images/event-banner.webp",
    imgAlt: "NDIC legacy",
    backdrop: "rgba(44, 46, 129, 0.07)",
  },
];

// ══════════════════════════════════════════════════════
// HISTORY — horizontal scrub (GSAP ScrollTrigger)
// Each slide scrolls to the left scrubbed to scroll position
// ══════════════════════════════════════════════════════
(function () {
  var wrapper = document.getElementById("history-sticky-wrapper");
  var container = document.getElementById("history-sticky");
  if (!wrapper || !container) return;

  var total = historySlides.length;

  // ── pill label ──────────────────────────────────────
  var pill = document.createElement("div");
  pill.className =
    "absolute lg:top-10 top-5 left-0 right-0 z-20 ndic-container pt-8 pointer-events-none";
  pill.innerHTML =
    '<span class="inline-block px-5 py-2 w-[200px] text-center border border-brand-primary rounded-md bg-[#EAEAF2] text-sm text-ndic-text font-body whitespace-nowrap">Our History</span>';
  container.appendChild(pill);

  // ── horizontal track ────────────────────────────────
  var track = document.createElement("div");
  track.style.cssText =
    "display:flex;flex-direction:row;align-items:stretch;" +
    "width:" +
    total * 100 +
    "vw;height:100%;";
  container.appendChild(track);

  var isLg = window.innerWidth >= 1024;

  // ── build slides ────────────────────────────────────
  historySlides.forEach(function (s) {
    var slide = document.createElement("div");
    slide.style.cssText =
      "flex:0 0 100vw;width:100vw;height:100%;" +
      "display:flex;align-items:center;position:relative;overflow:hidden;";

    // text column — 55% on lg+, full width on md-
    var textCol = document.createElement("div");
    textCol.style.cssText =
      "position:relative;z-index:2;" +
      (isLg ? "flex:0 0 55%;max-width:55%;" : "flex:0 0 100%;max-width:100%;") +
      "padding:5rem clamp(1.5rem,5vw,5rem) 2rem;display:flex;" +
      "flex-direction:column;justify-content:center;height:100%;";
    // year watermark sits inside a relative wrapper behind the heading (same as about.js)
    textCol.innerHTML =
      '<div class="relative mb-3 md:mb-6">' +
      '<span class="slide-year">' +
      s.year +
      "</span>" +
      '<div class="relative z-[1]">' +
      '<h2 class="font-heading leading-tight text-brand-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[58px]">' +
      s.heading +
      "</h2>" +
      "</div>" +
      "</div>" +
      '<div class="slide-body font-body text-xs sm:text-sm md:text-base lg:text-lg text-ndic-secondary mt-4 md:mt-6" style="line-height:1.85">' +
      s.body +
      "</div>";
    slide.appendChild(textCol);

    // image — lg+ only, absolute at bottom-right like about.js
    if (isLg) {
      var imgDiv = document.createElement("div");
      imgDiv.style.cssText =
        "position:absolute;bottom:0;right:2vw;width:42%;height:440px;" +
        "overflow:hidden;border-radius:16px 16px 0 0;z-index:1;";
      var img = document.createElement("img");
      img.src = s.imgSrc;
      img.alt = s.imgAlt;
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;object-position:center top;display:block;";
      imgDiv.appendChild(img);
      slide.appendChild(imgDiv);
    }

    track.appendChild(slide);
  });

  // ── container height — 80vh so no excess white space ──
  var STICKY_H = Math.round(window.innerHeight * 0.8);
  container.style.height = STICKY_H + "px";
  container.style.overflow = "hidden";

  // ── load GSAP then init ─────────────────────────────
  function loadScript(src, cb) {
    var s = document.createElement("script");
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function init() {
    gsap.registerPlugin(ScrollTrigger);

    var panels = Array.from(track.children);

    var isLgInit = window.innerWidth >= 1024;

    // Animate all panels together — scrubbed to scroll
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        // lg+: smooth 1s lag; md-: near-instant so snap feels complete, no half-slide views
        scrub: isLgInit ? 1 : 0.2,
        start: "top top",
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: "power2.inOut",
          delay: 0.05,
        },
        end: function () {
          return "+=" + (panels.length - 1) * window.innerWidth;
        },
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.refresh();
  }

  loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
    function () {
      loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
        function () {
          if (document.readyState === "complete") {
            init();
          } else {
            window.addEventListener("load", init);
          }
        },
      );
    },
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
