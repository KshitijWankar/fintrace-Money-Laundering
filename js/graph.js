/**
 * FinTrace: AI-Based Financial Transaction Monitoring
 * NetworkX Graph Forensics Engine (Interactive Canvas Renderer)
 * 
 * Supports:
 * - Dynamic Node / Edge Force-Directed Layout & Physics
 * - Drag, Pan, and Zoom (Mouse / Touch)
 * - Topology Presets: Circular Layering Loop, Smurfing Fan-In, Multi-Tier Mule Ring
 * - Visual Algorithm Overlays: Cycle Detection, Louvain Communities, Centrality Scaling
 * - Flow Trace Particle Animations
 */

class FinTraceGraphEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 900;
    this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 550;

    // Viewport transform
    this.panX = this.width / 2;
    this.panY = this.height / 2;
    this.zoom = 1.0;

    // State
    this.nodes = [];
    this.edges = [];
    this.particles = [];
    this.activePreset = 'circular';
    this.highlightCycles = false;
    this.highlightCommunities = false;
    this.scaleByCentrality = false;
    this.traceActive = false;
    this.selectedNode = null;
    this.hoveredNode = null;
    this.draggedNode = null;
    this.isPanning = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    // Bind event listeners
    this.initEventListeners();

    // Load initial preset
    this.loadPreset('circular');

    // Start animation loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    // Window resize
    window.addEventListener('resize', () => {
      if (this.canvas.parentElement) {
        this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 900;
        this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 550;
        this.render();
      }
    });
  }

  initEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const worldPos = this.screenToWorld(mouseX, mouseY);

      // Check node click
      const clickedNode = this.getNodeAt(worldPos.x, worldPos.y);
      if (clickedNode) {
        this.draggedNode = clickedNode;
        this.selectedNode = clickedNode;
        if (window.onGraphNodeSelected) {
          window.onGraphNodeSelected(clickedNode);
        }
      } else {
        this.isPanning = true;
        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const worldPos = this.screenToWorld(mouseX, mouseY);

      if (this.draggedNode) {
        this.draggedNode.x = worldPos.x;
        this.draggedNode.y = worldPos.y;
        this.draggedNode.vx = 0;
        this.draggedNode.vy = 0;
      } else if (this.isPanning) {
        this.panX += (mouseX - this.lastMouseX);
        this.panY += (mouseY - this.lastMouseY);
        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;
      } else {
        const hovered = this.getNodeAt(worldPos.x, worldPos.y);
        if (hovered !== this.hoveredNode) {
          this.hoveredNode = hovered;
          this.canvas.style.cursor = hovered ? 'pointer' : 'default';
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.draggedNode = null;
      this.isPanning = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const newZoom = Math.max(0.4, Math.min(3.0, this.zoom * zoomFactor));

      // Zoom towards mouse
      this.panX = mouseX - (mouseX - this.panX) * (newZoom / this.zoom);
      this.panY = mouseY - (mouseY - this.panY) * (newZoom / this.zoom);
      this.zoom = newZoom;
    });
  }

  screenToWorld(sx, sy) {
    return {
      x: (sx - this.panX) / this.zoom,
      y: (sy - this.panY) / this.zoom
    };
  }

  worldToScreen(wx, wy) {
    return {
      x: wx * this.zoom + this.panX,
      y: wy * this.zoom + this.panY
    };
  }

  getNodeAt(wx, wy) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      const r = this.getNodeRadius(n);
      const dx = n.x - wx;
      const dy = n.y - wy;
      if (dx * dx + dy * dy <= (r + 4) * (r + 4)) {
        return n;
      }
    }
    return null;
  }

  getNodeRadius(node) {
    let base = 20;
    if (this.scaleByCentrality && node.betweenness) {
      base = 14 + node.betweenness * 35;
    }
    if (node.isTarget) base += 6;
    return base;
  }

  resetView() {
    this.panX = this.width / 2;
    this.panY = this.height / 2;
    this.zoom = 1.0;
  }

  loadPreset(presetName) {
    this.activePreset = presetName;
    this.nodes = [];
    this.edges = [];
    this.particles = [];
    this.selectedNode = null;

    if (presetName === 'circular') {
      this.buildCircularPreset();
    } else if (presetName === 'smurfing') {
      this.buildSmurfingPreset();
    } else if (presetName === 'mule') {
      this.buildMuleRingPreset();
    }

    this.resetView();
  }

  buildCircularPreset() {
    // Circular fund flow: A -> B -> C -> D -> A
    const count = 5;
    const radius = 170;
    const names = ['ACC-A (Origin)', 'ACC-B (Mule 1)', 'ACC-C (Front Co.)', 'ACC-D (Crypto Gateway)', 'ACC-E (Shell Entity)'];
    const types = ['suspect', 'mule', 'shell', 'gateway', 'mule'];
    const balances = ['$50,000', '$49,400', '$48,900', '$48,300', '$47,800'];
    const betweenness = [0.85, 0.72, 0.78, 0.90, 0.75];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      this.nodes.push({
        id: `node-${i}`,
        label: names[i],
        accountNumber: `ACC-9042${i}`,
        type: types[i],
        balance: balances[i],
        betweenness: betweenness[i],
        community: 1,
        inDegree: 1,
        outDegree: 1,
        isCycleMember: true,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        vx: 0,
        vy: 0
      });
    }

    // Add closed directed edges
    const amounts = ['$50,000', '$49,400', '$48,900', '$48,300', '$47,800'];
    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      this.edges.push({
        source: this.nodes[i],
        target: this.nodes[next],
        amount: amounts[i],
        fee: '$600 fee',
        isCycleEdge: true,
        timestamp: `10:4${i}:22`
      });
    }

    // Add 2 innocent collateral nodes connected to demonstrate isolation
    const innocent1 = {
      id: 'node-inn-1',
      label: 'Vendor Mart Inc.',
      accountNumber: 'ACC-11029',
      type: 'legitimate',
      balance: '$12,400',
      betweenness: 0.1,
      community: 2,
      inDegree: 1,
      outDegree: 0,
      x: 280,
      y: -120,
      vx: 0,
      vy: 0
    };
    this.nodes.push(innocent1);
    this.edges.push({
      source: this.nodes[1],
      target: innocent1,
      amount: '$1,200',
      fee: '$0',
      isCycleEdge: false,
      timestamp: '10:42:01'
    });
  }

  buildSmurfingPreset() {
    // Smurfing / Structuring (Fan-in): 10 perimeter mule accounts sending $9,500 each to central aggregator
    const central = {
      id: 'node-central',
      label: 'ACC-84920 (Central Aggregator)',
      accountNumber: 'ACC-84920',
      type: 'aggregator',
      balance: '$98,500',
      betweenness: 0.98,
      community: 1,
      inDegree: 10,
      outDegree: 1,
      isTarget: true,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    };
    this.nodes.push(central);

    const offshore = {
      id: 'node-offshore',
      label: 'Offshore Trust Ltd (Cayman)',
      accountNumber: 'ACC-OFF-99',
      type: 'offshore',
      balance: '$95,000',
      betweenness: 0.88,
      community: 3,
      inDegree: 1,
      outDegree: 0,
      x: 320,
      y: 0,
      vx: 0,
      vy: 0
    };
    this.nodes.push(offshore);
    this.edges.push({
      source: central,
      target: offshore,
      amount: '$95,000 (Bulk Dispersion)',
      fee: '$3,500 fee',
      isCycleEdge: false,
      timestamp: '11:15:00'
    });

    const muleCount = 10;
    const radius = 230;
    for (let i = 0; i < muleCount; i++) {
      const angle = (i / muleCount) * Math.PI * 2;
      const amt = `$9,${750 + (i * 20 % 230)}`;
      const muleNode = {
        id: `node-mule-${i}`,
        label: `Mule Acc #${i + 1}`,
        accountNumber: `ACC-MULE-0${i}`,
        type: 'mule',
        balance: '$120',
        betweenness: 0.15,
        community: 2,
        inDegree: 0,
        outDegree: 1,
        x: Math.cos(angle) * radius - 70,
        y: Math.sin(angle) * radius,
        vx: 0,
        vy: 0
      };
      this.nodes.push(muleNode);
      this.edges.push({
        source: muleNode,
        target: central,
        amount: amt,
        fee: '$15 fee',
        isCycleEdge: false,
        timestamp: `10:1${i}:00`
      });
    }
  }

  buildMuleRingPreset() {
    // Multi-tier syndicate: 3 Recruiters -> 6 Mules -> 2 Front Shells -> 1 Layering Sink
    const syndicate = [
      { id: 'r1', label: 'Recruiter Apex', type: 'recruiter', x: -320, y: -140, community: 1, betweenness: 0.82 },
      { id: 'r2', label: 'Recruiter Beta', type: 'recruiter', x: -320, y: 140, community: 1, betweenness: 0.79 },
      
      { id: 'm1', label: 'Mule Student 1', type: 'mule', x: -160, y: -200, community: 2, betweenness: 0.45 },
      { id: 'm2', label: 'Mule Worker 2', type: 'mule', x: -160, y: -90, community: 2, betweenness: 0.52 },
      { id: 'm3', label: 'Mule Account 3', type: 'mule', x: -160, y: 30, community: 2, betweenness: 0.48 },
      { id: 'm4', label: 'Mule Account 4', type: 'mule', x: -160, y: 140, community: 2, betweenness: 0.55 },
      { id: 'm5', label: 'Mule Account 5', type: 'mule', x: -160, y: 230, community: 2, betweenness: 0.42 },

      { id: 's1', label: 'Front Consulting LLC', type: 'shell', x: 80, y: -80, community: 3, betweenness: 0.94, isTarget: true },
      { id: 's2', label: 'Apex Global Trade', type: 'shell', x: 80, y: 90, community: 3, betweenness: 0.92 },

      { id: 'sink', label: 'Offshore Crypto Exit', type: 'gateway', x: 300, y: 0, community: 4, betweenness: 0.99 }
    ];

    syndicate.forEach(s => {
      this.nodes.push({
        id: s.id,
        label: s.label,
        accountNumber: `ACC-SYND-${s.id.toUpperCase()}`,
        type: s.type,
        balance: '$18,500',
        betweenness: s.betweenness,
        community: s.community,
        isTarget: s.isTarget || false,
        x: s.x,
        y: s.y,
        vx: 0,
        vy: 0
      });
    });

    const nodeMap = {};
    this.nodes.forEach(n => nodeMap[n.id] = n);

    const edgeDefs = [
      ['r1', 'm1', '$14,000'], ['r1', 'm2', '$15,500'], ['r1', 'm3', '$12,800'],
      ['r2', 'm3', '$13,200'], ['r2', 'm4', '$16,000'], ['r2', 'm5', '$14,900'],
      ['m1', 's1', '$13,200'], ['m2', 's1', '$14,700'], ['m3', 's1', '$25,000'],
      ['m4', 's2', '$15,100'], ['m5', 's2', '$14,200'],
      ['s1', 's2', '$22,000'],
      ['s1', 'sink', '$51,000'], ['s2', 'sink', '$49,500']
    ];

    edgeDefs.forEach(e => {
      this.edges.push({
        source: nodeMap[e[0]],
        target: nodeMap[e[1]],
        amount: e[2],
        isCycleEdge: e[0] === 's1' && e[1] === 's2',
        timestamp: '11:20:15'
      });
    });
  }

  triggerCycleDetection() {
    this.highlightCycles = true;
    this.highlightCommunities = false;
    this.scaleByCentrality = false;
    this.render();
  }

  triggerCommunityDetection() {
    this.highlightCommunities = true;
    this.highlightCycles = false;
    this.scaleByCentrality = false;
    this.render();
  }

  triggerCentralityScaling() {
    this.scaleByCentrality = true;
    this.highlightCycles = false;
    this.highlightCommunities = false;
    this.render();
  }

  triggerFlowTrace() {
    this.traceActive = true;
    this.particles = [];
    // Spawn particles on edges
    for (let i = 0; i < 30; i++) {
      const edge = this.edges[i % this.edges.length];
      this.particles.push({
        edge: edge,
        progress: (i / 30),
        speed: 0.005 + Math.random() * 0.005,
        color: edge.isCycleEdge ? '#ec4899' : '#00f2fe'
      });
    }
  }

  updateParticles() {
    if (!this.traceActive) return;
    for (let p of this.particles) {
      p.progress += p.speed;
      if (p.progress >= 1.0) {
        p.progress = 0;
      }
    }
  }

  animate() {
    this.updateParticles();
    this.render();
    requestAnimationFrame(this.animate);
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    ctx.translate(this.panX, this.panY);
    ctx.scale(this.zoom, this.zoom);

    // Draw grid background
    this.drawGrid(ctx);

    // Draw community hulls if enabled
    if (this.highlightCommunities) {
      this.drawCommunityHulls(ctx);
    }

    // Draw Edges
    this.drawEdges(ctx);

    // Draw Flow Particles
    if (this.traceActive) {
      this.drawParticles(ctx);
    }

    // Draw Nodes
    this.drawNodes(ctx);

    ctx.restore();
  }

  drawGrid(ctx) {
    const gridSize = 40;
    const startX = -this.panX / this.zoom;
    const startY = -this.panY / this.zoom;
    const endX = (this.width - this.panX) / this.zoom;
    const endY = (this.height - this.panY) / this.zoom;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1 / this.zoom;
    ctx.beginPath();
    for (let x = Math.floor(startX / gridSize) * gridSize; x < endX; x += gridSize) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }
    for (let y = Math.floor(startY / gridSize) * gridSize; y < endY; y += gridSize) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }
    ctx.stroke();
  }

  drawCommunityHulls(ctx) {
    const communities = {};
    this.nodes.forEach(n => {
      if (!communities[n.community]) communities[n.community] = [];
      communities[n.community].push(n);
    });

    const colors = [
      'rgba(239, 68, 68, 0.12)',   // Red / Suspicious Syndicate
      'rgba(245, 158, 11, 0.12)',  // Amber / Mule cluster
      'rgba(59, 130, 246, 0.12)',  // Blue / Shell Front
      'rgba(16, 185, 129, 0.12)'   // Green / Legitimate
    ];
    const borderColors = [
      'rgba(239, 68, 68, 0.6)',
      'rgba(245, 158, 11, 0.6)',
      'rgba(59, 130, 246, 0.6)',
      'rgba(16, 185, 129, 0.6)'
    ];

    Object.keys(communities).forEach((commId, idx) => {
      const nodeList = communities[commId];
      if (nodeList.length < 2) return;

      // Compute bounding box / circle
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      nodeList.forEach(n => {
        if (n.x < minX) minX = n.x;
        if (n.x > maxX) maxX = n.x;
        if (n.y < minY) minY = n.y;
        if (n.y > maxY) maxY = n.y;
      });

      const pad = 45;
      ctx.fillStyle = colors[idx % colors.length];
      ctx.strokeStyle = borderColors[idx % borderColors.length];
      ctx.lineWidth = 2 / this.zoom;
      ctx.setLineDash([6, 6]);

      ctx.beginPath();
      ctx.roundRect(minX - pad, minY - pad, (maxX - minX) + pad * 2, (maxY - minY) + pad * 2, 24);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      // Community label
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillStyle = borderColors[idx % borderColors.length];
      ctx.fillText(`Community #${commId} (Louvain Modularity: 0.74)`, minX - pad + 12, minY - pad - 8);
    });
  }

  drawEdges(ctx) {
    for (let e of this.edges) {
      const isCycle = this.highlightCycles && e.isCycleEdge;
      const isSelected = this.selectedNode && (e.source === this.selectedNode || e.target === this.selectedNode);
      const isHovered = this.hoveredNode && (e.source === this.hoveredNode || e.target === this.hoveredNode);

      ctx.beginPath();
      ctx.moveTo(e.source.x, e.source.y);
      ctx.lineTo(e.target.x, e.target.y);

      if (isCycle) {
        ctx.strokeStyle = '#ec4899'; // Neon Pink for cycle
        ctx.lineWidth = 3.5 / this.zoom;
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 10;
      } else if (isSelected || isHovered) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5 / this.zoom;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1.5 / this.zoom;
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw arrow head
      this.drawArrowHead(ctx, e.source, e.target, isCycle ? '#ec4899' : (isSelected ? '#38bdf8' : 'rgba(148, 163, 184, 0.6)'));

      // Draw amount label on edge if zoomed in or selected
      if (this.zoom >= 0.8 || isSelected || isCycle) {
        const midX = (e.source.x + e.target.x) / 2;
        const midY = (e.source.y + e.target.y) / 2;
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = isCycle ? '#f472b6' : 'rgba(203, 213, 225, 0.85)';
        ctx.fillText(e.amount, midX + 6, midY - 6);
      }
    }
  }

  drawArrowHead(ctx, fromNode, toNode, color) {
    const toRadius = this.getNodeRadius(toNode);
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return;

    // Arrow tip just outside target node boundary
    const tipX = toNode.x - Math.cos(angle) * (toRadius + 2);
    const tipY = toNode.y - Math.sin(angle) * (toRadius + 2);

    const arrowLen = 10 / this.zoom;
    const arrowWidth = 5 / this.zoom;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX - arrowLen * Math.cos(angle - Math.PI / 7), tipY - arrowLen * Math.sin(angle - Math.PI / 7));
    ctx.lineTo(tipX - arrowLen * Math.cos(angle + Math.PI / 7), tipY - arrowLen * Math.sin(angle + Math.PI / 7));
    ctx.closePath();
    ctx.fill();
  }

  drawParticles(ctx) {
    for (let p of this.particles) {
      const e = p.edge;
      const x = e.source.x + (e.target.x - e.source.x) * p.progress;
      const y = e.source.y + (e.target.y - e.source.y) * p.progress;

      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, 4 / this.zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  drawNodes(ctx) {
    for (let n of this.nodes) {
      const r = this.getNodeRadius(n);
      const isSelected = this.selectedNode === n;
      const isHovered = this.hoveredNode === n;
      const isCycleNode = this.highlightCycles && n.isCycleMember;

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);

      // Node colors by type
      let fillColor = '#1e293b';
      let strokeColor = '#475569';

      if (n.type === 'suspect' || n.type === 'aggregator' || n.isTarget) {
        fillColor = '#7f1d1d';
        strokeColor = '#ef4444';
      } else if (n.type === 'mule') {
        fillColor = '#78350f';
        strokeColor = '#f59e0b';
      } else if (n.type === 'shell') {
        fillColor = '#1e3a8a';
        strokeColor = '#3b82f6';
      } else if (n.type === 'gateway' || n.type === 'offshore') {
        fillColor = '#581c87';
        strokeColor = '#a855f7';
      } else if (n.type === 'recruiter') {
        fillColor = '#831843';
        strokeColor = '#ec4899';
      } else if (n.type === 'legitimate') {
        fillColor = '#064e3b';
        strokeColor = '#10b981';
      }

      if (isCycleNode) {
        strokeColor = '#ec4899';
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 14;
      } else if (isSelected || isHovered) {
        strokeColor = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
      }

      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.lineWidth = (isSelected || isCycleNode ? 3.5 : 2) / this.zoom;
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Node Icon / Initial
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(10, r * 0.7)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initial = n.type === 'aggregator' ? '★' : (n.type === 'mule' ? 'M' : (n.type === 'shell' ? 'S' : (n.type === 'offshore' ? 'O' : 'A')));
      ctx.fillText(initial, n.x, n.y);

      // Draw label below node
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(n.label, n.x, n.y + r + 14);

      if (this.scaleByCentrality && n.betweenness) {
        ctx.font = '9px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`C_B: ${n.betweenness.toFixed(2)}`, n.x, n.y + r + 26);
      }
    }
  }
}

window.FinTraceGraphEngine = FinTraceGraphEngine;

