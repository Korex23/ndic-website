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

  _template(active) {
    return `
      <header class="sticky top-0 z-50 font-body flex">

        <!-- Logo panel: white bg stretches to left edge and top -->
        <div class="bg-white flex flex-shrink-0 self-stretch">
          <div class="nav-logo-panel flex items-center py-1">
            <a href="index.html" class="flex items-center" aria-label="NDIC Home">
              <img src="./assets/logo/logo.png" alt="NDIC Logo" class="h-8 lg:h-full w-auto object-contain"/>
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
            <ul class="hidden lg:flex items-center gap-8 list-none m-0 p-0 flex-1 justify-center">
              <li><a href=""   class="font-body font-semibold text-sm pb-0.5 transition-colors ${this._isActive("about", active)}">About Us</a></li>
              <li><a href="#"  class="font-body font-semibold text-sm pb-0.5 transition-colors ${this._isActive("protection", active)}">Your Protection</a></li>
              <li><a href="#"  class="font-body font-semibold text-sm pb-0.5 transition-colors ${this._isActive("media", active)}">Media</a></li>
              <li><a href="#"  class="font-body font-semibold text-sm pb-0.5 transition-colors ${this._isActive("tools", active)}">Tools</a></li>
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
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4995 15.5288C15.8395 15.1912 16.3851 15.1912 16.7251 15.5288L18.9722 17.3432H19.0112C19.4656 17.8027 19.4657 18.5479 19.0112 19.0073C18.5567 19.4668 17.8194 19.4667 17.3647 19.0073L15.4995 16.8696C15.3234 16.6921 15.2241 16.4511 15.2241 16.1997C15.2241 15.9481 15.3232 15.7064 15.4995 15.5288ZM9.3042 1.75926C11.3051 1.75926 13.2242 2.56269 14.6392 3.99266C16.0541 5.42279 16.849 7.36274 16.8491 9.38524C16.8491 13.5971 13.4713 17.0122 9.3042 17.0122C5.13723 17.0121 1.75928 13.5971 1.75928 9.38524C1.75946 5.17357 5.13735 1.75938 9.3042 1.75926Z" fill="#2C2E81" fill-opacity="0.5"/>
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
             aria-hidden="true">
          <div class="h-2 bg-brand-primary w-full"></div>
          <div class="flex items-center justify-between px-6 h-16 border-b border-ndic-border">
            <a href="index.html" class="flex items-center" aria-label="NDIC Home">
              <img src="./assets/logo/logo.png" alt="NDIC Logo" class="w-20 h-20 object-contain"/>
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
            <a href="index.html" class="font-body font-semibold text-sm text-ndic-text py-3 border-b border-ndic-border hover:text-brand-primary transition-colors">About Us</a>
            <a href="#"          class="font-body font-semibold text-sm text-ndic-text py-3 border-b border-ndic-border hover:text-brand-primary transition-colors">Your Protection</a>
            <a href="#"          class="font-body font-semibold text-sm text-ndic-text py-3 border-b border-ndic-border hover:text-brand-primary transition-colors">Media</a>
            <a href="#"          class="font-body font-semibold text-sm text-ndic-text py-3 border-b border-ndic-border hover:text-brand-primary transition-colors">Tools</a>
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
    const hamburger = document.getElementById("ndic-hamburger");
    const drawer = document.getElementById("ndic-drawer");
    const close = document.getElementById("ndic-close");
    const backdrop = document.getElementById("ndic-backdrop");

    const openDrawer = () => {
      drawer.classList.add("open");
      backdrop.classList.remove("hidden");
      hamburger.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
    };
    const closeDrawer = () => {
      drawer.classList.remove("open");
      backdrop.classList.add("hidden");
      hamburger.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
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

    const expandDesktop = () => {
      desktopSearchInput.classList.remove(
        "w-0",
        "opacity-0",
        "pointer-events-none",
        "px-0",
      );
      desktopSearchInput.classList.add("w-48", "opacity-100", "px-2");
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
            <div class="lg:col-span-2 lg:w-[60%]">

              <!-- Logo -->
              <a href="index.html" class="flex items-center gap-2 mb-6" aria-label="NDIC Home">
                <img src="./assets/logo/logo.png" alt="NDIC Logo" class="w-[100px] md:w-[150px] object-contain"/>
              </a>

              <!-- Address -->
              <p class="text-[14px] text-gray-200 leading-relaxed mb-4">
                <span class="font-semibold text-white">Head Office:</span> Plot 447/448 Constitution avenue, 
                Central Business District, Abuja.
              </p>

              <p class="text-[14px] text-gray-200 leading-relaxed">
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
//        src="./assets/logo/logo.png"
//        alt="NDIC Logo"
//        class="w-[120px] md:w-[200px] h-auto object-contain"
//      />
//    </a>
//  </div>;
