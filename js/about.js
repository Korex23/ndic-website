// ══════════════════════════════════════════════════════
// MANDATE — inline read-more / read-less toggle (one open at a time)
// ══════════════════════════════════════════════════════
(function () {
  var TRUNCATE_LEN = 100;
  var spans = Array.from(document.querySelectorAll(".mandate-body"));
  var states = spans.map(function () {
    return false;
  }); // false = collapsed

  function collapse(i) {
    if (!states[i]) return;
    states[i] = false;
    render(i);
  }

  function render(i) {
    var span = spans[i];
    var full = span.getAttribute("data-full") || "";
    var short =
      full.length > TRUNCATE_LEN
        ? full.slice(0, TRUNCATE_LEN).trimEnd() + "…"
        : full;

    if (full.length <= TRUNCATE_LEN) {
      span.textContent = full;
      return;
    }

    span.innerHTML = states[i]
      ? full + ' <a class="mandate-read-toggle" href="#">Read Less</a>'
      : short + ' <a class="mandate-read-toggle" href="#">Read More</a>';

    span
      .querySelector(".mandate-read-toggle")
      .addEventListener("click", function (e) {
        e.preventDefault();
        var opening = !states[i];
        // close all others first
        spans.forEach(function (_, j) {
          if (j !== i) collapse(j);
        });
        states[i] = opening;
        render(i);
      });
  }

  spans.forEach(function (_, i) {
    render(i);
  });
})();

