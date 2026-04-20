/**
 * MaidanMind — Main Application Controller
 * ==========================================
 * Handles all app logic: navigation, venue selection, real-time data,
 * AI chat (Gemini), virtual queue, maps, safety, and i18n.
 * 
 * Architecture: Single-page app with tab-based navigation.
 * State is managed via the global MaidanMind object.
 */

/* ===== GLOBAL STATE ===== */
window.MaidanMind = {
  currentLanguage: 'en',
  currentVenue: null,
  crowdData: null,
  activeTokens: [],
  tokenCounter: 0,
  chatHistory: [],
  refreshTimer: null,
  sosTimer: null,
  sosHoldStart: null
};

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
});

function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      initApp();
    }, 500);
  }, 2200);
}

function initApp() {
  renderVenueGrid();
  initLanguageModal();
  initAccessibilityModal();
  initTabNavigation();
  initChatForm();
  initSOSButton();
  initQueueTabs();
  initMapFilters();
  updateI18n();

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.error("Service Worker registration failed:", err));
  }
}

/* ===== VENUE SELECTION ===== */
function renderVenueGrid() {
  const grid = document.getElementById('venue-grid');
  grid.innerHTML = '';

  Object.entries(VENUES).forEach(([id, venue]) => {
    const match = MATCHES[id];
    const card = document.createElement('button');
    card.className = 'venue-card';
    card.setAttribute('aria-label', `${venue.name}, ${venue.city}`);
    card.innerHTML = `
      ${match ? '<span class="venue-card-live">● LIVE</span>' : ''}
      <div class="venue-card-emoji">${venue.image}</div>
      <div class="venue-card-name">${venue.name}</div>
      <div class="venue-card-city">${venue.city}, ${venue.state}</div>
      <div class="venue-card-capacity">${(venue.capacity).toLocaleString('en-IN')} capacity</div>
    `;
    card.addEventListener('click', () => selectVenue(id));
    grid.appendChild(card);
  });
}

function selectVenue(venueId) {
  const state = window.MaidanMind;
  state.currentVenue = venueId;
  state.crowdData = generateCrowdData(venueId);

  // Hide venue selector, show main content
  document.getElementById('venue-selector').classList.remove('active');
  document.getElementById('venue-selector').style.display = 'none';
  document.getElementById('main-content').classList.remove('hidden');
  document.getElementById('tab-bar').classList.remove('hidden');

  // Render match bar
  renderMatchBar();
  
  // Render all tab content
  renderHomeTab();
  renderMapTab();
  renderQueueTab();
  renderChatWelcome();
  renderSafetyTab();

  // Start real-time refresh
  startDataRefresh();

  // Show a toast
  showToast('🏟️', `Welcome to ${VENUES[venueId].name}!`);
}

function handleBackNavigation() {
  const activeTabBtn = document.querySelector('.tab-btn.active');
  if (activeTabBtn && activeTabBtn.dataset.tab !== 'home') {
    // Return to the stadium page (home dashboard) from a feature
    switchTab('home');
  } else {
    // Return to the main homepage (venue selector)
    goBackToVenueSelector();
  }
}

function goBackToVenueSelector() {
  const state = window.MaidanMind;
  state.currentVenue = null;
  state.crowdData = null;
  state.activeTokens = [];
  
  if (state.refreshTimer) clearInterval(state.refreshTimer);

  document.getElementById('venue-selector').style.display = '';
  document.getElementById('venue-selector').classList.add('active');
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('tab-bar').classList.add('hidden');

  // Reset to home tab
  switchTab('home');
}

/* ===== MATCH BAR ===== */
function renderMatchBar() {
  const state = window.MaidanMind;
  const venue = VENUES[state.currentVenue];
  const match = MATCHES[state.currentVenue];
  const info = document.getElementById('match-bar-info');

  if (match) {
    info.innerHTML = `
      <span>${match.team1Short} <span class="score">${match.score.team1}</span></span>
      ${match.score.team2 !== '-' ? `<span> vs ${match.team2Short} <span class="score">${match.score.team2}</span></span>` : ''}
      <span style="color: var(--text-tertiary); margin-left: 8px;">Ov ${match.overs}</span>
    `;
  } else {
    info.textContent = venue.name;
  }

  // Remove existing listener to prevent duplicates if re-rendering, or just assign onclick
  document.getElementById('btn-back-venue').onclick = handleBackNavigation;
}

/* ===== REAL-TIME DATA REFRESH ===== */
function startDataRefresh() {
  const state = window.MaidanMind;
  if (state.refreshTimer) clearInterval(state.refreshTimer);

  state.refreshTimer = setInterval(() => {
    if (!state.currentVenue) return;
    state.crowdData = generateCrowdData(state.currentVenue);
    
    // Update only the active tab to save resources
    const activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab) return;
    
    const tab = activeTab.dataset.tab;
    if (tab === 'home') renderHomeTab();
    else if (tab === 'map') updateMapData();
    else if (tab === 'queue') updateQueueWaitTimes();
    else if (tab === 'safety') renderSafetyTab();
    
    // Update token timers
    updateTokenTimers();
  }, CONFIG.APP.refreshInterval);
}

/* ===== TAB NAVIGATION ===== */
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabName) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });
  // Refresh data for the new tab
  const state = window.MaidanMind;
  if (state.currentVenue && state.crowdData) {
    if (tabName === 'home') renderHomeTab();
    else if (tabName === 'map') renderMapTab();
    else if (tabName === 'queue') renderQueueTab();
    else if (tabName === 'safety') renderSafetyTab();
  }
}

