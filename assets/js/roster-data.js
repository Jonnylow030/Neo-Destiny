// Klassenfarben nach offiziellem WoW-Farbschema.
const CLASS_COLORS = {
  "Krieger": "#C79C6E",
  "Paladin": "#F58CBA",
  "Jäger": "#ABD473",
  "Schurke": "#FFF569",
  "Priester": "#FFFFFF",
  "Schamane": "#0070DE",
  "Magier": "#69CCF0",
  "Hexenmeister": "#9482C9",
  "Druide": "#FF7D0A",
  "TBD": "#7d8494"
};

// Reihenfolge, in der alle Allianz-Klassen im Kader angezeigt werden.
const ALL_CLASSES = [
  "Krieger", "Paladin", "Jäger", "Schurke",
  "Priester", "Schamane", "Magier", "Hexenmeister", "Druide"
];

// Specc-Werte: "Tank", "Heal", "DPS", "Hybrid" oder null (noch offen).
// photo bleibt leer, bis echte Profilbilder vorliegen (Platzhalter-Avatar wird genutzt).
// armoryUrl / logsUrl bleiben leer, bis nach Release echte Charakterprofile existieren.
const ROSTER = [
  { name: "Killmann", class: "Krieger", spec: null, photo: null, armoryUrl: null, logsUrl: null },
  { name: "Bittner", class: "Priester", spec: "Heal", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Felix", class: "Schamane", spec: "DPS", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Philipp", class: "Hexenmeister", spec: "DPS", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Ristow", class: "Schurke", spec: "DPS", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Myles", class: "Paladin", spec: "Tank", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Rani", class: "Paladin", spec: "Hybrid", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Philbert", class: "Magier", spec: "DPS", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Timo", class: "Magier", spec: "DPS", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Karl", class: "Druide", spec: "Hybrid", photo: null, armoryUrl: null, logsUrl: null },
  { name: "Francis", class: "TBD", spec: "Heal", photo: null, armoryUrl: null, logsUrl: null }
];
