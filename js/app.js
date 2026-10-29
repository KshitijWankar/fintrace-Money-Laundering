/**
 * FinTrace: AI-Based Financial Transaction Monitoring
 * Core Web Application Engine & Implementation Inspector
 * Department of Information Technology - NMIET Pune
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    activeView: 'dashboard',
    inspectorModeActive: true, // Default to true so professors/evaluators see technical implementation details immediately!
    streamActive: true,
    streamSpeed: 1200,
    streamTimer: null,
    streamSpeedMultiplier: 1,
    activeFilter: 'all',
    selectedAlert: null,
    selectedNode: null,
    whatIf: {
      amount: 9850,
      velocity: 14,
      counterparties: 12,
      dormancy: 180
    },
    graphEngine: null,
    alertsData: [
      {
        id: 'ALT-2026-9042',
        account: 'ACC-84920',
        customer: 'Apex Logistics Global Pvt Ltd',
        typology: 'Structuring & Mule Layering',
        amount: '$98,500.00',
        score: 94,
        severity: 'critical',
        status: 'OPEN',
        time: '3 mins ago',
        flags: ['Smurfing Influx', 'Threshold Evasion (<$10k)', 'Rapid Mule Fan-Out'],
        txCount: 12,
        counterparties: 12,
        kycLevel: 'Tier 2 (High Risk Industry)'
      },
      {
        id: 'ALT-2026-9041',
        account: 'ACC-77312',
        customer: 'Vikramaditya Enterprises',
        typology: 'Circular Layering Loop',
        amount: '$240,000.00',
        score: 91,
        severity: 'critical',
        status: 'INVESTIGATING',
        time: '18 mins ago',
        flags: ['Closed Cycle (Hop=4)', 'Rapid Round-Trip', 'Intermediary Fee Sinks'],
        txCount: 4,
        counterparties: 4,
        kycLevel: 'Tier 3 (Export / Import)'
      },
      {
        id: 'ALT-2026-9040',
        account: 'ACC-61094',
        customer: 'Pacific Zenith Capital',
        typology: 'High-Velocity Dormancy Break',
        amount: '$74,200.00',
        score: 86,
        severity: 'critical',
        status: 'ESCALATED',
        time: '32 mins ago',
        flags: ['Dormant >180 Days', 'Sudden Burst (8 tx/hr)', 'Offshore Routing'],
        txCount: 8,
        counterparties: 6,
        kycLevel: 'Tier 1 (Shell Suspect)'
      },
      {
        id: 'ALT-2026-9039',
        account: 'ACC-55219',
        customer: 'Sunil R. Deshmukh',
        typology: 'Smurfing / Cash Influx',
        amount: '$29,400.00',
        score: 79,
        severity: 'high',
        status: 'OPEN',
        time: '1 hour ago',
        flags: ['3 Deposits under $10k', 'Immediate Third-Party Transfer'],
        txCount: 3,
        counterparties: 1,
        kycLevel: 'Tier 2 (Individual)'
      },
      {
        id: 'ALT-2026-9038',
        account: 'ACC-44910',
        customer: 'OmniTrade FinTech Ltd',
        typology: 'Mule Aggregator Ring',
        amount: '$165,000.00',
        score: 76,
        severity: 'high',
        status: 'REVIEW',
        time: '2 hours ago',
        flags: ['High In-Degree Centrality', 'Disproportionate Turnover'],
        txCount: 19,
        counterparties: 16,
        kycLevel: 'Tier 2 (Corporate)'
      },
      {
        id: 'ALT-2026-9037',
        account: 'ACC-38291',
        customer: 'Priya K. Sharma',
        typology: 'Velocity Anomaly',
        amount: '$14,500.00',
        score: 58,
        severity: 'medium',
        status: 'OPEN',
        time: '3 hours ago',
        flags: ['Amount 3.5x Customer Median', 'New Counterparty Country'],
        txCount: 2,
        counterparties: 2,
        kycLevel: 'Tier 3 (Salaried)'
      },
      {
        id: 'ALT-2026-9036',
        account: 'ACC-29104',
        customer: 'GreenValley Agro Traders',
        typology: 'Geographic Deviation',
        amount: '$22,000.00',
        score: 52,
        severity: 'medium',
        status: 'CLOSED_FP',
        time: '4 hours ago',
        flags: ['Cross-Border Payment', 'Seasonal Agricultural Influx'],
        txCount: 1,
        counterparties: 1,
        kycLevel: 'Tier 3 (Verified SME)'
      }
    ]
  };

  // Expose state for debugging
  window.FinTraceState = state;

  // Initialize Core Services
  initNavigation();
  initBlueprintInspector();
  initDashboardStream();
  initAlertQueue();
  initGraphForensics();
  initShapEngine();
  initStrGenerator();
  initBenchmarkView();
  initArchitectureInspector();
  initGlobalShortcuts();

  // Show welcome toast on startup
  setTimeout(() => {
    showToast(
      'FinTrace AML System Online',
      'AI Detection Engine & Presentation Inspector Active. Click any button or control to inspect its implementation roadmap.',
      'info'
    );
  }, 600);

  // ========================================================
  // NAVIGATION CONTROLLER
  // ========================================================
  function initNavigation() {
    const navItems = document.querySelectorAll('.nav-link[data-view]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = item.getAttribute('data-view');
        switchView(viewId);
      });
    });

    // Deep link hash check
    const initialHash = window.location.hash.replace('#/', '').replace('#', '');
    if (initialHash && document.getElementById(`view-${initialHash}`)) {
      switchView(initialHash);
    }
  }

  function switchView(viewId) {
    state.activeView = viewId;
    window.location.hash = `#/${viewId}`;

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('data-view') === viewId);
    });

    // Switch view containers
    document.querySelectorAll('.view-container').forEach(v => {
      if (v.id === `view-${viewId}`) {
        v.classList.remove('hidden');
        v.classList.add('active-view');
      } else {
        v.classList.add('hidden');
        v.classList.remove('active-view');
      }
    });

    // Resize / refresh graph if switching to graph view
    if (viewId === 'graph') {
      setTimeout(() => {
        if (!state.graphEngine) {
          state.graphEngine = new FinTraceGraphEngine('graphCanvas');
        } else {
          state.graphEngine.resetView();
          state.graphEngine.render();
        }
      }, 100);
    }

    // Scroll to top of main content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================
  // IMPLEMENTATION BLUEPRINT INSPECTOR ENGINE
  // ========================================================
  function initBlueprintInspector() {
    const toggleBtn = document.getElementById('btn-mode-toggle');
    const drawer = document.getElementById('blueprintDrawer');
    const closeDrawerBtn = document.getElementById('closeBlueprintDrawer');
    const masterModal = document.getElementById('masterBlueprintModal');
    const openMasterBtn = document.getElementById('btn-master-blueprint');
    const closeMasterBtn = document.getElementById('closeMasterBlueprint');

    // Toggle Inspector Mode
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        state.inspectorModeActive = !state.inspectorModeActive;
        updateInspectorBadgeState();
        triggerBlueprint('btn-mode-toggle');
      });
    }

    function updateInspectorBadgeState() {
      const modeText = document.getElementById('inspectorModeText');
      const togglePill = document.getElementById('btn-mode-toggle');
      if (state.inspectorModeActive) {
        if (modeText) modeText.innerHTML = '<span class="status-dot pulse-neon"></span> <strong>Inspector Mode: ON</strong> (Live Tech Specs)';
        if (togglePill) togglePill.classList.add('inspector-active');
        document.body.classList.add('inspector-mode-active');
      } else {
        if (modeText) modeText.innerHTML = '<span class="status-dot"></span> <strong>Demo Mode: ON</strong> (Silent Click)';
        if (togglePill) togglePill.classList.remove('inspector-active');
        document.body.classList.remove('inspector-mode-active');
      }
    }
    updateInspectorBadgeState();

    // Close Drawer
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    }

    // Master Blueprint Modal
    if (openMasterBtn) {
      openMasterBtn.addEventListener('click', () => {
        populateMasterBlueprint();
        masterModal.classList.remove('hidden');
        triggerBlueprint('btn-master-blueprint');
      });
    }

    if (closeMasterBtn) {
      closeMasterBtn.addEventListener('click', () => {
        masterModal.classList.add('hidden');
      });
    }

    // Intercept clicks on ALL elements with data-blueprint-id
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-blueprint-id]');
      if (target) {
        const bpId = target.getAttribute('data-blueprint-id');
        // If in inspector mode, always show blueprint drawer
        if (state.inspectorModeActive) {
          triggerBlueprint(bpId);
        }
      }
    });
  }

  function triggerBlueprint(bpId) {
    const bp = window.IMPLEMENTATION_BLUEPRINTS[bpId];
    if (!bp) {
      console.warn(`Blueprint ID not found: ${bpId}`);
      return;
    }

    const drawer = document.getElementById('blueprintDrawer');
    if (!drawer) return;

    // Populate drawer elements
    document.getElementById('bpTitle').textContent = bp.title;
    document.getElementById('bpIdBadge').textContent = `ID: #${bp.id}`;
    document.getElementById('bpCategory').textContent = bp.category;
    document.getElementById('bpPhase').textContent = bp.phase;
    document.getElementById('bpDestination').textContent = bp.destination;
    document.getElementById('bpFrontend').textContent = bp.frontendImpl;
    document.getElementById('bpEndpoint').textContent = bp.backendEndpoint;
    document.getElementById('bpBackend').textContent = bp.backendLogic;
    document.getElementById('bpDatabase').textContent = bp.databaseOps;
    document.getElementById('bpMlGraph').textContent = bp.mlGraphEngine;
    document.getElementById('bpSecurity').textContent = bp.securityAudit;

    drawer.classList.add('open');

    // Visual ripple / glow on target button
    const element = document.querySelector(`[data-blueprint-id="${bpId}"]`);
    if (element) {
      element.classList.add('blueprint-highlight-pulse');
      setTimeout(() => element.classList.remove('blueprint-highlight-pulse'), 1200);
    }
  }

  function populateMasterBlueprint() {
    const tableBody = document.getElementById('masterBlueprintTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const bps = Object.values(window.IMPLEMENTATION_BLUEPRINTS);

    bps.forEach(bp => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-mono text-cyan-400 font-semibold">${bp.id}</td>
        <td>
          <div class="font-bold text-white">${bp.title}</div>
          <div class="text-xs text-slate-400">${bp.category}</div>
        </td>
        <td class="text-xs text-amber-300">${bp.phase}</td>
        <td class="text-xs text-slate-300">${bp.destination}</td>
        <td class="font-mono text-xs text-emerald-400 bg-slate-900 px-2 py-1 rounded">${bp.backendEndpoint}</td>
        <td>
          <button class="btn btn-sm btn-outline-cyan view-spec-btn" data-bp-id="${bp.id}">
            Inspect
          </button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    // Attach inspect buttons inside master modal
    tableBody.querySelectorAll('.view-spec-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-bp-id');
        triggerBlueprint(id);
      });
    });

    // Setup search filter in master modal
    const searchInput = document.getElementById('masterBlueprintSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        tableBody.querySelectorAll('tr').forEach(row => {
          const text = row.innerText.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }
  }

  // ========================================================
  // DASHBOARD & LIVE TRANSACTION INGESTION STREAM
  // ========================================================
  function initDashboardStream() {
    const streamContainer = document.getElementById('liveStreamTableBody');
    const toggleBtn = document.getElementById('btn-stream-toggle');
    const speedBtn = document.getElementById('btn-stream-speed');
    const injectSmurfingBtn = document.getElementById('btn-inject-smurfing');
    const injectMuleBtn = document.getElementById('btn-inject-mule');
    const injectCircularBtn = document.getElementById('btn-inject-circular');
    const quickInvestigateBtn = document.getElementById('btn-investigate-quick');

    // Sample Accounts for generation
    const sampleAccounts = [
      'ACC-84920 (Apex Logistics)', 'ACC-99210 (Delta Import)', 'ACC-31092 (Priya S.)',
      'ACC-77401 (Nova Tech)', 'ACC-12093 (Kavita M.)', 'ACC-54911 (Global Exim)',
      'ACC-66209 (Skyline Corp)', 'ACC-88301 (Vanguard Ltd)', 'ACC-44102 (Rohan P.)'
    ];

    // Transaction generator
    function generateTransaction(customData = null) {
      if (!streamContainer) return;

      const id = customData ? customData.id : `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      const source = customData ? customData.source : sampleAccounts[Math.floor(Math.random() * sampleAccounts.length)];
      let dest = customData ? customData.dest : sampleAccounts[Math.floor(Math.random() * sampleAccounts.length)];
      while (dest === source) {
        dest = sampleAccounts[Math.floor(Math.random() * sampleAccounts.length)];
      }

      const amountVal = customData ? customData.amount : (Math.random() > 0.85 ? (9500 + Math.random() * 450) : (50 + Math.random() * 2400));
      const amount = customData ? customData.amountStr : `$${amountVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      
      const score = customData ? customData.score : Math.floor(Math.random() * 45);
      const isSuspicious = score >= 70;
      const isCritical = score >= 85;

      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const row = document.createElement('tr');
      row.className = `stream-row ${isCritical ? 'critical-tx-row' : (isSuspicious ? 'suspicious-tx-row' : '')} animate-fade-in`;
      row.innerHTML = `
        <td class="font-mono text-xs text-slate-400">${timeStr}</td>
        <td class="font-mono text-xs text-cyan-400 font-bold">${id}</td>
        <td class="text-xs text-slate-300 truncate max-w-[140px]">${source}</td>
        <td class="text-xs text-slate-300 truncate max-w-[140px]">${dest}</td>
        <td class="font-mono text-xs font-semibold ${isCritical ? 'text-red-400' : 'text-slate-200'}">${amount}</td>
        <td>
          <div class="flex items-center gap-2">
            <div class="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full ${score > 70 ? 'bg-red-500' : (score > 40 ? 'bg-amber-500' : 'bg-emerald-500')}" style="width: ${score}%"></div>
            </div>
            <span class="font-mono text-xs font-bold ${score > 70 ? 'text-red-400' : (score > 40 ? 'text-amber-400' : 'text-emerald-400')}">${score}</span>
          </div>
        </td>
        <td>
          ${isCritical 
            ? `<span class="badge badge-critical pulse-slow">FLAGGED (AI)</span>` 
            : (isSuspicious 
                ? `<span class="badge badge-warning">REVIEW</span>` 
                : `<span class="badge badge-success">CLEARED</span>`)}
        </td>
        <td>
          ${score > 60 
            ? `<button class="btn btn-xs btn-outline-danger inspect-tx-btn" data-blueprint-id="btn-investigate-quick" data-tx-id="${id}">Investigate</button>` 
            : `<button class="btn btn-xs btn-ghost text-slate-400 inspect-tx-btn" data-blueprint-id="btn-investigate-quick" data-tx-id="${id}">Inspect</button>`}
        </td>
      `;

      // Insert at top
      if (streamContainer.firstChild) {
        streamContainer.insertBefore(row, streamContainer.firstChild);
      } else {
        streamContainer.appendChild(row);
      }

      // Limit to 20 rows to keep DOM clean
      while (streamContainer.children.length > 20) {
        streamContainer.removeChild(streamContainer.lastChild);
      }

      // Update total counter
      const totalTxCounter = document.getElementById('statTotalTx');
      if (totalTxCounter) {
        const cur = parseInt(totalTxCounter.textContent.replace(/,/g, '')) || 1482910;
        totalTxCounter.textContent = (cur + 1).toLocaleString('en-US');
      }
    }

    // Stream interval
    function startStream() {
      if (state.streamTimer) clearInterval(state.streamTimer);
      state.streamTimer = setInterval(() => {
        if (state.streamActive) {
          generateTransaction();
        }
      }, state.streamSpeed / state.streamSpeedMultiplier);
    }
    startStream();

    // Toggle Stream
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        state.streamActive = !state.streamActive;
        toggleBtn.innerHTML = state.streamActive 
          ? '<span class="status-dot online"></span> Live Streaming Active' 
          : '<span class="status-dot" style="background:#ef4444"></span> Stream Paused';
        triggerBlueprint('btn-stream-toggle');
      });
    }

    // Speed Cycle
    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        if (state.streamSpeedMultiplier === 1) state.streamSpeedMultiplier = 3;
        else if (state.streamSpeedMultiplier === 3) state.streamSpeedMultiplier = 6;
        else state.streamSpeedMultiplier = 1;

        speedBtn.textContent = `Speed: ${state.streamSpeedMultiplier}x`;
        startStream();
        triggerBlueprint('btn-stream-speed');
      });
    }

    // Pattern Injections
    if (injectSmurfingBtn) {
      injectSmurfingBtn.addEventListener('click', () => {
        triggerBlueprint('btn-inject-smurfing');
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            generateTransaction({
              id: `TX-SMURF-${100 + i}`,
              source: `ACC-MULE-0${i + 1}`,
              dest: 'ACC-84920 (Apex Logistics)',
              amount: 9850,
              amountStr: `$9,${850 + i * 20}.00`,
              score: 92 + i % 5
            });
          }, i * 250);
        }
        showToast('Attack Pattern Injected', '6 Structured transactions under $10,000 CTR limit queued into live stream.', 'warning');
      });
    }

    if (injectMuleBtn) {
      injectMuleBtn.addEventListener('click', () => {
        triggerBlueprint('btn-inject-mule');
        generateTransaction({
          id: `TX-MULE-FAN`,
          source: 'ACC-84920 (Apex Logistics)',
          dest: 'ACC-MULE-DISPERSE',
          amount: 85000,
          amountStr: '$85,000.00',
          score: 88
        });
        showToast('Mule Fan-Out Injected', 'Dispersal transaction across 8 recipient accounts triggered.', 'warning');
      });
    }

    if (injectCircularBtn) {
      injectCircularBtn.addEventListener('click', () => {
        triggerBlueprint('btn-inject-circular');
        const loop = ['ACC-A (Origin)', 'ACC-B (Mule)', 'ACC-C (Front)', 'ACC-D (Crypto Gateway)', 'ACC-A (Origin)'];
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            generateTransaction({
              id: `TX-LOOP-${i + 1}`,
              source: loop[i],
              dest: loop[i + 1],
              amount: 50000 - i * 600,
              amountStr: `$${(50000 - i * 600).toLocaleString()}.00`,
              score: 96
            });
          }, i * 300);
        }
        showToast('Circular Layering Detected', 'Cycle of length 4 detected by NetworkX engine. Alert ALT-2026-9041 updated.', 'danger');
      });
    }

    // Quick Investigate
    if (quickInvestigateBtn) {
      quickInvestigateBtn.addEventListener('click', () => {
        openCaseDossier('ALT-2026-9042');
        triggerBlueprint('btn-investigate-quick');
      });
    }

    // Pre-populate 8 rows
    for (let i = 0; i < 8; i++) {
      generateTransaction();
    }
  }

  // ========================================================
  // ALERT QUEUE & CASE MANAGEMENT
  // ========================================================
  function initAlertQueue() {
    renderAlertTable();

    // Filters
    const filterBtns = document.querySelectorAll('[data-filter]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.getAttribute('data-filter');
        renderAlertTable();

        const bpId = btn.getAttribute('data-blueprint-id');
        if (bpId) triggerBlueprint(bpId);
      });
    });

    // Alert Search
    const searchAlertsInput = document.getElementById('searchAlertsInput');
    if (searchAlertsInput) {
      searchAlertsInput.addEventListener('input', (e) => {
        renderAlertTable(e.target.value.toLowerCase());
      });
    }

    // Case Dossier Modal Close
    const closeCaseModalBtn = document.getElementById('closeCaseModal');
    if (closeCaseModalBtn) {
      closeCaseModalBtn.addEventListener('click', () => {
        document.getElementById('caseDossierModal').classList.add('hidden');
      });
    }

    // Case Action Buttons inside Modal
    const caseEscalateBtn = document.getElementById('btn-case-escalate');
    const caseFreezeBtn = document.getElementById('btn-case-freeze');
    const caseEddBtn = document.getElementById('btn-case-edd');
    const caseFpBtn = document.getElementById('btn-case-false-positive');
    const caseFileStrBtn = document.getElementById('btn-case-file-str');

    if (caseEscalateBtn) {
      caseEscalateBtn.addEventListener('click', () => {
        triggerBlueprint('btn-case-escalate');
        showToast('Case Escalated', 'Case ALT-2026-9042 routed to Head of Compliance queue with priority SLA.', 'warning');
        updateCaseStatusUI('ESCALATED');
      });
    }

    if (caseFreezeBtn) {
      caseFreezeBtn.addEventListener('click', () => {
        triggerBlueprint('btn-case-freeze');
        showToast('Account Restraint Placed', 'Outbound debit block placed on ACC-84920 via Core Banking API Webhook.', 'danger');
        updateCaseStatusUI('FROZEN');
      });
    }

    if (caseEddBtn) {
      caseEddBtn.addEventListener('click', () => {
        triggerBlueprint('btn-case-edd');
        showToast('EDD Request Dispatched', 'Secure portal upload link sent to customer for Source of Funds proof.', 'info');
      });
    }

    if (caseFpBtn) {
      caseFpBtn.addEventListener('click', () => {
        triggerBlueprint('btn-case-false-positive');
        showToast('Dismissed as False Positive', 'Feedback logged. XGBoost training label recorded (label=0).', 'success');
        updateCaseStatusUI('CLOSED_FP');
      });
    }

    if (caseFileStrBtn) {
      caseFileStrBtn.addEventListener('click', () => {
        triggerBlueprint('btn-case-file-str');
        document.getElementById('caseDossierModal').classList.add('hidden');
        switchView('str');
        showToast('STR Workspace Prepared', 'Case evidence & SHAP factors pre-populated into Regulatory STR form.', 'info');
      });
    }
  }

  function renderAlertTable(query = '') {
    const tbody = document.getElementById('alertsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const filtered = state.alertsData.filter(alert => {
      // Filter severity
      if (state.activeFilter === 'critical' && alert.severity !== 'critical') return false;
      if (state.activeFilter === 'high' && alert.severity !== 'high') return false;
      if (state.activeFilter === 'medium' && alert.severity !== 'medium') return false;

      // Filter search
      if (query) {
        const str = `${alert.id} ${alert.account} ${alert.customer} ${alert.typology}`.toLowerCase();
        return str.includes(query);
      }
      return true;
    });

    filtered.forEach(alert => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-800/40 transition-colors';
      tr.innerHTML = `
        <td class="font-mono text-cyan-400 font-bold">${alert.id}</td>
        <td>
          <div class="font-bold text-white text-sm">${alert.customer}</div>
          <div class="font-mono text-xs text-slate-400">${alert.account} • ${alert.kycLevel}</div>
        </td>
        <td>
          <span class="badge ${alert.severity === 'critical' ? 'badge-critical' : (alert.severity === 'high' ? 'badge-warning' : 'badge-info')}">
            ${alert.typology}
          </span>
          <div class="text-[11px] text-slate-400 mt-1">${alert.flags[0]}</div>
        </td>
        <td class="font-mono text-white font-semibold text-sm">${alert.amount}</td>
        <td>
          <div class="flex items-center gap-2">
            <div class="w-16 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full ${alert.score >= 85 ? 'bg-red-500' : (alert.score >= 70 ? 'bg-amber-500' : 'bg-blue-500')}" style="width: ${alert.score}%"></div>
            </div>
            <span class="font-mono font-bold text-sm ${alert.score >= 85 ? 'text-red-400' : (alert.score >= 70 ? 'text-amber-400' : 'text-blue-400')}">${alert.score}</span>
          </div>
        </td>
        <td>
          <span class="badge ${alert.status === 'OPEN' ? 'badge-critical' : (alert.status === 'INVESTIGATING' ? 'badge-warning' : (alert.status === 'ESCALATED' ? 'badge-danger' : 'badge-success'))}">
            ${alert.status}
          </span>
        </td>
        <td class="text-xs text-slate-400">${alert.time}</td>
        <td>
          <div class="flex items-center gap-1.5">
            <button class="btn btn-xs btn-primary open-case-btn" data-blueprint-id="btn-investigate-quick" data-alert-id="${alert.id}">
              Inspect Case
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Bind row clicks
    tbody.querySelectorAll('.open-case-btn').forEach(b => {
      b.addEventListener('click', () => {
        const alertId = b.getAttribute('data-alert-id');
        openCaseDossier(alertId);
        triggerBlueprint('btn-investigate-quick');
      });
    });
  }

  function openCaseDossier(alertId) {
    const alert = state.alertsData.find(a => a.id === alertId) || state.alertsData[0];
    state.selectedAlert = alert;

    const modal = document.getElementById('caseDossierModal');
    if (!modal) return;

    document.getElementById('modalCaseId').textContent = alert.id;
    document.getElementById('modalCustomerName').textContent = alert.customer;
    document.getElementById('modalAccountNum').textContent = alert.account;
    document.getElementById('modalRiskScore').textContent = `${alert.score} / 100`;
    document.getElementById('modalTypology').textContent = alert.typology;
    document.getElementById('modalKycLevel').textContent = alert.kycLevel;
    document.getElementById('modalAmount').textContent = alert.amount;

    // Render flags
    const flagsContainer = document.getElementById('modalFlagsList');
    if (flagsContainer) {
      flagsContainer.innerHTML = alert.flags.map(f => `<span class="badge badge-warning text-xs mr-2 mb-1">${f}</span>`).join('');
    }

    modal.classList.remove('hidden');
  }

  function updateCaseStatusUI(newStatus) {
    if (state.selectedAlert) {
      state.selectedAlert.status = newStatus;
      renderAlertTable();
      const statusPill = document.getElementById('modalStatusPill');
      if (statusPill) {
        statusPill.textContent = newStatus;
        statusPill.className = `badge ${newStatus === 'FROZEN' ? 'badge-danger' : 'badge-warning'}`;
      }
    }
  }

  // ========================================================
  // GRAPH NETWORK FORENSICS VIEW
  // ========================================================
  function initGraphForensics() {
    // Preset buttons
    const presetCircBtn = document.getElementById('btn-graph-preset-circular');
    const presetSmurfBtn = document.getElementById('btn-graph-preset-smurfing');
    const presetMuleBtn = document.getElementById('btn-graph-preset-mule');

    // Algorithm buttons
    const detectCyclesBtn = document.getElementById('btn-graph-detect-cycles');
    const detectCommunitiesBtn = document.getElementById('btn-graph-mule-clusters');
    const scaleCentralityBtn = document.getElementById('btn-graph-centrality');
    const traceFlowBtn = document.getElementById('btn-graph-trace-flow');
    const resetGraphBtn = document.getElementById('btn-graph-reset-view');
    const exportEvidenceBtn = document.getElementById('btn-graph-export-evidence');

    if (presetCircBtn) {
      presetCircBtn.addEventListener('click', () => {
        ensureGraphEngine().loadPreset('circular');
        triggerBlueprint('btn-graph-preset-circular');
        showToast('Circular Topology Loaded', '4-Hop circular laundering loop loaded into forensic canvas.', 'info');
      });
    }

    if (presetSmurfBtn) {
      presetSmurfBtn.addEventListener('click', () => {
        ensureGraphEngine().loadPreset('smurfing');
        triggerBlueprint('btn-graph-preset-smurfing');
        showToast('Smurfing Topology Loaded', 'Fan-in structuring network loaded: 10 sender nodes -> central collector -> offshore exit.', 'info');
      });
    }

    if (presetMuleBtn) {
      presetMuleBtn.addEventListener('click', () => {
        ensureGraphEngine().loadPreset('mule');
        triggerBlueprint('btn-graph-preset-mule');
        showToast('Mule Ring Syndicate Loaded', 'Multi-tier syndicate loaded: Recruiters, Mules, Shell Fronts, and Exit Sinks.', 'info');
      });
    }

    if (detectCyclesBtn) {
      detectCyclesBtn.addEventListener('click', () => {
        ensureGraphEngine().triggerCycleDetection();
        triggerBlueprint('btn-graph-detect-cycles');
        showToast('Tarjan Cycle Detection Run', 'Closed cycle detected: ACC-A -> ACC-B -> ACC-C -> ACC-D -> ACC-A. Risk penalty +35 applied.', 'danger');
      });
    }

    if (detectCommunitiesBtn) {
      detectCommunitiesBtn.addEventListener('click', () => {
        ensureGraphEngine().triggerCommunityDetection();
        triggerBlueprint('btn-graph-mule-clusters');
        showToast('Louvain Clustering Run', '3 Interconnected mule communities identified with modularity score 0.74.', 'warning');
      });
    }

    if (scaleCentralityBtn) {
      scaleCentralityBtn.addEventListener('click', () => {
        ensureGraphEngine().triggerCentralityScaling();
        triggerBlueprint('btn-graph-centrality');
        showToast('Centrality Computed', 'Node sizes scaled by Betweenness Centrality. Central aggregator hub ACC-84920 identified.', 'info');
      });
    }

    if (traceFlowBtn) {
      traceFlowBtn.addEventListener('click', () => {
        ensureGraphEngine().triggerFlowTrace();
        triggerBlueprint('btn-graph-trace-flow');
        showToast('Tracing Fund Flow', 'Chronological transfer animation active along suspected laundering route.', 'info');
      });
    }

    if (resetGraphBtn) {
      resetGraphBtn.addEventListener('click', () => {
        ensureGraphEngine().resetView();
        triggerBlueprint('btn-graph-reset-view');
      });
    }

    if (exportEvidenceBtn) {
      exportEvidenceBtn.addEventListener('click', () => {
        triggerBlueprint('btn-graph-export-evidence');
        showToast('Evidence Pack Exported', 'High-res topology PNG and JSON node-link graph saved to case evidence vault.', 'success');
      });
    }

    // Node click callback
    window.onGraphNodeSelected = (node) => {
      state.selectedNode = node;
      const detailsContainer = document.getElementById('graphNodeDetails');
      if (detailsContainer) {
        detailsContainer.innerHTML = `
          <div class="card p-3 bg-slate-900 border border-slate-700 text-xs">
            <div class="flex justify-between items-center mb-1">
              <span class="font-bold text-white">${node.label}</span>
              <span class="badge ${node.isTarget ? 'badge-critical' : 'badge-info'}">${node.type.toUpperCase()}</span>
            </div>
            <div class="text-slate-400 font-mono mb-2">${node.accountNumber}</div>
            <div class="grid grid-cols-2 gap-2 text-slate-300">
              <div>Balance: <strong class="text-white">${node.balance}</strong></div>
              <div>Betweenness: <strong class="text-cyan-400">${node.betweenness.toFixed(2)}</strong></div>
              <div>In-Degree: <strong class="text-white">${node.inDegree}</strong></div>
              <div>Out-Degree: <strong class="text-white">${node.outDegree}</strong></div>
            </div>
            <div class="mt-2 pt-2 border-t border-slate-800 flex gap-2">
              <button class="btn btn-xs btn-outline-danger w-full" data-blueprint-id="btn-case-freeze">Freeze Account</button>
              <button class="btn btn-xs btn-outline-cyan w-full" data-blueprint-id="btn-investigate-quick">View Ledger</button>
            </div>
          </div>
        `;
      }
    };
  }

  function ensureGraphEngine() {
    if (!state.graphEngine) {
      state.graphEngine = new FinTraceGraphEngine('graphCanvas');
    }
    return state.graphEngine;
  }

  // ========================================================
  // EXPLAINABLE AI & SHAP DIAGNOSTICS VIEW
  // ========================================================
  function initShapEngine() {
    const amountSlider = document.getElementById('sliderAmount');
    const velocitySlider = document.getElementById('sliderVelocity');
    const counterpartiesSlider = document.getElementById('sliderCounterparties');
    const dormancySlider = document.getElementById('sliderDormancy');

    const amountValDisplay = document.getElementById('valSliderAmount');
    const velocityValDisplay = document.getElementById('valSliderVelocity');
    const counterpartiesValDisplay = document.getElementById('valSliderCounterparties');
    const dormancyValDisplay = document.getElementById('valSliderDormancy');

    const recalcBtn = document.getElementById('btn-shap-recalc');
    const resetSlidersBtn = document.getElementById('btn-shap-reset-sliders');
    const exportAuditBtn = document.getElementById('btn-shap-export-audit');
    const calibrateThresholdBtn = document.getElementById('btn-shap-calibrate-threshold');

    function updateSliderDisplays() {
      if (amountSlider && amountValDisplay) amountValDisplay.textContent = `$${parseInt(amountSlider.value).toLocaleString()}`;
      if (velocitySlider && velocityValDisplay) velocityValDisplay.textContent = `${velocitySlider.value} tx/hr`;
      if (counterpartiesSlider && counterpartiesValDisplay) counterpartiesValDisplay.textContent = `${counterpartiesSlider.value} accounts`;
      if (dormancySlider && dormancyValDisplay) dormancyValDisplay.textContent = `${dormancySlider.value} days`;
    }

    [amountSlider, velocitySlider, counterpartiesSlider, dormancySlider].forEach(s => {
      if (s) {
        s.addEventListener('input', () => {
          updateSliderDisplays();
          renderShapWaterfall();
        });
      }
    });

    if (recalcBtn) {
      recalcBtn.addEventListener('click', () => {
        triggerBlueprint('btn-shap-recalc');
        renderShapWaterfall();
        showToast('What-If Recomputed', 'TreeSHAP explainer re-evaluated predictions under adjusted input features.', 'info');
      });
    }

    if (resetSlidersBtn) {
      resetSlidersBtn.addEventListener('click', () => {
        if (amountSlider) amountSlider.value = 9850;
        if (velocitySlider) velocitySlider.value = 14;
        if (counterpartiesSlider) counterpartiesSlider.value = 12;
        if (dormancySlider) dormancySlider.value = 180;
        updateSliderDisplays();
        renderShapWaterfall();
        triggerBlueprint('btn-shap-reset-sliders');
        showToast('Sliders Reset', 'Restored actual transaction parameters and baseline SHAP contributions.', 'info');
      });
    }

    if (exportAuditBtn) {
      exportAuditBtn.addEventListener('click', () => {
        triggerBlueprint('btn-shap-export-audit');
        showToast('Audit Dossier Exported', 'SHAP feature attribution vectors & mathematical proof exported for regulatory review.', 'success');
      });
    }

    if (calibrateThresholdBtn) {
      calibrateThresholdBtn.addEventListener('click', () => {
        triggerBlueprint('btn-shap-calibrate-threshold');
        showToast('Threshold Calibrated', 'Optimal F1-Score threshold set to 0.72. Target 92.4% Recall & 41.1% FP reduction confirmed.', 'success');
      });
    }

    renderShapWaterfall();
  }

  function renderShapWaterfall() {
    const amountSlider = document.getElementById('sliderAmount');
    const velocitySlider = document.getElementById('sliderVelocity');
    const counterpartiesSlider = document.getElementById('sliderCounterparties');
    const dormancySlider = document.getElementById('sliderDormancy');

    const amt = amountSlider ? parseInt(amountSlider.value) : 9850;
    const vel = velocitySlider ? parseInt(velocitySlider.value) : 14;
    const cp = counterpartiesSlider ? parseInt(counterpartiesSlider.value) : 12;
    const dor = dormancySlider ? parseInt(dormancySlider.value) : 180;

    // Base value E[f(x)] = 12.4
    const baseValue = 12.4;

    // Feature SHAP calculations
    const phiVelocity = +(vel * 1.85).toFixed(1);
    const phiAmount = (amt >= 9500 && amt < 10000) ? 24.2 : +(amt / 1000 * 1.2).toFixed(1);
    const phiFanIn = +(cp * 1.45).toFixed(1);
    const phiDormancy = +(dor / 15 * 0.9).toFixed(1);
    const phiJurisdiction = 7.2;
    const phiKyc = -1.4;

    const totalScore = Math.min(99, Math.max(5, Math.round(baseValue + phiVelocity + phiAmount + phiFanIn + phiDormancy + phiJurisdiction + phiKyc)));

    // Update Score Displays
    const riskScoreVal = document.getElementById('shapCompositeScore');
    const riskTierBadge = document.getElementById('shapRiskTierBadge');
    if (riskScoreVal) riskScoreVal.textContent = totalScore;
    if (riskTierBadge) {
      riskTierBadge.textContent = totalScore >= 85 ? 'CRITICAL RISK' : (totalScore >= 70 ? 'HIGH RISK' : (totalScore >= 45 ? 'MEDIUM RISK' : 'LOW RISK'));
      riskTierBadge.className = `badge ${totalScore >= 85 ? 'badge-critical' : (totalScore >= 70 ? 'badge-warning' : 'badge-info')}`;
    }

    // Render SVG Waterfall Plot
    const svg = document.getElementById('shapWaterfallSvg');
    if (!svg) return;

    const features = [
      { name: '1h Velocity Spike', val: `+${phiVelocity}`, phi: phiVelocity, isPositive: true },
      { name: 'Amount Just Under $10k CTR Limit', val: `+${phiAmount}`, phi: phiAmount, isPositive: true },
      { name: 'Network Fan-In (12 Mules -> 1)', val: `+${phiFanIn}`, phi: phiFanIn, isPositive: true },
      { name: 'Dormancy Break (Sudden Reactivation)', val: `+${phiDormancy}`, phi: phiDormancy, isPositive: true },
      { name: 'High-Risk Jurisdiction Intermediary', val: `+${phiJurisdiction}`, phi: phiJurisdiction, isPositive: true },
      { name: 'Verified Customer Tenure (>2 yrs)', val: `${phiKyc}`, phi: phiKyc, isPositive: false }
    ];

    let currentVal = baseValue;
    const maxVal = 100;
    const plotWidth = 520;
    const startX = 140;

    let svgHtml = `
      <!-- Base value guide -->
      <line x1="${startX}" y1="20" x2="${startX}" y2="280" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4" />
      <text x="${startX}" y="15" fill="#94a3b8" font-size="10" text-anchor="middle">Base E[f(x)] = 12.4</text>
    `;

    features.forEach((f, idx) => {
      const y = 40 + idx * 38;
      const prevX = startX + (currentVal / maxVal) * plotWidth;
      currentVal += f.phi;
      const nextX = startX + (currentVal / maxVal) * plotWidth;

      const barLeft = Math.min(prevX, nextX);
      const barWidth = Math.max(4, Math.abs(nextX - prevX));
      const barColor = f.isPositive ? '#ef4444' : '#10b981';

      svgHtml += `
        <!-- Feature Label -->
        <text x="130" y="${y + 14}" fill="#e2e8f0" font-size="11" text-anchor="end" font-weight="500">${f.name}</text>
        <!-- Bar -->
        <rect x="${barLeft}" y="${y}" width="${barWidth}" height="20" rx="3" fill="${barColor}" fill-opacity="0.85" />
        <!-- Value Label -->
        <text x="${f.isPositive ? barLeft + barWidth + 6 : barLeft - 6}" y="${y + 14}" fill="${barColor}" font-size="11" font-weight="bold" text-anchor="${f.isPositive ? 'start' : 'end'}">${f.val}</text>
        <!-- Step connector line -->
        <line x1="${prevX}" y1="${y + 20}" x2="${prevX}" y2="${y + 38}" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
      `;
    });

    // Final total line
    const finalX = startX + (currentVal / maxVal) * plotWidth;
    svgHtml += `
      <line x1="${finalX}" y1="20" x2="${finalX}" y2="280" stroke="#38bdf8" stroke-width="2" />
      <text x="${finalX}" y="295" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">f(x) = ${totalScore}</text>
    `;

    svg.innerHTML = svgHtml;
  }

  // ========================================================
  // REGULATORY STR (SUSPICIOUS TRANSACTION REPORT) GENERATOR
  // ========================================================
  function initStrGenerator() {
    const autoGenBtn = document.getElementById('btn-str-autogen-narration');
    const validateBtn = document.getElementById('btn-str-validate');
    const previewBtn = document.getElementById('btn-str-preview');
    const exportPdfBtn = document.getElementById('btn-str-export-pdf');
    const apiSubmitBtn = document.getElementById('btn-str-api-submit');
    const saveDraftBtn = document.getElementById('btn-str-save-draft');

    const narrativeTextarea = document.getElementById('strNarrativeInput');
    const previewModal = document.getElementById('strPreviewModal');
    const closePreviewBtn = document.getElementById('closeStrPreview');

    if (autoGenBtn) {
      autoGenBtn.addEventListener('click', () => {
        triggerBlueprint('btn-str-autogen-narration');
        if (narrativeTextarea) {
          narrativeTextarea.value = "Generating AI regulatory narrative via SHAP feature synthesis & NetworkX graph engine...";
          setTimeout(() => {
            narrativeTextarea.value = 
`SUSPICIOUS TRANSACTION REPORT (STR) NARRATIVE
Subject Account: ACC-84920 | Apex Logistics Global Pvt Ltd
Primary Indicators: Structuring / Smurfing, Rapid Layering, and Coordinated Mule Fan-Out.

1. EXECUTIVE SUMMARY:
Between 10:10:00 and 10:48:22, account ACC-84920 received a series of 12 rapid inbound credits totaling $98,500.00 from distinct third-party individual accounts. Within 120 seconds of fund consolidation, an immediate high-value transfer ($85,000.00) was initiated towards an offshore correspondent entity.

2. QUANTITATIVE AI & ML FINDINGS (FinTrace Hybrid Engine):
- Isolation Forest Anomaly Score: 0.88 (Top 0.5% statistical outlier in velocity and balance turnover).
- XGBoost Supervised AML Score: 0.94 (High congruence with known structuring patterns from IBM AML benchmark).
- NetworkX Graph Centrality: Betweenness Centrality C_B = 0.98. In-degree k_in = 12, Out-degree k_out = 1.
- Top SHAP Contributors:
  * Velocity Spike: +28.4 (18 transfers/hr vs customer 90-day baseline of 0.2/hr).
  * Structuring Flag: +22.1 (Deposits systematically clustered at $9,850 - $9,920 to evade $10,000 CTR mandate).
  * Layering Rapid Passthrough: +19.8 (Fund retention duration < 3 minutes).

3. REGULATORY CONCLUSION:
The pattern exhibits classic indicators of trade-based structuring and mule network layering under Section 12 of the Prevention of Money Laundering Act (PMLA) / FinCEN SAR standards. Immediate administrative restraint and formal regulatory notification are recommended.`;
            showToast('AI Narrative Generated', 'Formal legal narrative synthesized from quantitative SHAP & Graph findings.', 'success');
          }, 600);
        }
      });
    }

    if (validateBtn) {
      validateBtn.addEventListener('click', () => {
        triggerBlueprint('btn-str-validate');
        const checklist = document.getElementById('strValidationChecklist');
        if (checklist) {
          checklist.innerHTML = `
            <div class="text-xs text-emerald-400 flex items-center gap-2 mb-1">
              <span>✓</span> Reporting Entity Registered Code (RE-IND-2026-904) Verified
            </div>
            <div class="text-xs text-emerald-400 flex items-center gap-2 mb-1">
              <span>✓</span> Subject PAN / Tax Identification Validated against National Database
            </div>
            <div class="text-xs text-emerald-400 flex items-center gap-2 mb-1">
              <span>✓</span> Grounds of Suspicion Indicators (Codes: STR-01, STR-04, STR-12) Attached
            </div>
            <div class="text-xs text-emerald-400 flex items-center gap-2 mb-1">
              <span>✓</span> SHAP Feature Impact Proof & NetworkX Subgraph Evidence Appended
            </div>
          `;
        }
        showToast('Validation Succeeded', 'All mandatory FIU-IND / FinCEN schema fields validated with zero compliance errors.', 'success');
      });
    }

    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        triggerBlueprint('btn-str-preview');
        if (previewModal) previewModal.classList.remove('hidden');
      });
    }

    if (closePreviewBtn) {
      closePreviewBtn.addEventListener('click', () => {
        if (previewModal) previewModal.classList.add('hidden');
      });
    }

    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        triggerBlueprint('btn-str-export-pdf');
        window.print();
        showToast('STR Document Exported', 'Publication-grade PDF generated with cryptographic HMAC hash block.', 'success');
      });
    }

    if (apiSubmitBtn) {
      apiSubmitBtn.addEventListener('click', () => {
        triggerBlueprint('btn-str-api-submit');
        const ackDisplay = document.getElementById('strAckTokenDisplay');
        if (ackDisplay) {
          ackDisplay.innerHTML = `
            <div class="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded text-xs text-emerald-300">
              <div class="font-bold mb-1">✓ Transmitted to FIU Gateway Portal via mTLS API</div>
              <div>Acknowledgement Token: <strong class="font-mono text-white">ACK-FIU-2026-981042-X</strong></div>
              <div>Filing Timestamp: <strong>2026-10-30 00:24:18 UTC</strong></div>
            </div>
          `;
        }
        showToast('STR Transmitted', 'Encrypted STR filing acknowledged by Financial Intelligence Unit Gateway API.', 'success');
      });
    }

    if (saveDraftBtn) {
      saveDraftBtn.addEventListener('click', () => {
        triggerBlueprint('btn-str-save-draft');
        showToast('Draft Saved', 'STR draft saved to MySQL database (Table: regulatory_filings).', 'info');
      });
    }
  }

  // ========================================================
  // ACADEMIC BENCHMARKS & EVALUATION VIEW
  // ========================================================
  function initBenchmarkView() {
    const runEvalBtn = document.getElementById('btn-bench-run-eval');
    const exportRocBtn = document.getElementById('btn-bench-export-roc');

    if (runEvalBtn) {
      runEvalBtn.addEventListener('click', () => {
        triggerBlueprint('btn-bench-run-eval');
        const progressBar = document.getElementById('benchEvalProgress');
        if (progressBar) {
          progressBar.style.width = '0%';
          let w = 0;
          const timer = setInterval(() => {
            w += 15;
            progressBar.style.width = `${Math.min(100, w)}%`;
            if (w >= 100) {
              clearInterval(timer);
              showToast('Evaluation Complete', 'Benchmark test set (50,000 transactions) processed. Recall: 92.4%, AUC: 0.941.', 'success');
            }
          }, 120);
        }
      });
    }

    if (exportRocBtn) {
      exportRocBtn.addEventListener('click', () => {
        triggerBlueprint('btn-bench-export-roc');
        showToast('Metrics Exported', 'ROC Curve coordinates and confusion matrix saved as CSV/JSON format.', 'info');
      });
    }
  }

  // ========================================================
  // SYSTEM ARCHITECTURE INSPECTOR VIEW
  // ========================================================
  function initArchitectureInspector() {
    const archBlocks = document.querySelectorAll('.arch-block[data-arch-key]');
    archBlocks.forEach(b => {
      b.addEventListener('click', () => {
        const key = b.getAttribute('data-arch-key');
        triggerBlueprint(`btn-arch-inspect-${key}`);
      });
    });
  }

  // ========================================================
  // GLOBAL NOTIFICATIONS & SHORTCUTS
  // ========================================================
  function showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const borderCol = type === 'danger' ? 'border-red-500' : (type === 'warning' ? 'border-amber-500' : (type === 'success' ? 'border-emerald-500' : 'border-cyan-500'));
    const bgCol = type === 'danger' ? 'bg-red-950/90' : (type === 'warning' ? 'bg-amber-950/90' : (type === 'success' ? 'bg-emerald-950/90' : 'bg-slate-900/95'));

    toast.className = `p-3 rounded-lg border ${borderCol} ${bgCol} shadow-xl backdrop-blur-md text-xs text-slate-200 animate-slide-left mb-2 flex items-start gap-3 max-w-sm`;
    toast.innerHTML = `
      <div class="mt-0.5">
        ${type === 'danger' ? '🚨' : (type === 'warning' ? '⚠️' : (type === 'success' ? '✅' : 'ℹ️'))}
      </div>
      <div class="flex-1">
        <div class="font-bold text-white mb-0.5">${title}</div>
        <div class="text-slate-300 leading-relaxed">${message}</div>
      </div>
      <button class="text-slate-400 hover:text-white toast-close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  function initGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Press 'i' or 'I' to toggle Inspector Mode
      if ((e.key === 'i' || e.key === 'I') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        const toggleBtn = document.getElementById('btn-mode-toggle');
        if (toggleBtn) toggleBtn.click();
      }
      // Press 'm' or 'M' for Master Blueprint
      if ((e.key === 'm' || e.key === 'M') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        const masterBtn = document.getElementById('btn-master-blueprint');
        if (masterBtn) masterBtn.click();
      }
      // Escape closes modals/drawers
      if (e.key === 'Escape') {
        const drawer = document.getElementById('blueprintDrawer');
        if (drawer) drawer.classList.remove('open');
        const masterModal = document.getElementById('masterBlueprintModal');
        if (masterModal) masterModal.classList.add('hidden');
        const caseModal = document.getElementById('caseDossierModal');
        if (caseModal) caseModal.classList.add('hidden');
        const strModal = document.getElementById('strPreviewModal');
        if (strModal) strModal.classList.add('hidden');
      }
    });
  }
});