/* ===== HOME TAB RENDERING ===== */
function renderHomeTab() {
  const state = window.MaidanMind;
  if (!state.crowdData) return;
  const data = state.crowdData;
  const match = data.match;

  // Quick Stats
  const fastestGate = [...data.gates].sort((a, b) => a.waitTime - b.waitTime)[0];
  const statsHtml = `
    <div class="stat-card saffron">
      <div class="stat-icon">👥</div>
      <div class="stat-value">${data.overall.density}%</div>
      <div class="stat-label">${t('crowdStatus')}</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-icon">🌡️</div>
      <div class="stat-value">${data.weather.temp}°C</div>
      <div class="stat-label">${t('temperature')}</div>
    </div>
    <div class="stat-card green">
      <div class="stat-icon">🚪</div>
      <div class="stat-value">${fastestGate.waitTime}m</div>
      <div class="stat-label">${fastestGate.name}</div>
    </div>
  `;
  document.getElementById('quick-stats').innerHTML = statsHtml;

  // Smart Tip (Sport-Context Prediction Engine)
  generateSmartTip(data);

  // Sections Grid
  const sectionsHtml = data.sections.map(section => {
    const statusClass = section.status;
    const badgeClass = `badge-${statusClass}`;
    const barClass = `bar-${statusClass}`;
    return `
      <div class="section-card" onclick="showSectionDetail('${section.id}')">
        <div class="section-card-header">
          <span class="section-card-name">${section.name}</span>
          <span class="section-card-badge ${badgeClass}">${section.density}%</span>
        </div>
        <div class="section-card-bar">
          <div class="section-card-bar-fill ${barClass}" style="width: ${section.density}%"></div>
        </div>
        <div class="section-card-info">
          <span>${section.currentCount.toLocaleString('en-IN')} fans</span>
          <span>${Math.round(section.temperature)}°C</span>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('sections-grid').innerHTML = sectionsHtml;

  // Gates List
  const sortedGates = [...data.gates].sort((a, b) => a.waitTime - b.waitTime);
  const gatesHtml = sortedGates.map((gate, i) => {
    const iconClass = gate.status;
    const isRecommended = i === 0;
    return `
      <div class="gate-card${isRecommended ? ' gate-recommended' : ''}">
        <div class="gate-card-left">
          <div class="gate-icon ${iconClass}">🚪</div>
          <div>
            <div class="gate-name">${gate.name}</div>
            <div class="gate-direction">${gate.direction} · ${gate.queueLength} in queue</div>
          </div>
        </div>
        <div class="gate-wait">
          <div class="gate-wait-time" style="color: ${gate.status === 'critical' ? 'var(--accent-red)' : gate.status === 'busy' ? 'var(--accent-gold)' : 'var(--accent-green)'}">${gate.waitTime} ${t('minutes')}</div>
          <div class="gate-wait-label">${t('waitTime')}</div>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('gates-list').innerHTML = gatesHtml;

  // Exit Plan
  renderExitPlan(data);
}

function generateSmartTip(data) {
  const match = data.match;
  const tipEl = document.getElementById('smart-tip-text');
  
  if (!match) {
    tipEl.textContent = 'No live match data available.';
    return;
  }

  const tips = [];
  const nextEvent = match.nextEvent;

  // Sport-context predictions
  if (nextEvent) {
    if (nextEvent.type === 'strategic_timeout' && nextEvent.inMinutes <= 10) {
      tips.push(`⏰ Strategic timeout in ~${nextEvent.inMinutes} min! Food stall queues will spike 4x. Get your virtual token NOW or wait 20+ min.`);
    }
    if (nextEvent.type === 'innings_break' && nextEvent.inMinutes <= 25) {
      tips.push(`🍕 Innings break coming in ~${nextEvent.inMinutes} min! Pre-order food now to skip the 20-min rush. Use Virtual Queue tab.`);
    }
    if (nextEvent.type === 'drinks_break' && nextEvent.inMinutes <= 5) {
      tips.push(`🥤 Drinks break in ~${nextEvent.inMinutes} min! Quick 2-min window — perfect for a restroom sprint. Block ${data.restrooms.sort((a,b) => a.waitTime - b.waitTime)[0]?.section || 'C'} has shortest wait.`);
    }
    if (nextEvent.type === 'match_end' && nextEvent.inMinutes <= 10) {
      tips.push(`🏁 Match ending in ~${nextEvent.inMinutes} min! Head to ${data.gates.sort((a,b) => a.waitTime - b.waitTime)[0]?.name || 'Gate D'} now to beat the 70% crowd rush.`);
    }
    if (nextEvent.type === 'powerplay_end') {
      tips.push(`🏏 Powerplay just ended! Attention dips now — great time for a quick food run. Restrooms are also less crowded.`);
    }
  }

  // Tense match — nobody moves
  if (match.requiredRate && match.requiredRate > 10 && parseFloat(match.overs) > 16) {
    tips.push(`😰 Tense chase! Nobody's moving — restrooms are EMPTY right now. Perfect time to go if you need to!`);
  }

  // Heat warning
  if (data.weather.temp >= 38) {
    tips.push(`🌡️ Temperature is ${data.weather.temp}°C! Stay hydrated. Nearest cooling zone & free water at the concourse area.`);
  }

  // High crowd density
  const criticalSections = data.sections.filter(s => s.density > 90);
  if (criticalSections.length > 0) {
    tips.push(`⚠️ ${criticalSections[0].name} is at ${criticalSections[0].density}% capacity — avoid that area. ${data.sections.sort((a,b) => a.density - b.density)[0].name} is the least crowded.`);
  }

  tipEl.textContent = tips.length > 0 ? tips[0] : `Match is on! ${match.lastEvent}. All sections at normal capacity.`;
}

function renderExitPlan(data) {
  const match = data.match;
  const textEl = document.getElementById('exit-plan-text');
  const btn = document.getElementById('btn-get-exit-plan');
  
  if (!match) {
    textEl.textContent = 'Exit plan will be available during a live match.';
    btn.style.display = 'none';
    return;
  }

  const fastestGate = data.gates.sort((a, b) => a.waitTime - b.waitTime)[0];
  const overs = parseFloat(match.overs);
  
  if (match.innings === 2 && overs > 15) {
    textEl.textContent = `🚗 Match is in its final phase. If you leave now via ${fastestGate.name} (${fastestGate.direction}), you'll beat ~80% of the exit crowd. After the match ends, expect 25-35 min delays at all gates.`;
  } else {
    textEl.textContent = `🚗 Best exit: ${fastestGate.name} (${fastestGate.direction}) — currently ${fastestGate.waitTime} min wait. AI will notify you when it's the optimal time to leave.`;
  }

  btn.onclick = () => {
    sendChatMessage(`Give me a detailed exit plan for ${VENUES[data.venueId].name}`);
    switchTab('chat');
  };
}

function showSectionDetail(sectionId) {
  const state = window.MaidanMind;
  const section = state.crowdData.sections.find(s => s.id === sectionId);
  if (!section) return;

  const panel = document.getElementById('section-detail');
  const nameEl = document.getElementById('section-detail-name');
  const bodyEl = document.getElementById('section-detail-body');

  const nearestFood = state.crowdData.foodStalls.find(f => f.section === sectionId);
  const nearestRestroom = state.crowdData.restrooms.find(r => r.section === sectionId);

  nameEl.textContent = `Section ${section.id} — ${section.name}`;
  bodyEl.innerHTML = `
    <div class="detail-row"><span class="detail-label">Capacity</span><span class="detail-value">${section.capacity.toLocaleString('en-IN')}</span></div>
    <div class="detail-row"><span class="detail-label">Current</span><span class="detail-value">${section.currentCount.toLocaleString('en-IN')} (${section.density}%)</span></div>
    <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value section-card-badge badge-${section.status}">${section.status}</span></div>
    <div class="detail-row"><span class="detail-label">Temperature</span><span class="detail-value">${Math.round(section.temperature)}°C</span></div>
    ${nearestFood ? `<div class="detail-row"><span class="detail-label">Nearest Food</span><span class="detail-value">${nearestFood.name} (${nearestFood.waitTime} min)</span></div>` : ''}
    ${nearestRestroom ? `<div class="detail-row"><span class="detail-label">Restroom</span><span class="detail-value">${nearestRestroom.waitTime} min wait ${nearestRestroom.accessible ? '♿' : ''}</span></div>` : ''}
  `;

  panel.classList.remove('hidden');
  document.getElementById('close-section-detail').onclick = () => panel.classList.add('hidden');
}

/* ===== MAP TAB ===== */
function renderMapTab() {
  const state = window.MaidanMind;
  if (!state.crowdData) return;
  renderStadiumSVG(state.crowdData, 'density');
}

function initMapFilters() {
  document.querySelectorAll('.map-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const state = window.MaidanMind;
      if (state.crowdData) renderStadiumSVG(state.crowdData, btn.dataset.filter);

      // Update legend
      const legend = document.getElementById('map-legend');
      if (btn.dataset.filter === 'heat') {
        legend.innerHTML = `
          <div class="legend-item"><span class="legend-dot" style="background:#00E676"></span> < 30°C</div>
          <div class="legend-item"><span class="legend-dot" style="background:#FFD600"></span> 30-35°C</div>
          <div class="legend-item"><span class="legend-dot" style="background:#FF9100"></span> 35-40°C</div>
          <div class="legend-item"><span class="legend-dot" style="background:#FF1744"></span> > 40°C</div>
        `;
      } else {
        legend.innerHTML = `
          <div class="legend-item"><span class="legend-dot" style="background:#00E676"></span> Comfortable</div>
          <div class="legend-item"><span class="legend-dot" style="background:#FFD600"></span> Moderate</div>
          <div class="legend-item"><span class="legend-dot" style="background:#FF9100"></span> Crowded</div>
          <div class="legend-item"><span class="legend-dot" style="background:#FF1744"></span> Critical</div>
        `;
      }
    });
  });
}

