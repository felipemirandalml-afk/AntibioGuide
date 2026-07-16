"use strict";

/**
 * =========================================================================
 * ARNÉS DE TESTS (test_lib.js)
 * =========================================================================
 * Utilidades compartidas para testear los módulos de navegador (IIFE que se
 * cuelgan de `window.ABG`) desde Node, sin dependencias externas.
 *
 * - makeBrowserGlobals(): mockea window/document/localStorage/matchMedia.
 * - loadBrowserModule(relPath): eval del fuente; el módulo se registra en
 *   window.ABG.<algo> tal como en el navegador.
 * - test()/run(): runner mínimo con assert. Exit 1 si algún test falla.
 * =========================================================================
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function makeBrowserGlobals(seed = {}) {
  const noopClassList = { toggle() {}, contains() { return false; }, add() {}, remove() {} };
  global.window = global;
  global.document = {
    getElementById: () => null,
    documentElement: { classList: noopClassList },
    body: { classList: noopClassList },
    addEventListener: () => {},
  };
  global.matchMedia = () => ({ matches: false });
  global.localStorage = { getItem: () => null, setItem: () => {} };

  global.ABG = global.ABG || {};
  if (seed.clinicalData) global.clinicalData = seed.clinicalData;
  if (seed.ABG) Object.assign(global.ABG, seed.ABG);
  window.ABG = global.ABG;
  return global.ABG;
}

function loadBrowserModule(relPath) {
  const src = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  // Direct eval: el IIFE se auto-registra en window.ABG.* (scope global mockeado).
  eval(src);
}

// --- assertions ---
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}
function eq(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(`${msg || "eq"}: esperado ${JSON.stringify(expected)}, obtenido ${JSON.stringify(actual)}`);
  }
}
function gt(a, b, msg) {
  if (!(a > b)) throw new Error(`${msg || "gt"}: esperado ${a} > ${b}`);
}
function gte(a, b, msg) {
  if (!(a >= b)) throw new Error(`${msg || "gte"}: esperado ${a} >= ${b}`);
}

// --- runner ---
function makeRunner(suiteName) {
  const tests = [];
  function test(name, fn) { tests.push({ name, fn }); }
  function run() {
    console.log(`=== ${suiteName} ===`);
    let pass = 0, fail = 0;
    for (const t of tests) {
      try {
        t.fn();
        console.log(`  ✔ ${t.name}`);
        pass++;
      } catch (e) {
        console.log(`  ✘ ${t.name}\n      ${e.message}`);
        fail++;
      }
    }
    console.log(`\n${pass}/${pass + fail} passed\n`);
    process.exit(fail > 0 ? 1 : 0);
  }
  return { test, run };
}

module.exports = { makeBrowserGlobals, loadBrowserModule, assert, eq, gt, gte, makeRunner, ROOT };
