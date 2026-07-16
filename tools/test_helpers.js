#!/usr/bin/env node
"use strict";

/**
 * Tests de app/helpers.js — normalización y scoring de búsqueda.
 * Protege la base sobre la que se construirá el motor de búsqueda inteligente.
 */

const path = require("path");
const { makeBrowserGlobals, loadBrowserModule, assert, eq, gt, makeRunner } = require("./test_lib.js");

const data = require(path.join(__dirname, "..", "data.js"));
makeBrowserGlobals({ clinicalData: data });
loadBrowserModule("app/helpers.js");

const H = window.ABG.helpers;
const { test, run } = makeRunner("helpers.js — normalización y scoring");

// --- normalize ---
test("normalize baja, quita tildes y puntuación", () => {
  eq(H.normalize("Ceftriaxoná!"), "ceftriaxona");
  eq(H.normalize("  Ámoxicilina/Clavulánico  "), "amoxicilina clavulanico");
  eq(H.normalize("E. COLI"), "e coli");
});

test("normalize colapsa espacios y maneja vacío", () => {
  eq(H.normalize("neumonia    aguda"), "neumonia aguda");
  eq(H.normalize(""), "");
  eq(H.normalize(null), "");
});

// --- scoreTextMatch: orden exacto > palabra > prefijo > substring > 0 ---
test("scoreTextMatch ordena por calidad de match", () => {
  const exact = H.scoreTextMatch("nac", "nac");
  const word = H.scoreTextMatch("nac", "tratamiento nac ambulatorio");
  const prefix = H.scoreTextMatch("cef", "cefepime");
  const substr = H.scoreTextMatch("xacin", "ciprofloxacino");
  gt(exact, word, "exacto > palabra");
  gt(word, prefix, "palabra > prefijo");
  gt(prefix, substr, "prefijo > substring");
  gt(substr, 0, "substring > 0");
});

test("scoreTextMatch = 0 sin coincidencia", () => {
  eq(H.scoreTextMatch("meningitis", "celulitis"), 0);
  eq(H.scoreTextMatch("", "cualquier cosa"), 0);
});

// --- scoreMultiWord ---
test("scoreMultiWord suma tokens y premia frase completa", () => {
  const twoHit = H.scoreMultiWord("neumonia comunidad", "neumonia adquirida en la comunidad");
  const oneHit = H.scoreMultiWord("neumonia zzz", "neumonia adquirida en la comunidad");
  gt(twoHit, oneHit, "dos tokens que pegan > uno solo");
  eq(H.scoreMultiWord("", "texto"), 0);
});

// --- getAntibioticByName (usa clinicalData real) ---
test("getAntibioticByName encuentra por nombre y por sinónimo", () => {
  const byName = H.getAntibioticByName("Amoxicilina");
  assert(byName && byName.id === "amoxicilina", "debe hallar amoxicilina por nombre");
  const bySyn = H.getAntibioticByName("amoxicillin"); // sinónimo declarado
  assert(bySyn && bySyn.id === "amoxicilina", "debe hallar por sinónimo en inglés");
});

test("getAntibioticByName devuelve null para desconocido", () => {
  eq(H.getAntibioticByName("farmaco_inexistente_xyz"), null);
  eq(H.getAntibioticByName(""), null);
});

run();
