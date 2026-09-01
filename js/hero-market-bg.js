(() => {
  "use strict";

  const canvas = document.getElementById("heroMarketBg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W = 0, H = 0, dpr = 1;
  let animId;
  const isMobile = () => W < 800;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = (a, b) => Math.random() * (b - a) + a;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ═══════════════════════════════════════════════
     SCENE DATA
     ═══════════════════════════════════════════════ */
  let candles = [];
  let volumeBars = [];
  let floatingNums = [];
  let particles = [];
  let linePulses = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildScene();
  }

  /* ─── Build all scene objects ─── */
  function buildScene() {
    const mobile = isMobile();

    /* ── Candlesticks ── */
    candles = [];
    const cCount = mobile ? 22 : 48;
    let price = H * 0.50;
    for (let i = 0; i < cCount; i++) {
      const xStart = W * 0.38;
      const spacing = (W - xStart - 20) / cCount;
      const x = xStart + i * spacing + spacing * 0.5;
      const vol = rand(-22, 22);
      const next = clamp(price + vol, H * 0.22, H * 0.78);
      const bullish = next < price;
      candles.push({
        x, open: price, close: next,
        high: Math.min(price, next) - rand(6, 22),
        low: Math.max(price, next) + rand(6, 22),
        bullish,
        width: rand(5, 9),
        phase: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.0006, 0.0015)
      });
      price = next;
    }

    /* ── Volume bars ── */
    volumeBars = [];
    const vCount = mobile ? 20 : 45;
    const vStart = W * 0.50;
    for (let i = 0; i < vCount; i++) {
      volumeBars.push({
        x: vStart + i * ((W - vStart - 15) / vCount),
        baseH: rand(8, 50),
        phase: rand(0, Math.PI * 2),
        bullish: Math.random() > 0.4
      });
    }

    /* ── Floating numbers ── */
    floatingNums = [];
    const nCount = mobile ? 10 : 24;
    for (let i = 0; i < nCount; i++) {
      floatingNums.push(createFloatingNum());
    }

    /* ── Particles ── */
    particles = [];
    const pCount = mobile ? 18 : 45;
    for (let i = 0; i < pCount; i++) {
      const px = rand(W * 0.35, W);
      const py = rand(0, H);
      /* Avoid portrait center zone */
      if (px > W * 0.55 && px < W * 0.80 && py > H * 0.18 && py < H * 0.68) continue;
      particles.push({
        x: px, y: py,
        r: rand(0.3, 1.5),
        vx: rand(-0.04, 0.04),
        vy: rand(-0.06, 0.02),
        alpha: rand(0.04, 0.22),
        phase: rand(0, Math.PI * 2),
        depth: rand(0, 1)
      });
    }

    /* ── Line pulses ── */
    linePulses = [];
  }

  function createFloatingNum() {
    const isPercent = Math.random() > 0.5;
    const isUp = Math.random() > 0.38;
    return {
      x: rand(W * 0.48, W * 0.96),
      y: rand(H * 0.08, H * 0.88),
      value: isPercent
        ? (isUp ? "+" : "-") + rand(0.1, 4.5).toFixed(2) + "%"
        : rand(10, 999).toFixed(2),
      isUp,
      alpha: 0,
      targetAlpha: rand(0.06, 0.22),
      fadeState: "in",
      holdTimer: rand(120, 300),
      speed: rand(0.04, 0.12),
      size: rand(8, 12),
      life: 0
    };
  }

  /* ═══════════════════════════════════════════════
     DRAWING FUNCTIONS
     ═══════════════════════════════════════════════ */

  /* ─── 1. Subtle financial grid ─── */
  function drawGrid() {
    const startX = W * 0.30;
    ctx.lineWidth = 0.4;

    for (let y = 0; y < H; y += 100) {
      const distCenter = 1 - Math.abs(y - H * 0.5) / (H * 0.5);
      const a = 0.015 + distCenter * 0.012;
      ctx.strokeStyle = `rgba(55,130,200,${a})`;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    for (let x = startX; x < W; x += 120) {
      const fade = (x - startX) / (W - startX);
      ctx.strokeStyle = `rgba(55,130,200,${0.008 + fade * 0.025})`;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
  }

  /* ─── 2. Atmospheric depth glow ─── */
  function drawAtmosphere(t) {
    const gx = W * 0.68 + Math.sin(t * 0.00015) * 25;
    const gy = H * 0.40 + Math.cos(t * 0.0002) * 15;
    const g1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.30);
    g1.addColorStop(0, "rgba(0,90,210,.08)");
    g1.addColorStop(0.6, "rgba(0,70,170,.03)");
    g1.addColorStop(1, "transparent");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);

    const cx = W * 0.82 + Math.sin(t * 0.00025) * 15;
    const cy = H * 0.72;
    const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
    g2.addColorStop(0, "rgba(0,200,255,.04)");
    g2.addColorStop(1, "transparent");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  /* ─── 3. Smooth trend graph lines ─── */
  function generateTrendPoints(t, seed, amp, base, speed, behavior) {
    const pts = [];
    const step = 5;
    for (let x = W * 0.28; x <= W + 5; x += step) {
      let y = base;
      const ts = t * speed;

      if (behavior === "rising") {
        const progress = (x - W * 0.28) / (W * 0.72);
        y = base - progress * amp * 0.6
          + Math.sin(x * 0.004 + ts + seed) * amp
          + Math.sin(x * 0.009 - ts * 0.6 + seed * 1.5) * amp * 0.3;
      } else if (behavior === "falling") {
        const progress = (x - W * 0.28) / (W * 0.72);
        y = base + progress * amp * 0.4
          + Math.sin(x * 0.005 + ts + seed) * amp * 0.8
          + Math.cos(x * 0.008 - ts * 0.5 + seed * 2) * amp * 0.25;
      } else if (behavior === "stable") {
        y = base
          + Math.sin(x * 0.003 + ts + seed) * amp * 0.5
          + Math.sin(x * 0.007 + ts * 0.4 + seed * 1.3) * amp * 0.2;
      } else {
        y = base
          + Math.sin(x * 0.006 + ts + seed) * amp
          + Math.sin(x * 0.012 - ts * 0.7 + seed * 1.8) * amp * 0.45
          + Math.cos(x * 0.003 + ts * 0.3 + seed * 0.6) * amp * 0.15;
      }
      pts.push({ x, y });
    }
    return pts;
  }

  function drawSmoothLine(points, color, width) {
    if (points.length < 2) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const cx = (points[i].x + points[i + 1].x) / 2;
      const cy = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, cx, cy);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.restore();
  }

  function drawLineFill(points, colorRGB, alphaTop, baseY) {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const cx = (points[i].x + points[i + 1].x) / 2;
      const cy = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, cx, cy);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(points[points.length - 1].x, baseY);
    ctx.lineTo(points[0].x, baseY);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, points[0].y, 0, baseY);
    g.addColorStop(0, `rgba(${colorRGB},${alphaTop})`);
    g.addColorStop(0.5, `rgba(${colorRGB},${alphaTop * 0.25})`);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fill();
  }

  /* Line definitions: rising, falling, stable, fluctuating */
  const LINES = [
    {
      seed: 1.0, amp: 0, base: 0, speed: 0.00035, behavior: "rising",
      color: "rgba(0,190,255,0.25)", fill: "0,190,255", width: 1.2
    },
    {
      seed: 3.5, amp: 0, base: 0, speed: 0.00028, behavior: "falling",
      color: "rgba(0,140,255,0.15)", fill: "0,140,255", width: 1.0
    }
  ];

  function updateLineParams() {
    LINES[0].amp = H * 0.06; LINES[0].base = H * 0.45;
    LINES[1].amp = H * 0.05; LINES[1].base = H * 0.55;
  }

  function drawTrendLines(t) {
    updateLineParams();
    const allLinePoints = [];
    for (const L of LINES) {
      const pts = generateTrendPoints(t, L.seed, L.amp, L.base, L.speed, L.behavior);
      drawLineFill(pts, L.fill, 0.06, L.base + L.amp * 2);
      drawSmoothLine(pts, L.color, L.width);
      allLinePoints.push(pts);
    }
    return allLinePoints;
  }

  /* ─── 4. Light pulses travelling along lines ─── */
  function spawnPulse(lineIdx, allPts) {
    if (allPts[lineIdx] && allPts[lineIdx].length > 10) {
      linePulses.push({
        lineIdx,
        pos: 0,
        speed: rand(0.8, 1.8),
        alpha: rand(0.25, 0.55),
        size: rand(2, 4)
      });
    }
  }

  function drawPulses(allLinePoints) {
    for (let i = linePulses.length - 1; i >= 0; i--) {
      const p = linePulses[i];
      p.pos += p.speed;
      const pts = allLinePoints[p.lineIdx];
      if (!pts) { linePulses.splice(i, 1); continue; }

      const idx = Math.floor(p.pos);
      if (idx >= pts.length) { linePulses.splice(i, 1); continue; }

      const pt = pts[idx];
      const life = 1 - (idx / pts.length) * 0.3;

      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.size * 4);
      g.addColorStop(0, `rgba(100,210,255,${p.alpha * life})`);
      g.addColorStop(0.3, `rgba(60,180,255,${p.alpha * life * 0.3})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, p.size * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,240,255,${p.alpha * life})`;
      ctx.fill();
    }
  }

  /* ─── 5. Candlesticks ─── */
  function drawCandles(t) {
    ctx.save();
    for (const c of candles) {
      const pulse = (Math.sin(t * c.pulseSpeed + c.phase) + 1) * 0.5;
      const bodyA = 0.55 + pulse * 0.35;
      const wickA = 0.35 + pulse * 0.25;

      const bullColor   = `rgba(0,210,110,${bodyA})`;
      const bearColor   = `rgba(230,60,90,${bodyA})`;
      const bullWick    = `rgba(0,210,110,${wickA})`;
      const bearWick    = `rgba(230,60,90,${wickA})`;

      const color     = c.bullish ? bullColor  : bearColor;
      const wickColor = c.bullish ? bullWick   : bearWick;

      /* Wick (shadow line) */
      ctx.strokeStyle = wickColor;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = c.bullish ? 'rgba(0,210,110,0.6)' : 'rgba(230,60,90,0.6)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(c.x, c.high);
      ctx.lineTo(c.x, c.low);
      ctx.stroke();

      /* Body */
      const top = Math.min(c.open, c.close);
      const bodyH = Math.max(4, Math.abs(c.open - c.close));
      const halfW = (c.width || 6) / 2;
      ctx.shadowBlur = 10;
      ctx.fillStyle = color;
      ctx.fillRect(c.x - halfW, top, c.width || 6, bodyH);

      /* Thin border outline on body */
      ctx.strokeStyle = c.bullish ? 'rgba(0,240,130,0.4)' : 'rgba(255,90,110,0.4)';
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 0;
      ctx.strokeRect(c.x - halfW, top, c.width || 6, bodyH);
    }
    ctx.restore();
  }

  /* ─── 6. Volume bars ─── */
  function drawVolume(t) {
    const baseY = H - 18;
    for (const v of volumeBars) {
      const wave = (Math.sin(t * 0.0004 + v.phase) + 1) * 0.5;
      const h = v.baseH * (0.5 + wave * 0.5);
      const a = v.bullish ? 0.22 : 0.16;

      const g = ctx.createLinearGradient(0, baseY - h, 0, baseY);
      g.addColorStop(0, v.bullish
        ? `rgba(0,210,110,${a})`
        : `rgba(230,60,90,${a})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(v.x, baseY - h, 4, h);
    }
  }

  /* ─── 7. Floating financial numbers (fade in → hold → fade out → reset) ─── */
  function drawFloatingNums(t) {
    ctx.save();
    for (const n of floatingNums) {
      n.life++;

      if (n.fadeState === "in") {
        n.alpha = Math.min(n.alpha + 0.003, n.targetAlpha);
        if (n.alpha >= n.targetAlpha) n.fadeState = "hold";
      } else if (n.fadeState === "hold") {
        n.holdTimer--;
        if (n.holdTimer <= 0) n.fadeState = "out";
      } else {
        n.alpha -= 0.004;
        if (n.alpha <= 0) Object.assign(n, createFloatingNum());
      }

      n.y -= n.speed * 0.3;
      const wobble = Math.sin(t * 0.0003 + n.life * 0.01) * 1.5;

      if (n.alpha < 0.01) continue;

      ctx.font = `500 ${n.size}px 'Inter', monospace`;
      ctx.fillStyle = n.isUp
        ? `rgba(60,200,255,${n.alpha})`
        : `rgba(200,80,110,${n.alpha * 0.8})`;
      ctx.fillText(n.value, n.x + wobble, n.y);
    }
    ctx.restore();
  }

  /* ─── 8. Particles with depth ─── */
  function drawParticles(t) {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < W * 0.3) p.x = W;
      if (p.x > W + 5) p.x = W * 0.35;
      if (p.y < -10) { p.y = H + 10; p.x = rand(W * 0.4, W); }
      if (p.y > H + 10) p.y = -10;

      const pulse = 0.6 + Math.sin(t * 0.001 + p.phase) * 0.4;
      const a = p.alpha * pulse;
      const depthScale = 0.4 + p.depth * 0.6;
      const r = p.r * depthScale;

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(60,180,255,${a * depthScale})`;
      ctx.fill();

      if (p.depth > 0.7 && r > 0.8) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(60,180,255,${a * 0.12})`;
        ctx.fill();
      }
    }
  }

  /* ─── 9. Dashed price levels ─── */
  function drawPriceLevels() {
    ctx.save();
    ctx.setLineDash([3, 8]);
    ctx.lineWidth = 0.4;
    const levels = [0.30, 0.42, 0.55, 0.68];
    for (const l of levels) {
      ctx.strokeStyle = "rgba(80,150,220,0.03)";
      ctx.beginPath();
      ctx.moveTo(W * 0.38, H * l);
      ctx.lineTo(W, H * l);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  /* ═══════════════════════════════════════════════
     MAIN RENDER LOOP
     ═══════════════════════════════════════════════ */
  function animate(t) {
    if (reducedMotion) t = 0;
    ctx.clearRect(0, 0, W, H);

    /* Background */
    drawAtmosphere(t);
    drawGrid();
    drawPriceLevels();

    /* Midground: market data */
    drawCandles(t);
    drawVolume(t);

    /* Graph lines + gradient fills */
    const allPts = drawTrendLines(t);

    /* Foreground: pulses, numbers, particles */
    drawPulses(allPts);
    drawFloatingNums(t);
    drawParticles(t);

    /* Spawn occasional light pulses */
    if (!reducedMotion && Math.random() < 0.005) {
      spawnPulse(Math.floor(rand(0, LINES.length)), allPts);
    }

    animId = requestAnimationFrame(animate);
  }

  /* ─── Init ─── */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else animId = requestAnimationFrame(animate);
  });

  resize();
  animId = requestAnimationFrame(animate);
})();