// ══════════════════════════════════════════════════════
// FUNCTIONS — numbered read-more / read-less (one open at a time)
// ══════════════════════════════════════════════════════
(function () {
  var TRUNCATE_LEN = 100;
  var spans = Array.from(document.querySelectorAll(".functions-body"));
  var states = spans.map(function () {
    return false;
  });

  function collapse(i) {
    if (!states[i]) return;
    states[i] = false;
    render(i);
  }

  function render(i) {
    var span = spans[i];
    var full = span.getAttribute("data-full") || "";
    var short =
      full.length > TRUNCATE_LEN
        ? full.slice(0, TRUNCATE_LEN).trimEnd() + "…"
        : full;

    if (full.length <= TRUNCATE_LEN) {
      span.textContent = full;
      return;
    }

    span.innerHTML = states[i]
      ? full + ' <a class="mandate-read-toggle" href="#">Read Less</a>'
      : short + ' <a class="mandate-read-toggle" href="#">Read More</a>';

    span
      .querySelector(".mandate-read-toggle")
      .addEventListener("click", function (e) {
        e.preventDefault();
        var opening = !states[i];
        spans.forEach(function (_, j) {
          if (j !== i) collapse(j);
        });
        states[i] = opening;
        render(i);
      });
  }

  spans.forEach(function (_, i) {
    render(i);
  });
})();

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
// BOARD MEMBERS — infinite auto-scroll carousel
// ══════════════════════════════════════════════════════
(function () {
  var track = document.getElementById("board-members-track");
  if (!track) return;

  var CARD_W = 220;
  var GAP = 24;
  var SPEED = 1;
  var offset = 0;
  var halfW = 6 * (CARD_W + GAP); // one set of 6 cards
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
    '<span class="inline-block px-5 py-2 w-[180px] text-center border border-brand-primary rounded-md bg-[#EAEAF2] text-sm text-ndic-text font-body whitespace-nowrap">Our History</span>';
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

/* ──────────────────────────────────────────────────────────
   Board Members Accordion
────────────────────────────────────────────────────────── */

const boardMembersData = [
  {
    period: "2023 (May) – 2023 (June)",
    members: [
      { name: "Dr. Abdul-Hakeem M. Abdullateef", role: "Chairman" },
      { name: "Mrs. Yasmine Amin Dalhatu", role: "Board Member" },
      { name: "Mr. Simon Ogie", role: "Board Member" },
      { name: "Mr. Umar Gambo Jibrin", role: "Board Member" },
      { name: "Mr. Abimbola Olashore", role: "Board Member" },
      { name: "Prof. Osita Ogbu", role: "Board Member" },
      { name: "Mr. Muhammed Attahiru Haruna", role: "Board Member" },
      { name: "Mr. Haruna B. Mustafa", role: "Board Member" },
      { name: "Dr. Ali Mohammed", role: "Director, Home Finance FMF" },
    ],
  },
  {
    period: "2021 – 2022",
    members: [
      { name: "Mrs. Ronke Sokefun", role: "Chairman" },
      { name: "Alhaji Garba Bello", role: "Board Member" },
      { name: "Mr. Stephen Anietie Okon", role: "Board Member" },
      { name: "Mr. Adewale Adeleke", role: "Board Member" },
      { name: "Mr. Mudashiru Mustapha", role: "Board Member" },
      { name: "Brig. Gen. Josef O. Okoloagu Rtd.", role: "Board Member" },
      { name: "Mrs. Yaana Yaro", role: "Board Member" },
      { name: "Ms. Diana Okwuy Okonta", role: "Board Member" },
      { name: "Mr. Haruna B. Mustafa", role: "Board Member" },
      { name: "Mr. Ali Muhammad", role: "Director, Home Finance FMF" },
    ],
  },
  {
    period: "2019 – 2020",
    members: [
      { name: "Mrs. Ronke Sokefun", role: "Chairman" },
      { name: "Alhaji Umaru Ibrahim, mni", role: "Managing Director/CEO" },
      { name: "Prince Aghatise Erediauwa", role: "ED (Operations)" },
      { name: "Hon Omo'lola Abiola-Edewor", role: "ED (Corporate Services)" },
      { name: "Alhaji Garba Bello", role: "Board Member" },
      { name: "Mr. Stephen Anietie Okon", role: "Board Member" },
      { name: "Mr. Adewale Adeleke", role: "Board Member" },
      { name: "Mr. Mudashiru Mustapha", role: "Board Member" },
      { name: "Brig. Gen. Josef O. Okoloagu Rtd.", role: "Board Member" },
      { name: "Mrs. Yaana Yaro", role: "Board Member" },
      { name: "Ms. Diana Okwuy Okonta", role: "Board Member" },
      { name: "Mr. Haruna B. Mustafa", role: "Board Member" },
      { name: "Mr. Ali Muhammad", role: "Director, Home Finance FMF" },
    ],
  },
  {
    period: "2010 – 2015",
    members: [
      {
        name: "Ambassador (Dr.) Hassan Adamu, CON (Wakili of Adamawa)",
        role: "Chairman",
      },
      { name: "Alhaji Umaru Ibrahim, mni", role: "Managing Director/CEO" },
      { name: "Prince Aghatise Erediauwa", role: "ED (Operations)" },
      { name: "Hon Omo'lola Abiola-Edewor", role: "ED (Corporate Services)" },
      { name: "Mr. Lawan Zakaria Gana", role: "Board Member" },
      { name: "Ms. Bennedikter Molokwu", role: "Board Member" },
      { name: "Chief David Oghene", role: "Board Member" },
      { name: "Chief Oyebisi L. Ilaka", role: "Board Member" },
      { name: "Mr. Rasaq Tunde Lawal", role: "Board Member" },
      { name: "Mr. Aliyu Abdulrahman Dikko", role: "Board Member" },
      { name: "Mrs A. C. Martins", role: "Board Member" },
      { name: "Alhaji Kalli Zaji", role: "Director, Home Finance FMF" },
    ],
  },
  {
    period: "2005 – 2006",
    members: [
      { name: "Mr. Chris Oji JP", role: "Chairman" },
      { name: "Mr. G. A. Ogunleye, OFR", role: "Managing Director/CEO" },
      { name: "Prof. P. N. Umoh", role: "ED (Operations)" },
      { name: "Mrs F. B. Ibrahim", role: "ED (Finance and Admin)" },
      { name: "Hon. Abdullahi Musa", role: "Director" },
      { name: "Col. Roland Omowa (RTD)", role: "Director" },
      { name: "Alhaji Kalli Al-Gazali", role: "Director" },
      { name: "Alhaji S. Oyedokun", role: "Director" },
      { name: "Mr. O. I. Imala", role: "Director" },
      { name: "Alhaji J. I. Zarewa", role: "Director, Home Finance FMF" },
    ],
  },

  {
    period: "2004 (Management Committee)",
    members: [
      { name: "Baba Ijo O. O. O. Ogunkua, OON, MNI", role: "Chairman" },
      { name: "Mr. G. A. Ogunleye, OFR", role: "Managing Director/CEO" },
      { name: "Prof. P. N. Umoh", role: "ED (Operations)" },
      { name: "Mrs F. B. Ibrahim", role: "ED (Fin. and Admin)" },
      { name: "Mr. O. I. Imala", role: "Director, BSD, CBN" },
      { name: "Dr. S. A. Bamidele", role: "Ag. Dir., Home Finance, FMF" },
      { name: "Mr. A. B. Nyako", role: "Board Sec. /Legal Adviser" },
    ],
  },
  {
    period: "2002 – 2003",
    members: [
      { name: "Senator Ibrahim Kazaure", role: "Chairman" },
      { name: "Mr. G. A. Ogunleye", role: "Managing Director/CEO" },
      { name: "Prof. P. N. Umoh", role: "ED (Operations)" },
      { name: "Mrs F. B. Ibrahim", role: "ED (Finance and Admin)" },
      { name: "Alhaji Salihu Gunu", role: "Director" },
      { name: "Chief F. Zimoghan", role: "Director" },
      { name: "Senator E. Ikeyina", role: "Director" },
      { name: "Alhaji S. Oyedokun", role: "Director" },
      { name: "Arch. Mohammed Dewu", role: "Director" },
      { name: "Mr. O. I. Imala", role: "Director, BSD, CBN" },
      { name: "Mr. B. N. Osuji", role: "Director, Home Finance FMF" },
    ],
  },
  {
    period: "2001",
    members: [
      { name: "Senator Ibrahim Kazaure", role: "Chairman" },
      { name: "Mr. G. A. Ogunleye", role: "Managing Director/CEO" },
      { name: "Prof. P. N. Umoh", role: "ED (Operations)" },
      { name: "Mrs F. B. Ibrahim", role: "ED (Finance and Admin)" },
      { name: "Alhaji Salihu Gunu", role: "Director" },
      { name: "Chief F. Zimoghan", role: "Director" },
      { name: "Senator E. Ikeyina", role: "Director" },
      { name: "Alhaji S. Oyedokun", role: "Director" },
      { name: "Alhaji A. Iliyasu", role: "Director" },
      { name: "Mr. O. I. Imala", role: "Director, BSD, CBN" },
      { name: "Mr. B. N. Osuji", role: "Director, Home Finance FMF" },
    ],
  },
  {
    period: "2000 (Management Committee)",
    members: [
      { name: "Mr. S. C. Nwokedi, CON", role: "Perm Sec, FMF" },
      { name: "Mr. G. A. Ogunleye", role: "Managing Director/CEO" },
      { name: "Prof. P. N. Umoh", role: "ED (Operations)" },
      { name: "Mrs F. B. Ibrahim", role: "ED (Finance and Admin)" },
      { name: "Alh. I. D. Abdullahi", role: "DD, BSD, CBN" },
      { name: "Mr. B. N. Osuji", role: "Director, Home Finance FMF" },
      { name: "Alh. Umaru Ibrahim", role: "Director (Corporate Devt Dept)" },
      { name: "Mr. M. K. Ahmed", role: "Director (R&L)" },
      { name: "Mr. T. O. Aladebo", role: "Director (Off-site Supervision)" },
      { name: "Mr. A. Almustapha", role: "Head (Legal Dept/Board Sec)" },
    ],
  },
  {
    period: "1999 (Management Committee)",
    members: [
      { name: "Mr. S. C. Nwokedi, CON", role: "Perm Sec, FMF" },
      { name: "Mr. G. A. Ogunleye", role: "Managing Director/CEO" },
      { name: "Prof. P. N. Umoh", role: "ED (Operations)" },
      { name: "Mrs F. B. Ibrahim", role: "ED (Finance and Admin)" },
      { name: "Alh. I. D. Abdullahi", role: "DD, BSD, CBN" },
      { name: "Mr. M. S. Ahmed", role: "Director, Home Finance FMF" },
      { name: "Alh. Umaru Ibrahim", role: "Director (Personnel Dept)" },
      { name: "Mr. M. K. Ahmed", role: "Director (R&L)" },
      { name: "Mr. T. O. Aladebo", role: "Director (Finance)" },
      { name: "Mr. D. I. Isabu", role: "Head (Legal Dept/Board Sec)" },
    ],
  },
  {
    period: "1998 (Management Committee)",
    members: [
      { name: "Alhaji M. M. Sada, CON, mni", role: "DG, Finance – Chairman" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Mr. G. A. Ogunleye", role: "Director, BSD, CBN" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
      { name: "Sadiq Labbo Sharubutu", role: "ED (Finance and Admin)" },
      { name: "Mr. R. N. Ezeife", role: "Director, Home Finance FMF" },
      { name: "Prof. P. N. Umoh", role: "Director (Research, NDIC)" },
      { name: "Alhaji Umaru Ibrahim", role: "Director (Personnel, NDIC)" },
      { name: "Mallam M. K. Ahmed", role: "Director (R&L)" },
      { name: "Mr. N. Oji", role: "Director (Bank Restructuring)" },
      { name: "Mr. T. O. Aladebo", role: "Director (Finance)" },
      { name: "Mr. D. I. Isabu", role: "Director (OSB/LA)" },
    ],
  },

  {
    period: "1997 (Management Committee)",
    members: [
      { name: "Alhaji Umaru A. Alkaleri", role: "DG, Finance – Chairman" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Mr. G. A. Ogunleye", role: "Director, BSD, CBN" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
      { name: "Mr. R. N. Ezeife", role: "Director, Home Finance FMF" },
      { name: "Prof. P. N. Umoh", role: "Director (Research, NDIC)" },
      { name: "Alhaji Umaru Ibrahim", role: "Director (Personnel, NDIC)" },
      { name: "Mallam M. K. Ahmed", role: "Director (R&L)" },
      { name: "Mr. N. Oji", role: "Director (Bank Restructuring)" },
      { name: "Mr. T. O. Aladebo", role: "Director (Finance)" },
    ],
  },
  {
    period: "1996 (Management Committee)",
    members: [
      { name: "Alhaji Umaru A. Alkaleri", role: "DG, Finance – Chairman" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Mr. G. A. Ogunleye", role: "Director, BSD, CBN" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
      { name: "Mr. R. N. Ezeife", role: "Director, Home Finance, FMF" },
      { name: "Prof. P. N. Umoh", role: "Director (Research, NDIC)" },
      { name: "Alhaji Umaru Ibrahim", role: "Director (Personnel, NDIC)" },
      { name: "Mallam M. K. Ahmed", role: "Director (R&L)" },
      { name: "Mr. N. Oji", role: "Director (Bank Restructuring)" },
      { name: "Mr. T. O. Aladebo", role: "Director (Finance)" },
      { name: "G. Olukayode Kembi", role: "DD/AG Board Sec/Legal Adviser" },
    ],
  },

  {
    period: "1995",
    members: [
      { name: "Dr. Paul A. Oguma, OFR", role: "Governor, CBN (Chairman)" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Mr. R. N. Ezeife", role: "Director, Home Finance FMF" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
    ],
  },
  {
    period: "1994",
    members: [
      { name: "Dr. Paul A. Oguma, OFR", role: "Governor, CBN (Chairman)" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Mr. R. N. Ezeife", role: "Director, Home Finance FMF" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
      { name: "Dr. Wole Adewunmi", role: "ED (Finance and Administration)" },
    ],
  },
  {
    period: "1993",
    members: [
      { name: "Dr. Paul A. Oguma, OFR", role: "Governor, CBN (Chairman)" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Alhaji Ibrahim Ida", role: "Director, Forex, FMF" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
      { name: "Dr. Wole Adewunmi", role: "ED (Finance and Administration)" },
    ],
  },
  {
    period: "1992",
    members: [
      { name: "Alhaji Abdulkadir Ahmed", role: "Governor, CBN (Chairman)" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Alhaji Ibrahim Ida", role: "Director, Forex, FMF" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
      { name: "Dr. Wole Adewunmi", role: "ED (Finance and Administration)" },
    ],
  },
  {
    period: "1990 – 1991",
    members: [
      { name: "Alhaji Abdulkadir Ahmed", role: "Governor, CBN (Chairman)" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Alhaji Ahmadu Abubakar", role: "DG, Fed Min of Finance" },
      { name: "Mallam Ballama Manu", role: "ED (Operations)" },
      { name: "Dr. Wole Adewunmi", role: "ED (Finance and Administration)" },
    ],
  },
  {
    period: "1989",
    members: [
      { name: "Alhaji Abdulkadir Ahmed", role: "Governor, CBN (Chairman)" },
      { name: "Mr. John U. Ebhodaghe", role: "Managing Director/CEO" },
      { name: "Alhaji Ahmadu Abubakar", role: "DG, Fed Min of Finance" },
      { name: "Alhaji Abdullahi Mahmoud", role: "ED (Operations)" },
      { name: "Dr. Wole Adewunmi", role: "ED (Finance and Administration)" },
    ],
  },
];

(function () {
  const container = document.getElementById("board-members-accordion");

  const PLUS_SVG = `<svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.33289 13H21.6662" stroke="#141313" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 4.33423V21.6676" stroke="#141313" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const MINUS_SVG = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66602 20H33.3327" stroke="#141313" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  function renderNameItem(member, number) {
    return `<div class="board-name-item font-body text-xs sm:text-sm md:text-base lg:text-lg text-ndic-text leading-relaxed">
      <span class="board-name-number">${number}.</span> ${member.name} &nbsp;<strong>${member.role}</strong>
    </div>`;
  }

  container.innerHTML = boardMembersData
    .map((item) => {
      const preview = item.members.slice(0, 2);
      const rest = item.members.slice(2);
      const hasMore = rest.length > 0;

      return `
        <div class="accordion-item">
          <button class="accordion-trigger w-full pt-5 pb-0 text-left" aria-expanded="false" aria-label="Toggle ${item.period} board members">
            <div class="label-col">
              <span class="bg-brand-primary w-3 h-3 rounded-sm border-2 flex-shrink-0"></span>
              <span class="font-body font-bold text-[13px] sm:text-[16px] md:text-[18px] text-ndic-text tracking-wider uppercase px-2">
                ${item.period}
              </span>
            </div>
            <div class="text-col">
              ${preview.map((member, i) => renderNameItem(member, i + 1)).join("")}
            </div>
            <div class="icon-col text-brand-primary">
              ${hasMore ? PLUS_SVG : ""}
            </div>
          </button>
          ${
            hasMore
              ? `
          <div class="accordion-content">
            <div class="accordion-expanded-inner pb-5">
              ${rest.map((member, i) => renderNameItem(member, i + 3)).join("")}
            </div>
          </div>`
              : `<div class="pb-5"></div>`
          }
        </div>
      `;
    })
    .join("");

  container.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      if (!content || !content.classList.contains("accordion-content")) return;

      const isOpen = content.classList.contains("open");

      // Close all others
      container.querySelectorAll(".accordion-content.open").forEach((c) => {
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

// ══════════════════════════════════════════════════════
// ORG CHART — render from data + click path highlighting
// ══════════════════════════════════════════════════════
(function () {
  var DIVIDER = "divider";
  var ACCENT = "#ffffff";
  var V_NORMAL = "1px solid rgba(255,255,255,0.15)";
  var V_ACTIVE = "2px solid " + ACCENT;

  var DIVIDER_NORMAL_BG =
    "linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,0.55) 12%,rgba(255,255,255,0.55) 88%,rgba(255,255,255,0) 100%)";

  var DIVIDER_PATH = {
    center:
      "linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,0.35) 30%,rgba(255,255,255,0.9) 41%,rgba(255,255,255,0.9) 59%,rgba(255,255,255,0.35) 70%,rgba(255,255,255,0) 100%)",
    left: "linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,0.9) 8%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.35) 70%,rgba(255,255,255,0) 100%)",
    right:
      "linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,0.35) 30%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.9) 92%,rgba(255,255,255,0) 100%)",
    both: "linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,0.9) 8%,rgba(255,255,255,0.9) 92%,rgba(255,255,255,0) 100%)",
  };

  var rows = [
    [null, { text: "Board of Directors", role: "board" }, null],
    DIVIDER,
    [
      "Internal Audit Department",
      { text: "Managing Director / CEO", role: "md" },
      "Board Secretariat Department",
    ],
    DIVIDER,
    [
      { text: "Executive Director (Corporate Services)", role: "ed-corp" },
      "MD's Office",
      { text: "Executive Director (Operations)", role: "ed-ops" },
    ],
    DIVIDER,
    [
      "Finance Department",
      "Strategy Development Department",
      "Insurance and Surveillance Department",
    ],
    DIVIDER,
    [
      "Human Resource Department",
      "Research, Policy & International Relations Department",
      "Bank Examination Department",
    ],
    DIVIDER,
    [
      "Performance Management Department",
      "Procurement & Management Services Department",
      "Claims Resolution Department",
    ],
    DIVIDER,
    [
      "NDIC Academy",
      "Enterprise Risk Management Department",
      "Asset Management Department",
    ],
    DIVIDER,
    [
      "Engineering & Technical Services Department",
      "Legal Department",
      "Information Technology Department",
    ],
    DIVIDER,
    [
      "Establishment Office Lagos",
      "Communications & Public Relations Department",
      "Special Insured Institutions Department",
    ],
    DIVIDER,
    [null, null, "Zonal Offices"],
  ];

  var CELL_BASE =
    "padding:12px 16px;display:flex;align-items:center;justify-content:center;";
  var BORDER_R = "border-right:" + V_NORMAL + ";";

  var boardBox, mdBox, edCorpBox, edOpsBox;
  var wrappers = {}; // e.g. wrappers['r0c0'], wrappers['r1c1']
  var divider12, divider23;
  var dividerCount = 0;
  var rowIdx = 0;

  function buildCell(cell, col) {
    var text = cell && typeof cell === "object" ? cell.text : cell;
    var role = cell && typeof cell === "object" ? cell.role : null;
    var wrapper = document.createElement("div");
    var hasBorderR = col < 2;
    wrapper.setAttribute("style", CELL_BASE + (hasBorderR ? BORDER_R : ""));
    if (rowIdx < 3 && hasBorderR) wrappers["r" + rowIdx + "c" + col] = wrapper;
    if (text) {
      var box = document.createElement("div");
      box.className = "org-box";
      box.textContent = text;
      if (role) {
        box.dataset.role = role;
        box.style.cursor = "pointer";
        if (role === "board") boardBox = box;
        if (role === "md") mdBox = box;
        if (role === "ed-corp") edCorpBox = box;
        if (role === "ed-ops") edOpsBox = box;
      }
      wrapper.appendChild(box);
    }
    return wrapper;
  }

  var grid = document.getElementById("org-chart-grid");
  if (!grid) return;

  rows.forEach(function (row) {
    if (row === DIVIDER) {
      var d = document.createElement("div");
      d.setAttribute(
        "style",
        "grid-column:1/-1;height:1px;background:" + DIVIDER_NORMAL_BG,
      );
      grid.appendChild(d);
      dividerCount++;
      if (dividerCount === 1) divider12 = d;
      if (dividerCount === 2) divider23 = d;
      return;
    }
    row.forEach(function (cell, col) {
      grid.appendChild(buildCell(cell, col));
    });
    rowIdx++;
  });

  function setHDivider(el, type) {
    if (!el) return;
    el.style.background = type ? DIVIDER_PATH[type] : DIVIDER_NORMAL_BG;
    el.style.height = type ? "2px" : "1px";
  }

  function setVDivider(key, on) {
    var w = wrappers[key];
    if (!w) return;
    w.style.borderRight = on ? V_ACTIVE : V_NORMAL;
  }

  function setBorder(box, side, on) {
    if (!box) return;
    box.style["border" + side] = on ? "2px solid " + ACCENT : "";
  }

  function clearAll() {
    [boardBox, mdBox, edCorpBox, edOpsBox].forEach(function (b) {
      if (!b) return;
      b.classList.remove("active");
      b.style.borderTop = b.style.borderBottom = "";
    });
    setHDivider(divider12, null);
    setHDivider(divider23, null);
    ["r0c0", "r0c1", "r1c0", "r1c1", "r2c0", "r2c1"].forEach(function (k) {
      setVDivider(k, false);
    });
  }

  function applyHighlight(role) {
    clearAll();
    var lightRoles =
      role === "board" || role === "md"
        ? ["board", "md", "ed-corp", "ed-ops"]
        : ["board", "md", role];

    [boardBox, mdBox, edCorpBox, edOpsBox].forEach(function (b) {
      if (b && lightRoles.indexOf(b.dataset.role) !== -1)
        b.classList.add("active");
    });

    // Horizontal dividers
    setHDivider(divider12, "center");
    setBorder(boardBox, "Bottom", true);
    setBorder(mdBox, "Top", true);

    var d23 =
      role === "board" || role === "md"
        ? "both"
        : role === "ed-corp"
          ? "left"
          : "right";
    setHDivider(divider23, d23);
    setBorder(mdBox, "Bottom", true);
    if (role === "board" || role === "md" || role === "ed-corp")
      setBorder(edCorpBox, "Top", true);
    if (role === "board" || role === "md" || role === "ed-ops")
      setBorder(edOpsBox, "Top", true);

    // Vertical dividers — both walls of center col for Board & MD rows
    setVDivider("r0c0", true);
    setVDivider("r0c1", true);
    setVDivider("r1c0", true);
    setVDivider("r1c1", true);
    // Branch walls in ED row
    if (role === "board" || role === "md" || role === "ed-corp")
      setVDivider("r2c0", true);
    if (role === "board" || role === "md" || role === "ed-ops")
      setVDivider("r2c1", true);
  }

  var activeRole = null;
  grid.addEventListener("click", function (e) {
    var box = e.target.closest(".org-box[data-role]");
    if (!box) return;
    var role = box.dataset.role;
    if (activeRole === role) {
      activeRole = null;
      clearAll();
    } else {
      activeRole = role;
      applyHighlight(role);
    }
  });
})();
