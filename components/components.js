class NavBar extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active") || "";
    this.innerHTML = this._template(active);
    this._init();
  }

  _isActive(page, active) {
    return page === active
      ? "text-brand-primary border-b-2 border-brand-primary"
      : "text-ndic-text hover:text-brand-primary";
  }

  _navConfig() {
    const I = {
      // About
      overview: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      history: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.88"/></svg>`,
      values: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      mandate: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      governance: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><rect x="2" y="6" width="20" height="16"/><path d="M12 6V2"/><path d="M8 6V2M16 6V2"/></svg>`,
      orgchart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="4" rx="1"/><rect x="1" y="16" width="6" height="4" rx="1"/><rect x="9" y="16" width="6" height="4" rx="1"/><rect x="17" y="16" width="6" height="4" rx="1"/><path d="M12 6v4M4 16v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><line x1="12" y1="10" x2="12" y2="11"/></svg>`,
      // Protection
      shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
      eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
      alerttri: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      gavel: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-8.5 8.5a2.12 2.12 0 0 1-3-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/></svg>`,
      // Claims
      fileguide: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
      complaint: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      depositor: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
      creditor: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
      shareholder: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`,
      // Media
      newspaper: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>`,
      book: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      article: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>`,
      barChart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      gallery: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`,
      video: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
      // Tools
      calc: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`,
      building: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><rect x="6" y="2" width="12" height="20"/><path d="M10 6h4M10 10h4M10 14h4"/></svg>`,
      lineChart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      quote: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`,
    };

    return [
      {
        label: "About NDIC",
        href: "/about.html",
        page: "about",
        description:
          "Established in 1988, NDIC is Nigeria’s statutory deposit insurer, safeguarding depositors and promoting confidence in the financial system through sound regulatory oversight.",

        image: "./assets/images/hero-building.webp",
        items: [
          {
            icon: I.overview,
            title: "Overview",
            desc: "Who we are and what we do",
            href: "#",
          },
          {
            icon: I.history,
            title: "Our History",
            desc: "From 1988 to present day",
            href: "#",
          },
          {
            icon: I.values,
            title: "Vision, Mission & Values",
            desc: "The principles that guide us",
            href: "#",
          },
          {
            icon: I.mandate,
            title: "Mandate, Powers & Functions",
            desc: "Our legal framework & authority",
            href: "#",
          },
          {
            icon: I.governance,
            title: "Leadership & Governance",
            desc: "Board, MD & executive team",
            href: "#",
          },
          {
            icon: I.orgchart,
            title: "Organisation Structure",
            desc: "Departments & reporting lines",
            href: "#",
          },
        ],
      },
      {
        label: "Your Protection",
        href: "#",
        page: "protection",
        description:
          "NDIC guarantees deposits up to the maximum covered limit per depositor per bank. Understand your coverage, monitor your bank’s status, and know your rights if a bank fails.",

        image: "./assets/images/shield-protection.webp",
        items: [
          {
            icon: I.shield,
            title: "Deposit Guaranteed",
            desc: "Coverage limits & eligible deposits",
            href: "#",
          },
          {
            icon: I.eye,
            title: "Bank Supervision",
            desc: "How we monitor insured institutions",
            href: "#",
          },
          {
            icon: I.alerttri,
            title: "Failure Resolution",
            desc: "Steps taken when a bank is in distress",
            href: "#",
          },
          {
            icon: I.gavel,
            title: "Bank Liquidation",
            desc: "Winding up & asset recovery process",
            href: "#",
          },
        ],
      },
      {
        label: "Your Claim",
        href: "#",
        page: "claim",
        description:
          "If your bank has been closed by the CBN, NDIC will reimburse your insured deposits. Use the guides and forms below to file your claim quickly and correctly.",

        image: "./assets/images/news-handshake.webp",
        items: [
          {
            icon: I.fileguide,
            title: "Guide to Filing a Claim",
            desc: "Step-by-step instructions for claimants",
            href: "#",
          },
          {
            icon: I.complaint,
            title: "Complaint Form",
            desc: "Lodge a formal complaint with NDIC",
            href: "#",
          },
          {
            icon: I.depositor,
            title: "Depositor’s Form",
            desc: "Claim form for individual depositors",
            href: "#",
          },
          {
            icon: I.creditor,
            title: "Creditor’s Form",
            desc: "Claim form for institutional creditors",
            href: "#",
          },
          {
            icon: I.shareholder,
            title: "Shareholder’s Form",
            desc: "Claim form for bank shareholders",
            href: "#",
          },
        ],
      },
      {
        label: "Media",
        href: "#",
        page: "media",
        description:
          "Stay informed with official NDIC press releases, in-depth research publications, news coverage, event highlights, and multimedia resources.",

        image: "./assets/images/event-banner-c.webp",
        items: [
          {
            icon: I.book,
            title: "Publications",
            desc: "Annual reports, research & policy papers",
            href: "#",
          },
          {
            icon: I.newspaper,
            title: "News",
            desc: "Latest NDIC news & press releases",
            href: "#",
          },
          {
            icon: I.article,
            title: "Articles",
            desc: "Expert insights & opinion pieces",
            href: "#",
          },
          {
            icon: I.barChart,
            title: "Reports",
            desc: "Financial stability & sector reports",
            href: "#",
          },
          {
            icon: I.gallery,
            title: "Gallery",
            desc: "Photos from events & ceremonies",
            href: "#",
          },
          {
            icon: I.video,
            title: "Videos",
            desc: "Speeches, seminars & documentaries",
            href: "#",
          },
        ],
      },
      {
        label: "Tools",
        href: "#",
        page: "tools",
        description:
          "Interactive tools to help depositors, banks, and researchers understand insurance coverage, verify insured institutions, and access key financial data.",
        image: "./assets/images/event-signing-c.webp",
        items: [
          {
            icon: I.calc,
            title: "Premium Calculator",
            desc: "Estimate your bank’s insurance premium",
            href: "#",
          },
          {
            icon: I.building,
            title: "Insured Banks",
            desc: "Directory of all covered institutions",
            href: "#",
          },
          {
            icon: I.lineChart,
            title: "Annual Reports",
            desc: "Yearly performance & financial data",
            href: "#",
          },
          {
            icon: I.quote,
            title: "Get a Quote",
            desc: "Request a personalised insurance quote",
            href: "#",
          },
        ],
      },
    ];
  }

  _dropdownItem(item) {
    return `
    <a href="${item.href}"
       data-item-title="${item.title}"
       data-item-desc="${item.desc}"
       class="dd-link flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#d8d8ec] transition-colors">
      <div class="w-7 h-7 rounded-md bg-[#EEF0FF] flex items-center justify-center flex-shrink-0">
        ${item.icon}
      </div>
      <span class="font-semibold text-sm text-[#141313] font-body">${item.title}</span>
    </a>
  `;
  }

  _navItem(item, active) {
    const CARET = `<svg class="transition-transform duration-200 group-hover:rotate-180" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    return `
    <li class="nav-item group flex items-center self-stretch">
      <a href="${item.href}" class="nav-link font-body font-semibold text-sm transition-colors flex items-center gap-1 ${this._isActive(item.page, active)}">
        ${item.label}
        ${CARET}
      </a>
      <div class="absolute left-0 right-0 top-full z-50 opacity-0 pointer-events-none -translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-200 ease-out">
        <div class="bg-[#EAEAF2] shadow-xl">
          <div class="px-6 py-6 grid gap-0" style="grid-template-columns: 260px 1px 1fr 1px 220px;">

            <!-- Col 1: Links -->
            <div class="flex flex-col gap-0.5 pr-6">
              ${item.items.map((i) => this._dropdownItem(i)).join("")}
            </div>

            <!-- Divider -->
            <div class="bg-gray-300 mx-0"></div>

            <!-- Col 2: Description -->
            <div class="flex flex-col justify-between px-8">
              <div>
                <p class="dd-desc-title text-[10px] font-bold text-brand-primary uppercase tracking-[0.15em] font-body transition-all duration-150"
                   data-default="${item.label}">${item.label}</p>
                <p class="dd-desc-body mt-3 text-sm text-ndic-secondary leading-relaxed font-body transition-all duration-150"
                   data-default="${item.description}">${item.description}</p>
              </div>
            </div>

            <!-- Divider -->
            <div class="bg-gray-300 mx-0"></div>

            <!-- Col 3: Image -->
            <div class="pl-6">
              <div class="w-full h-full min-h-[140px] rounded-lg overflow-hidden bg-[#c8c8dc]">
                <img src="${item.image}" alt="${item.label}" class="w-full h-full object-cover"
                  onerror="this.style.display='none';this.parentElement.style.background='#c8c8dc'"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </li>
  `;
  }

  _navItems(active) {
    return this._navConfig()
      .map((item) => this._navItem(item, active))
      .join("");
  }

  _drawerLinks() {
    const CARET = `<svg class="drawer-caret transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
    return this._navConfig()
      .map(
        (item) => `
      <div class="drawer-section border-b border-ndic-border">
        <button class="drawer-toggle w-full flex items-center justify-between py-3 font-body font-semibold text-sm text-ndic-text hover:text-brand-primary transition-colors" aria-expanded="false">
          <span>${item.label}</span>
          ${CARET}
        </button>
        <div class="drawer-sub overflow-hidden max-h-0 transition-all duration-250 ease-in-out">
          <div class="pb-2 flex flex-col gap-0.5">
            ${item.items
              .map(
                (sub) => `
              <a href="${sub.href}" class="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#EAEAF2] transition-colors">
                <div class="w-6 h-6 rounded bg-[#EEF0FF] flex items-center justify-center flex-shrink-0">${sub.icon}</div>
                <span class="font-body text-sm text-ndic-text">${sub.title}</span>
              </a>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  _template(active) {
    return `
      <header class="sticky top-0 z-50 font-body flex">

        <!-- Logo panel: white bg stretches to left edge and top -->
        <div class="bg-white flex flex-shrink-0 self-stretch">
          <div class="nav-logo-panel flex items-center py-1">
            <a href="index.html" class="flex items-center" aria-label="NDIC Home">
              <img src="./assets/logo/logo.webp" alt="NDIC Logo" class="h-8 lg:h-full w-auto object-contain" width="107" height="32"/>
            </a>
          </div>
        </div>

        <!-- Right panel: accent bar + nav links -->
        <div class="flex-1 flex flex-col border-b-2 border-brand-primary" style="background: #F5F5F5;">

          <!-- Accent bar: h-2 on mobile, taller on desktop with contact info -->
          <div class="h-2 lg:h-8 nav-accent-bar flex items-center justify-end pr-[2%]">
            <!-- Contact info: desktop only -->
            <div class="hidden lg:flex items-center gap-6">
              <!-- Email -->
              <a href="mailto:helpdesk@ndic.gov.ng" aria-label="Email NDIC" class="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span class="font-body text-[14px]">helpdesk@ndic.gov.ng</span>
              </a>
              <!-- Divider -->
              <span class="w-px h-3 bg-white/30"></span>
              <!-- Phone -->
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-80 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
                <a href="tel:012719010" aria-label="Call NDIC line 1" class="font-body text-[14px] text-white/80 hover:text-white transition-colors">(01) 2719010</a>
                <span class="text-white/40 text-[14px]">,</span>
                <a href="tel:014663400" aria-label="Call NDIC line 2" class="font-body text-[14px] text-white/80 hover:text-white transition-colors">01-4663400</a>
              </div>
            </div>
          </div>

          <nav class="h-12 lg:h-20 flex items-center pr-[2%]"
               role="navigation" aria-label="Main navigation">

            <!-- Desktop links (centered) -->
            <ul class="hidden lg:flex items-center list-none m-0 p-0 flex-1 justify-center self-stretch relative">
              ${this._navItems(active)}
            </ul>

            <!-- Desktop right actions -->
            <div class="hidden lg:flex items-center gap-3">
              <div class="flex items-center border border-brand-primary rounded-md overflow-hidden">
                <input
                  id="desktop-search-input"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  class="w-0 opacity-0 pointer-events-none transition-all duration-300 ease-in-out bg-transparent text-sm text-ndic-text outline-none px-0 py-1.5"
                />
                <button id="desktop-search-btn" aria-label="Search" class="text-ndic-secondary hover:text-brand-primary transition-colors px-2 py-1.5">
                  <!-- Search icon -->
                  <svg id="desktop-search-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4995 15.5288C15.8395 15.1912 16.3851 15.1912 16.7251 15.5288L18.9722 17.3432H19.0112C19.4656 17.8027 19.4657 18.5479 19.0112 19.0073C18.5567 19.4668 17.8194 19.4667 17.3647 19.0073L15.4995 16.8696C15.3234 16.6921 15.2241 16.4511 15.2241 16.1997C15.2241 15.9481 15.3232 15.7064 15.4995 15.5288ZM9.3042 1.75926C11.3051 1.75926 13.2242 2.56269 14.6392 3.99266C16.0541 5.42279 16.849 7.36274 16.8491 9.38524C16.8491 13.5971 13.4713 17.0122 9.3042 17.0122C5.13723 17.0121 1.75928 13.5971 1.75928 9.38524C1.75946 5.17357 5.13735 1.75938 9.3042 1.75926Z" fill="#2C2E81" fill-opacity="0.5"/>
                  </svg>
                  <!-- Close icon (hidden by default) -->
                  <svg id="desktop-close-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C2E81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <a href="#" class="font-body font-semibold text-[13px] text-white border border-brand-primary rounded-md px-4 py-1.5 bg-brand-primary hover:bg-brand-dark transition-colors">
                Contact Care Center
              </a>
            </div>

            <!-- Mobile: search + hamburger -->
            <div class="lg:hidden flex items-center gap-2 ml-auto">
              <!-- Expandable search -->
              <div class="flex items-center">
                <input
                  id="mobile-search-input"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  class="w-0 opacity-0 pointer-events-none transition-all duration-300 ease-in-out border-b border-brand-primary bg-transparent text-sm text-ndic-text outline-none px-0"
                />
                <button id="mobile-search-btn" aria-label="Search" class="text-brand-primary p-1">
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4995 15.5288C15.8395 15.1912 16.3851 15.1912 16.7251 15.5288L18.9722 17.3432H19.0112C19.4656 17.8027 19.4657 18.5479 19.0112 19.0073C18.5567 19.4668 17.8194 19.4667 17.3647 19.0073L15.4995 16.8696C15.3234 16.6921 15.2241 16.4511 15.2241 16.1997C15.2241 15.9481 15.3232 15.7064 15.4995 15.5288ZM9.3042 1.75926C11.3051 1.75926 13.2242 2.56269 14.6392 3.99266C16.0541 5.42279 16.849 7.36274 16.8491 9.38524C16.8491 13.5971 13.4713 17.0122 9.3042 17.0122C5.13723 17.0121 1.75928 13.5971 1.75928 9.38524C1.75946 5.17357 5.13735 1.75938 9.3042 1.75926Z" fill="#2C2E81" fill-opacity="0.5"/>
                  </svg>
                </button>
              </div>
              <button id="ndic-hamburger" aria-label="Open menu" aria-expanded="false" class="text-brand-primary p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>

          </nav>
        </div>

        <!-- Mobile drawer -->
        <div id="ndic-drawer"
             class="nav-drawer fixed top-0 left-0 h-full w-72 bg-white z-[100] shadow-2xl flex flex-col"
             aria-hidden="true" inert>
          <div class="h-2 bg-brand-primary w-full"></div>
          <div class="flex items-center justify-between px-6 h-16 border-b border-ndic-border">
            <a href="index.html" class="flex items-center" aria-label="NDIC Home">
              <img src="./assets/logo/logo.webp" alt="NDIC Logo" class="w-20 h-20 object-contain" width="80" height="24"/>
            </a>
            <button id="ndic-close" aria-label="Close menu" class="text-ndic-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <nav class="flex flex-col flex-1 px-6 py-4">
            ${this._drawerLinks()}
            <a href="#" class="mt-6 font-body font-semibold text-[13px] text-brand-primary border border-brand-primary rounded-full px-4 py-2 text-center hover:bg-brand-primary hover:text-white transition-colors block">
              Contact Care Center
            </a>
          </nav>
        </div>

        <!-- Drawer backdrop -->
        <div id="ndic-backdrop" class="hidden fixed inset-0 bg-black/40 z-[99]"></div>

      </header>
    `;
  }

  _init() {
    // Dropdown link hover — update description column
    this.querySelectorAll(".nav-item").forEach((navItem) => {
      const titleEl = navItem.querySelector(".dd-desc-title");
      const bodyEl = navItem.querySelector(".dd-desc-body");
      if (!titleEl || !bodyEl) return;

      navItem.querySelectorAll(".dd-link").forEach((link) => {
        link.addEventListener("mouseenter", () => {
          titleEl.textContent = link.dataset.itemTitle;
          bodyEl.textContent = link.dataset.itemDesc;
        });
        link.addEventListener("mouseleave", () => {
          titleEl.textContent = titleEl.dataset.default;
          bodyEl.textContent = bodyEl.dataset.default;
        });
      });
    });

    // Mobile drawer accordion
    this.querySelectorAll(".drawer-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sub = btn.nextElementSibling;
        const caret = btn.querySelector(".drawer-caret");
        const open = btn.getAttribute("aria-expanded") === "true";
        // close all others
        this.querySelectorAll(".drawer-toggle").forEach((b) => {
          b.setAttribute("aria-expanded", "false");
          b.nextElementSibling.style.maxHeight = "0";
          b.querySelector(".drawer-caret").style.transform = "";
        });
        if (!open) {
          btn.setAttribute("aria-expanded", "true");
          sub.style.maxHeight = sub.scrollHeight + "px";
          caret.style.transform = "rotate(180deg)";
        }
      });
    });

    // Scroll-aware header
    const header = this.querySelector("header");
    const accentBar = this.querySelector(".nav-accent-bar")?.parentElement;
    const rightPanel = header?.querySelector(".flex-1.flex.flex-col");

    const onScroll = () => {
      const scrolled = window.scrollY > 8;
      header.style.boxShadow = scrolled ? "0 4px 24px rgba(28,30,90,0.13)" : "";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const hamburger = document.getElementById("ndic-hamburger");
    const drawer = document.getElementById("ndic-drawer");
    const close = document.getElementById("ndic-close");
    const backdrop = document.getElementById("ndic-backdrop");

    const openDrawer = () => {
      drawer.classList.add("open");
      backdrop.classList.remove("hidden");
      hamburger.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      drawer.removeAttribute("inert");
    };
    const closeDrawer = () => {
      drawer.classList.remove("open");
      backdrop.classList.add("hidden");
      hamburger.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      drawer.setAttribute("inert", "");
    };

    hamburger?.addEventListener("click", openDrawer);
    close?.addEventListener("click", closeDrawer);
    backdrop?.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDrawer();
        collapseSearch();
        collapseDesktop();
      }
    });

    // Desktop search toggle
    const desktopSearchBtn = document.getElementById("desktop-search-btn");
    const desktopSearchInput = document.getElementById("desktop-search-input");

    const searchIcon = document.getElementById("desktop-search-icon");
    const closeIcon = document.getElementById("desktop-close-icon");

    const expandDesktop = () => {
      desktopSearchInput.classList.remove(
        "w-0",
        "opacity-0",
        "pointer-events-none",
        "px-0",
      );
      desktopSearchInput.classList.add("w-48", "opacity-100", "px-2");
      searchIcon?.classList.add("hidden");
      closeIcon?.classList.remove("hidden");
      desktopSearchInput.focus();
    };
    const collapseDesktop = () => {
      desktopSearchInput.classList.add(
        "w-0",
        "opacity-0",
        "pointer-events-none",
        "px-0",
      );
      desktopSearchInput.classList.remove("w-48", "opacity-100", "px-2");
      searchIcon?.classList.remove("hidden");
      closeIcon?.classList.add("hidden");
    };

    desktopSearchBtn?.addEventListener("click", () => {
      desktopSearchInput.classList.contains("w-0")
        ? expandDesktop()
        : collapseDesktop();
    });
    desktopSearchInput?.addEventListener("blur", () => {
      if (!desktopSearchInput.value) collapseDesktop();
    });

    // Mobile search toggle
    const searchBtn = document.getElementById("mobile-search-btn");
    const searchInput = document.getElementById("mobile-search-input");

    const expandSearch = () => {
      searchInput.classList.remove(
        "w-0",
        "opacity-0",
        "pointer-events-none",
        "px-0",
      );
      searchInput.classList.add("w-32", "opacity-100", "px-2");
      searchInput.focus();
    };
    const collapseSearch = () => {
      searchInput.classList.add(
        "w-0",
        "opacity-0",
        "pointer-events-none",
        "px-0",
      );
      searchInput.classList.remove("w-32", "opacity-100", "px-2");
    };

    searchBtn?.addEventListener("click", () => {
      searchInput.classList.contains("w-0") ? expandSearch() : collapseSearch();
    });
    searchInput?.addEventListener("blur", () => {
      if (!searchInput.value) collapseSearch();
    });
  }
}
customElements.define("nav-bar", NavBar);

class FooterBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this._template();
  }

  _col(heading, links) {
    return `
      <div>
        <p class="font-body font-semibold text-sm text-white mb-4">${heading}</p>
        <div class="space-y-2">
          ${links
            .map(
              (l) => `
              <a href="#" class="block text-[14px] text-gray-300 hover:text-white transition-colors truncate">
                ${l}
              </a>
            `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  _template() {
    return `
      <footer class="font-body bg-[#525252] text-white">

        <div class="ndic-container py-14">

          <!-- Top Section -->
          <div class="grid lg:grid-cols-6 gap-10">

            <!-- LEFT: Logo + Address -->
            <div class="lg:col-span-2 lg:w-[70%]">

              <!-- Logo -->
              <a href="index.html" class="inline-block mb-6" aria-label="NDIC Home">
                <img src="./assets/logo/logo_white.webp" alt="NDIC Logo" class="w-[100px] md:w-[150px] object-contain" width="100" height="30"/>
              </a>

              <!-- Address -->
              <p class="text-[14px] text-gray-200 leading-relaxed mb-4 footer-address">
                <span class="font-semibold text-white">Head Office:</span> Plot 447/448 Constitution avenue,
                Central Business District, Abuja.
              </p>

              <p class="text-[14px] text-gray-200 leading-relaxed footer-address">
                <span class="font-semibold text-white">Lagos Office:</span> 23A Marina, Lagos. P.M.B 12881 Lagos, Nigeria.
              </p>
            </div>

            <!-- RIGHT: Links -->
            <div class="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:ml-auto xl:w-[85%]">

              ${this._col("Corporate", [
                "Mandate",
                "Governance",
                "Careers",
                "Procurement",
                "FOI",
              ])}

              ${this._col("Resources", [
                "Claims",
                "Institutions",
                "Literacy",
                "Helpdesk",
              ])}

              ${this._col("Quick Access", [
                "About",
                "Protection",
                "Reports",
                "News",
                "Tools",
                "Contact",
              ])}

              ${this._col("Media", [
                "Press Release",
                "Gallery",
                "News",
                "Publications",
                "Event",
              ])}

              <!-- Social (with icons) -->
              <div>
                <p class="font-semibold text-sm mb-4">Social</p>
                <div class="space-y-3">

                  ${this._social("Instagram", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`)}
                  ${this._social("TikTok", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>`)}
                  ${this._social("X (Formerly Twitter)", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`)}
                  ${this._social("Facebook", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`)}
                  ${this._social("LinkedIn", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`)}

                </div>
              </div>

            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-400 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

            <!-- Left -->
            <p class="text-[13px] text-gray-300">
              © 2025 Nigeria Deposit Insurance Corporation. All rights reserved.
            </p>

            <!-- Right -->
            <div class="flex items-center gap-6 text-[13px] text-gray-300">
              <a href="#" class="hover:text-white">Privacy</a>
              <a href="#" class="hover:text-white">TOU</a>
              <a href="#" class="hover:text-white">Community</a>
              <a href="#" class="hover:text-white">Cookie preferences</a>
            </div>

          </div>
        </div>

      </footer>
    `;
  }

  _social(name, icon) {
    return `
      <a href="#" class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
        <span class="flex-shrink-0">${icon}</span>
        <span class="text-[14px]">${name}</span>
      </a>
    `;
  }
}

customElements.define("footer-bar", FooterBar);

//  <div class="absolute top-0 left-0 h-full bg-white z-10 flex items-center justify-start pl-6 logo-panel">
//    <a href="index.html" class="flex items-center" aria-label="NDIC Home">
//      <img
//        src="./assets/logo/logo.webp"
//        alt="NDIC Logo"
//        class="w-[120px] md:w-[200px] h-auto object-contain"
//      />
//    </a>
//  </div>;
