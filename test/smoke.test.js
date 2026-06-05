const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

class FakeElement {
  constructor(id) {
    this.id = id;
    this.value = "";
    this.checked = false;
    this.hidden = false;
    this.innerHTML = "";
    this.textContent = "";
    this.children = [];
    this.listeners = new Map();
  }

  add(option) {
    this.children.push(option);
  }

  addEventListener(event, handler) {
    this.listeners.set(event, handler);
  }
}

function createDashboardHarness({ confirmResponse = false } = {}) {
  const elements = new Map();
  const selectors = [
    "#searchInput",
    "#sectorFilter",
    "#issuerFilter",
    "#expenseFilter",
    "#performanceFilter",
    "#aumFilter",
    "#dividendFilter",
    "#lowCostFilter",
    "#sortSelect",
    "#etfCards",
    "#resultCount",
    "#emptyState",
    "#expenseValue",
    "#performanceValue",
    "#aumValue",
    "#askInput",
    "#askStatus",
    "#resetFilters",
    "#resetFiltersHero",
    "#askButton",
    "#internetButton",
  ];

  selectors.forEach((selector) => elements.set(selector, new FakeElement(selector)));
  elements.get("#sectorFilter").value = "all";
  elements.get("#issuerFilter").value = "all";
  elements.get("#expenseFilter").value = "0.95";
  elements.get("#expenseFilter").max = "0.95";
  elements.get("#performanceFilter").value = "-20";
  elements.get("#performanceFilter").min = "-20";
  elements.get("#aumFilter").value = "0";
  elements.get("#aumFilter").min = "0";
  elements.get("#sortSelect").value = "aum-desc";

  const openedUrls = [];
  const confirmMessages = [];
  const context = {
    console,
    confirm(message) {
      confirmMessages.push(message);
      return confirmResponse;
    },
    open(url, target, features) {
      openedUrls.push({ url, target, features });
      return null;
    },
    document: {
      querySelector(selector) {
        const element = elements.get(selector);
        assert.ok(element, `Missing fake element for selector ${selector}`);
        return element;
      },
    },
    Option: class Option {
      constructor(text, value) {
        this.text = text;
        this.value = value;
      }
    },
  };

  vm.createContext(context);
  const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
  vm.runInContext(
    `${source}\nglobalThis.__dashboard = { controls, output, updateResults, resetFilters, ask, connectToInternet, getRequestIntent, etfs };`,
    context,
  );

  return { ...context.__dashboard, openedUrls, confirmMessages };
}

test("dashboard renders the sample ETF universe and provider links", () => {
  const { output } = createDashboardHarness();

  assert.equal(output.count.textContent, 12);
  assert.match(output.cards.innerHTML, /Open official ETF page/);
  assert.match(output.cards.innerHTML, /https:\/\/investor\.vanguard\.com\/investment-products\/etfs\/profile\/voo/);
  assert.match(output.cards.innerHTML, /https:\/\/www\.ishares\.com\/us\/products\/239726\/ishares-core-sp-500-etf/);
  assert.equal(output.empty.hidden, true);
});

test("search, sector, issuer, and range filters update result counts", () => {
  const { controls, output, updateResults } = createDashboardHarness();

  controls.search.value = "clean energy";
  updateResults();
  assert.equal(output.count.textContent, 1);
  assert.match(output.cards.innerHTML, /ICLN/);

  controls.search.value = "";
  controls.sector.value = "Technology";
  controls.issuer.value = "Vanguard";
  controls.expense.value = "0.10";
  updateResults();
  assert.equal(output.count.textContent, 1);
  assert.match(output.cards.innerHTML, /VGT/);

  controls.aum.value = "100";
  updateResults();
  assert.equal(output.count.textContent, 0);
  assert.equal(output.empty.hidden, false);
});

test("reset restores defaults after a focused dividend filter", () => {
  const { controls, output, updateResults, resetFilters } = createDashboardHarness();

  controls.dividend.checked = true;
  controls.lowCost.checked = true;
  controls.sort.value = "yield-desc";
  updateResults();
  assert.equal(output.count.textContent, 3);
  assert.match(output.cards.innerHTML, /SCHD/);

  resetFilters();
  assert.equal(output.count.textContent, 12);
  assert.equal(controls.sort.value, "aum-desc");
  assert.equal(controls.dividend.checked, false);
  assert.equal(controls.lowCost.checked, false);
});

test("ask applies natural-language screening without internet", () => {
  const { ask, controls, output } = createDashboardHarness();

  const matches = ask("Find low-cost Vanguard dividend ETFs with yield above 2% sorted by highest yield");

  assert.equal(output.count.textContent, 1);
  assert.equal(matches[0].ticker, "VYM");
  assert.equal(controls.issuer.value, "Vanguard");
  assert.equal(controls.sector.value, "Dividend");
  assert.equal(controls.lowCost.checked, true);
  assert.equal(controls.dividend.checked, true);
  assert.equal(controls.sort.value, "yield-desc");
  assert.match(output.askStatus.textContent, /Applied/);
});

test("ask requests permission before opening internet research", () => {
  const declined = createDashboardHarness({ confirmResponse: false });

  declined.ask("Show latest technology ETFs on the internet");
  assert.equal(declined.confirmMessages.length, 1);
  assert.equal(declined.openedUrls.length, 0);
  assert.match(declined.output.askStatus.textContent, /declined/);

  const approved = createDashboardHarness({ confirmResponse: true });
  approved.ask("Show latest technology ETFs on the internet");
  assert.equal(approved.confirmMessages.length, 1);
  assert.equal(approved.openedUrls.length, 1);
  assert.match(approved.openedUrls[0].url, /^https:\/\/www\.etf\.com\/search\?query=/);
  assert.equal(approved.openedUrls[0].target, "_blank");
  assert.match(approved.output.askStatus.textContent, /approved/);
});
