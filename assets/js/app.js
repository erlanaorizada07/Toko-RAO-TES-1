/**
 * RAO Adventure Gear - Core Interactive Logic (Vanilla JavaScript)
 * Slogan: "Never Ending Adventure"
 * Includes: Animations, Stock Control, Mountain Peaks Info, and Interactive Packing Checklist.
 */

(function () {
  'use strict';

  // --- Helper: Format Rupiah Currency ---
  function formatRupiah(number) {
    if (number === 0) return 'Gratis';
    return 'Rp ' + Number(number).toLocaleString('id-ID');
  }

  // --- State Application ---
  const state = {
    theme: localStorage.getItem('rao_theme') || 'dark',
    cart: JSON.parse(localStorage.getItem('rao_cart') || '[]'),
    activeProductCategory: 'Semua',
    productSearch: '',
    onlyReadyProducts: false,
    activeRentalCategory: 'Semua',
    rentalSearch: '',
    onlyReadyRentals: false,
    activeEventCategory: 'Semua',
    rentalCardDaysMap: {}, // Maps rentalId to chosen days on card
    rentalBookingModalDays: 1,
    packingChecklistState: (window.RAO_DATA && window.RAO_DATA.packingChecklist) ? [...window.RAO_DATA.packingChecklist] : []
  };

  // --- DOM Elements Cache ---
  const dom = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    navbar: document.querySelector('.navbar'),
    cartTriggerBtn: document.getElementById('cartTriggerBtn'),
    cartBadge: document.getElementById('cartBadge'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartTotalVal: document.getElementById('cartTotalVal'),
    cartCheckoutBtn: document.getElementById('cartCheckoutBtn'),
    floatingWaBtn: document.getElementById('floatingWaBtn'),
    // Containers
    productsGrid: document.getElementById('productsGrid'),
    productCategoryPills: document.getElementById('productCategoryPills'),
    productSearchInput: document.getElementById('productSearchInput'),
    productStockFilterBtn: document.getElementById('productStockFilterBtn'),
    rentalsGrid: document.getElementById('rentalsGrid'),
    rentalCategoryPills: document.getElementById('rentalCategoryPills'),
    rentalSearchInput: document.getElementById('rentalSearchInput'),
    rentalStockFilterBtn: document.getElementById('rentalStockFilterBtn'),
    eventsList: document.getElementById('eventsList'),
    eventCategoryPills: document.getElementById('eventCategoryPills'),
    mountainPeaksGrid: document.getElementById('mountainPeaksGrid'),
    packingChecklistContainer: document.getElementById('packingChecklistContainer'),
    checklistProgressFill: document.getElementById('checklistProgressFill'),
    checklistProgressText: document.getElementById('checklistProgressText'),
    checklistTipText: document.getElementById('checklistTipText'),
    testimonialsGrid: document.getElementById('testimonialsGrid'),
    faqList: document.getElementById('faqList'),
    heroStats: document.getElementById('heroStats'),
    // Modals
    detailModalOverlay: document.getElementById('detailModalOverlay'),
    detailModalCloseBtn: document.getElementById('detailModalCloseBtn'),
    detailModalContent: document.getElementById('detailModalContent'),
    // Contact Form
    contactForm: document.getElementById('contactForm'),
    toastContainer: document.getElementById('toastContainer')
  };

  // --- Initialize App ---
  function init() {
    applyTheme(state.theme);
    setupEventListeners();
    setupCategoryPills();
    renderStats();
    renderProducts();
    renderRentals();
    renderMountainPeaks();
    renderPackingChecklist();
    renderEvents();
    renderTestimonials();
    renderFaqs();
    updateCartUI();
    setupScrollSpy();
    updateSellerContactLinks();
    setupScrollReveal();
  }

  // --- Theme Handler ---
  function applyTheme(theme) {
    state.theme = theme;
    dom.html.setAttribute('data-theme', theme);
    localStorage.setItem('rao_theme', theme);

    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.innerHTML = theme === 'light' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
  }

  // --- Toast Notification ---
  function showToast(message, icon = '✓') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Update Seller Links & WhatsApp Numbers ---
  function updateSellerContactLinks() {
    const config = window.RAO_DATA.config;
    if (dom.floatingWaBtn) {
      dom.floatingWaBtn.href = `https://wa.me/${config.sellerPhone}?text=${encodeURIComponent('Halo Basecamp RAO Adventure Gear! Saya ingin info produk/sewa tenda/open trip gunung.')}`;
      dom.floatingWaBtn.setAttribute('target', '_blank');
    }
  }

  // --- Setup Category Filter Pills ---
  function setupCategoryPills() {
    // Products
    if (dom.productCategoryPills && window.RAO_DATA.categories.products) {
      dom.productCategoryPills.innerHTML = window.RAO_DATA.categories.products.map(cat => `
        <button class="filter-pill ${cat === state.activeProductCategory ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `).join('');
    }

    // Rentals
    if (dom.rentalCategoryPills && window.RAO_DATA.categories.rentals) {
      dom.rentalCategoryPills.innerHTML = window.RAO_DATA.categories.rentals.map(cat => `
        <button class="filter-pill ${cat === state.activeRentalCategory ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `).join('');
    }

    // Events
    if (dom.eventCategoryPills && window.RAO_DATA.categories.events) {
      dom.eventCategoryPills.innerHTML = window.RAO_DATA.categories.events.map(cat => `
        <button class="filter-pill ${cat === state.activeEventCategory ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `).join('');
    }
  }

  // --- Render Stats ---
  function renderStats() {
    if (!dom.heroStats || !window.RAO_DATA.stats) return;
    dom.heroStats.innerHTML = window.RAO_DATA.stats.slice(0, 3).map(stat => `
      <div class="stat-item reveal-on-scroll">
        <h4>${stat.value}</h4>
        <p>${stat.label}</p>
      </div>
    `).join('');
  }

  // --- Render Mountain Peaks Infographic Grid ---
  function renderMountainPeaks() {
    if (!dom.mountainPeaksGrid || !window.RAO_DATA.mountainPeaks) return;
    dom.mountainPeaksGrid.innerHTML = window.RAO_DATA.mountainPeaks.map((peak, idx) => `
      <div class="peak-card reveal-on-scroll reveal-delay-${(idx % 3) + 1}">
        <div class="peak-card-img">
          <img src="${peak.image}" alt="${peak.name}" loading="lazy" />
          <span class="peak-altitude-tag">⛰️ ${peak.altitude}</span>
        </div>
        <div class="peak-card-body">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h4 style="font-size: 1.15rem; font-weight: 800;">${peak.name}</h4>
            <span style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 700;">${peak.location}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">${peak.highlight}</p>
          <div class="peak-temp-row">
            <span>Tingkat: <strong>${peak.difficulty}</strong></span>
            <span class="peak-temp-badge">❄️ Suhu: ${peak.tempRange}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- Render Packing Checklist Interactive Widget ---
  function renderPackingChecklist() {
    if (!dom.packingChecklistContainer || !state.packingChecklistState.length) return;

    const checkedCount = state.packingChecklistState.filter(i => i.checked).length;
    const totalCount = state.packingChecklistState.length;
    const percent = Math.round((checkedCount / totalCount) * 100);

    if (dom.checklistProgressFill) dom.checklistProgressFill.style.width = `${percent}%`;
    if (dom.checklistProgressText) dom.checklistProgressText.innerText = `${percent}% Siap (${checkedCount}/${totalCount} Item)`;

    if (dom.checklistTipText) {
      if (percent === 100) {
        dom.checklistTipText.innerText = "🎉 Luar biasa! Seluruh perlengkapan wajib Anda sudah lengkap. Siap menaklukkan puncak!";
      } else if (percent >= 60) {
        dom.checklistTipText.innerText = "👍 Persiapan sudah hampir matang! Pastikan barang yang belum dicentang segera disiapkan atau disewa.";
      } else {
        dom.checklistTipText.innerText = "⚠️ Persiapan masih minim. Segera lengkapi perlengkapan krusial (tenda, matras, sleeping bag, P3K) demi keamanan pendakian.";
      }
    }

    dom.packingChecklistContainer.innerHTML = state.packingChecklistState.map(item => `
      <div class="checklist-item ${item.checked ? 'checked' : ''}" onclick="RAO.toggleChecklistItem('${item.id}')">
        <div class="checklist-checkbox">${item.checked ? '✓' : ''}</div>
        <div class="checklist-item-text">
          <span style="display: block; font-size: 0.72rem; color: var(--accent-primary); text-transform: uppercase;">[${item.category}]</span>
          ${item.label}
        </div>
      </div>
    `).join('');
  }

  function toggleChecklistItem(id) {
    const item = state.packingChecklistState.find(i => i.id === id);
    if (item) {
      item.checked = !item.checked;
      renderPackingChecklist();
    }
  }

  // --- Render Products with Stock Management ---
  function renderProducts() {
    if (!dom.productsGrid) return;
    const { products } = window.RAO_DATA;
    const filtered = products.filter(p => {
      const matchCat = state.activeProductCategory === 'Semua' || p.category === state.activeProductCategory;
      const matchSearch = p.name.toLowerCase().includes(state.productSearch.toLowerCase()) || 
                          p.shortDesc.toLowerCase().includes(state.productSearch.toLowerCase());
      const matchStock = !state.onlyReadyProducts || (p.inStock !== false && p.stockCount > 0);
      return matchCat && matchSearch && matchStock;
    });

    if (filtered.length === 0) {
      dom.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem; font-weight: 700;">Tidak ada perlengkapan yang cocok dengan filter Anda.</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Coba nonaktifkan filter "Hanya Ready Stock" atau ganti kata kunci.</p>
        </div>
      `;
      return;
    }

    dom.productsGrid.innerHTML = filtered.map((p, idx) => {
      const isAvailable = p.inStock !== false && p.stockCount > 0;
      const isLowStock = isAvailable && p.stockCount <= 3;

      let stockBadgeHtml = '';
      if (!isAvailable) {
        stockBadgeHtml = `<span class="stock-status-row badge-out-of-stock">● Stok Habis</span>`;
      } else if (isLowStock) {
        stockBadgeHtml = `<span class="stock-status-row badge-low-stock">● Sisa ${p.stockCount} Unit (Menipis!)</span>`;
      } else {
        stockBadgeHtml = `<span class="stock-status-row badge-in-stock">● Ready (${p.stockCount} Unit)</span>`;
      }

      const actionBtnHtml = isAvailable
        ? `<button class="btn btn-primary btn-sm" onclick="RAO.addToCart('product', '${p.id}')">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
             + Keranjang
           </button>`
        : `<button class="btn btn-whatsapp btn-sm" onclick="RAO.askRestockWhatsApp('product', '${p.name}')">
             Tanya Restock WA
           </button>`;

      return `
        <div class="card product-card ${!isAvailable ? 'card-out-of-stock' : ''} reveal-on-scroll reveal-delay-${(idx % 4) + 1}">
          <div class="card-img-wrap">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
            ${p.badge ? `<span class="card-badge-tag badge-${p.badge.toLowerCase().replace(/\s+/g, '')}">${p.badge}</span>` : ''}
            ${p.elevationBadge ? `<span class="card-elevation-tag">🏔️ ${p.elevationBadge}</span>` : ''}
          </div>
          <div class="card-body">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-category">${p.category}</span>
              ${stockBadgeHtml}
            </div>
            <h3 class="card-title">${p.name}</h3>
            <p class="card-desc">${p.shortDesc}</p>
            <div class="card-price-row">
              <span class="current-price">${formatRupiah(p.price)}</span>
              ${p.originalPrice ? `<span class="original-price">${formatRupiah(p.originalPrice)}</span>` : ''}
            </div>
            <div class="card-actions">
              <button class="btn btn-secondary btn-sm" onclick="RAO.openProductModal('${p.id}')">
                Detail
              </button>
              ${actionBtnHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    setupScrollReveal();
  }

  // --- Calculate Rental Price based on Days ---
  function calculateRentalCost(dailyRate, weeklyRate, days) {
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remDays = days % 7;
      return (weeks * weeklyRate) + (remDays * dailyRate);
    }
    return dailyRate * days;
  }

  // --- Render Rentals with Stock Management ---
  function renderRentals() {
    if (!dom.rentalsGrid) return;
    const { rentals } = window.RAO_DATA;
    const filtered = rentals.filter(r => {
      const matchCat = state.activeRentalCategory === 'Semua' || r.category === state.activeRentalCategory;
      const matchSearch = r.name.toLowerCase().includes(state.rentalSearch.toLowerCase()) || 
                          r.shortDesc.toLowerCase().includes(state.rentalSearch.toLowerCase());
      const matchStock = !state.onlyReadyRentals || (r.inStock !== false && r.stockCount > 0);
      return matchCat && matchSearch && matchStock;
    });

    if (filtered.length === 0) {
      dom.rentalsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem; font-weight: 700;">Tidak ada alat sewa yang ditemukan.</p>
        </div>
      `;
      return;
    }

    dom.rentalsGrid.innerHTML = filtered.map((r, idx) => {
      const selectedDays = state.rentalCardDaysMap[r.id] || 1;
      const currentCost = calculateRentalCost(r.dailyPrice, r.weeklyPrice, selectedDays);
      const isAvailable = r.inStock !== false && r.stockCount > 0;
      const isLowStock = isAvailable && r.stockCount <= 3;

      let stockBadgeHtml = '';
      if (!isAvailable) {
        stockBadgeHtml = `<span class="stock-status-row badge-out-of-stock">● Sedang Disewa (Habis)</span>`;
      } else if (isLowStock) {
        stockBadgeHtml = `<span class="stock-status-row badge-low-stock">● Sisa ${r.stockCount} Unit!</span>`;
      } else {
        stockBadgeHtml = `<span class="stock-status-row badge-in-stock">● Tersedia (${r.stockCount} Unit)</span>`;
      }

      const actionBtnHtml = isAvailable
        ? `<button class="btn btn-primary btn-sm" onclick="RAO.addRentalFromCard('${r.id}')">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 22h20L12 2z"></path></svg>
             + Sewa
           </button>`
        : `<button class="btn btn-whatsapp btn-sm" onclick="RAO.askRestockWhatsApp('rental', '${r.name}')">
             Booking Antrian WA
           </button>`;

      return `
        <div class="card rental-card ${!isAvailable ? 'card-out-of-stock' : ''} reveal-on-scroll reveal-delay-${(idx % 4) + 1}" id="rental-card-${r.id}">
          <div class="card-img-wrap">
            <img src="${r.image}" alt="${r.name}" loading="lazy" />
            ${r.badge ? `<span class="card-badge-tag badge-bestseller">${r.badge}</span>` : ''}
          </div>
          <div class="card-body">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-category">${r.category}</span>
              ${stockBadgeHtml}
            </div>
            <h3 class="card-title">${r.name}</h3>
            <p class="card-desc">${r.shortDesc}</p>
            
            <!-- Quick Duration Selector On Card -->
            <div class="rental-card-duration-box">
              <div class="rental-card-duration-label">
                <span>Pilih Durasi Sewa:</span>
                <span id="rental-days-display-${r.id}" style="color: var(--accent-primary); font-weight: 800;">${selectedDays} Hari</span>
              </div>
              <div class="duration-pills-row">
                <button type="button" class="duration-pill-btn ${selectedDays === 1 ? 'active' : ''}" onclick="RAO.selectCardRentalDays('${r.id}', 1)">1 Hari</button>
                <button type="button" class="duration-pill-btn ${selectedDays === 2 ? 'active' : ''}" onclick="RAO.selectCardRentalDays('${r.id}', 2)">2 Hari</button>
                <button type="button" class="duration-pill-btn ${selectedDays === 3 ? 'active' : ''}" onclick="RAO.selectCardRentalDays('${r.id}', 3)">3 Hari</button>
                <button type="button" class="duration-pill-btn ${selectedDays === 7 ? 'active' : ''}" onclick="RAO.selectCardRentalDays('${r.id}', 7)">7 Hari</button>
              </div>
            </div>

            <div class="card-price-row">
              <div>
                <span class="current-price" id="rental-price-display-${r.id}">${formatRupiah(currentCost)}</span>
                <span class="price-unit">/ ${selectedDays} Hari</span>
              </div>
              <div style="margin-left: auto;">
                <span style="font-size: 0.8rem; color: var(--text-muted);">${formatRupiah(r.dailyPrice)}/hari</span>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn btn-secondary btn-sm" onclick="RAO.openRentalModal('${r.id}')">
                Detail
              </button>
              ${actionBtnHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    setupScrollReveal();
  }

  // --- Handle Card-Level Duration Selection ---
  function selectCardRentalDays(rentalId, days) {
    state.rentalCardDaysMap[rentalId] = days;
    const rental = window.RAO_DATA.rentals.find(r => r.id === rentalId);
    if (!rental) return;

    const card = document.getElementById(`rental-card-${rentalId}`);
    if (card) {
      card.querySelectorAll('.duration-pill-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(`${days} Hari`)) {
          btn.classList.add('active');
        }
      });
      const daysDisplay = document.getElementById(`rental-days-display-${rentalId}`);
      const priceDisplay = document.getElementById(`rental-price-display-${rentalId}`);
      const cost = calculateRentalCost(rental.dailyPrice, rental.weeklyPrice, days);
      
      if (daysDisplay) daysDisplay.innerText = `${days} Hari`;
      if (priceDisplay) {
        priceDisplay.innerText = formatRupiah(cost);
        priceDisplay.parentElement.querySelector('.price-unit').innerText = `/ ${days} Hari`;
      }
    }
  }

  function addRentalFromCard(rentalId) {
    const rental = window.RAO_DATA.rentals.find(r => r.id === rentalId);
    if (!rental) return;

    if (rental.inStock === false || rental.stockCount <= 0) {
      alert('Maaf, alat ini sedang habis/sedang disewa. Silakan klik tombol Tanya Restock.');
      return;
    }

    const days = state.rentalCardDaysMap[rentalId] || 1;
    const cost = calculateRentalCost(rental.dailyPrice, rental.weeklyPrice, days);
    const startDate = new Date().toISOString().split('T')[0];

    state.cart.push({
      type: 'rental',
      id: rental.id + '-' + Date.now(),
      rentalId: rental.id,
      name: rental.name,
      price: cost,
      dailyPrice: rental.dailyPrice,
      weeklyPrice: rental.weeklyPrice,
      days: days,
      startDate: startDate,
      image: rental.image,
      category: rental.category,
      qty: 1
    });

    saveCart();
    showToast(`"${rental.name}" (${days} Hari - ${formatRupiah(cost)}) masuk keranjang!`);
  }

  function askRestockWhatsApp(type, itemName) {
    const msg = type === 'rental'
      ? `Halo Basecamp RAO Adventure, saya ingin menanyakan jadwal ketersediaan unit sewa *${itemName}* yang sedang habis di website. Kapan ready kembali?`
      : `Halo RAO Adventure Gear, saya berminat dengan produk *${itemName}* yang stoknya habis di website. Kapan ready stock kembali?`;
    window.open(`https://wa.me/${window.RAO_DATA.config.sellerPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // --- Render Events (Open Trip & Workshop) ---
  function renderEvents() {
    if (!dom.eventsList) return;
    const { events } = window.RAO_DATA;
    const filtered = events.filter(e => {
      const matchCat = state.activeEventCategory === 'Semua' || e.category === state.activeEventCategory;
      return matchCat;
    });

    if (filtered.length === 0) {
      dom.eventsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p>Belum ada jadwal open trip di kategori ini.</p>
        </div>
      `;
      return;
    }

    dom.eventsList.innerHTML = filtered.map((e, idx) => {
      const parts = e.date.split(' ');
      const day = parts[0] || '17';
      const month = parts[1] || 'Okt';

      return `
        <div class="event-card reveal-on-scroll reveal-delay-${(idx % 3) + 1}">
          <div class="event-card-img">
            <img src="${e.image}" alt="${e.title}" loading="lazy" />
            <div class="event-date-badge">
              <div class="day">${day}</div>
              <div class="month">${month}</div>
            </div>
          </div>
          <div class="event-card-body">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="card-category">${e.category}</span>
                  ${e.altitude ? `<span class="mdpl-badge">⛰️ ${e.altitude}</span>` : ''}
                  ${e.difficulty ? `<span class="difficulty-badge ${e.difficultyClass || 'diff-badge-easy'}">${e.difficulty}</span>` : ''}
                </div>
                <span style="font-size: 0.8rem; font-weight: 800; color: var(--accent-secondary);">${e.status}</span>
              </div>
              <h3 style="font-size: 1.35rem; margin-bottom: 0.85rem;">${e.title}</h3>
              
              <div class="event-meta">
                <div class="event-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>${e.time}</span>
                </div>
                <div class="event-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>${e.location}</span>
                </div>
                <div class="event-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span>${e.speaker}</span>
                </div>
              </div>

              <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${e.description}</p>
            </div>

            <div class="event-footer-row">
              <div>
                <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Biaya Trip / Orang</span>
                <span style="font-size: 1.35rem; font-weight: 900; color: var(--text-primary);">
                  ${e.price === 0 ? 'GRATIS' : formatRupiah(e.price)}
                </span>
                ${e.originalPrice && e.price > 0 ? `<span class="original-price" style="margin-left: 0.4rem;">${formatRupiah(e.originalPrice)}</span>` : ''}
              </div>

              <div style="display: flex; gap: 0.6rem;">
                <button class="btn btn-secondary btn-sm" onclick="RAO.openEventModal('${e.id}')">
                  Itinerary & Fasilitas
                </button>
                <button class="btn btn-primary btn-sm" onclick="RAO.openEventModal('${e.id}', true)">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                  Booking Slot Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    setupScrollReveal();
  }

  // --- Render Testimonials ---
  function renderTestimonials() {
    if (!dom.testimonialsGrid || !window.RAO_DATA.testimonials) return;
    dom.testimonialsGrid.innerHTML = window.RAO_DATA.testimonials.map(t => `
      <div class="testi-card reveal-on-scroll">
        <div>
          <div class="testi-stars">
            ${'★'.repeat(t.rating)}
          </div>
          <p class="testi-comment">"${t.comment}"</p>
        </div>
        <div class="testi-user">
          <img src="${t.avatar}" alt="${t.name}" class="testi-avatar" loading="lazy" />
          <div class="testi-info">
            <h5>${t.name}</h5>
            <p>${t.role}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- Render FAQs ---
  function renderFaqs() {
    if (!dom.faqList || !window.RAO_DATA.faqs) return;
    dom.faqList.innerHTML = window.RAO_DATA.faqs.map((f, idx) => `
      <div class="faq-item reveal-on-scroll ${idx === 0 ? 'active' : ''}">
        <button class="faq-question" onclick="RAO.toggleFaq(this)">
          <span>${f.q}</span>
          <svg class="faq-icon-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="faq-answer" style="${idx === 0 ? 'max-height: 200px;' : ''}">
          <div class="faq-answer-inner">
            ${f.a}
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- FAQ Accordion Toggle ---
  function toggleFaq(buttonEl) {
    const parent = buttonEl.closest('.faq-item');
    const answer = parent.querySelector('.faq-answer');
    const isActive = parent.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      const ans = item.querySelector('.faq-answer');
      if (ans) ans.style.maxHeight = null;
    });

    if (!isActive) {
      parent.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

  // --- Modal Management ---
  function openModal(htmlContent) {
    if (!dom.detailModalContent || !dom.detailModalOverlay) return;
    dom.detailModalContent.innerHTML = htmlContent;
    dom.detailModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!dom.detailModalOverlay) return;
    dom.detailModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- Product Modal Detail ---
  function openProductModal(productId) {
    const product = window.RAO_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const isAvailable = product.inStock !== false && product.stockCount > 0;
    const stockBadge = isAvailable
      ? `<span class="card-badge-tag badge-bestseller" style="position: static;">Stok: ${product.stockCount} Pcs</span>`
      : `<span class="card-badge-tag" style="position: static; background: #ef4444;">Stok Habis</span>`;

    const html = `
      <div class="modal-detail-grid">
        <div>
          <img src="${product.image}" alt="${product.name}" class="modal-gallery-img" />
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${stockBadge}
            <span class="card-badge-tag badge-promo" style="position: static;">Terjual ${product.sold || 100}+ Unit</span>
          </div>
        </div>
        <div>
          <span class="card-category">${product.category}</span>
          <h2 style="font-size: 1.6rem; margin-bottom: 0.6rem;">${product.name}</h2>
          
          <div class="card-price-row" style="margin-bottom: 1rem;">
            <span class="current-price" style="font-size: 1.6rem;">${formatRupiah(product.price)}</span>
            ${product.originalPrice ? `<span class="original-price">${formatRupiah(product.originalPrice)}</span>` : ''}
          </div>

          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.2rem;">
            ${product.fullDesc}
          </p>

          <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Spesifikasi Gear:</h4>
          <ul class="spec-list">
            ${product.specs.map(s => `<li>${s}</li>`).join('')}
          </ul>

          <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.8rem; flex-wrap: wrap;">
            ${isAvailable ? `
              <button class="btn btn-primary" onclick="RAO.addToCart('product', '${product.id}'); RAO.closeModal();">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                + Tambah ke Keranjang
              </button>
              <button class="btn btn-whatsapp" onclick="RAO.orderViaWhatsApp('product', '${product.id}')">
                Pesan via WhatsApp Basecamp
              </button>
            ` : `
              <button class="btn btn-disabled" disabled>Stok Habis</button>
              <button class="btn btn-whatsapp" onclick="RAO.askRestockWhatsApp('product', '${product.name}')">
                Tanya Restock via WhatsApp
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    openModal(html);
  }

  // --- Rental Modal Detail & Calculator ---
  function openRentalModal(rentalId, autoFocusBooking = false) {
    const rental = window.RAO_DATA.rentals.find(r => r.id === rentalId);
    if (!rental) return;
    state.rentalBookingModalDays = state.rentalCardDaysMap[rentalId] || 1;

    const initialTotal = calculateRentalCost(rental.dailyPrice, rental.weeklyPrice, state.rentalBookingModalDays);
    const isAvailable = rental.inStock !== false && rental.stockCount > 0;

    const html = `
      <div class="modal-detail-grid">
        <div>
          <img src="${rental.image}" alt="${rental.name}" class="modal-gallery-img" />
          <div style="margin-top: 1.2rem; background: var(--bg-card); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <h5 style="font-size: 0.9rem; color: var(--accent-primary); margin-bottom: 0.3rem;">Syarat Jaminan Sewa:</h5>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${rental.depositInfo}</p>
          </div>
        </div>
        <div>
          <span class="card-category">${rental.category}</span>
          <h2 style="font-size: 1.6rem; margin-bottom: 0.6rem;">${rental.name}</h2>
          
          <div class="card-price-row" style="margin-bottom: 1rem;">
            <div>
              <span class="current-price" style="font-size: 1.5rem;">${formatRupiah(rental.dailyPrice)}</span>
              <span class="price-unit">/ Hari (24 Jam)</span>
            </div>
            <div style="margin-left: 1.5rem;">
              <span style="font-weight: 800; color: var(--accent-secondary);">${formatRupiah(rental.weeklyPrice)}</span>
              <span class="price-unit">/ Minggu</span>
            </div>
          </div>

          <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 1.2rem;">
            ${rental.shortDesc}
          </p>

          <h4 style="font-size: 1rem; margin-bottom: 0.4rem;">Kelengkapan Paket Sewa:</h4>
          <ul class="spec-list" style="margin-bottom: 1rem;">
            ${rental.includes.map(item => `<li>${item}</li>`).join('')}
          </ul>

          <!-- Interactive Booking Calculator in Modal -->
          <div style="background: var(--bg-input); padding: 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 1.2rem;">
            <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem; color: var(--accent-primary);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Hitung Estimasi Sewa & Tanggal:
            </h4>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 0.8rem;">
              <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">Tanggal Ambil Alat:</label>
                <input type="date" id="rentalStartDate" class="form-control" style="padding: 0.5rem;" value="${new Date().toISOString().split('T')[0]}" />
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">Jumlah Hari Sewa:</label>
                <div class="counter-box" style="width: 100%; justify-content: space-between;">
                  <button class="counter-btn" onclick="RAO.updateModalRentalDuration(-1, '${rental.id}')">-</button>
                  <span class="counter-value" id="rentalDurationVal">${state.rentalBookingModalDays}</span>
                  <button class="counter-btn" onclick="RAO.updateModalRentalDuration(1, '${rental.id}')">+</button>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.6rem; border-top: 1px solid var(--border-color);">
              <span style="font-size: 0.88rem; color: var(--text-secondary);">Total Biaya Sewa:</span>
              <span id="rentalCalcTotal" style="font-size: 1.3rem; font-weight: 900; color: var(--accent-primary);">${formatRupiah(initialTotal)}</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.8rem; margin-top: 1.5rem; flex-wrap: wrap;">
            ${isAvailable ? `
              <button class="btn btn-primary" onclick="RAO.addRentalModalToCart('${rental.id}'); RAO.closeModal();">
                + Masukkan ke Jadwal Sewa
              </button>
              <button class="btn btn-whatsapp" onclick="RAO.bookRentalViaWhatsApp('${rental.id}')">
                Booking ke Basecamp via WA
              </button>
            ` : `
              <button class="btn btn-disabled" disabled>Sedang Disewa Semua</button>
              <button class="btn btn-whatsapp" onclick="RAO.askRestockWhatsApp('rental', '${rental.name}')">
                Tanya Jadwal Antrian WA
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    openModal(html);
  }

  function updateModalRentalDuration(delta, rentalId) {
    const rental = window.RAO_DATA.rentals.find(r => r.id === rentalId);
    if (!rental) return;

    state.rentalBookingModalDays = Math.max(1, state.rentalBookingModalDays + delta);
    const durationEl = document.getElementById('rentalDurationVal');
    const totalEl = document.getElementById('rentalCalcTotal');
    const total = calculateRentalCost(rental.dailyPrice, rental.weeklyPrice, state.rentalBookingModalDays);

    if (durationEl) durationEl.innerText = state.rentalBookingModalDays;
    if (totalEl) totalEl.innerText = formatRupiah(total);
  }

  function addRentalModalToCart(rentalId) {
    const rental = window.RAO_DATA.rentals.find(r => r.id === rentalId);
    if (!rental) return;

    if (rental.inStock === false || rental.stockCount <= 0) {
      alert('Maaf, alat ini sedang habis/sedang disewa.');
      return;
    }

    const startDateEl = document.getElementById('rentalStartDate');
    const startDate = startDateEl ? startDateEl.value : new Date().toISOString().split('T')[0];
    const days = state.rentalBookingModalDays || 1;
    const totalCost = calculateRentalCost(rental.dailyPrice, rental.weeklyPrice, days);

    state.cart.push({
      type: 'rental',
      id: rental.id + '-' + Date.now(),
      rentalId: rental.id,
      name: rental.name,
      price: totalCost,
      dailyPrice: rental.dailyPrice,
      weeklyPrice: rental.weeklyPrice,
      days: days,
      startDate: startDate,
      image: rental.image,
      category: rental.category,
      qty: 1
    });

    saveCart();
    showToast(`"${rental.name}" (${days} Hari - ${formatRupiah(totalCost)}) masuk keranjang!`);
  }

  // --- Event Modal Detail & Registration ---
  function openEventModal(eventId, autoFocusRegister = false) {
    const event = window.RAO_DATA.events.find(e => e.id === eventId);
    if (!event) return;

    const html = `
      <div>
        <div style="position: relative; height: 210px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem;">
          <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(11, 17, 24, 0.95) 0%, rgba(11, 17, 24, 0.2) 100%);"></div>
          <div style="position: absolute; bottom: 1rem; left: 1.5rem; right: 1.5rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.4rem;">
              <span class="card-category" style="color: #fff; background: var(--accent-primary); padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.75rem;">${event.category}</span>
              ${event.altitude ? `<span class="mdpl-badge" style="color:#fff; border-color:#fff;">⛰️ ${event.altitude}</span>` : ''}
            </div>
            <h2 style="font-size: 1.45rem; color: #fff;">${event.title}</h2>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2rem;">
          <div>
            <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem; color: var(--accent-primary);">Deskripsi Pendakian:</h4>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.2rem;">
              ${event.description}
            </p>

            <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Fasilitas Termasuk:</h4>
            <ul class="spec-list" style="margin-bottom: 1.4rem;">
              ${event.facilities.map(f => `<li>${f}</li>`).join('')}
            </ul>

            <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Itinerary & Rundown:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem;">
              ${event.agenda.map(a => `<li style="font-size: 0.88rem; color: var(--text-secondary);">🏔️ ${a}</li>`).join('')}
            </ul>
          </div>

          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem;">
            <h4 style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--accent-secondary);">Form Pendaftaran Slot:</h4>
            
            <div class="form-group">
              <label class="form-label">Nama Lengkap Peserta</label>
              <input type="text" id="eventRegName" class="form-control" placeholder="Nama Peserta / Pendaki" required />
            </div>

            <div class="form-group">
              <label class="form-label">Nomor WhatsApp Aktif</label>
              <input type="tel" id="eventRegPhone" class="form-control" placeholder="08123456789" required />
            </div>

            <div class="form-group">
              <label class="form-label">Jumlah Orang / Slot</label>
              <select id="eventRegQty" class="form-control" onchange="RAO.updateEventTotal(${event.price})">
                <option value="1">1 Orang (${event.price === 0 ? 'Gratis' : formatRupiah(event.price)})</option>
                <option value="2">2 Orang (${event.price === 0 ? 'Gratis' : formatRupiah(event.price * 2)})</option>
                <option value="3">3 Orang (${event.price === 0 ? 'Gratis' : formatRupiah(event.price * 3)})</option>
                <option value="4">4 Orang (1 Grup Tenda)</option>
              </select>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: baseline; margin: 1.2rem 0; padding-top: 0.8rem; border-top: 1px solid var(--border-color);">
              <span style="font-weight: 700; color: var(--text-secondary);">Total Biaya:</span>
              <span id="eventRegTotal" style="font-size: 1.35rem; font-weight: 900; color: var(--accent-primary);">${event.price === 0 ? 'GRATIS' : formatRupiah(event.price)}</span>
            </div>

            <button class="btn btn-whatsapp btn-block" onclick="RAO.submitEventRegistration('${event.id}')">
              Konfirmasi Slot ke WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;

    openModal(html);
  }

  function updateEventTotal(pricePerTicket) {
    const qtyEl = document.getElementById('eventRegQty');
    const totalEl = document.getElementById('eventRegTotal');
    if (!qtyEl || !totalEl) return;
    const qty = parseInt(qtyEl.value, 10);
    totalEl.innerText = pricePerTicket === 0 ? 'GRATIS' : formatRupiah(pricePerTicket * qty);
  }

  function submitEventRegistration(eventId) {
    const event = window.RAO_DATA.events.find(e => e.id === eventId);
    const nameEl = document.getElementById('eventRegName');
    const phoneEl = document.getElementById('eventRegPhone');
    const qtyEl = document.getElementById('eventRegQty');

    if (!nameEl || !nameEl.value.trim()) {
      alert('Mohon masukkan nama lengkap peserta.');
      nameEl && nameEl.focus();
      return;
    }
    if (!phoneEl || !phoneEl.value.trim()) {
      alert('Mohon masukkan nomor WhatsApp peserta.');
      phoneEl && phoneEl.focus();
      return;
    }

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const qty = qtyEl ? qtyEl.value : '1';
    const total = event.price === 0 ? 'GRATIS' : formatRupiah(event.price * parseInt(qty, 10));

    const msg = `Halo Basecamp RAO Adventure Gear, saya ingin mendaftar trip:\n\n` +
      `🏔️ *Trip:* ${event.title}\n` +
      `⛰️ *Ketinggian:* ${event.altitude || '-'}\n` +
      `📅 *Tanggal:* ${event.date}\n` +
      `📍 *Meeting Point:* ${event.location}\n` +
      `👤 *Nama Peserta:* ${name}\n` +
      `📱 *No. WhatsApp:* ${phone}\n` +
      `👥 *Jumlah Slot:* ${qty} Orang\n` +
      `💰 *Total Biaya:* ${total}\n\n` +
      `Mohon info ketersediaan slot dan instruksi pembayaran DP. Terima kasih! Salam Lestari!`;

    window.open(`https://wa.me/${window.RAO_DATA.config.sellerPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
    showToast('Pendaftaran slot trip berhasil diteruskan ke Basecamp!');
  }

  // --- Cart System (Products & Rentals) ---
  function saveCart() {
    localStorage.setItem('rao_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(type, id) {
    if (type === 'product') {
      const product = window.RAO_DATA.products.find(p => p.id === id);
      if (!product) return;

      if (product.inStock === false || product.stockCount <= 0) {
        alert('Maaf, produk ini sedang habis.');
        return;
      }

      const existingIndex = state.cart.findIndex(item => item.id === id && item.type === 'product');
      if (existingIndex > -1) {
        state.cart[existingIndex].qty += 1;
      } else {
        state.cart.push({
          type: 'product',
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          qty: 1
        });
      }
      saveCart();
      showToast(`"${product.name}" dimasukkan ke keranjang!`);
    }
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
    saveCart();
  }

  function updateCartItemQty(index, delta) {
    if (!state.cart[index]) return;
    state.cart[index].qty += delta;
    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
  }

  function updateCartRentalDays(index, delta) {
    const item = state.cart[index];
    if (!item || item.type !== 'rental') return;
    item.days = Math.max(1, item.days + delta);
    item.price = calculateRentalCost(item.dailyPrice, item.weeklyPrice || (item.dailyPrice * 6), item.days);
    saveCart();
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (dom.cartBadge) {
      dom.cartBadge.innerText = totalCount;
      dom.cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    if (!dom.cartItemsList) return;

    if (state.cart.length === 0) {
      dom.cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🎒</div>
          <p style="font-weight: 700; font-size: 1.05rem;">Keranjang Anda masih kosong</p>
          <p style="font-size: 0.85rem; margin-top: 0.4rem;">Silakan jelajahi katalog gear atau persewaan tenda kami.</p>
        </div>
      `;
      if (dom.cartTotalVal) dom.cartTotalVal.innerText = 'Rp 0';
      if (dom.cartCheckoutBtn) dom.cartCheckoutBtn.disabled = true;
      return;
    }

    if (dom.cartCheckoutBtn) dom.cartCheckoutBtn.disabled = false;

    let subtotal = 0;
    dom.cartItemsList.innerHTML = state.cart.map((item, idx) => {
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;

      const durationControl = item.type === 'rental'
        ? `
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.35rem; font-size: 0.8rem; color: var(--accent-primary);">
            <span>📅 Durasi:</span>
            <div class="counter-box" style="transform: scale(0.8); transform-origin: left center;">
              <button class="counter-btn" onclick="RAO.updateCartRentalDays(${idx}, -1)">-</button>
              <span class="counter-value">${item.days}h</span>
              <button class="counter-btn" onclick="RAO.updateCartRentalDays(${idx}, 1)">+</button>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">(Tgl: ${item.startDate})</span>
          </div>
        `
        : `<span style="font-size: 0.78rem; color: var(--text-muted);">Beli Gear Baru</span>`;

      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <div style="display: flex; justify-content: space-between;">
              <span class="cart-item-type">${item.category}</span>
              <button class="cart-item-remove" onclick="RAO.removeFromCart(${idx})">✕</button>
            </div>
            <h4 class="cart-item-title">${item.name}</h4>
            ${durationControl}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <span class="cart-item-price">${formatRupiah(itemSubtotal)}</span>
              <div class="counter-box" style="transform: scale(0.85); transform-origin: right center;">
                <button class="counter-btn" onclick="RAO.updateCartItemQty(${idx}, -1)">-</button>
                <span class="counter-value">${item.qty}</span>
                <button class="counter-btn" onclick="RAO.updateCartItemQty(${idx}, 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (dom.cartTotalVal) dom.cartTotalVal.innerText = formatRupiah(subtotal);
  }

  function openCartDrawer() {
    if (!dom.cartOverlay) return;
    dom.cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (!dom.cartOverlay) return;
    dom.cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- Checkout via WhatsApp (Multi-item Invoice Builder) ---
  function checkoutViaWhatsApp() {
    if (state.cart.length === 0) return;

    let subtotal = 0;
    let itemsText = '';

    state.cart.forEach((item, i) => {
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;

      if (item.type === 'rental') {
        itemsText += `${i + 1}. [SEWA ALAT] *${item.name}*\n` +
                     `   - Durasi: ${item.days} Hari (Tgl Ambil: ${item.startDate})\n` +
                     `   - Jumlah: ${item.qty} Unit\n` +
                     `   - Biaya: ${formatRupiah(itemSubtotal)}\n\n`;
      } else {
        itemsText += `${i + 1}. [BELI GEAR] *${item.name}*\n` +
                     `   - Jumlah: ${item.qty} pcs\n` +
                     `   - Biaya: ${formatRupiah(itemSubtotal)}\n\n`;
      }
    });

    const msg = `Halo Basecamp RAO Adventure Gear (Never Ending Adventure), saya ingin melakukan pemesanan via web:\n\n` +
      `🎒 *DAFTAR ITEM / SEWA:*\n` +
      itemsText +
      `💰 *TOTAL ESTIMASI:* ${formatRupiah(subtotal)}\n\n` +
      `Mohon info ketersediaan stok/unit dan metode pembayaran. Terima kasih! Salam Lestari!`;

    window.open(`https://wa.me/${window.RAO_DATA.config.sellerPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // --- Direct WhatsApp Order for Single Product / Rental ---
  function orderViaWhatsApp(type, id) {
    if (type === 'product') {
      const product = window.RAO_DATA.products.find(p => p.id === id);
      if (!product) return;
      const msg = `Halo Basecamp RAO Adventure Gear, saya tertarik ingin memesan produk:\n\n` +
        `📦 *Gear:* ${product.name}\n` +
        `💵 *Harga:* ${formatRupiah(product.price)}\n\n` +
        `Apakah stok masih tersedia dan bisa dikirim hari ini? Salam Lestari!`;
      window.open(`https://wa.me/${window.RAO_DATA.config.sellerPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  }

  function bookRentalViaWhatsApp(rentalId) {
    const rental = window.RAO_DATA.rentals.find(r => r.id === rentalId);
    if (!rental) return;
    const startDateEl = document.getElementById('rentalStartDate');
    const startDate = startDateEl ? startDateEl.value : 'Hari Ini';
    const days = state.rentalBookingModalDays || 1;
    const total = calculateRentalCost(rental.dailyPrice, rental.weeklyPrice, days);

    const msg = `Halo Basecamp RAO Adventure Gear, saya ingin booking sewa alat camping:\n\n` +
      `⛺ *Alat:* ${rental.name}\n` +
      `📅 *Mulai Ambil:* ${startDate}\n` +
      `⏳ *Durasi:* ${days} Hari\n` +
      `💰 *Estimasi Biaya:* ${formatRupiah(total)}\n\n` +
      `Mohon info ketersediaan unit dan kelengkapan jaminannya. Terima kasih! Salam Lestari!`;

    window.open(`https://wa.me/${window.RAO_DATA.config.sellerPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // --- Scroll Reveal System (Native Observer Animation) ---
  function setupScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => observer.observe(el));
  }

  // --- Scroll Spy & Sticky Navbar ---
  function setupScrollSpy() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        dom.navbar && dom.navbar.classList.add('scrolled');
      } else {
        dom.navbar && dom.navbar.classList.remove('scrolled');
      }

      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  // --- Global Event Listeners ---
  function setupEventListeners() {
    // Theme Toggle
    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    // Hamburger Mobile Menu
    if (dom.hamburgerBtn && dom.navMenu) {
      dom.hamburgerBtn.addEventListener('click', () => {
        dom.navMenu.classList.toggle('open');
      });
      dom.navLinks.forEach(link => {
        link.addEventListener('click', () => dom.navMenu.classList.remove('open'));
      });
    }

    // Cart Open / Close
    if (dom.cartTriggerBtn) dom.cartTriggerBtn.addEventListener('click', openCartDrawer);
    if (dom.cartCloseBtn) dom.cartCloseBtn.addEventListener('click', closeCartDrawer);
    if (dom.cartOverlay) {
      dom.cartOverlay.addEventListener('click', (e) => {
        if (e.target === dom.cartOverlay) closeCartDrawer();
      });
    }
    if (dom.cartCheckoutBtn) dom.cartCheckoutBtn.addEventListener('click', checkoutViaWhatsApp);

    // Modal Close
    if (dom.detailModalCloseBtn) dom.detailModalCloseBtn.addEventListener('click', closeModal);
    if (dom.detailModalOverlay) {
      dom.detailModalOverlay.addEventListener('click', (e) => {
        if (e.target === dom.detailModalOverlay) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeCartDrawer();
      }
    });

    // Product Category Filters
    if (dom.productCategoryPills) {
      dom.productCategoryPills.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        dom.productCategoryPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeProductCategory = pill.dataset.category;
        renderProducts();
      });
    }

    // Product Search Input
    if (dom.productSearchInput) {
      dom.productSearchInput.addEventListener('input', (e) => {
        state.productSearch = e.target.value;
        renderProducts();
      });
    }

    // Product Stock Filter Button
    if (dom.productStockFilterBtn) {
      dom.productStockFilterBtn.addEventListener('click', () => {
        state.onlyReadyProducts = !state.onlyReadyProducts;
        dom.productStockFilterBtn.classList.toggle('active', state.onlyReadyProducts);
        renderProducts();
      });
    }

    // Rental Category Filters
    if (dom.rentalCategoryPills) {
      dom.rentalCategoryPills.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        dom.rentalCategoryPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeRentalCategory = pill.dataset.category;
        renderRentals();
      });
    }

    // Rental Search Input
    if (dom.rentalSearchInput) {
      dom.rentalSearchInput.addEventListener('input', (e) => {
        state.rentalSearch = e.target.value;
        renderRentals();
      });
    }

    // Rental Stock Filter Button
    if (dom.rentalStockFilterBtn) {
      dom.rentalStockFilterBtn.addEventListener('click', () => {
        state.onlyReadyRentals = !state.onlyReadyRentals;
        dom.rentalStockFilterBtn.classList.toggle('active', state.onlyReadyRentals);
        renderRentals();
      });
    }

    // Event Category Filters
    if (dom.eventCategoryPills) {
      dom.eventCategoryPills.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        dom.eventCategoryPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeEventCategory = pill.dataset.category;
        renderEvents();
      });
    }

    // Contact Form Handler
    if (dom.contactForm) {
      dom.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const category = document.getElementById('contactCategory').value;
        const message = document.getElementById('contactMessage').value.trim();

        const waText = `Halo Basecamp RAO Adventure Gear (Never Ending Adventure):\n\n` +
          `👤 *Nama:* ${name}\n` +
          `📧 *Kontak/Email:* ${email}\n` +
          `🏷 *Kategori:* ${category}\n` +
          `💬 *Pesan/Rencana:* ${message}`;

        window.open(`https://wa.me/${window.RAO_DATA.config.sellerPhone}?text=${encodeURIComponent(waText)}`, '_blank');
        dom.contactForm.reset();
        showToast('Pesan berhasil diteruskan ke WhatsApp Basecamp!');
      });
    }
  }

  // --- Global Public API Exposure ---
  window.RAO = {
    openProductModal,
    openRentalModal,
    openEventModal,
    closeModal,
    addToCart,
    selectCardRentalDays,
    addRentalFromCard,
    addRentalModalToCart,
    updateModalRentalDuration,
    updateCartRentalDays,
    toggleChecklistItem,
    askRestockWhatsApp,
    removeFromCart,
    updateCartItemQty,
    openCartDrawer,
    closeCartDrawer,
    checkoutViaWhatsApp,
    orderViaWhatsApp,
    bookRentalViaWhatsApp,
    updateEventTotal,
    submitEventRegistration,
    toggleFaq,
    showToast
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
