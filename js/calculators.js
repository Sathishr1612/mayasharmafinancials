(function () {
  const formatINR = (n) =>
    "₹" + Math.round(n).toLocaleString("en-IN");

  function fvSip(monthly, years, rate) {
    const r = rate / 12 / 100;
    const n = years * 12;
    if (r === 0) return monthly * n;
    return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }

  function fvLump(principal, years, rate) {
    return principal * Math.pow(1 + rate / 100, years);
  }

  function cagr(begin, end, years) {
    if (begin <= 0 || years <= 0) return 0;
    return (Math.pow(end / begin, 1 / years) - 1) * 100;
  }

  function emi(principal, years, rate) {
    const r = rate / 12 / 100;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  function retirementCorpus(monthly, years, rate) {
    return fvSip(monthly, years, rate);
  }

  function swpMonths(corpus, monthly, rate) {
    const r = rate / 12 / 100;
    if (monthly <= 0) return 0;
    if (r === 0) return corpus / monthly;
    const ratio = monthly / (monthly - corpus * r);
    if (ratio <= 0) return Infinity;
    return Math.log(ratio) / Math.log(1 + r);
  }

  function positionSize(capital, riskPct, entry, stop) {
    const riskAmt = capital * (riskPct / 100);
    const perShare = Math.abs(entry - stop);
    if (perShare === 0) return 0;
    return Math.floor(riskAmt / perShare);
  }

  const calculators = {
    sip: {
      compute(v) {
        const invested = v.monthly * v.years * 12;
        const future = fvSip(v.monthly, v.years, v.rate);
        return {
          rows: [
            ["Invested amount", formatINR(invested)],
            ["Estimated returns", formatINR(future - invested)],
            ["Future value", formatINR(future)]
          ],
          chart: [invested, Math.max(future - invested, 0)]
        };
      }
    },
    goal: {
      compute(v) {
        const r = v.rate / 12 / 100;
        const n = v.years * 12;
        const needed = r === 0
          ? v.goal / n
          : v.goal * r / ((Math.pow(1 + r, n) - 1) * (1 + r));
        return {
          rows: [
            ["Goal amount", formatINR(v.goal)],
            ["Required monthly SIP", formatINR(needed)],
            ["Total invested", formatINR(needed * n)]
          ]
        };
      }
    },
    retirement: {
      compute(v) {
        const corpus = retirementCorpus(v.monthly, v.years, v.rate);
        return {
          rows: [
            ["Monthly savings", formatINR(v.monthly)],
            ["Years to retire", String(v.years)],
            ["Projected corpus", formatINR(corpus)]
          ]
        };
      }
    },
    swp: {
      compute(v) {
        const months = swpMonths(v.corpus, v.monthly, v.rate);
        const label = !isFinite(months)
          ? "May last indefinitely at this rate"
          : Math.round(months / 12) + " years";
        return {
          rows: [
            ["Starting corpus", formatINR(v.corpus)],
            ["Monthly withdrawal", formatINR(v.monthly)],
            ["Estimated duration", label]
          ]
        };
      }
    },
    lumpsum: {
      compute(v) {
        const future = fvLump(v.amount, v.years, v.rate);
        return {
          rows: [
            ["Invested amount", formatINR(v.amount)],
            ["Estimated returns", formatINR(future - v.amount)],
            ["Future value", formatINR(future)]
          ]
        };
      }
    },
    goallump: {
      compute(v) {
        const required = v.goal / Math.pow(1 + v.rate / 100, v.years);
        return {
          rows: [
            ["Goal amount", formatINR(v.goal)],
            ["Years", String(v.years)],
            ["Required lumpsum today", formatINR(required)]
          ]
        };
      }
    },
    cagr: {
      compute(v) {
        const rate = cagr(v.begin, v.end, v.years);
        return {
          rows: [
            ["Beginning value", formatINR(v.begin)],
            ["Ending value", formatINR(v.end)],
            ["CAGR", rate.toFixed(2) + "%"]
          ]
        };
      }
    },
    position: {
      compute(v) {
        const qty = positionSize(v.capital, v.risk, v.entry, v.stop);
        return {
          rows: [
            ["Capital at risk", formatINR(v.capital * (v.risk / 100))],
            ["Suggested quantity", String(qty)],
            ["Approx. position value", formatINR(qty * v.entry)]
          ]
        };
      }
    },
    carloan: {
      compute(v) {
        const monthly = emi(v.amount, v.years, v.rate);
        const total = monthly * v.years * 12;
        return {
          rows: [
            ["EMI", formatINR(monthly)],
            ["Total payable", formatINR(total)],
            ["Interest cost", formatINR(total - v.amount)]
          ]
        };
      }
    },
    emi: {
      compute(v) {
        const monthly = emi(v.amount, v.years, v.rate);
        const total = monthly * v.years * 12;
        return {
          rows: [
            ["EMI", formatINR(monthly)],
            ["Total payable", formatINR(total)],
            ["Interest cost", formatINR(total - v.amount)]
          ]
        };
      }
    }
  };

  let chart;

  function renderResult(target, result) {
    target.innerHTML = result.rows.map((row, i) => `
      <div class="stat-box ${i === result.rows.length - 1 ? "primary" : ""}">
        <span>${row[0]}</span>
        <strong>${row[1]}</strong>
      </div>
    `).join("");

    const canvas = document.getElementById("sipChart");
    if (canvas && result.chart && window.Chart) {
      if (chart) chart.destroy();
      chart = new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: ["Invested", "Estimated returns"],
          datasets: [{
            data: result.chart,
            backgroundColor: ["#0B102D", "#FCC905"],
            borderWidth: 0
          }]
        },
        options: {
          plugins: { legend: { position: "bottom" } },
          cutout: "68%"
        }
      });
    }
  }

  function readInputs(form) {
    const data = {};
    form.querySelectorAll("[data-k]").forEach((el) => {
      data[el.dataset.k] = Number(el.value);
    });
    return data;
  }

  function bindPanel(panel) {
    const id = panel.dataset.calc;
    const form = panel.querySelector("form");
    const out = panel.querySelector("[data-result]");
    if (!form || !calculators[id]) return;

    const run = () => {
      const result = calculators[id].compute(readInputs(form));
      renderResult(out, result);
    };

    form.addEventListener("input", run);
    run();
  }

  document.querySelectorAll(".calc-panel").forEach(bindPanel);

  document.querySelectorAll(".calc-nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".calc-nav button").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".calc-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.target).classList.add("active");
    });
  });

  window.MSCalc = { calculators, fvSip, emi, cagr };
})();
