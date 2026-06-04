const etfs = [
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    issuer: "Vanguard",
    sector: "Broad Market",
    expense: 0.03,
    return1y: 28,
    yield: 1.3,
    aum: 500,
    launch: 2010,
    website: "https://investor.vanguard.com/investment-products/etfs/profile/voo",
    search: "https://investor.vanguard.com/search?query=VOO",
  },
  {
    ticker: "IVV",
    name: "iShares Core S&P 500 ETF",
    issuer: "iShares",
    sector: "Broad Market",
    expense: 0.03,
    return1y: 28,
    yield: 1.3,
    aum: 470,
    launch: 2000,
    website: "https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf",
    search: "https://www.ishares.com/us/search#q=IVV",
  },
  {
    ticker: "QQQ",
    name: "Invesco QQQ Trust",
    issuer: "Invesco",
    sector: "Technology",
    expense: 0.2,
    return1y: 35,
    yield: 0.6,
    aum: 285,
    launch: 1999,
    website: "https://www.invesco.com/qqq-etf/en/home.html",
    search: "https://www.invesco.com/us/en/search.html?q=QQQ",
  },
  {
    ticker: "XLK",
    name: "Technology Select Sector SPDR Fund",
    issuer: "State Street SPDR",
    sector: "Technology",
    expense: 0.09,
    return1y: 32,
    yield: 0.7,
    aum: 75,
    launch: 1998,
    website: "https://www.ssga.com/us/en/intermediary/etfs/funds/the-technology-select-sector-spdr-fund-xlk",
    search: "https://www.ssga.com/us/en/intermediary/search?query=XLK",
  },
  {
    ticker: "VGT",
    name: "Vanguard Information Technology ETF",
    issuer: "Vanguard",
    sector: "Technology",
    expense: 0.1,
    return1y: 31,
    yield: 0.6,
    aum: 85,
    launch: 2004,
    website: "https://investor.vanguard.com/investment-products/etfs/profile/vgt",
    search: "https://investor.vanguard.com/search?query=VGT",
  },
  {
    ticker: "XLV",
    name: "Health Care Select Sector SPDR Fund",
    issuer: "State Street SPDR",
    sector: "Healthcare",
    expense: 0.09,
    return1y: 9,
    yield: 1.5,
    aum: 42,
    launch: 1998,
    website: "https://www.ssga.com/us/en/intermediary/etfs/funds/the-health-care-select-sector-spdr-fund-xlv",
    search: "https://www.ssga.com/us/en/intermediary/search?query=XLV",
  },
  {
    ticker: "XLF",
    name: "Financial Select Sector SPDR Fund",
    issuer: "State Street SPDR",
    sector: "Financials",
    expense: 0.09,
    return1y: 23,
    yield: 1.6,
    aum: 43,
    launch: 1998,
    website: "https://www.ssga.com/us/en/intermediary/etfs/funds/the-financial-select-sector-spdr-fund-xlf",
    search: "https://www.ssga.com/us/en/intermediary/search?query=XLF",
  },
  {
    ticker: "VNQ",
    name: "Vanguard Real Estate ETF",
    issuer: "Vanguard",
    sector: "Real Estate",
    expense: 0.13,
    return1y: 14,
    yield: 3.7,
    aum: 36,
    launch: 2004,
    website: "https://investor.vanguard.com/investment-products/etfs/profile/vnq",
    search: "https://investor.vanguard.com/search?query=VNQ",
  },
  {
    ticker: "ICLN",
    name: "iShares Global Clean Energy ETF",
    issuer: "iShares",
    sector: "Clean Energy",
    expense: 0.41,
    return1y: -8,
    yield: 1.4,
    aum: 2.5,
    launch: 2008,
    website: "https://www.ishares.com/us/products/239738/ishares-global-clean-energy-etf",
    search: "https://www.ishares.com/us/search#q=ICLN",
  },
  {
    ticker: "SCHD",
    name: "Schwab U.S. Dividend Equity ETF",
    issuer: "Schwab",
    sector: "Dividend",
    expense: 0.06,
    return1y: 18,
    yield: 3.4,
    aum: 62,
    launch: 2011,
    website: "https://www.schwabassetmanagement.com/products/schd",
    search: "https://www.schwabassetmanagement.com/search?query=SCHD",
  },
  {
    ticker: "VYM",
    name: "Vanguard High Dividend Yield ETF",
    issuer: "Vanguard",
    sector: "Dividend",
    expense: 0.06,
    return1y: 17,
    yield: 2.8,
    aum: 58,
    launch: 2006,
    website: "https://investor.vanguard.com/investment-products/etfs/profile/vym",
    search: "https://investor.vanguard.com/search?query=VYM",
  },
  {
    ticker: "VEA",
    name: "Vanguard FTSE Developed Markets ETF",
    issuer: "Vanguard",
    sector: "International",
    expense: 0.06,
    return1y: 15,
    yield: 3.0,
    aum: 130,
    launch: 2007,
    website: "https://investor.vanguard.com/investment-products/etfs/profile/vea",
    search: "https://investor.vanguard.com/search?query=VEA",
  },
];

