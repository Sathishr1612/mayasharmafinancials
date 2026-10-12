/* Home hero: animated candlestick chart drawn behind the headline (left side). */
(() => {
  "use strict";

  const canvas = document.getElementById("heroTrading");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const UP = "#16c784";
  const DOWN = "#ea3943";
  const GOLD = "#FCC905";
  const NEW_CANDLE_MS = 900;
  const MA_PERIOD = 8;

  let W = 0, H = 0, dpr = 1, spacing = 16, maxCandles = 0;
  let candles = [];
  let lo = 0, hi = 1;            // smoothed price range on screen
  let shift = 0;                 // 0..1 slide-in progress of the newest candle
  let lastSpawn = 0;
  let running = false;
  let rafId = 0;

  const rand = (a, b) => Math.random() * (b - a) + a;

  function makeCandle(prevClose) {
    const open = prevClose;
    const drift = rand(-1.6, 1.9);   // gentle upward bias
    const close = open + drift;
    return {
      open,
      close,
      target: close,
      high: Math.max(open, close) + rand(0.2, 1.2),
      low: Math.min(open, close) - rand(0.2, 1.2),
      vol: rand(0.25, 1)
    };
  }

  function seed() {
    candles = [];
    let p = 100;
    for (let i = 0; i < maxCandles; i++) {
      const c = makeCandle(p);
      candles.push(c);
      p = c.close;
    }
    const r = range();
    lo = r.lo;
    hi = r.hi;
  }

  function range() {
    let a = Infinity, b = -Infinity;
    candles.forEach((c) => {
      a = Math.min(a, c.low);
      b = Math.max(b, c.high);
    });
    const pad = (b - a) * 0.15 || 1;
    return { lo: a - pad, hi: b + pad };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spacing = W < 600 ? 16 : 22;
    maxCandles = Math.ceil(W / spacing) + 2;
    seed();
  }

  // Price → y within the chart band (upper ~70% of the canvas, volume below)
  const yOf = (p) => {
    const top = H * 0.12;
    const bottom = H * 0.78;
    return bottom - ((p - lo) / (hi - lo)) * (bottom - top);
  };

  function movingAverage(i) {
    const from = Math.max(0, i - MA_PERIOD + 1);
    let sum = 0;
    for (let k = from; k <= i; k++) sum += candles[k].close;
    return sum / (i - from + 1);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let g = 1; g < 6; g++) {
      const y = Math.round((H / 6) * g) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const n = candles.length;
    const xOf = (i) => W - (n - 1 - i + shift) * spacing - spacing * 2;
    const bodyW = Math.max(3, spacing * 0.4);

    // Candles
    candles.forEach((c, i) => {
      const x = xOf(i);
      const up = c.close >= c.open;
      const color = up ? UP : DOWN;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, yOf(c.high));
      ctx.lineTo(Math.round(x) + 0.5, yOf(c.low));
      ctx.stroke();
      const yTop = yOf(Math.max(c.open, c.close));
      const yBot = yOf(Math.min(c.open, c.close));
      ctx.fillRect(x - bodyW / 2, yTop, bodyW, Math.max(1.5, yBot - yTop));
    });

    // Moving average with glow + soft area underneath
    ctx.beginPath();
    candles.forEach((c, i) => {
      const x = xOf(i);
      const y = yOf(movingAverage(i));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.save();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(252,201,5,0.7)";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();

    ctx.lineTo(xOf(n - 1), H * 0.8);
    ctx.lineTo(xOf(0), H * 0.8);
    ctx.closePath();
    const area = ctx.createLinearGradient(0, H * 0.15, 0, H * 0.8);
    area.addColorStop(0, "rgba(252,201,5,0.12)");
    area.addColorStop(1, "rgba(252,201,5,0)");
    ctx.fillStyle = area;
    ctx.fill();

    // Last price line + tag
    const last = candles[n - 1];
    const ly = yOf(last.close);
    const lastColor = last.close >= last.open ? UP : DOWN;
    ctx.save();
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = lastColor;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(0, ly);
    ctx.lineTo(W, ly);
    ctx.stroke();
    ctx.restore();

    const label = (last.close * 220).toFixed(2);
    ctx.font = "600 11px Inter, sans-serif";
    const tw = ctx.measureText(label).width + 14;
    const tx = xOf(n - 1) + spacing;
    ctx.fillStyle = lastColor;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(tx, ly - 10, tw, 20, 4) : ctx.rect(tx, ly - 10, tw, 20);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText(label, tx + 7, ly + 4);

    // Pulsing dot on the newest close
    const pulse = (Math.sin(performance.now() / 300) + 1) / 2;
    ctx.beginPath();
    ctx.arc(xOf(n - 1), ly, 3 + pulse * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(252,201,5,${0.35 + pulse * 0.4})`;
    ctx.fill();
  }

  function tick(now) {
    if (!running) return;

    // Live candle: jitter toward a moving target
    const last = candles[candles.length - 1];
    if (Math.random() < 0.08) last.target = last.open + rand(-2, 2.4);
    last.close += (last.target - last.close) * 0.08;
    last.high = Math.max(last.high, last.close);
    last.low = Math.min(last.low, last.close);

    // New candle every NEW_CANDLE_MS, sliding in smoothly
    if (now - lastSpawn > NEW_CANDLE_MS) {
      lastSpawn = now;
      candles.push(makeCandle(last.close));
      if (candles.length > maxCandles) candles.shift();
      shift = 1;
    }
    shift += (0 - shift) * 0.12;

    // Ease the visible price range so the chart never jumps
    const r = range();
    lo += (r.lo - lo) * 0.05;
    hi += (r.hi - hi) * 0.05;

    draw();
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (running || reducedMotion) return;
    running = true;
    lastSpawn = performance.now();
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  resize();
  draw();

  // Only animate while the hero is on screen and the tab is visible
  const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
  io.observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      draw();
    }, 200);
  });
})();
