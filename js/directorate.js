(function () {
  var PER_PAGE = { dept: 8, zonal: 6 };
  var activeTab = 'dept';
  var currentPage = { dept: 1, zonal: 1 };
  var searchQuery = '';

  // ── Data ────────────────────────────────────────────────
  var deptDirectors = [
    { name: 'Mr. Oluyinka Theophilus Ogungbemi',  designation: 'Director', department: 'Asset Management Department' },
    { name: 'Mr. Adebayo Olusola Akinwande',       designation: 'Director', department: 'Bank Examination Department' },
    { name: 'Mrs. Chinwe Adaeze Okonkwo',          designation: 'Director', department: 'Claims Resolution Department' },
    { name: 'Mr. Suleiman Abubakar Musa',          designation: 'Director', department: 'Communications & Public Relations Department' },
    { name: 'Mrs. Folake Adunola Adeleke',         designation: 'Director', department: 'Enterprise Risk Management Department' },
    { name: 'Mr. Emeka Chukwudi Nwosu',            designation: 'Director', department: 'Finance Department' },
    { name: 'Mrs. Fatima Zahra Abdullahi',         designation: 'Director', department: 'Human Resource Department' },
    { name: 'Mr. Taiwo Oluwaseun Badejo',          designation: 'Director', department: 'Information Technology Department' },
    { name: 'Mrs. Ngozi Blessing Okafor',          designation: 'Director', department: 'Insurance and Surveillance Department' },
    { name: 'Barr. Kunle Adeyemi Salami',          designation: 'Director', department: 'Legal Department' },
    { name: 'Mr. Garba Usman Bello',               designation: 'Director', department: 'Performance Management Department' },
    { name: 'Mrs. Ifeoma Grace Eze',               designation: 'Director', department: 'Procurement & Management Services Department' },
    { name: 'Dr. Chukwuemeka Obiora Dike',         designation: 'Director', department: 'Research, Policy & International Relations Department' },
    { name: 'Mr. Babatunde Kehinde Fasanya',       designation: 'Director', department: 'Special Insured Institutions Department' },
    { name: 'Mrs. Amina Khadijat Yusuf',           designation: 'Director', department: 'Strategy Development Department' },
    { name: 'Engr. Tunde Olawale Afolabi',         designation: 'Director', department: 'Engineering & Technical Services Department' },
    { name: 'Mrs. Obiageli Nnenna Obi',            designation: 'Director', department: 'NDIC Academy' },
    { name: 'Mr. Hassan Maikudi Usman',            designation: 'Director', department: 'Establishment Office Lagos' },
  ];

  var zonalOffices = [
    { city: 'Abeokuta', address: 'No. 1 Oshela Road, Ibara GRA, Abeokuta, Ogun State.', controller: 'Mr. Adebisi Ademola Babatunde', tel: '08033778947', email: 'adebisiyab@ndic.gov.ng' },
    { city: 'Abuja (Head Office)', address: 'Plot 447/448 Constitution Avenue, Central Business District, Abuja.', controller: 'Mr. Abdullahi Ibrahim Sule', tel: '09020000001', email: 'abdullahis@ndic.gov.ng' },
    { city: 'Benin', address: 'No. 4 Sakponba Road, GRA, Benin City, Edo State.', controller: 'Mrs. Eghosa Iyare Omokhagbo', tel: '08056123456', email: 'eghosao@ndic.gov.ng' },
    { city: 'Enugu', address: 'No. 12 Ogui Road, Independence Layout, Enugu State.', controller: 'Mr. Chukwuemeka Eze Okoye', tel: '08023456789', email: 'chukwuemekao@ndic.gov.ng' },
    { city: 'Ibadan', address: 'No. 3 Eleiyele Road, Iyaganku GRA, Ibadan, Oyo State.', controller: 'Mrs. Adebimpe Oluwafunmilayo Bello', tel: '08079012345', email: 'adebimpeb@ndic.gov.ng' },
    { city: 'Kaduna', address: 'No. 8 Bida Road, Kaduna South, Kaduna State.', controller: 'Alhaji Musa Garba Tanko', tel: '08035678901', email: 'musagt@ndic.gov.ng' },
    { city: 'Kano', address: 'No. 22 Murtala Mohammed Way, Nasarawa GRA, Kano State.', controller: 'Mallam Yakubu Aliyu Danburam', tel: '08067890123', email: 'yakubud@ndic.gov.ng' },
    { city: 'Lagos', address: '23A Marina, Lagos Island, Lagos State.', controller: 'Mrs. Olubunmi Adeyinka Obaseki', tel: '08012345678', email: 'olubunmio@ndic.gov.ng' },
    { city: 'Maiduguri', address: 'No. 5 Lagos Street, Gwange Layout, Maiduguri, Borno State.', controller: 'Alhaji Bulama Kolo Usman', tel: '08098765432', email: 'bulamaku@ndic.gov.ng' },
    { city: 'Port Harcourt', address: 'No. 7 Aba Road, Trans-Amadi Industrial Layout, Port Harcourt, Rivers State.', controller: 'Mr. Princewill Chukwuebuka Amadi', tel: '08054321098', email: 'princewilla@ndic.gov.ng' },
    { city: 'Sokoto', address: 'No. 14 Aliyu Jodi Road, GRA, Sokoto State.', controller: 'Mallam Ibrahim Waziri Maigari', tel: '08043210987', email: 'ibrahimwm@ndic.gov.ng' },
    { city: 'Ilorin', address: 'No. 10 Ahmadu Bello Way, GRA, Ilorin, Kwara State.', controller: 'Mrs. Ramota Kehinde Afolabi', tool: '08021098765', email: 'ramotak@ndic.gov.ng' },
    { city: 'Owerri', address: 'No. 6 Wetheral Road, New Owerri, Imo State.', controller: 'Mr. Ikechukwu Chinaemerem Okafor', tel: '08076543210', email: 'ikechukwuo@ndic.gov.ng' },
    { city: 'Jos', address: 'No. 9 Yakubu Gowon Way, GRA, Jos, Plateau State.', controller: 'Mr. Samuel Dachung Musa', tel: '08065432109', email: 'samueldm@ndic.gov.ng' },
    { city: 'Calabar', address: 'No. 3 Ndidem Usang Iso Road, GRA, Calabar, Cross River State.', controller: 'Mrs. Bassey Iquo Etim', tel: '08052109876', email: 'basseyie@ndic.gov.ng' },
  ];

  // ── Filtering ────────────────────────────────────────────
  function filterDept() {
    if (!searchQuery) return deptDirectors;
    var q = searchQuery.toLowerCase();
    return deptDirectors.filter(function (d) {
      return d.name.toLowerCase().includes(q) || d.department.toLowerCase().includes(q);
    });
  }

  function filterZonal() {
    if (!searchQuery) return zonalOffices;
    var q = searchQuery.toLowerCase();
    return zonalOffices.filter(function (o) {
      return o.city.toLowerCase().includes(q) || o.address.toLowerCase().includes(q) || o.controller.toLowerCase().includes(q);
    });
  }

  // ── Rendering ────────────────────────────────────────────
  function renderDept(page) {
    var data = filterDept();
    var start = (page - 1) * PER_PAGE.dept;
    var items = data.slice(start, start + PER_PAGE.dept);
    var html = items.map(function (d, i) {
      return (
        '<div class="dir-entry' + (i < items.length - 1 ? ' dir-entry--border' : '') + '">' +
          '<p class="dir-name">' + d.name + '</p>' +
          '<p class="dir-meta">Designation: ' + d.designation + '</p>' +
          '<p class="dir-meta">Department: ' + d.department + '</p>' +
        '</div>'
      );
    }).join('');
    document.getElementById('dept-content').innerHTML = html;
  }

  function renderZonal(page) {
    var data = filterZonal();
    var start = (page - 1) * PER_PAGE.zonal;
    var items = data.slice(start, start + PER_PAGE.zonal);
    var html = items.map(function (o, i) {
      return (
        '<div class="dir-entry' + (i < items.length - 1 ? ' dir-entry--border' : '') + '">' +
          '<p class="dir-name">' + o.city + '</p>' +
          '<p class="dir-meta">' + o.address + '</p>' +
          '<p class="dir-meta">Controller: ' + o.controller + '</p>' +
          '<p class="dir-meta">Tel: ' + (o.tel || '') + '</p>' +
          '<p class="dir-meta">Email: <a href="mailto:' + o.email + '" class="dir-link">' + o.email + '</a></p>' +
        '</div>'
      );
    }).join('');
    document.getElementById('zonal-content').innerHTML = html;
  }

  // ── Pagination ───────────────────────────────────────────
  function renderPagination(total, page, tab, perPage) {
    var totalPages = Math.ceil(total / perPage);
    var pag = document.getElementById('dir-pagination');
    if (totalPages <= 1) { pag.innerHTML = ''; return; }

    var html = '';

    // Page numbers only
    var start = Math.max(1, page - 2);
    var end   = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);

    for (var p = start; p <= end; p++) {
      html += '<button class="dir-page-btn' + (p === page ? ' dir-page-btn--active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }

    pag.innerHTML = html;

    pag.querySelectorAll('.dir-page-btn:not([disabled])').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentPage[tab] = parseInt(btn.dataset.page);
        refresh();
      });
    });
  }

  // ── Refresh ──────────────────────────────────────────────
  function refresh() {
    var isDept = activeTab === 'dept';
    document.getElementById('dept-content').style.display  = isDept ? '' : 'none';
    document.getElementById('zonal-content').style.display = isDept ? 'none' : '';

    if (isDept) {
      renderDept(currentPage.dept);
      renderPagination(filterDept().length, currentPage.dept, 'dept', PER_PAGE.dept);
    } else {
      renderZonal(currentPage.zonal);
      renderPagination(filterZonal().length, currentPage.zonal, 'zonal', PER_PAGE.zonal);
    }

    document.querySelectorAll('.dir-tab').forEach(function (btn) {
      var isActive = btn.dataset.tab === activeTab;
      btn.classList.toggle('dir-tab--active', isActive);
    });

    var searchInput = document.getElementById('dir-search');
    searchInput.placeholder = activeTab === 'zonal'
      ? 'Search your desired zonal office'
      : 'Search...';
  }

  // ── Tab clicks ───────────────────────────────────────────
  document.querySelectorAll('.dir-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeTab = btn.dataset.tab;
      searchQuery = '';
      document.getElementById('dir-search').value = '';
      currentPage.dept = 1;
      currentPage.zonal = 1;
      refresh();
    });
  });

  // ── Search ───────────────────────────────────────────────
  document.getElementById('dir-search').addEventListener('input', function () {
    searchQuery = this.value.trim();
    currentPage[activeTab] = 1;
    refresh();
  });

  // ── Init ─────────────────────────────────────────────────
  refresh();
})();