function renderStadiumSVG(data, filterType) {
  const mapEl = document.getElementById('stadium-map');
  const cx = 180, cy = 180, rx = 150, ry = 120;
  const sections = data.sections;

  let sectionsHtml = '';
  const sectionCount = sections.length;

  sections.forEach((section, i) => {
    const startAngle = (i / sectionCount) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((i + 1) / sectionCount) * 2 * Math.PI - Math.PI / 2;
    const midAngle = (startAngle + endAngle) / 2;

    // Create arc path for section
    const innerRx = rx * 0.45, innerRy = ry * 0.45;
    const outerRx = rx, outerRy = ry;

    const x1o = cx + outerRx * Math.cos(startAngle);
    const y1o = cy + outerRy * Math.sin(startAngle);
    const x2o = cx + outerRx * Math.cos(endAngle);
    const y2o = cy + outerRy * Math.sin(endAngle);
    const x1i = cx + innerRx * Math.cos(endAngle);
    const y1i = cy + innerRy * Math.sin(endAngle);
    const x2i = cx + innerRx * Math.cos(startAngle);
    const y2i = cy + innerRy * Math.sin(startAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    let fillColor;
    if (filterType === 'heat') {
      const temp = section.temperature;
      fillColor = temp > 40 ? '#FF1744' : temp > 35 ? '#FF9100' : temp > 30 ? '#FFD600' : '#00E676';
    } else if (filterType === 'facilities') {
      const hasFood = data.foodStalls.some(f => f.section === section.id);
      const hasRestroom = data.restrooms.some(r => r.section === section.id);
      fillColor = hasFood && hasRestroom ? '#4A9EFF' : hasFood ? '#FF6B35' : hasRestroom ? '#00E676' : '#444';
    } else {
      const d = section.density;
      fillColor = d > 90 ? '#FF1744' : d > 75 ? '#FF9100' : d > 50 ? '#FFD600' : '#00E676';
    }

    const path = `M ${x1o} ${y1o} A ${outerRx} ${outerRy} 0 ${largeArc} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerRx} ${innerRy} 0 ${largeArc} 0 ${x2i} ${y2i} Z`;

    // Label position
    const labelR = (rx * 0.45 + rx) / 2;
    const labelRy2 = (ry * 0.45 + ry) / 2;
    const lx = cx + labelR * Math.cos(midAngle);
    const ly = cy + labelRy2 * Math.sin(midAngle);

    const displayValue = filterType === 'heat' ? `${Math.round(section.temperature)}°C` : `${section.density}%`;

    sectionsHtml += `
      <path d="${path}" fill="${fillColor}" fill-opacity="0.5" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" 
            style="cursor:pointer; transition: fill-opacity 0.3s" 
            onmouseenter="this.setAttribute('fill-opacity','0.8')" 
            onmouseleave="this.setAttribute('fill-opacity','0.5')"
            onclick="showSectionDetail('${section.id}')" />
      <text x="${lx}" y="${ly - 6}" text-anchor="middle" fill="white" font-size="10" font-weight="700" font-family="Inter" pointer-events="none">${section.id}</text>
      <text x="${lx}" y="${ly + 8}" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="9" font-family="Inter" pointer-events="none">${displayValue}</text>
    `;
  });

  // Facility markers
  let facilitiesHtml = '';
  if (filterType === 'facilities') {
    data.foodStalls.forEach((stall, i) => {
      const sectionIdx = sections.findIndex(s => s.id === stall.section);
      if (sectionIdx < 0) return;
      const angle = ((sectionIdx + 0.5) / sectionCount) * 2 * Math.PI - Math.PI / 2;
      const markerX = cx + (rx + 20) * Math.cos(angle);
      const markerY = cy + (ry + 15) * Math.sin(angle);
      facilitiesHtml += `<text x="${markerX}" y="${markerY}" font-size="14" text-anchor="middle" pointer-events="none">🍕</text>`;
    });
  }

  // Gate markers
  let gatesHtml = '';
  data.gates.forEach((gate, i) => {
    const angle = (i / data.gates.length) * 2 * Math.PI - Math.PI / 2;
    const gx = cx + (rx + 22) * Math.cos(angle);
    const gy = cy + (ry + 18) * Math.sin(angle);
    const gateColor = gate.status === 'critical' ? '#FF1744' : gate.status === 'busy' ? '#FFD600' : '#00E676';
    gatesHtml += `
      <circle cx="${gx}" cy="${gy}" r="10" fill="${gateColor}" fill-opacity="0.3" stroke="${gateColor}" stroke-width="1.5"/>
      <text x="${gx}" y="${gy + 4}" text-anchor="middle" fill="white" font-size="8" font-weight="700" font-family="Inter" pointer-events="none">${gate.name.replace('Gate ', 'G')}</text>
    `;
  });

  // Center pitch
  const pitchHtml = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.35}" ry="${ry * 0.35}" fill="rgba(0,230,118,0.1)" stroke="rgba(0,230,118,0.3)" stroke-width="1"/>
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="var(--accent-green)" font-size="10" font-weight="600" font-family="Inter">🏏</text>
    <text x="${cx}" y="${cy + 12}" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="8" font-family="Inter">PITCH</text>
  `;

  mapEl.innerHTML = `
    <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
      ${sectionsHtml}
      ${pitchHtml}
      ${gatesHtml}
      ${facilitiesHtml}
    </svg>
  `;
}

function updateMapData() {
  const activeFilter = document.querySelector('.map-filter-btn.active');
  if (activeFilter && window.MaidanMind.crowdData) {
    renderStadiumSVG(window.MaidanMind.crowdData, activeFilter.dataset.filter);
  }
}

/* ===== QUEUE TAB ===== */
function initQueueTabs() {
  document.querySelectorAll('.queue-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.queue-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.queue-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`queue-${tab.dataset.queue}`).classList.add('active');
    });
  });
}

function renderQueueTab() {
  const state = window.MaidanMind;
  if (!state.crowdData) return;

  renderFoodStalls(state.crowdData);
  renderRestrooms(state.crowdData);
  renderActiveTokens();
}

function renderFoodStalls(data) {
  const list = document.getElementById('food-stalls-list');
  const sortedStalls = [...data.foodStalls].sort((a, b) => a.waitTime - b.waitTime);

  list.innerHTML = sortedStalls.map(stall => `
    <div class="stall-card">
      <div class="stall-info">
        <div class="stall-name">🍕 ${stall.name}</div>
        <div class="stall-meta">Section ${stall.section} · ${stall.priceRange}</div>
        <div class="stall-items">${stall.items.join(', ')}</div>
      </div>
      <div class="stall-right">
        <span class="stall-wait ${stall.status}">${stall.waitTime} ${t('minutes')}</span>
        <button class="btn-token" onclick="getToken('food', '${stall.id}', '${stall.name}')" aria-label="Get token for ${stall.name}">
          ${t('getToken')} 🎫
        </button>
      </div>
    </div>
  `).join('');
}

function renderRestrooms(data) {
  const list = document.getElementById('restrooms-list');
  const sorted = [...data.restrooms].sort((a, b) => a.waitTime - b.waitTime);

  list.innerHTML = sorted.map(rr => `
    <div class="stall-card">
      <div class="stall-info">
        <div class="stall-name">🚻 Restroom — Section ${rr.section}</div>
        <div class="stall-meta">${rr.accessible ? '♿ Accessible' : 'General'}</div>
      </div>
      <div class="stall-right">
        <span class="stall-wait ${rr.status}">${rr.waitTime} ${t('minutes')}</span>
        <button class="btn-token" onclick="getToken('restroom', '${rr.id}', 'Restroom Section ${rr.section}')" aria-label="Get token for restroom">
          ${t('getToken')} 🎫
        </button>
      </div>
    </div>
  `).join('');
}

function getToken(type, stallId, stallName) {
  const state = window.MaidanMind;
  state.tokenCounter++;
  
  const waitTime = Math.round(3 + Math.random() * 8);
  const token = {
    id: `TK${String(state.tokenCounter).padStart(3, '0')}`,
    type,
    stallId,
    stallName,
    waitTime,
    createdAt: Date.now(),
    readyAt: Date.now() + waitTime * 60 * 1000,
    status: 'waiting'
  };

  state.activeTokens.push(token);
  renderActiveTokens();
  showToast('🎫', `Token ${token.id} issued! ${stallName} — ETA ${waitTime} min`);

  // Simulate token becoming ready
  setTimeout(() => {
    token.status = 'ready';
    renderActiveTokens();
    showToast('✅', `${t('tokenReady')} ${stallName} — ${token.id}`);
  }, Math.min(waitTime * 1000, 30000)); // Speed up for demo
}

function renderActiveTokens() {
  const state = window.MaidanMind;
  const list = document.getElementById('tokens-list');

  if (state.activeTokens.length === 0) {
    list.innerHTML = '<p class="empty-state">No active tokens. Get one below!</p>';
    return;
  }

  list.innerHTML = state.activeTokens.map(token => {
    const remaining = Math.max(0, Math.round((token.readyAt - Date.now()) / 1000));
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    return `
      <div class="token-card">
        <div class="token-header">
          <span class="token-number">${token.id}</span>
          <span class="token-status${token.status === 'ready' ? ' ready' : ''}">
            ${token.status === 'ready' ? '✅ READY!' : '⏳ Waiting'}
          </span>
        </div>
        <div class="token-detail">${token.type === 'food' ? '🍕' : '🚻'} ${token.stallName}</div>
        ${token.status !== 'ready' ? `<div class="token-timer">⏱️ ${mins}:${String(secs).padStart(2, '0')}</div>` : '<div class="token-timer" style="color: var(--accent-green)">Walk to counter now!</div>'}
      </div>
    `;
  }).join('');
}

function updateTokenTimers() {
  const state = window.MaidanMind;
  if (state.activeTokens.length > 0) renderActiveTokens();
}

function updateQueueWaitTimes() {
  const state = window.MaidanMind;
  if (!state.crowdData) return;
  renderFoodStalls(state.crowdData);
  renderRestrooms(state.crowdData);
}

/* ===== CHAT TAB (Gemini AI Integration) ===== */
function renderChatWelcome() {
  const state = window.MaidanMind;
  const venue = VENUES[state.currentVenue];
  const lang = state.currentLanguage;

  const welcomeMessages = {
    en: `Hey! 👋 I'm MaidanMind AI — your smart stadium assistant for ${venue.name}. I understand cricket, crowd patterns, and I speak your language!\n\nAsk me anything:\n• "Best gate to enter?"\n• "When should I grab food?"\n• "Is it too hot in my section?"\n• "Give me an exit plan"`,
    hi: `नमस्ते! 👋 मैं MaidanMind AI हूँ — ${venue.name} के लिए आपका स्मार्ट स्टेडियम असिस्टेंट। मुझे क्रिकेट और भीड़ की समझ है!\n\nमुझसे कुछ भी पूछें:\n• "सबसे अच्छा गेट कौन सा है?"\n• "खाना कब लें?"\n• "मेरे सेक्शन में गर्मी कैसी है?"\n• "एग्ज़िट प्लान दो"`,
    gu: `નમસ્તે! 👋 હું MaidanMind AI છું — ${venue.name} માટે તમારો સ્માર્ટ સ્ટેડિયમ સહાયક. મને ક્રિકેટ અને ભીડની સમજ છે!\n\nમને કંઈ પણ પૂછો:\n• "શ્રેષ્ઠ ગેટ કયો છે?"\n• "ખાવાનું ક્યારે લેવું?"\n• "મારા સેક્શનમાં ગરમી કેવી છે?"`,
    mr: `नमस्कार! 👋 मी MaidanMind AI आहे — ${venue.name} साठी तुमचा स्मार्ट स्टेडियम असिस्टंट. मला क्रिकेट आणि गर्दीची समज आहे!\n\nमला काहीही विचारा:\n• "सर्वात चांगला गेट कोणता?"\n• "खाणे कधी घ्यावे?"\n• "माझ्या सेक्शनमध्ये गर्मी कशी आहे?"`
  };

  const welcomeText = welcomeMessages[lang] || welcomeMessages['en'];

  document.getElementById('chat-messages').innerHTML = `
    <div class="chat-message ai">
      <div class="chat-avatar">🤖</div>
      <div class="chat-bubble">${welcomeText.replace(/\n/g, '<br>')}</div>
    </div>
  `;

  // Suggestion chips
  const suggestions = {
    en: ['🚪 Best gate?', '🍕 Food near me', '🌡️ Section temperature', '🚗 Exit plan', '🚻 Nearest restroom'],
    hi: ['🚪 सबसे अच्छा गेट?', '🍕 पास में खाना', '🌡️ तापमान बताओ', '🚗 एग्ज़िट प्लान', '🚻 पास का शौचालय'],
    gu: ['🚪 શ્રેષ્ઠ ગેટ?', '🍕 નજીકનું ખાવાનું', '🌡️ તાપમાન', '🚗 બહાર નીકળવું', '🚻 નજીકનું શૌચાલય'],
    mr: ['🚪 सर्वात चांगला गेट?', '🍕 जवळचे खाणे', '🌡️ तापमान', '🚗 बाहेर पडणे', '🚻 जवळचे स्वच्छतागृह']
  };

  const chipList = suggestions[lang] || suggestions['en'];
  document.getElementById('chat-suggestions').innerHTML = chipList.map(s => 
    `<button class="suggestion-chip" onclick="sendChatMessage('${s}')">${s}</button>`
  ).join('');
}

