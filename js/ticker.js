(function () {
  /**
   * Demo market ticker.
   * Replace fetchDemo() with a live API adapter when credentials are available.
   */
  const DEMO_DATA = [
    { symbol: "NIFTY 50", change: 0.72 },
    { symbol: "SENSEX", change: 0.61 },
    { symbol: "BANK NIFTY", change: 0.82 },
    { symbol: "NIFTY IT", change: -0.24 },
    { symbol: "NIFTY FMCG", change: 0.31 },
    { symbol: "USD/INR", change: 0.08 }
  ];

  function formatItem(item) {
    const up = item.change >= 0;
    const arrow = up ? "▲" : "▼";
    const cls = up ? "up" : "down";
    const val = `${up ? "+" : ""}${item.change.toFixed(2)}%`;
    return `<div class="ticker-item"><strong>${item.symbol}</strong> <span class="${cls}">${arrow} ${val}</span></div>`;
  }

  function render(data) {
    const track = document.getElementById("tickerTrack");
    if (!track) return;

    // Repeat data 4 times so one block is very wide (~3600px)
    let duplicatedData = [];
    for (let i = 0; i < 4; i++) {
      duplicatedData = duplicatedData.concat(data);
    }

    const html = duplicatedData.map(formatItem).join("");
    // Double it for seamless infinite scroll
    track.innerHTML = html + html;

    // Adjust animation duration to keep speed consistent (32s * 4 = 128s)
    track.style.animationDuration = "128s";
  }

  function fetchDemo() {
    return Promise.resolve(DEMO_DATA);
  }

  window.MSTicker = {
    refresh: function () {
      fetchDemo().then(render);
    }
  };

  window.MSTicker.refresh();
})();
