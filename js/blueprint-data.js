/**
 * FinTrace: AI-Based Financial Transaction Monitoring for Anti-Money Laundering Detection
 * Nutan Maharashtra Institute of Engineering & Technology (NMIET), Pune - Dept of IT
 * Master Implementation Blueprint Registry
 * 
 * Maps every button, interactive control, and action in the application to:
 * 1. Target Destination / Action
 * 2. Phased Implementation Roadmap (Weeks 1-13)
 * 3. Frontend Execution & State Flow
 * 4. Backend REST API Endpoint (FastAPI)
 * 5. Backend Logic & Services
 * 6. Database Operations (MySQL & Redis)
 * 7. AI/ML/Graph Algorithms (Isolation Forest, XGBoost, NetworkX, SHAP)
 * 8. Security, RBAC & Audit Compliance
 */

const IMPLEMENTATION_BLUEPRINTS = {
  // ==========================================
  // GLOBAL & NAVIGATION CONTROLS
  // ==========================================
  "btn-mode-toggle": {
    id: "btn-mode-toggle",
    title: "Toggle Presentation Inspector Mode",
    category: "Global Navigation & Inspector",
    destination: "Toggles UI between Live Interactive Demo and Technical Blueprint Inspector Drawer",
    phase: "Phase 1 (Weeks 1–2): UI Framework & Analyst Shell",
    frontendImpl: "Toggles application state `state.inspectorModeActive`. When true, overlays subtle glowing blueprint badges on all actionable DOM elements, binds click interceptors to trigger the Slide-Over Technical Blueprint Inspector, and displays real-time architecture telemetry.",
    backendEndpoint: "N/A (Client-Side State Persistence via localStorage / SessionPreferences)",
    backendLogic: "Optional preference sync via `PUT /api/v1/analysts/me/preferences` storing `ui_mode: 'inspector'` in user profile JSON column.",
    databaseOps: "MySQL `users.preferences` JSON update; Redis user session cache invalidation.",
    mlGraphEngine: "Provides live hooks to inspect ML model weights and Graph engine state at runtime.",
    securityAudit: "Logged locally in browser session storage; role check ensures analyst has clearance to view internal architecture endpoints."
  },

  "btn-master-blueprint": {
    id: "btn-master-blueprint",
    title: "Open Master Implementation Blueprint Modal",
    category: "Global Navigation & Inspector",
    destination: "Full-Screen Interactive System Architecture & Phased Implementation Modal",
    phase: "Phase 5 (Weeks 11–13): System Integration & Documentation",
    frontendImpl: "Mounts `#masterBlueprintModal` in DOM with animated blur backdrop. Renders searchable tabs for All 35+ System Actions, API Directory, MySQL Schemas, ML Models, and 13-Week Phased Milestones with instant keyword filtering.",
    backendEndpoint: "GET /api/v1/system/implementation-spec",
    backendLogic: "FastAPI endpoint returning OpenAPI JSON documentation and structured milestone metadata generated from backend code introspection.",
    databaseOps: "Reads system configuration from `system_metadata` table; cached in Redis with TTL 3600s.",
    mlGraphEngine: "Aggregates pipeline metadata: model versions (XGBoost v1.4, IsolationForest v0.2), graph algorithm parameters, and SHAP explainer configurations.",
    securityAudit: "Requires `ROLE_COMPLIANCE_ANALYST` or `ROLE_SYSTEM_AUDITOR` via OAuth2 Bearer token."
  },

  "btn-download-pdf-spec": {
    id: "btn-download-pdf-spec",
    title: "Download Technical Implementation Blueprint PDF",
    category: "Global Documentation & Academic Specs",
    destination: "Downloads the comprehensive 9-page technical implementation blueprint PDF (FinTrace_Implementation_Blueprint.pdf)",
    phase: "Phase 5 (Weeks 11–13): System Integration & Documentation",
    frontendImpl: "Direct browser download trigger of the publication-grade PDF file with Content-Disposition attachment header.",
    backendEndpoint: "GET /api/v1/system/docs/implementation-blueprint.pdf",
    backendLogic: "FastAPI FileResponse stream returning the binary PDF generated via ReportLab.",
    databaseOps: "Logged in `document_download_logs` table in MySQL.",
    mlGraphEngine: "Contains complete mathematical proofs and formulations for Isolation Forest, XGBoost, NetworkX, and TreeSHAP.",
    securityAudit: "Academic documentation clearance; public verification asset."
  },

  "btn-nav-dashboard": {
    id: "btn-nav-dashboard",
    title: "Navigate: Executive AML Overview (Dashboard)",
    category: "Global Navigation",
    destination: "Switches main viewport to View #1: Executive AML Overview",
    phase: "Phase 1 (Weeks 1–2) & Phase 5 (Weeks 11–13)",
    frontendImpl: "Updates URL hash to `#/dashboard`, activates sidebar tab, transitions `#view-dashboard` into view with fade-in CSS keyframes, and initiates polling / WebSocket subscription for live transaction counters.",
    backendEndpoint: "GET /api/v1/dashboard/metrics",
    backendLogic: "FastAPI aggregated metrics service executing parallel coroutines (`asyncio.gather`) to pull real-time ingestion counters, alert severities, and 24h false positive reduction benchmarks.",
    databaseOps: "Queries MySQL: `SELECT COUNT(*) FROM transactions WHERE created_at >= NOW() - INTERVAL 24 HOUR`, `SELECT severity, COUNT(*) FROM alerts GROUP BY severity`; pulls instantaneous velocity rates from Redis key `stats:tx_velocity_1m`.",
    mlGraphEngine: "Retrieves 24-hour average anomaly score distribution from ML inference cache.",
    securityAudit: "Authenticated session validation; logs navigation event in `analyst_activity_logs`."
  },

  "btn-nav-alerts": {
    id: "btn-nav-alerts",
    title: "Navigate: Alert Queue & Case Investigation",
    category: "Global Navigation",
    destination: "Switches main viewport to View #2: Prioritized Alert Queue",
    phase: "Phase 1 (Weeks 1–2) & Phase 4 (Weeks 8–10)",
    frontendImpl: "Transitions to `#view-alerts`, loads paginated alert table, initializes multi-criteria filter state (Risk Tier, Typology, Status), and attaches row click handlers for deep case inspection.",
    backendEndpoint: "GET /api/v1/alerts?status=open&page=1&limit=25",
    backendLogic: "FastAPI controller executing indexed query with SQL filter clauses, applying risk score descending sort, joining customer KYC metadata, and computing pagination cursors.",
    databaseOps: "MySQL: `SELECT a.*, c.customer_name, c.kyc_risk_level FROM alerts a JOIN accounts ac ON a.account_id = ac.account_id JOIN customers c ON ac.customer_id = c.customer_id WHERE a.status = 'OPEN' ORDER BY a.risk_score DESC LIMIT 25 OFFSET 0`.",
    mlGraphEngine: "Fetches stored SHAP top-factor tags and NetworkX graph risk scores for table badge rendering.",
    securityAudit: "Enforces row-level security ensuring compliance analysts only access alerts within their assigned operational branch."
  },

  "btn-nav-graph": {
    id: "btn-nav-graph",
    title: "Navigate: Graph Network Forensics",
    category: "Global Navigation",
    destination: "Switches main viewport to View #3: Interactive Graph Network Explorer",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & NetworkX Cycle/Mule Engine",
    frontendImpl: "Transitions to `#view-graph`, initializes HTML5 Canvas / WebGL force-directed layout engine, sets up zoom/pan transform matrix, and loads default suspect transaction cluster.",
    backendEndpoint: "GET /api/v1/graph/subgraph?focus_account=ACC-84920&depth=3",
    backendLogic: "FastAPI endpoint invoking `NetworkXGraphService.get_ego_subgraph(account_id, radius=3)`. Converts in-memory MultiDiGraph to JSON node-link format containing account metadata, edge amounts, timestamps, and cycle tags.",
    databaseOps: "Queries `transactions` table for 3-hop sender-receiver relationships: `SELECT source_account, dest_account, amount, tx_timestamp FROM transactions WHERE source_account IN (...) OR dest_account IN (...)`.",
    mlGraphEngine: "Executes NetworkX `simple_cycles()` to identify circular laundering loops and `louvain_communities()` to group mule clusters.",
    securityAudit: "Audit log records forensic graph access on account `ACC-84920` for regulatory compliance."
  },

  "btn-nav-shap": {
    id: "btn-nav-shap",
    title: "Navigate: Explainable AI & SHAP Diagnostics",
    category: "Global Navigation",
    destination: "Switches main viewport to View #4: TreeSHAP Feature Contribution Engine",
    phase: "Phase 4 (Weeks 8–10): Explainability & SHAP Waterfall Integration",
    frontendImpl: "Transitions to `#view-shap`, renders interactive SVG SHAP Waterfall plot and horizontal feature contribution bars, and initializes interactive What-If simulation sliders.",
    backendEndpoint: "GET /api/v1/explainability/shap?tx_id=TX-984210",
    backendLogic: "FastAPI endpoint querying precomputed SHAP values for the specified transaction from Redis or invoking `TreeExplainer(xgboost_model).shap_values(feature_vector)` dynamically.",
    databaseOps: "Reads `shap_explanations` table or retrieves cached JSON vector from Redis key `shap:tx:TX-984210`.",
    mlGraphEngine: "Computes base value $E[f(x)]$, local feature contribution $\\phi_i$, and model confidence intervals for transparent decision auditing.",
    securityAudit: "Immutable explanation logs stored to guarantee non-repudiation during regulatory audits (FATF / FinCEN)."
  },

  "btn-nav-str": {
    id: "btn-nav-str",
    title: "Navigate: Regulatory STR Generator",
    category: "Global Navigation",
    destination: "Switches main viewport to View #5: Suspicious Transaction Report Workspace",
    phase: "Phase 5 (Weeks 11–13): Reporting, STR Generation & Audit Export",
    frontendImpl: "Transitions to `#view-str`, auto-loads active case dossier into structured regulatory form (Reporting Entity, Suspect KYC, Typology Grounds, Transaction Logs), and prepares PDF previewer.",
    backendEndpoint: "GET /api/v1/cases/ALT-2026-9042/str-draft",
    backendLogic: "FastAPI service assembling customer identity records, aggregated transaction velocity summaries, and ML-generated narrative draft into a standardized FIU-IND / FinCEN schema.",
    databaseOps: "MySQL: `SELECT * FROM cases c JOIN customers cu ON c.customer_id = cu.customer_id WHERE c.case_id = 'ALT-2026-9042'`; loads transaction ledger rows.",
    mlGraphEngine: "NLP summarization model synthesizes SHAP feature impacts and NetworkX graph cycle paths into a human-readable legal narrative.",
    securityAudit: "Restricted to authorized compliance officers; digital signature token generated for filing verification."
  },

  "btn-nav-benchmark": {
    id: "btn-nav-benchmark",
    title: "Navigate: ML vs Rule Benchmark Metrics",
    category: "Global Navigation",
    destination: "Switches main viewport to View #6: Academic & Performance Benchmark",
    phase: "Phase 3 (Weeks 5–7): Model Evaluation & Slide 10 Target Verification",
    frontendImpl: "Transitions to `#view-benchmark`, renders ROC curves, Precision-Recall curves, confusion matrices, and empirical comparison tables (FinTrace Hybrid vs Rule-Based).",
    backendEndpoint: "GET /api/v1/models/benchmark-metrics",
    backendLogic: "FastAPI endpoint returning benchmark test-set evaluation results on IBM Synthetic AML and Elliptic datasets (AUC-ROC, Recall, Precision, False Positive Rate).",
    databaseOps: "Reads historical evaluation runs from `model_evaluations` table; cache TTL 24h.",
    mlGraphEngine: "Loads scikit-learn & XGBoost test evaluation matrices; displays comparative metric: 92.4% Recall (Target >=90%) and 41.1% False Positive reduction.",
    securityAudit: "Read-only access for technical review board and academic evaluators."
  },

  "btn-nav-architecture": {
    id: "btn-nav-architecture",
    title: "Navigate: System Architecture & Data Pipeline",
    category: "Global Navigation",
    destination: "Switches main viewport to View #7: Slide 7 Interactive Architecture Map",
    phase: "Phase 1 (Weeks 1–2): Architecture Setup & Technology Stack",
    frontendImpl: "Transitions to `#view-architecture`, renders interactive high-level system diagram mapping Data Feed -> FastAPI Ingestion -> Redis -> ML/Graph Engine -> MySQL -> React Dashboard.",
    backendEndpoint: "GET /api/v1/system/health-topology",
    backendLogic: "FastAPI health check service probing connectivity to Redis cluster, MySQL database pool, ML inference worker threads, and NetworkX memory cache.",
    databaseOps: "Executes `SELECT 1` on MySQL connection pool; sends `PING` to Redis instance; reports latencies.",
    mlGraphEngine: "Reports model inference worker statuses and GPU/CPU resource utilization.",
    securityAudit: "Provides compliance officers and IT architects visibility into data lineage and pipeline boundaries."
  },

  // ==========================================
  // DASHBOARD CONTROLS
  // ==========================================
  "btn-stream-toggle": {
    id: "btn-stream-toggle",
    title: "Pause / Resume Live Streaming Simulation",
    category: "Dashboard & Streaming Ingestion",
    destination: "Toggles live simulated transaction ingestion stream in the Dashboard Feed",
    phase: "Phase 1 (Weeks 1–2): Simulated Stream & Queue Ingestion",
    frontendImpl: "Toggles timer interval `state.streamActive`. Updates button icon between Pause and Play. When playing, dynamically inserts simulated transaction rows with real-time risk scoring into the live feed table.",
    backendEndpoint: "POST /api/v1/stream/control (action: 'pause' | 'resume')",
    backendLogic: "FastAPI WebSocket / Server-Sent Events (SSE) manager pausing/resuming Kafka consumer / Redis Pub/Sub stream worker for the client session.",
    databaseOps: "Streaming worker consumes from Redis Stream `stream:transactions_inbound`; updates session ingestion state.",
    mlGraphEngine: "Worker feeds each incoming transaction through the real-time feature extraction pipeline and Isolation Forest / XGBoost scoring pipeline.",
    securityAudit: "Session heartbeat maintained; rate limits applied to prevent client socket saturation."
  },

  "btn-stream-speed": {
    id: "btn-stream-speed",
    title: "Cycle Streaming Speed (1x / 5x / 10x)",
    category: "Dashboard & Streaming Ingestion",
    destination: "Adjusts simulated transaction velocity generator rate",
    phase: "Phase 1 (Weeks 1–2): Stream Simulation & Load Testing",
    frontendImpl: "Cycles streaming interval (1000ms -> 300ms -> 100ms), updates speed badge UI, and simulates high-throughput transaction burst.",
    backendEndpoint: "POST /api/v1/stream/rate-limit?rate=50",
    backendLogic: "Controls synthetic transaction generator rate limiter in background Celery / asyncio worker.",
    databaseOps: "Adjusts batch write buffer size to MySQL from 10 tx/batch to 100 tx/batch using `executemany()` for bulk inserts.",
    mlGraphEngine: "Tests ML model throughput (benchmarking inference latency under load: target < 85ms per batch).",
    securityAudit: "Monitors memory usage and buffer pressure in Redis queue."
  },

  "btn-inject-smurfing": {
    id: "btn-inject-smurfing",
    title: "Inject Smurfing / Structuring Attack Pattern",
    category: "Dashboard Simulation & Demo",
    destination: "Injects 10 structured transactions just below the $10,000 threshold into the live feed",
    phase: "Phase 2 (Weeks 3–4): Feature Engineering (Velocity & Threshold Proximity)",
    frontendImpl: "Injects synthetic burst of 10 rapid transfers ($9,850, $9,920, $9,780...) to account `ACC-84920`. Triggers real-time alert toast and updates the Critical Alert counter.",
    backendEndpoint: "POST /api/v1/simulator/inject-pattern (typology: 'structuring')",
    backendLogic: "Backend simulator generates structured transaction payload from IBM AML synthetic dataset templates and pushes to Redis ingestion stream.",
    databaseOps: "Inserts 10 rows into `transactions` table; triggers Redis velocity counter `INCRBY` on customer rolling 1-hour window.",
    mlGraphEngine: "XGBoost model detects structuring feature `amount_below_ctr_flag = 1` and `1h_velocity > 8`, outputting high risk probability (0.94).",
    securityAudit: "Tagged as `SIMULATION_BURST` in transaction audit log so test data can be segregated."
  },

  "btn-inject-mule": {
    id: "btn-inject-mule",
    title: "Inject Mule Network Fan-Out Attack",
    category: "Dashboard Simulation & Demo",
    destination: "Injects 1 central deposit followed by immediate dispersion to 8 mule accounts",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & Mule Detection",
    frontendImpl: "Dispatches a fan-out transaction event into the live stream, highlights the graph network view, and triggers an automated AML alert card.",
    backendEndpoint: "POST /api/v1/simulator/inject-pattern (typology: 'mule_fanout')",
    backendLogic: "Generates 1 high-value credit ($85,000) followed by 8 rapid micro-debits within 180 seconds. Enqueues graph analysis task.",
    databaseOps: "Writes transactions to MySQL; updates account balances; enqueues accounts into Redis `queue:graph_recompute`.",
    mlGraphEngine: "NetworkX detects high out-degree to in-degree ratio (`fan_out_ratio > 5.0`) within short temporal window ($< 10$ mins), triggering mule flag.",
    securityAudit: "Generates automated high-severity alert in `alerts` table with initial status `OPEN`."
  },

  "btn-inject-circular": {
    id: "btn-inject-circular",
    title: "Inject Circular Layering Flow Pattern",
    category: "Dashboard Simulation & Demo",
    destination: "Injects a 4-node circular transfer loop (Account A -> B -> C -> D -> A)",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & Cycle Detection",
    frontendImpl: "Injects circular transaction chain into the feed. Immediately triggers visual notification with deep-link to the Graph Forensics View.",
    backendEndpoint: "POST /api/v1/simulator/inject-pattern (typology: 'circular_loop')",
    backendLogic: "Executes directed transaction sequence across 4 intermediary accounts with slight fee deductions at each hop ($50,000 -> $49,500 -> $49,000 -> $48,500 -> $48,000).",
    databaseOps: "Bulk writes transactions with linked trace IDs in `transactions` table.",
    mlGraphEngine: "NetworkX graph engine runs `nx.simple_cycles()` on directed transaction graph, detects closed loop of length 4, and flags as classic layering.",
    securityAudit: "Immediate CRITICAL risk classification (Score: 96/100) recorded in compliance audit ledger."
  },

  "btn-investigate-quick": {
    id: "btn-investigate-quick",
    title: "Quick Investigate Top Flagged Alert",
    category: "Dashboard & Alerts",
    destination: "Opens the Full Case Dossier Modal for Critical Alert ALT-2026-9042",
    phase: "Phase 1 (Weeks 1–2) & Phase 5 (Weeks 11–13)",
    frontendImpl: "Opens `#caseDossierModal`, selects alert `ALT-2026-9042`, populates customer KYC details, transaction timeline, and initializes action buttons.",
    backendEndpoint: "GET /api/v1/cases/ALT-2026-9042",
    backendLogic: "FastAPI case management service returning consolidated dossier: transaction ledger, customer identity, historical risk baseline, and forensic graph references.",
    databaseOps: "MySQL: `SELECT * FROM cases WHERE case_id = 'ALT-2026-9042'`; `SELECT * FROM transactions WHERE case_id = 'ALT-2026-9042' ORDER BY tx_timestamp DESC`.",
    mlGraphEngine: "Loads persisted SHAP explanation vectors and graph centrality metrics for UI rendering.",
    securityAudit: "Logs analyst case view event in `case_access_logs` with timestamp and IP address."
  },

  // ==========================================
  // ALERT QUEUE & CASE MANAGEMENT
  // ==========================================
  "btn-filter-all": {
    id: "btn-filter-all",
    title: "Filter: All Active Alerts",
    category: "Alert Queue & Filters",
    destination: "Displays all open alerts without severity restrictions",
    phase: "Phase 1 (Weeks 1–2): Dashboard & Queue Filtering",
    frontendImpl: "Clears active severity filters, updates pill button active states, and re-renders the complete alert table.",
    backendEndpoint: "GET /api/v1/alerts?filter=all",
    backendLogic: "FastAPI query builder removing severity WHERE clause from SQL query.",
    databaseOps: "MySQL: `SELECT * FROM alerts WHERE status IN ('OPEN', 'INVESTIGATING') ORDER BY risk_score DESC LIMIT 50`.",
    mlGraphEngine: "Displays ensemble risk scores across all detected typologies.",
    securityAudit: "Normal read operation logged."
  },

  "btn-filter-critical": {
    id: "btn-filter-critical",
    title: "Filter: Critical Alerts Only (Score 85–100)",
    category: "Alert Queue & Filters",
    destination: "Filters alert table to show only Critical risk alerts",
    phase: "Phase 1 (Weeks 1–2): Risk Prioritization",
    frontendImpl: "Applies client-side filter `row.risk_score >= 85`, updates active filter badge, and shows matching count (18 Critical Alerts).",
    backendEndpoint: "GET /api/v1/alerts?min_score=85",
    backendLogic: "FastAPI query builder with condition `WHERE risk_score >= 85`.",
    databaseOps: "MySQL index lookup on `idx_alerts_risk_score` (B-Tree index) ensuring sub-5ms query response time.",
    mlGraphEngine: "Filters alerts where both XGBoost and NetworkX engines agreed on high malicious probability.",
    securityAudit: "Prioritizes immediate high-liability investigations required by anti-money laundering mandates."
  },

  "btn-filter-high": {
    id: "btn-filter-high",
    title: "Filter: High Alerts Only (Score 70–84)",
    category: "Alert Queue & Filters",
    destination: "Filters alert table to show High risk tier alerts",
    phase: "Phase 1 (Weeks 1–2): Risk Prioritization",
    frontendImpl: "Filters rows with `risk_score >= 70 && risk_score < 85`, updates UI badge counter (42 High Alerts).",
    backendEndpoint: "GET /api/v1/alerts?min_score=70&max_score=84",
    backendLogic: "FastAPI query with score range conditions.",
    databaseOps: "MySQL range scan on indexed `risk_score` column.",
    mlGraphEngine: "Includes cases flagged by Isolation Forest as statistical outliers requiring human review.",
    securityAudit: "Ensures compliance SLA (24h investigation window) is tracked."
  },

  "btn-case-escalate": {
    id: "btn-case-escalate",
    title: "Escalate Case to Compliance Head",
    category: "Case Investigation Workflow",
    destination: "Updates case status to ESCALATED and routes to Senior Compliance Officer queue",
    phase: "Phase 5 (Weeks 11–13): Case Workflow & Compliance SLA",
    frontendImpl: "Prompts analyst for escalation rationale, updates case status pill to 'ESCALATED', dispatches success toast notification, and updates alert table row.",
    backendEndpoint: "POST /api/v1/cases/{case_id}/escalate",
    backendLogic: "FastAPI controller updates case status to `ESCALATED`, sets `escalated_to = 'HEAD_OF_COMPLIANCE'`, enqueues email/Slack notification via Celery worker.",
    databaseOps: "MySQL: `UPDATE cases SET status = 'ESCALATED', escalated_at = NOW(), escalated_by = :analyst_id WHERE case_id = :case_id`; `INSERT INTO case_timeline (case_id, event_type, details) VALUES (:case_id, 'ESCALATED', :rationale)`.",
    mlGraphEngine: "Attaches full SHAP explanation vector and NetworkX graph snapshot to escalation dossier.",
    securityAudit: "Requires confirmed 2FA or re-authentication; cryptographically logged in `audit_trail`."
  },

  "btn-case-freeze": {
    id: "btn-case-freeze",
    title: "Place Administrative Hold / Freeze Account",
    category: "Case Investigation Workflow",
    destination: "Executes emergency stop on outbound debits for the suspect account",
    phase: "Phase 5 (Weeks 11–13): Core Banking Integration & Account Restraints",
    frontendImpl: "Displays confirmation modal with legal disclaimer, upon confirmation changes account badge to 'FROZEN', disables further debit transactions, and shows freeze reference number.",
    backendEndpoint: "POST /api/v1/accounts/{account_id}/administrative-hold",
    backendLogic: "FastAPI service calling Core Banking API webhook (`POST /core-banking/v2/holds`) to place immediate debit block. Updates internal account status.",
    databaseOps: "MySQL: `UPDATE accounts SET status = 'RESTRICTED_HOLD', hold_reason = 'SUSPECTED_AML_LAYERING', hold_timestamp = NOW() WHERE account_id = :account_id`; records entry in `account_holds` table.",
    mlGraphEngine: "Suspends real-time graph updates for outbound edges originating from the frozen node.",
    securityAudit: "Requires senior analyst role (`ROLE_SENIOR_INVESTIGATOR`). Generates formal regulatory hold certificate."
  },

  "btn-case-edd": {
    id: "btn-case-edd",
    title: "Request Enhanced Due Diligence (EDD) Documents",
    category: "Case Investigation Workflow",
    destination: "Triggers automated secure request to customer for Proof of Wealth & Source of Funds",
    phase: "Phase 5 (Weeks 11–13): Customer Outreach & KYC Re-Verification",
    frontendImpl: "Opens EDD document request modal with pre-selected checklists (Tax Returns, Source of Funds, Corporate Registry). Sends request and marks case with 'EDD_REQUESTED' tag.",
    backendEndpoint: "POST /api/v1/cases/{case_id}/request-edd",
    backendLogic: "Generates secure customer portal upload link with 7-day expiration token; sends automated SMS/email notification via Twilio/SendGrid service.",
    databaseOps: "MySQL: `INSERT INTO edd_requests (case_id, customer_id, required_docs, status, expires_at) VALUES (...)`; updates `customers.edd_status = 'PENDING'`.",
    mlGraphEngine: "Holds ML risk recalibration until customer documents are submitted or deadline lapses.",
    securityAudit: "Full customer outreach logged with outbound message payload and timestamp."
  },

  "btn-case-false-positive": {
    id: "btn-case-false-positive",
    title: "Dismiss Alert as False Positive with Rationale",
    category: "Case Investigation Workflow",
    destination: "Closes the alert, logs analyst explanation, and feeds feedback into ML retraining pipeline",
    phase: "Phase 3 (Weeks 5–7): Active Learning & Feedback Loop",
    frontendImpl: "Prompts for dismissal reason (e.g., 'Legitimate seasonal commercial dividend', 'Known vendor payment'). Updates alert badge to 'CLOSED - FALSE POSITIVE' and removes from active queue.",
    backendEndpoint: "POST /api/v1/alerts/{alert_id}/dismiss",
    backendLogic: "FastAPI service validates mandatory dismissal reason (>20 chars), updates alert status to `CLOSED_FP`, and publishes event to Redis topic `ml:training_feedback` for subsequent model fine-tuning.",
    databaseOps: "MySQL: `UPDATE alerts SET status = 'CLOSED_FP', closed_at = NOW(), resolution_notes = :notes WHERE alert_id = :alert_id`; `INSERT INTO ml_ground_truth_labels (tx_id, label, source) VALUES (:tx_id, 0, 'ANALYST_FEEDBACK')`.",
    mlGraphEngine: "Stores ground-truth negative label to improve future XGBoost precision and reduce repeated false alarms on similar entity behaviors.",
    securityAudit: "Mandatory justification audit ensures compliance accountability and prevents improper dismissals."
  },

  "btn-case-file-str": {
    id: "btn-case-file-str",
    title: "Initiate Formal STR Regulatory Filing",
    category: "Case Investigation Workflow",
    destination: "Transfers case data directly into View #5: Regulatory STR Generator",
    phase: "Phase 5 (Weeks 11–13): STR Regulatory Generation",
    frontendImpl: "Closes modal, transitions navigation to `#view-str`, pre-fills form fields with case `ALT-2026-9042`, customer profile, and auto-populates SHAP findings into the narrative draft.",
    backendEndpoint: "POST /api/v1/cases/{case_id}/initiate-str",
    backendLogic: "FastAPI controller initializes a new record in `regulatory_filings` with draft status, copies case evidence snapshot, and locks case from duplicate filing.",
    databaseOps: "MySQL: `INSERT INTO regulatory_filings (filing_id, case_id, reporting_type, status, created_at) VALUES (UUID(), :case_id, 'STR', 'DRAFT', NOW())`.",
    mlGraphEngine: "Aggregates all feature attribution scores and graph path edges into the formal evidence appendix.",
    securityAudit: "Creates high-priority compliance milestone record; notifies compliance officer."
  },

  // ==========================================
  // GRAPH NETWORK FORENSICS CONTROLS
  // ==========================================
  "btn-graph-preset-circular": {
    id: "btn-graph-preset-circular",
    title: "Load Topology: Circular Layering Loop",
    category: "Graph Network Forensics",
    destination: "Loads 4-node circular fund laundering network into the interactive canvas",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & Cycle Detection",
    frontendImpl: "Initializes graph nodes (Acc-A, Acc-B, Acc-C, Acc-D) in a circle layout, renders animated arrows showing continuous fund movement, and updates graph metrics sidebar.",
    backendEndpoint: "GET /api/v1/graph/presets/circular-loop",
    backendLogic: "Fetches synthetic circular topology dataset from backend fixtures or memory cache.",
    databaseOps: "Queries benchmark transaction graph nodes from `graph_benchmark_fixtures` table.",
    mlGraphEngine: "Prepares adjacency matrix for cycle detection algorithms.",
    securityAudit: "Forensic analysis visualization logged."
  },

  "btn-graph-preset-smurfing": {
    id: "btn-graph-preset-smurfing",
    title: "Load Topology: Smurfing Fan-In Structuring",
    category: "Graph Network Forensics",
    destination: "Loads 12 mule accounts funneling funds into a single aggregator account",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & Fan-In / Fan-Out",
    frontendImpl: "Arranges 12 perimeter sender nodes connected to 1 central collector hub node, styling edges with micro-amounts ($9,500 each) and high transaction frequency.",
    backendEndpoint: "GET /api/v1/graph/presets/smurfing-fan-in",
    backendLogic: "FastAPI returns structured fan-in graph schema with node properties (account creation date, KYC tier).",
    databaseOps: "Pulls fan-in transaction cluster from MySQL test fixture database.",
    mlGraphEngine: "Highlights high in-degree ratio ($k_{in} = 12, k_{out} = 0$) characteristic of structuring collectors.",
    securityAudit: "Standard forensic workspace load."
  },

  "btn-graph-preset-mule": {
    id: "btn-graph-preset-mule",
    title: "Load Topology: Multi-Tier Mule Ring Network",
    category: "Graph Network Forensics",
    destination: "Loads multi-layered syndicate network (Recruiters, Mules, Shell Entities, Offshore Exits)",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & Mule Community Clustering",
    frontendImpl: "Renders hierarchical force-directed graph with 18 nodes grouped into color-coded clusters (Recruiters in Purple, Mules in Amber, Shell in Red, Offshore in Cyan).",
    backendEndpoint: "GET /api/v1/graph/presets/mule-ring",
    backendLogic: "Returns comprehensive multi-tier graph model representing complex syndicate laundering structures from IBM AML benchmark.",
    databaseOps: "Reads linked account network from MySQL `accounts` and `account_relationships` tables.",
    mlGraphEngine: "Applies Louvain modularity algorithm to compute community assignments for each node.",
    securityAudit: "Cross-border investigation tag logged."
  },

  "btn-graph-detect-cycles": {
    id: "btn-graph-detect-cycles",
    title: "Run Cycle Detection (Tarjan's / Johnson's Algorithm)",
    category: "Graph Network Forensics",
    destination: "Executes directed cycle finding algorithm to uncover hidden circular laundering loops",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & NetworkX Implementation",
    frontendImpl: "Highlights detected circular loop edges in pulsing neon magenta, pulses cycle nodes, and opens a summary card showing: 'Cycle Detected: Acc-A -> Acc-B -> Acc-C -> Acc-D -> Acc-A (Net Amount: $48,000)'",
    backendEndpoint: "POST /api/v1/graph/algorithms/detect-cycles",
    backendLogic: "FastAPI invokes `networkx.simple_cycles(G)`. Evaluates temporal validity (each transaction must occur strictly after the preceding transaction in the path). Returns validated cycle list.",
    databaseOps: "Constructs in-memory NetworkX `DiGraph` from MySQL `transactions` table where `created_at >= NOW() - INTERVAL 7 DAY`.",
    mlGraphEngine: "Computes cycle risk penalty: adds $+35.0$ points to composite FinTrace risk score for all accounts participating in the closed loop.",
    securityAudit: "Cycle detection output preserved as cryptographic forensic evidence in case file."
  },

  "btn-graph-mule-clusters": {
    id: "btn-graph-mule-clusters",
    title: "Highlight Mule Clusters (Louvain Community Detection)",
    category: "Graph Network Forensics",
    destination: "Partitions graph into closely interconnected mule syndicates using modularity optimization",
    phase: "Phase 4 (Weeks 8–10): Community Detection & Graph Analytics",
    frontendImpl: "Draws colored hull boundaries around tightly interconnected account groups, dims outlier nodes, and displays community density metrics.",
    backendEndpoint: "POST /api/v1/graph/algorithms/community-detection",
    backendLogic: "FastAPI invokes `networkx.algorithms.community.louvain_communities(G_undirected, weight='weight')`. Filters communities with size $\\ge 3$ and high internal density.",
    databaseOps: "Saves discovered community IDs to `account_metadata.mule_cluster_id` column in MySQL for ongoing monitoring.",
    mlGraphEngine: "Generates cluster risk score based on proportion of previously flagged accounts inside the community.",
    securityAudit: "Cluster identification dossier generated for potential syndicate-level prosecution."
  },

  "btn-graph-centrality": {
    id: "btn-graph-centrality",
    title: "Compute Centrality & Hub Importance (Degree & Betweenness)",
    category: "Graph Network Forensics",
    destination: "Calculates Betweenness and Degree Centrality to identify money funneling aggregator hubs",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & Node Centrality",
    frontendImpl: "Dynamically resizes node radius proportional to Betweenness Centrality score ($C_B(v)$), highlighting the central money funneling account in glowing red.",
    backendEndpoint: "POST /api/v1/graph/algorithms/centrality",
    backendLogic: "FastAPI runs `networkx.betweenness_centrality(G, weight='amount')` and `networkx.degree_centrality(G)` asynchronously. Normalizes scores to $[0, 1]$.",
    databaseOps: "Writes top-10 central accounts to Redis leaderboard `leaderboard:graph_centrality` for rapid risk lookup during ingestion.",
    mlGraphEngine: "Passes betweenness centrality as a continuous feature into the XGBoost classifier (`graph_betweenness_centrality`).",
    securityAudit: "Identifies primary controller entities for priority law enforcement escalation."
  },

  "btn-graph-trace-flow": {
    id: "btn-graph-trace-flow",
    title: "Trace Fund Flow Path (Animated Particle Trail)",
    category: "Graph Network Forensics",
    destination: "Animates chronological movement of illicit funds across intermediaries to destination",
    phase: "Phase 4 (Weeks 8–10): Graph Visualization & Forensic Animation",
    frontendImpl: "Renders canvas particle animation along directed edges in exact chronological sequence, updating a live transfer timestamp counter at each step.",
    backendEndpoint: "GET /api/v1/graph/trace-path?source=ACC-84920&target=ACC-99210",
    backendLogic: "FastAPI executes `networkx.all_shortest_paths()` or Dijkstra's weighted shortest path weighted by inverse transaction amount to find laundering path.",
    databaseOps: "Fetches step-by-step transaction records ordered by `tx_timestamp ASC` from MySQL.",
    mlGraphEngine: "Calculates total path transit velocity and detects layering delay tactics.",
    securityAudit: "Provides visual timeline demonstration for judicial and court presentations."
  },

  "btn-graph-reset-view": {
    id: "btn-graph-reset-view",
    title: "Reset Graph Viewport & Zoom",
    category: "Graph Network Forensics",
    destination: "Centers the network graph and restores default zoom scale (1.0x)",
    phase: "Phase 1 (Weeks 1–2): UI Framework & Graph Canvas",
    frontendImpl: "Animates canvas transform matrix back to `translate(0, 0) scale(1.0)` with smooth ease-out interpolation.",
    backendEndpoint: "N/A (Client-Side Canvas Transformation)",
    backendLogic: "Client-side matrix recalculation.",
    databaseOps: "None.",
    mlGraphEngine: "N/A.",
    securityAudit: "N/A."
  },

  "btn-graph-export-evidence": {
    id: "btn-graph-export-evidence",
    title: "Export Network Forensics Evidence Pack",
    category: "Graph Network Forensics",
    destination: "Generates high-resolution PNG image and JSON topology graph file for case dossier",
    phase: "Phase 5 (Weeks 11–13): Reporting & Forensic Evidence Packaging",
    frontendImpl: "Converts HTML5 canvas to 300 DPI Blob (`canvas.toBlob('image/png')`), packages with graph JSON metadata (nodes, edges, timestamps), and triggers browser download.",
    backendEndpoint: "POST /api/v1/cases/{case_id}/graph-evidence",
    backendLogic: "FastAPI endpoint archives graph topology, node KYC profiles, and image attachment to AWS S3/MinIO bucket `evidence-vault/` and returns signed download URL.",
    databaseOps: "MySQL: `INSERT INTO case_attachments (case_id, file_name, file_type, s3_uri, checksum) VALUES (...)`.",
    mlGraphEngine: "Includes complete NetworkX graph metrics (clustering coefficient, cycle members, centrality rankings) in attached evidence JSON.",
    securityAudit: "Generates SHA-256 cryptographic hash of evidence pack to guarantee chain-of-custody integrity for court admissibility."
  },

  // ==========================================
  // EXPLAINABLE AI & SHAP DIAGNOSTICS
  // ==========================================
  "btn-shap-recalc": {
    id: "btn-shap-recalc",
    title: "Recalculate SHAP Feature Contributions (What-If Simulation)",
    category: "Explainable AI (XAI) & SHAP Engine",
    destination: "Re-evaluates ML risk score and SHAP waterfall based on adjusted slider parameters",
    phase: "Phase 4 (Weeks 8–10): Explainable AI & TreeSHAP Integration",
    frontendImpl: "Reads updated slider values (Amount: $9,850, Velocity: 18 tx/hr, Counterparties: 14), displays loading pulse, and re-renders SHAP waterfall bars with new $\\phi_i$ contributions.",
    backendEndpoint: "POST /api/v1/explainability/what-if",
    backendLogic: "FastAPI receives feature dictionary -> runs XGBoost `.predict_proba()` -> invokes `shap.TreeExplainer.shap_values(X_perturbed)` -> returns new base value, SHAP vector, and updated risk score.",
    databaseOps: "Temporary calculation performed in-memory; results cached in Redis key `what_if:session:{id}` with 10-minute expiry.",
    mlGraphEngine: "Demonstrates model sensitivity and non-linear interactions under controlled feature perturbations.",
    securityAudit: "What-If explorations logged with user session ID to monitor analyst decision testing."
  },

  "btn-shap-reset-sliders": {
    id: "btn-shap-reset-sliders",
    title: "Reset What-If Simulation to Baseline",
    category: "Explainable AI (XAI) & SHAP Engine",
    destination: "Restores original transaction feature values and actual alert SHAP waterfall",
    phase: "Phase 4 (Weeks 8–10): Explainable AI & TreeSHAP Integration",
    frontendImpl: "Resets all range inputs to actual transaction values ($9,850 amount, 14 transfers/hr, 12 counterparties) and re-draws original SHAP waterfall.",
    backendEndpoint: "N/A (Client-Side State Reset)",
    backendLogic: "Client restores cached original feature state.",
    databaseOps: "None.",
    mlGraphEngine: "Re-renders validated ground-truth SHAP values.",
    securityAudit: "N/A."
  },

  "btn-shap-export-audit": {
    id: "btn-shap-export-audit",
    title: "Export SHAP Regulatory Audit Trail (JSON / PDF)",
    category: "Explainable AI (XAI) & SHAP Engine",
    destination: "Downloads comprehensive audit report explaining mathematical reasons for alert flagging",
    phase: "Phase 4 (Weeks 8–10) & Phase 5 (Weeks 11–13): Explainability Compliance",
    frontendImpl: "Formats SHAP feature contributions, base value, model hyperparameters, and confidence intervals into a structured JSON file or formatted printable PDF.",
    backendEndpoint: "GET /api/v1/explainability/audit-dossier?alert_id=ALT-2026-9042",
    backendLogic: "FastAPI service compiles model governance report meeting European AI Act, FATF, and FinCEN explainability standards for algorithmic credit/AML decisions.",
    databaseOps: "Reads from `shap_explanations`, `model_versions`, and `feature_logs` tables in MySQL.",
    mlGraphEngine: "Documents exact TreeSHAP attribution mathematical formulas ($f(x) = E[f(x)] + \\sum \\phi_i$) and feature percentiles.",
    securityAudit: "Generates immutable regulatory audit package with digital signature."
  },

  "btn-shap-calibrate-threshold": {
    id: "btn-shap-calibrate-threshold",
    title: "Calibrate Decision Threshold (Optimal F1-Score)",
    category: "Explainable AI (XAI) & Model Tuning",
    destination: "Adjusts alert classification threshold cutoff between Low, Medium, and Critical tiers",
    phase: "Phase 3 (Weeks 5–7): Model Evaluation & Threshold Tuning",
    frontendImpl: "Opens interactive threshold slider (current default: 0.72), updates live Precision/Recall tradeoff curve, and calculates projected false positive reduction.",
    backendEndpoint: "PUT /api/v1/models/thresholds (active_threshold: 0.72)",
    backendLogic: "FastAPI updates dynamic alert threshold in Redis configuration store; re-evaluates precision-recall tradeoff on validation holdout set.",
    databaseOps: "Updates `system_configuration` table: `UPDATE system_config SET config_value = '0.72' WHERE config_key = 'aml_critical_threshold'`.",
    mlGraphEngine: "Recalculates classification confusion matrix: confirms $\\ge 90\\%$ recall target and $40\\%$ fewer false alarms as specified in Slide 10.",
    securityAudit: "Restricted to Chief Risk Officer / Lead ML Engineer role; audit entry recorded."
  },

  // ==========================================
  // REGULATORY STR GENERATOR CONTROLS
  // ==========================================
  "btn-str-autogen-narration": {
    id: "btn-str-autogen-narration",
    title: "Auto-Generate AI Regulatory Narrative",
    category: "Regulatory STR Generator",
    destination: "Synthesizes SHAP findings, graph topology, and KYC data into a formal legal STR narrative",
    phase: "Phase 5 (Weeks 11–13): STR Generation & AI Summarization",
    frontendImpl: "Displays simulated AI text streaming animation into the Grounds of Suspicion textarea, generating formal regulatory prose citing specific amounts, cycle hops, and velocity metrics.",
    backendEndpoint: "POST /api/v1/str/generate-narrative",
    backendLogic: "FastAPI calls local LLM / deterministic template engine: populates legal narrative templates with exact SHAP factors (+28.4 velocity, +22.1 amount structuring) and NetworkX cycle hops.",
    databaseOps: "Loads case history and transaction log from MySQL; saves generated narrative draft in `regulatory_filings.narrative`.",
    mlGraphEngine: "Translates quantitative ML scores into regulatory language compliant with FIU-IND (PMLA) / FinCEN SAR rules.",
    securityAudit: "Mandatory human-in-the-loop: requires analyst sign-off before official submission."
  },

  "btn-str-validate": {
    id: "btn-str-validate",
    title: "Validate FIU-IND / FinCEN Schema Compliance",
    category: "Regulatory STR Generator",
    destination: "Checks all mandatory fields, PAN/Tax IDs, transaction amounts, and evidence attachments",
    phase: "Phase 5 (Weeks 11–13): Regulatory Validation & Quality Assurance",
    frontendImpl: "Validates form fields against regulatory schema, displays checklist with green checkmarks (Tax ID valid, Ground codes present, Account numbers verified), and unlocks submission button.",
    backendEndpoint: "POST /api/v1/str/validate-schema",
    backendLogic: "FastAPI Pydantic schema validator verifying exact XML/JSON specifications required by Financial Intelligence Unit reporting standards.",
    databaseOps: "Verifies customer records in MySQL `customers` table to ensure complete identity validation.",
    mlGraphEngine: "Checks that all required feature explainability metrics are present.",
    securityAudit: "Pre-submission audit check prevents regulatory rejection penalties."
  },

  "btn-str-preview": {
    id: "btn-str-preview",
    title: "Preview Formatted Regulatory STR Dossier",
    category: "Regulatory STR Generator",
    destination: "Renders clean modal preview of the formal Suspicious Transaction Report",
    phase: "Phase 5 (Weeks 11–13): Reporting & UI Preview",
    frontendImpl: "Opens `#strPreviewModal`, displaying formatted official document layout with institutional letterhead (NMIET / FinTrace AML), suspect profile, transaction summary, and legal grounds.",
    backendEndpoint: "GET /api/v1/str/{filing_id}/preview",
    backendLogic: "FastAPI renders Jinja2 HTML regulatory template with case data and returns rendered HTML for client iframe / modal preview.",
    databaseOps: "Reads draft filing from `regulatory_filings` table.",
    mlGraphEngine: "Embeds SHAP waterfall graphic and transaction topology map into document preview.",
    securityAudit: "Watermarked with analyst ID and draft disclaimer."
  },

  "btn-str-export-pdf": {
    id: "btn-str-export-pdf",
    title: "Export Official STR Document (PDF)",
    category: "Regulatory STR Generator",
    destination: "Generates and downloads publication-grade PDF file of the Suspicious Transaction Report",
    phase: "Phase 5 (Weeks 11–13): PDF Generation & Regulatory Export",
    frontendImpl: "Triggers browser print dialog / direct PDF download of the formatted STR dossier, updates filing status to 'EXPORTED_PDF', and logs export event.",
    backendEndpoint: "POST /api/v1/str/{filing_id}/export-pdf",
    backendLogic: "FastAPI invokes Python `reportlab` engine: compiles multi-page styled PDF document complete with cover sheet, executive summary, transaction tables, SHAP charts, and digital signature block.",
    databaseOps: "Stores generated PDF binary in S3/MinIO bucket; writes record to `str_export_history` in MySQL.",
    mlGraphEngine: "Generates high-resolution rasterized SHAP and NetworkX topology diagrams for document embedding.",
    securityAudit: "Digitally signed with SHA-256 HMAC hash and analyst digital certificate."
  },

  "btn-str-api-submit": {
    id: "btn-str-api-submit",
    title: "Submit STR to Regulatory Gateway API",
    category: "Regulatory STR Generator",
    destination: "Transmits encrypted STR package to Financial Intelligence Unit (FIU) Gateway mock API",
    phase: "Phase 5 (Weeks 11–13): Regulatory API Integration",
    frontendImpl: "Displays transmission progress bar, connects to simulated FIU Gateway, displays submission success badge, and generates official Acknowledgement Token (`ACK-FIU-2026-981042`).",
    backendEndpoint: "POST /api/v1/regulatory/fiu-gateway/submit",
    backendLogic: "FastAPI service bundles filing XML payload -> signs with institution private key -> sends mutual-TLS POST request to FIU-IND Gateway endpoint -> parses response ACK token.",
    databaseOps: "MySQL: `UPDATE regulatory_filings SET status = 'SUBMITTED', acknowledgement_token = :ack_token, submitted_at = NOW() WHERE filing_id = :filing_id`; updates case state to `RESOLVED_STR_FILED`.",
    mlGraphEngine: "Archives ML detection artifacts associated with the formal regulatory filing.",
    securityAudit: "Legally binding regulatory submission recorded in tamper-proof append-only audit database."
  },

  "btn-str-save-draft": {
    id: "btn-str-save-draft",
    title: "Save STR Draft to Database",
    category: "Regulatory STR Generator",
    destination: "Saves form progress to MySQL database so analyst can resume editing later",
    phase: "Phase 1 (Weeks 1–2) & Phase 5 (Weeks 11–13)",
    frontendImpl: "Collects form input values, sends asynchronous PUT request, and displays subtle 'Draft Saved at [Time]' toast notification.",
    backendEndpoint: "PUT /api/v1/str/{filing_id}/draft",
    backendLogic: "FastAPI endpoint parses JSON request body, validates user authorization, and executes upsert into `regulatory_filings` table.",
    databaseOps: "MySQL: `UPDATE regulatory_filings SET form_data = :json_data, updated_at = NOW() WHERE filing_id = :filing_id`.",
    mlGraphEngine: "N/A.",
    securityAudit: "Draft autosave recorded in user activity log."
  },

  // ==========================================
  // ACADEMIC BENCHMARK & ARCHITECTURE CONTROLS
  // ==========================================
  "btn-bench-run-eval": {
    id: "btn-bench-run-eval",
    title: "Re-run Benchmark Evaluation (IBM Synthetic & Elliptic Data)",
    category: "Academic & Evaluation Benchmarks",
    destination: "Executes batch evaluation pipeline on test dataset to compute Recall, Precision, and AUC-ROC",
    phase: "Phase 3 (Weeks 5–7): Model Evaluation & Slide 10 Target Verification",
    frontendImpl: "Displays animated benchmarking progress bar, animates evaluation metrics updating across models, and highlights target achievement (Recall: 92.4% vs Target $\\ge 90\\%$, FP Reduction: 41.1% vs Target $40\\%$).",
    backendEndpoint: "POST /api/v1/benchmarks/evaluate-testset",
    backendLogic: "FastAPI triggers background evaluation task using Celery worker: loads 50,000 holdout test samples -> runs Isolation Forest + XGBoost inference -> computes scikit-learn metrics (`roc_auc_score`, `classification_report`, `confusion_matrix`).",
    databaseOps: "Writes evaluation results to `benchmark_runs` table in MySQL.",
    mlGraphEngine: "Computes ROC and PR curve coordinate arrays for frontend charting.",
    securityAudit: "Reproducibility log generated with random seed and model hash."
  },

  "btn-bench-export-roc": {
    id: "btn-bench-export-roc",
    title: "Export Benchmark Metrics & ROC Curves (CSV / PNG)",
    category: "Academic & Evaluation Benchmarks",
    destination: "Exports raw benchmark performance data and high-res ROC curve chart for project report",
    phase: "Phase 5 (Weeks 11–13): Academic Documentation & Final Report",
    frontendImpl: "Extracts chart SVG coordinates, packages with model comparison CSV table, and triggers browser download.",
    backendEndpoint: "GET /api/v1/benchmarks/export-data",
    backendLogic: "FastAPI serializes ROC coordinate arrays and model comparison metrics into CSV / JSON file stream.",
    databaseOps: "Reads from `benchmark_runs` table.",
    mlGraphEngine: "Provides statistical comparison between Rule-Based Baseline and FinTrace Hybrid AI.",
    securityAudit: "Academic documentation export logged."
  },

  "btn-arch-inspect-fastapi": {
    id: "btn-arch-inspect-fastapi",
    title: "Inspect Component: Python + FastAPI Backend Server",
    category: "System Architecture",
    destination: "Opens technical architectural breakdown for the async FastAPI application tier",
    phase: "Phase 1 (Weeks 1–2): Architecture Setup",
    frontendImpl: "Opens Architecture Inspector Modal focused on FastAPI Async REST architecture, CORS middleware, Pydantic schemas, and route controllers.",
    backendEndpoint: "GET /api/v1/system/architecture/fastapi",
    backendLogic: "Returns live service statistics (uptime, active worker threads, event loop latency).",
    databaseOps: "Inspects SQLAlchemy / Tortoise-ORM async connection pool status.",
    mlGraphEngine: "Monitors ML inference worker pool threads (`concurrent.futures.ThreadPoolExecutor`).",
    securityAudit: "JWT Bearer token middleware, rate limiting, and CORS whitelist security verified."
  },

  "btn-arch-inspect-redis": {
    id: "btn-arch-inspect-redis",
    title: "Inspect Component: Redis Ingestion Stream & Cache",
    category: "System Architecture",
    destination: "Opens technical architectural breakdown for Redis caching and real-time streaming",
    phase: "Phase 1 (Weeks 1–2) & Phase 2 (Weeks 3–4)",
    frontendImpl: "Opens Architecture Inspector Modal detailing Redis Streams (`stream:transactions_inbound`), sliding window velocity counters, and Pub/Sub alert broadcasting.",
    backendEndpoint: "GET /api/v1/system/architecture/redis",
    backendLogic: "Returns Redis `INFO` stats (memory usage, connected clients, queue depth).",
    databaseOps: "Inspects Redis keyspace (`stats:velocity:*`, `cache:shap:*`, `session:*`).",
    mlGraphEngine: "Low-latency feature cache enabling real-time scoring in under 85ms per transaction.",
    securityAudit: "Redis AUTH password and TLS encryption in transit configured."
  },

  "btn-arch-inspect-mysql": {
    id: "btn-arch-inspect-mysql",
    title: "Inspect Component: MySQL 8.0 Relational Database",
    category: "System Architecture",
    destination: "Opens technical architectural breakdown for MySQL transaction and alert storage",
    phase: "Phase 1 (Weeks 1–2): Relational Schema Design",
    frontendImpl: "Opens Architecture Inspector Modal displaying complete MySQL DDL schemas, indexing strategies, foreign key constraints, and partitioning for `transactions`, `alerts`, `customers`, and `cases`.",
    backendEndpoint: "GET /api/v1/system/architecture/mysql",
    backendLogic: "Returns database connection pool metrics, table row counts, and query execution times.",
    databaseOps: "Reads table status: `SHOW TABLE STATUS WHERE Name IN ('transactions', 'alerts', 'cases', 'customers')`.",
    mlGraphEngine: "Stores ground-truth training datasets and historical inference scores.",
    securityAudit: "Role-based database access, parameterized queries to prevent SQL injection, encrypted tablespace at rest."
  },

  "btn-arch-inspect-ml": {
    id: "btn-arch-inspect-ml",
    title: "Inspect Component: Hybrid ML Engine (Isolation Forest + XGBoost + SMOTE)",
    category: "System Architecture",
    destination: "Opens technical architectural breakdown for the ML anomaly and classification pipeline",
    phase: "Phase 3 (Weeks 5–7): Model Training & Hyperparameter Tuning",
    frontendImpl: "Opens Architecture Inspector Modal detailing scikit-learn Isolation Forest (unsupervised contamination=0.01), XGBoost (supervised tree booster), and SMOTE oversampling pipeline.",
    backendEndpoint: "GET /api/v1/system/architecture/ml-engine",
    backendLogic: "Returns model metadata: feature dimensions (24 features), training date, SMOTE sampling ratio (1:10), hyperparameter configs (max_depth=6, learning_rate=0.05).",
    databaseOps: "Pulls model evaluation metrics from `model_metadata` table.",
    mlGraphEngine: "Full explanation of hybrid fusion formula: $Score = 0.35 \\cdot S_{IF} + 0.40 \\cdot P_{XGB} + 0.25 \\cdot S_{Graph}$.",
    securityAudit: "Model artifact integrity verified via SHA-256 checksums."
  },

  "btn-arch-inspect-graph": {
    id: "btn-arch-inspect-graph",
    title: "Inspect Component: NetworkX Graph Topology Engine",
    category: "System Architecture",
    destination: "Opens technical architectural breakdown for NetworkX graph algorithms",
    phase: "Phase 4 (Weeks 8–10): Graph Analytics & Cycle Detection",
    frontendImpl: "Opens Architecture Inspector Modal detailing in-memory MultiDiGraph construction, Tarjan's cycle algorithm, Louvain community detection, and Betweenness Centrality.",
    backendEndpoint: "GET /api/v1/system/architecture/graph-engine",
    backendLogic: "Returns graph statistics: total active nodes (14,280 accounts), directed edges (48,912 transactions), and average clustering coefficient.",
    databaseOps: "Synchronizes directed edges from MySQL `transactions` table with memory graph buffer.",
    mlGraphEngine: "Detects topological laundering patterns invisible to tabular ML models alone.",
    securityAudit: "Forensic graph serialization compliant with electronic discovery standards."
  }
};

// Expose globally
window.IMPLEMENTATION_BLUEPRINTS = IMPLEMENTATION_BLUEPRINTS;