function initVoiceAndVision() {
  const micBtn = document.getElementById('chat-mic-btn');
  const imgUpload = document.getElementById('chat-img-upload');

  // Vision API: Store base64 of selected image
  imgUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        window.MaidanMind.attachedImageBase64 = event.target.result;
        document.getElementById('chat-cam-btn').style.background = 'var(--accent-saffron)';
        showToast('📷', 'Image attached! Ask Gemini to analyze it.', 3000);
      };
      reader.readAsDataURL(file);
    }
  });

  // Voice AI: Speech Recognition
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.addEventListener('click', () => {
      recognition.lang = window.MaidanMind.currentLanguage === 'en' ? 'en-IN' : window.MaidanMind.currentLanguage + '-IN';
      recognition.start();
      micBtn.classList.add('listening');
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('chat-input').value = transcript;
      micBtn.classList.remove('listening');
    };

    recognition.onerror = () => {
      micBtn.classList.remove('listening');
      showToast('⚠️', 'Could not hear you. Please try again.');
    };
    recognition.onend = () => micBtn.classList.remove('listening');
  } else {
    micBtn.style.display = 'none'; // Hide if browser doesn't support
  }
}

function initChatForm() {
  initVoiceAndVision();

  document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg && !window.MaidanMind.attachedImageBase64) return;
    sendChatMessage(msg || "What do you see in this image?");
    input.value = '';
  });
}