const controls = {
  search: document.querySelector("#searchInput"),
  sector: document.querySelector("#sectorFilter"),
  issuer: document.querySelector("#issuerFilter"),
  expense: document.querySelector("#expenseFilter"),
  performance: document.querySelector("#performanceFilter"),
  aum: document.querySelector("#aumFilter"),
  dividend: document.querySelector("#dividendFilter"),
  lowCost: document.querySelector("#lowCostFilter"),
  sort: document.querySelector("#sortSelect"),
  askInput: document.querySelector("#askInput"),
};

const output = {
  cards: document.querySelector("#etfCards"),
  count: document.querySelector("#resultCount"),
  empty: document.querySelector("#emptyState"),
  expenseValue: document.querySelector("#expenseValue"),
  performanceValue: document.querySelector("#performanceValue"),
  aumValue: document.querySelector("#aumValue"),
  askStatus: document.querySelector("#askStatus"),
};

function formatCurrencyBillions(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}B`;
}

function populateFilterOptions() {
  const sectors = [...new Set(etfs.map((etf) => etf.sector))].sort();
  const issuers = [...new Set(etfs.map((etf) => etf.issuer))].sort();

  sectors.forEach((sector) => controls.sector.add(new Option(sector, sector)));
  issuers.forEach((issuer) => controls.issuer.add(new Option(issuer, issuer)));
}

function getFilteredEtfs() {
  const query = controls.search.value.trim().toLowerCase();
  const maxExpense = Number(controls.expense.value);
  const minPerformance = Number(controls.performance.value);
  const minAum = Number(controls.aum.value);

  return etfs.filter((etf) => {
    const searchableText = `${etf.ticker} ${etf.name} ${etf.issuer} ${etf.sector}`.toLowerCase();

    return (
      (!query || searchableText.includes(query)) &&
      (controls.sector.value === "all" || etf.sector === controls.sector.value) &&
      (controls.issuer.value === "all" || etf.issuer === controls.issuer.value) &&
      etf.expense <= maxExpense &&
      etf.return1y >= minPerformance &&
      etf.aum >= minAum &&
      (!controls.dividend.checked || etf.yield > 2) &&
      (!controls.lowCost.checked || etf.expense <= 0.1)
    );
  });
}

function sortEtfs(etfList) {
  const sorted = [...etfList];
  const sorters = {
    "aum-desc": (a, b) => b.aum - a.aum,
    "return-desc": (a, b) => b.return1y - a.return1y,
    "expense-asc": (a, b) => a.expense - b.expense,
    "yield-desc": (a, b) => b.yield - a.yield,
    "ticker-asc": (a, b) => a.ticker.localeCompare(b.ticker),
  };

  return sorted.sort(sorters[controls.sort.value]);
}

function renderCards(etfList) {
  output.cards.innerHTML = etfList
    .map(
      (etf) => `
        <article class="card">
          <div class="card-top">
            <div>
              <span class="ticker">${etf.ticker}</span>
              <h3>${etf.name}</h3>
              <p class="issuer">${etf.issuer} · launched ${etf.launch}</p>
            </div>
            <span class="badge">${etf.sector}</span>
          </div>
          <div class="metrics" aria-label="ETF metrics for ${etf.ticker}">
            <div class="metric"><span>Expense</span><strong>${etf.expense.toFixed(2)}%</strong></div>
            <div class="metric"><span>1Y return</span><strong>${etf.return1y}%</strong></div>
            <div class="metric"><span>Yield</span><strong>${etf.yield.toFixed(1)}%</strong></div>
            <div class="metric"><span>AUM</span><strong>${formatCurrencyBillions(etf.aum)}</strong></div>
          </div>
          <div class="card-actions">
            <a class="official-link" href="${etf.website}" target="_blank" rel="noreferrer">Open official ETF page</a>
            <a class="search-link" href="${etf.search}" target="_blank" rel="noreferrer">Search ${etf.issuer} for ${etf.ticker}</a>
          </div>
        </article>
      `,
    )
    .join("");
}

function syncRangeLabels() {
  output.expenseValue.textContent = `${Number(controls.expense.value).toFixed(2)}%`;
  output.performanceValue.textContent = `${controls.performance.value}%`;
  output.aumValue.textContent = formatCurrencyBillions(Number(controls.aum.value));
}

function updateResults() {
  syncRangeLabels();
  const sortedEtfs = sortEtfs(getFilteredEtfs());
  output.count.textContent = sortedEtfs.length;
  output.empty.hidden = sortedEtfs.length > 0;
  renderCards(sortedEtfs);
}


function setFilterDefaults() {
  controls.search.value = "";
  controls.sector.value = "all";
  controls.issuer.value = "all";
  controls.expense.value = controls.expense.max;
  controls.performance.value = controls.performance.min;
  controls.aum.value = controls.aum.min;
  controls.dividend.checked = false;
  controls.lowCost.checked = false;
  controls.sort.value = "aum-desc";
}

function getRequestIntent(requestText) {
  const request = requestText.trim();
  const normalized = request.toLowerCase();
  const intent = {
    internetRequested: /\b(internet|web|online|latest|current|live|official website|official site)\b/.test(normalized),
    messages: [],
  };

  const sectorAliases = {
    "broad market": "Broad Market",
    "s&p 500": "Broad Market",
    market: "Broad Market",
    technology: "Technology",
    tech: "Technology",
    healthcare: "Healthcare",
    health: "Healthcare",
    financials: "Financials",
    financial: "Financials",
    banks: "Financials",
    "real estate": "Real Estate",
    reit: "Real Estate",
    "clean energy": "Clean Energy",
    renewable: "Clean Energy",
    dividend: "Dividend",
    income: "Dividend",
    international: "International",
    developed: "International",
  };

  const matchedSector = Object.entries(sectorAliases).find(([phrase]) => normalized.includes(phrase));
  if (matchedSector) {
    intent.sector = matchedSector[1];
    intent.messages.push(`${matchedSector[1]} sector/theme`);
  }

  const matchedIssuer = [...new Set(etfs.map((etf) => etf.issuer))].find((issuer) => normalized.includes(issuer.toLowerCase()));
  if (matchedIssuer) {
    intent.issuer = matchedIssuer;
    intent.messages.push(`${matchedIssuer} issuer`);
  }

  const matchedTicker = etfs.find((etf) => new RegExp(`\\b${etf.ticker.toLowerCase()}\\b`).test(normalized));
  if (matchedTicker) {
    intent.search = matchedTicker.ticker;
    intent.messages.push(`${matchedTicker.ticker} ticker`);
  }

  const expenseMatch =
    normalized.match(/expense(?: ratio)?[^0-9]*(?:under|below|less than|max|<=|at most)?\s*([0-9.]+)\s*%/) ||
    normalized.match(/(?:under|below|less than|<=|at most)\s*([0-9.]+)\s*%[^.]*expense/);
  if (expenseMatch) {
    intent.maxExpense = Number(expenseMatch[1]);
    intent.messages.push(`expense ratio ≤ ${intent.maxExpense}%`);
  }

  const returnMatch =
    normalized.match(/(?:return|performance)[^0-9-]*(?:over|above|at least|min|>=)?\s*(-?[0-9.]+)\s*%/) ||
    normalized.match(/(?:over|above|at least|min|>=)\s*(-?[0-9.]+)\s*%[^.]*\b(?:return|performance)\b/);
  if (returnMatch) {
    intent.minReturn = Number(returnMatch[1]);
    intent.messages.push(`1Y return ≥ ${intent.minReturn}%`);
  }

  const aumMatch = normalized.match(/(?:aum|assets)[^0-9]*(?:over|above|at least|min|>=)?\s*\$?([0-9.]+)\s*(?:b|bn|billion)?/);
  if (aumMatch) {
    intent.minAum = Number(aumMatch[1]);
    intent.messages.push(`AUM ≥ ${formatCurrencyBillions(intent.minAum)}`);
  }

  if (/\b(low cost|low-cost|cheap|lowest expense|expense ratio 0\.10|expense ratio under 0\.10)\b/.test(normalized)) {
    intent.lowCost = true;
    intent.maxExpense = Math.min(intent.maxExpense ?? 0.1, 0.1);
    intent.messages.push("low-cost focus");
  }

  if (/\b(dividend|income|yield)\b/.test(normalized)) {
    intent.dividend = true;
    intent.messages.push("yield above 2%");
  }

  if (/\b(best|highest|top).*(return|performance)|\breturn.*(best|highest|top)\b/.test(normalized)) {
    intent.sort = "return-desc";
    intent.messages.push("sorted by best 1Y return");
  } else if (/\b(lowest|cheapest).*(expense|fee)|\bexpense.*(lowest|cheapest)\b/.test(normalized)) {
    intent.sort = "expense-asc";
    intent.messages.push("sorted by lowest expense");
  } else if (/\b(highest|best|top).*(yield|dividend)|\byield.*(highest|best|top)\b/.test(normalized)) {
    intent.sort = "yield-desc";
    intent.messages.push("sorted by highest yield");
  } else if (/\b(largest|biggest).*(aum|assets)|\baum.*(largest|biggest)\b/.test(normalized)) {
    intent.sort = "aum-desc";
    intent.messages.push("sorted by largest AUM");
  }

  if (!intent.search && !intent.sector && !intent.issuer && request && intent.messages.length === 0) {
    intent.search = request;
    intent.messages.push(`keyword search for “${request}”`);
  }

  return intent;
}

function clampControlValue(control, value) {
  const min = Number(control.min ?? value);
  const max = Number(control.max ?? value);
  return String(Math.min(Math.max(value, min), max));
}

function applyAskIntent(intent) {
  setFilterDefaults();

  if (intent.search) controls.search.value = intent.search;
  if (intent.sector) controls.sector.value = intent.sector;
  if (intent.issuer) controls.issuer.value = intent.issuer;
  if (Number.isFinite(intent.maxExpense)) controls.expense.value = clampControlValue(controls.expense, intent.maxExpense);
  if (Number.isFinite(intent.minReturn)) controls.performance.value = clampControlValue(controls.performance, intent.minReturn);
  if (Number.isFinite(intent.minAum)) controls.aum.value = clampControlValue(controls.aum, intent.minAum);
  if (intent.dividend) controls.dividend.checked = true;
  if (intent.lowCost) controls.lowCost.checked = true;
  if (intent.sort) controls.sort.value = intent.sort;
}

function connectToInternet(requestText = controls.askInput.value) {
  const request = requestText.trim() || "ETF screener";
  const confirmConnection = globalThis.confirm ?? (() => false);
  const allowed = confirmConnection(
    "Do you want to connect to the internet for current ETF research? This will open an external search page in a new tab.",
  );

  if (!allowed) {
    output.askStatus.textContent = "Internet connection declined. Showing local sample-data screening only.";
    return false;
  }

  const researchUrl = `https://www.etf.com/search?query=${encodeURIComponent(request)}`;
  const openWindow = globalThis.open ?? (() => null);
  openWindow(researchUrl, "_blank", "noreferrer");
  output.askStatus.textContent = `Internet connection approved. Opened ETF.com research for “${request}” while keeping local screening applied.`;
  return true;
}

