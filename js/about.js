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
  var SPEED = 1; // px per frame
  var offset = 0;
  var halfW = 6 * (CARD_W + GAP); // width of one set of 6 cards
  var paused = false;
  var rafId;

  function step() {
    if (!paused) {
      offset += SPEED;
      if (offset >= halfW) offset -= halfW;
      track.style.transform = "translateX(-" + offset + "px)";
    }
    rafId = requestAnimationFrame(step);
  }

  // Pause on hover so users can read captions
  track.addEventListener("mouseenter", function () {
    paused = true;
  });
  track.addEventListener("mouseleave", function () {
    paused = false;
  });

  rafId = requestAnimationFrame(step);
})();

// ══════════════════════════════════════════════════════
// HISTORY — data array (add / remove entries here)
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

  // Render all slides into #history-sticky (text only — image is fixed below)
  container.innerHTML = historySlides
    .map(function (s, i) {
      return (
        '<div class="history-slide ndic-container' +
        (i === 0 ? " active" : "") +
        '">' +
        '<div class="px-6 sm:pl-8 md:pl-10 lg:pl-12 xl:pl-14 w-full lg:max-w-[55%] flex flex-col justify-center h-full lg:pt-24 pt-20">' +
        '<div class="relative mb-3 md:mb-6">' +
        '<span class="slide-year">' +
        s.year +
        "</span>" +
        '<div class="relative z-[1]">' +
        '<h2 class="font-heading leading-tight text-brand-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl">' +
        s.heading +
        "</h2>" +
        "</div>" +
        "</div>" +
        '<div class="slide-body font-body text-xs sm:text-sm md:text-xl lg:text-[16px] text-ndic-secondary" style="line-height: 1.85">' +
        s.body +
        "</div>" +
        '<div class="flex gap-2 mt-4 md:mt-6">' +
        buildDots(i) +
        "</div>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  // Re-insert pill
  var pill = document.createElement("div");
  pill.className =
    "absolute lg:top-10 top-5 left-0 right-0 z-20 ndic-container pt-8 pointer-events-none";
  pill.innerHTML =
    '<span class="inline-block px-5 py-2 w-[200px] text-center border border-brand-primary rounded-md bg-[#EAEAF2] text-sm text-ndic-text font-body whitespace-nowrap">Our History</span>';
  container.insertBefore(pill, container.firstChild);

  // Fixed image container — one img per slide, stacked absolutely
  var fixedImg = document.createElement("div");
  fixedImg.className = "history-fixed-img";
  fixedImg.style.cssText +=
    "overflow:hidden;height:440px;border-radius:16px 16px 0 0;";
  container.appendChild(fixedImg);

  // Map each slide to an available image
  var imgMap = [
    "./assets/images/hero-building.webp",
    "./assets/images/news-handshake.webp",
    "./assets/images/event-signing-c.webp",
    "./assets/images/event-speaker.webp",
    "./assets/images/event-banner-c.webp",
  ];

  var slideImgs = historySlides.map(function (s, i) {
    var img = document.createElement("img");
    img.src = imgMap[i] || imgMap[0];
    img.alt = s.imgAlt;
    img.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;" +
      "object-fit:cover;object-position:center top;display:block;" +
      "transition:transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94),opacity 0.85s ease;" +
      "transform:" +
      (i === 0 ? "translateX(0) scale(1)" : "translateX(60px) scale(1.03)") +
      ";" +
      "opacity:" +
      (i === 0 ? "1" : "0") +
      ";";
    fixedImg.appendChild(img);
    return img;
  });

  var slides = Array.from(container.querySelectorAll(".history-slide"));
  var PER_SLIDE = 350;
  var STICKY_H = 0;

  wrapper.style.position = "relative";

  function setWrapperHeight() {
    STICKY_H = Math.min(window.innerHeight, 960);
    container.style.height = STICKY_H + "px";
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
      var range = total * PER_SLIDE;

      if (scrolled <= 0) {
        container.style.position = "";
        container.style.top = "";
        container.style.left = "";
        container.style.right = "";
        container.style.bottom = "";
      } else if (scrolled >= range) {
        container.style.position = "absolute";
        container.style.bottom = "0";
        container.style.top = "";
        container.style.left = "0";
        container.style.right = "0";
      } else {
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.bottom = "";
        container.style.left = "0";
        container.style.right = "0";
        container.style.zIndex = "10";
      }

      var idx = Math.max(
        0,
        Math.min(total - 1, Math.floor(scrolled / PER_SLIDE)),
      );
      if (idx !== current) {
        var prev = current;
        var next = idx;

        // Text: fade out old, fade in new (handled by CSS .active toggle)
        slides[prev].classList.remove("active");
        slides[next].classList.add("active");

        // Image: drift out prev (slight left + shrink), drift in next (from slight right)
        slideImgs[prev].style.transform = "translateX(-60px) scale(0.97)";
        slideImgs[prev].style.opacity = "0";
        slideImgs[next].style.transform = "translateX(0) scale(1)";
        slideImgs[next].style.opacity = "1";

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