function sendChatMessage(message) {
  const state = window.MaidanMind;
  const messagesEl = document.getElementById('chat-messages');

  // Add user message
  messagesEl.innerHTML += `
    <div class="chat-message user">
      <div class="chat-avatar">👤</div>
      <div class="chat-bubble">${escapeHtml(message)}</div>
    </div>
  `;

  // Add typing indicator
  messagesEl.innerHTML += `
    <div class="chat-message ai" id="typing-indicator">
      <div class="chat-avatar">🤖</div>
      <div class="chat-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>
    </div>
  `;

  scrollChatToBottom();

  // Try Gemini API first, fall back to local responses
  if (CONFIG.isConfigured()) {
    callGeminiAPI(message);
  } else {
    // Local AI simulation
    setTimeout(() => generateLocalResponse(message), 800 + Math.random() * 1200);
  }
}

async function callGeminiAPI(userMessage) {
  const state = window.MaidanMind;
  const crowdContext = generateAIContext(state.crowdData);
  const lang = state.currentLanguage;
  const langName = LANGUAGES[lang] ? LANGUAGES[lang].name : 'English';

  const systemPrompt = `You are MaidanMind AI, India's first sport-aware stadium assistant. You are currently assisting a fan at ${VENUES[state.currentVenue].name} in ${VENUES[state.currentVenue].city}.

YOUR PERSONALITY:
- You are friendly, energetic, and cricket-crazy
- You speak like an Indian cricket fan — passionate and helpful
- You respond in ${langName} language (mix some cricket slang naturally)
- Keep responses concise (max 4-5 sentences) but packed with useful info
- Use emojis sparingly but effectively
- Always provide specific, actionable advice based on the real-time data below

CURRENT STADIUM DATA:
${crowdContext}

SPECIAL CAPABILITIES:
1. SPORT-CONTEXT PREDICTION: You can predict crowd behavior based on match events (wickets, timeouts, innings breaks)
2. VIRTUAL QUEUE: You can suggest optimal times to get food/use restrooms based on match flow
3. HEAT INTELLIGENCE: You monitor section temperatures and advise on heat safety
4. EXIT PLANNING: You can plan the optimal departure based on match state and crowd density

IMPORTANT: Always use the real-time data provided above. Never make up numbers. If data shows dangerous conditions (temp > 40°C, density > 90%), ALWAYS warn the user. If the user attaches an image, analyze it visually based on their question!`;

  try {
    const userParts = [{ text: userMessage }];
    
    // Check for Multimodal Request (Attached Image)
    if (state.attachedImageBase64) {
      const match = state.attachedImageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        userParts.push({
          inlineData: { mimeType: match[1], data: match[2] }
        });
      }
      // Clear image attachment after reading
      state.attachedImageBase64 = null;
      document.getElementById('chat-cam-btn').style.background = '';
    }

    const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'Understood! I am MaidanMind AI, ready to help fans with real-time data.' }] },
          ...state.chatHistory.slice(-6),
          { role: 'user', parts: userParts }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 500
        }
      })
    });

    const result = await response.json();
    
    // Check if the API returned an error (e.g. invalid key, quota exceeded)
    if (!response.ok || result.error) {
      console.error('Gemini API returned an error:', result.error || response.statusText);
      const errorMessage = result.error?.message || response.statusText;
      // Provide a helpful message in the UI before falling back to local
      displayAIResponse(`⚠️ **API Error:** ${errorMessage}\n\nFalling back to local simulated assistant...`);
      setTimeout(() => generateLocalResponse(userMessage), 1500);
      return;
    }

    const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      throw new Error('No valid response from AI');
    }

    // Save to history
    state.chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });
    state.chatHistory.push({ role: 'model', parts: [{ text: aiText }] });

    displayAIResponse(aiText);
  } catch (error) {
    console.error('Gemini API error:', error);
    // Silent fallback to local on fetch/network failure
    generateLocalResponse(userMessage);
  }
}