function ask(requestText = controls.askInput.value) {
  const request = requestText.trim();
  if (!request) {
    output.askStatus.textContent = "Enter an ETF screening request first.";
    return [];
  }

  const intent = getRequestIntent(request);
  applyAskIntent(intent);
  updateResults();

  const screenedEtfs = sortEtfs(getFilteredEtfs());
  const appliedText = intent.messages.length > 0 ? intent.messages.join(", ") : "default ETF screening";
  output.askStatus.textContent = `Applied ${appliedText}. ${screenedEtfs.length} ETF${screenedEtfs.length === 1 ? "" : "s"} matched.`;

  if (intent.internetRequested) {
    connectToInternet(request);
  }

  return screenedEtfs;
}

function resetFilters() {
  setFilterDefaults();
  controls.askInput.value = "";
  output.askStatus.textContent = "Ask a question to auto-apply filters.";
  updateResults();
}

populateFilterOptions();
Object.values(controls).forEach((control) => control.addEventListener("input", updateResults));
document.querySelector("#resetFilters").addEventListener("click", resetFilters);
document.querySelector("#resetFiltersHero").addEventListener("click", resetFilters);
document.querySelector("#askButton").addEventListener("click", () => ask());
document.querySelector("#internetButton").addEventListener("click", () => connectToInternet());
updateResults();