function generateLocalResponse(userMessage) {
  const state = window.MaidanMind;
  const data = state.crowdData;
  const msg = userMessage.toLowerCase();
  let response = '';

  const fastestGate = [...data.gates].sort((a, b) => a.waitTime - b.waitTime)[0];
  const leastCrowdedSection = [...data.sections].sort((a, b) => a.density - b.density)[0];
  const bestFood = [...data.foodStalls].sort((a, b) => a.waitTime - b.waitTime)[0];
  const bestRestroom = [...data.restrooms].sort((a, b) => a.waitTime - b.waitTime)[0];

  if (msg.includes('gate') || msg.includes('entry') || msg.includes('गेट') || msg.includes('ગેટ')) {
    response = `🚪 Fastest gate right now: **${fastestGate.name}** (${fastestGate.direction}) — only **${fastestGate.waitTime} min** wait!\n\nAvoid ${data.gates.sort((a,b) => b.waitTime - a.waitTime)[0].name} — ${data.gates.sort((a,b) => b.waitTime - a.waitTime)[0].waitTime} min wait there. 😬`;
  } else if (msg.includes('food') || msg.includes('eat') || msg.includes('khana') || msg.includes('खाना') || msg.includes('ખાવા') || msg.includes('vada pav')) {
    response = `🍕 Fastest food right now: **${bestFood.name}** (Section ${bestFood.section}) — only **${bestFood.waitTime} min** wait!\n\nMenu: ${bestFood.items.join(', ')} (${bestFood.priceRange})\n\n💡 Pro tip: Get a **Virtual Queue token** from the Queue tab to skip the physical line!`;
  } else if (msg.includes('restroom') || msg.includes('toilet') || msg.includes('शौचालय') || msg.includes('bathroom') || msg.includes('શૌચાલય')) {
    response = `🚻 Best restroom right now: **Section ${bestRestroom.section}** — only **${bestRestroom.waitTime} min** wait! ${bestRestroom.accessible ? '♿ Wheelchair accessible!' : ''}\n\n💡 Tip: Restrooms are usually emptiest during tense final overs — nobody wants to leave their seat!`;
  } else if (msg.includes('temp') || msg.includes('heat') || msg.includes('hot') || msg.includes('गर्मी') || msg.includes('तापमान') || msg.includes('ગરમી')) {
    const hottest = [...data.sections].sort((a, b) => b.temperature - a.temperature)[0];
    const coolest = [...data.sections].sort((a, b) => a.temperature - b.temperature)[0];
    response = `🌡️ Current conditions: **${data.weather.temp}°C**, ${data.weather.condition}\n\n🔴 Hottest: ${hottest.name} — **${Math.round(hottest.temperature)}°C**\n🟢 Coolest: ${coolest.name} — **${Math.round(coolest.temperature)}°C**\n\n${data.weather.temp > 38 ? '⚠️ **Heat warning!** Drink water every 20 min. Cooling zones available at the concourse.' : '☀️ Comfortable conditions. Stay hydrated!'}`;
  } else if (msg.includes('exit') || msg.includes('leave') || msg.includes('parking') || msg.includes('निकल') || msg.includes('बाहर') || msg.includes('બહાર')) {
    const match = data.match;
    if (match && match.innings === 2) {
      response = `🚗 **Exit Plan:**\n\n1. Best gate: **${fastestGate.name}** (${fastestGate.direction}) — ${fastestGate.waitTime} min\n2. Leave at over **19.2** to beat 80% of crowd\n3. After match ends: expect **25-35 min** delays\n4. Least crowded exit direction: **${fastestGate.direction}**\n\n💡 Leaving 2 overs early = saving **20+ minutes** of wait time!`;
    } else {
      response = `🚗 Match is still in progress! I'll give you the optimal exit time when the match enters its final phase.\n\nFor now, **${fastestGate.name}** (${fastestGate.direction}) has the shortest exit line: **${fastestGate.waitTime} min**.`;
    }
  } else if (msg.includes('crowd') || msg.includes('section') || msg.includes('भीड़') || msg.includes('ભીડ') || msg.includes('गर्दी')) {
    response = `👥 Stadium is at **${data.overall.density}%** capacity.\n\n🟢 Least crowded: **${leastCrowdedSection.name}** (${leastCrowdedSection.density}%)\n🔴 Most crowded: **${[...data.sections].sort((a,b) => b.density - a.density)[0].name}** (${[...data.sections].sort((a,b) => b.density - a.density)[0].density}%)\n\nCheck the Map tab for the full real-time heatmap! 🗺️`;
  } else {
    response = `🏏 Great question! Here's a quick overview:\n\n• 👥 Crowd: **${data.overall.density}%** capacity\n• 🚪 Fastest gate: **${fastestGate.name}** (${fastestGate.waitTime} min)\n• 🍕 Fastest food: **${bestFood.name}** (${bestFood.waitTime} min)\n• 🌡️ Temperature: **${data.weather.temp}°C**\n\nAsk me anything specific — gates, food, exits, temperature, or restrooms!`;
  }

  displayAIResponse(response);
}

function displayAIResponse(text) {
  const messagesEl = document.getElementById('chat-messages');
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();

  // Convert markdown bold to HTML
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  messagesEl.innerHTML += `
    <div class="chat-message ai">
      <div class="chat-avatar">🤖</div>
      <div class="chat-bubble">${formattedText}</div>
    </div>
  `;

  scrollChatToBottom();

  // Voice AI: Text-to-Speech
  if ('speechSynthesis' in window) {
    // Strip bolding asterisks and emojis which sound weird when spoken
    const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = window.MaidanMind.currentLanguage === 'en' ? 'en-IN' : window.MaidanMind.currentLanguage + '-IN';
    window.speechSynthesis.speak(utterance);
  }
}

function scrollChatToBottom() {
  const container = document.getElementById('chat-container');
  setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);
}

/* ===== SAFETY TAB ===== */
function renderSafetyTab() {
  const state = window.MaidanMind;
  if (!state.crowdData) return;
  const data = state.crowdData;

  // Heat Intelligence
  document.getElementById('heat-temp').textContent = `${data.weather.temp}°C`;
  document.getElementById('heat-condition').textContent = data.weather.condition;
  document.getElementById('heat-humidity').textContent = `Humidity: ${data.weather.humidity}%`;

  // Heat sections
  const heatHtml = data.sections.map(s => {
    const temp = Math.round(s.temperature);
    const tempClass = temp > 40 ? 'hot' : temp > 35 ? 'warm' : temp > 30 ? 'okay' : 'cool';
    return `
      <div class="heat-section-item">
        <span>${s.name}</span>
        <span class="heat-section-temp ${tempClass}">${temp}°C</span>
      </div>
    `;
  }).join('');
  document.getElementById('heat-sections').innerHTML = heatHtml;

  // Heat alert
  const heatAlert = document.getElementById('heat-alert');
  if (data.weather.temp >= CONFIG.APP.heatAlertThreshold) {
    heatAlert.classList.remove('hidden');
  } else {
    heatAlert.classList.add('hidden');
  }

  // Crowd alerts
  const alertsEl = document.getElementById('crowd-alerts');
  const alerts = [];
  
  data.sections.forEach(s => {
    if (s.density >= CONFIG.APP.crowdDangerThreshold) {
      alerts.push({
        type: 'danger',
        icon: '🔴',
        text: `<strong>${s.name}</strong> is at <strong>${s.density}%</strong> capacity — dangerously crowded. Avoid this section.`
      });
    } else if (s.density >= 80) {
      alerts.push({
        type: 'warning',
        icon: '🟡',
        text: `<strong>${s.name}</strong> is at <strong>${s.density}%</strong> capacity — getting crowded.`
      });
    }
  });

  if (data.weather.temp > 40) {
    alerts.push({
      type: 'danger',
      icon: '🌡️',
      text: `<strong>Extreme heat: ${data.weather.temp}°C</strong> — Risk of heat stroke. Stay hydrated and seek shade.`
    });
  }

  if (alerts.length === 0) {
    alertsEl.innerHTML = '<div class="alert-card"><span class="alert-icon">✅</span><span class="alert-text">All clear! No crowd or weather alerts at this time.</span></div>';
  } else {
    alertsEl.innerHTML = alerts.map(a => `
      <div class="alert-card ${a.type}">
        <span class="alert-icon">${a.icon}</span>
        <span class="alert-text">${a.text}</span>
      </div>
    `).join('');
  }

  // Nearest Help
  const helpEl = document.getElementById('help-list');
  helpEl.innerHTML = data.medical.map(m => `
    <div class="help-card">
      <div class="help-icon">🏥</div>
      <div>
        <div class="help-name">${m.name}</div>
        <div class="help-location">Section ${m.section} ${m.hasAED ? '· AED Available ⚡' : ''}</div>
      </div>
    </div>
  `).join('');
}

function initSOSButton() {
  const sosBtn = document.getElementById('btn-sos');
  let holdTimer = null;

  sosBtn.addEventListener('mousedown', startSOS);
  sosBtn.addEventListener('touchstart', startSOS);
  sosBtn.addEventListener('mouseup', cancelSOS);
  sosBtn.addEventListener('touchend', cancelSOS);
  sosBtn.addEventListener('mouseleave', cancelSOS);

  function startSOS(e) {
    e.preventDefault();
    holdTimer = setTimeout(() => {
      triggerSOS();
    }, 2000);
    sosBtn.style.transform = 'scale(0.9)';
  }

  function cancelSOS() {
    if (holdTimer) clearTimeout(holdTimer);
    sosBtn.style.transform = '';
  }
}

function triggerSOS() {
  const state = window.MaidanMind;
  const venue = VENUES[state.currentVenue];

  // Show evacuation card
  const evacCard = document.getElementById('evacuation-card');
  evacCard.classList.remove('hidden');
  
  const fastestGate = state.crowdData ? [...state.crowdData.gates].sort((a, b) => a.waitTime - b.waitTime)[0] : null;
  document.getElementById('evacuation-text').innerHTML = `
    🚨 <strong>Emergency SOS Activated!</strong><br><br>
    📍 Your location has been shared with stadium security.<br>
    🏥 Nearest medical: ${state.crowdData?.medical[0]?.name || 'Medical Post'} (Section ${state.crowdData?.medical[0]?.section || 'A'})<br>
    🚪 Nearest exit: ${fastestGate ? `${fastestGate.name} (${fastestGate.direction})` : 'Gate A'}<br><br>
    <strong>Stay calm. Help is on the way.</strong>
  `;

  showToast('🆘', 'Emergency SOS activated! Security has been notified.');
}

/* ===== LANGUAGE MODAL ===== */
function initLanguageModal() {
  const btn = document.getElementById('btn-language');
  const modal = document.getElementById('language-modal');
  const close = document.getElementById('close-language-modal');

  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    renderLanguageGrid();
  });

  close.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

function renderLanguageGrid() {
  const grid = document.getElementById('language-grid');
  const current = window.MaidanMind.currentLanguage;

  grid.innerHTML = Object.entries(LANGUAGES).map(([code, lang]) => `
    <button class="lang-btn${code === current ? ' active' : ''}" onclick="setLanguage('${code}')">
      <span class="lang-native">${lang.nativeName}</span>
      <span class="lang-english">${lang.name}</span>
    </button>
  `).join('');
}

function setLanguage(langCode) {
  window.MaidanMind.currentLanguage = langCode;
  document.getElementById('btn-language').querySelector('.icon-btn-text').textContent = langCode.toUpperCase();
  document.getElementById('language-modal').classList.add('hidden');
  updateI18n();

  // Re-render chat welcome if on chat tab
  if (window.MaidanMind.currentVenue) {
    renderChatWelcome();
  }

  showToast('🌐', `Language changed to ${LANGUAGES[langCode].nativeName}`);
}

function updateI18n() {
  const lang = window.MaidanMind.currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key, lang);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key, lang);
  });
}

/* ===== ACCESSIBILITY MODAL ===== */
function initAccessibilityModal() {
  const btn = document.getElementById('btn-accessibility');
  const modal = document.getElementById('accessibility-modal');
  const close = document.getElementById('close-accessibility-modal');

  btn.addEventListener('click', () => modal.classList.remove('hidden'));
  close.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  document.getElementById('toggle-high-contrast').addEventListener('change', (e) => {
    document.body.classList.toggle('high-contrast', e.target.checked);
  });

  document.getElementById('toggle-large-text').addEventListener('change', (e) => {
    document.body.classList.toggle('large-text', e.target.checked);
  });

  document.getElementById('toggle-reduce-motion').addEventListener('change', (e) => {
    document.body.classList.toggle('reduce-motion', e.target.checked);
  });
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(icon, message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-message').textContent = message;
  
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

/* ===== UTILITY FUNCTIONS ===== */
function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}
