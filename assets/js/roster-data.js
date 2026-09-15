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

// Specc-Werte: "Tank", "Heal", "DPS", "Hybrid" oder null (noch offen).
// armoryUrl / logsUrl bleiben leer, bis nach Release echte Charakterprofile existieren.
const ROSTER = [
  { name: "Killmann", class: "Krieger", spec: null, armoryUrl: null, logsUrl: null },
  { name: "Bittner", class: "Priester", spec: "Heal", armoryUrl: null, logsUrl: null },
  { name: "Felix", class: "Schamane", spec: "DPS", armoryUrl: null, logsUrl: null },
  { name: "Philipp", class: "Hexenmeister", spec: "DPS", armoryUrl: null, logsUrl: null },
  { name: "Ristow", class: "Schurke", spec: "DPS", armoryUrl: null, logsUrl: null },
  { name: "Myles", class: "Paladin", spec: "Tank", armoryUrl: null, logsUrl: null },
  { name: "Rani", class: "Paladin", spec: "Hybrid", armoryUrl: null, logsUrl: null },
  { name: "Philbert", class: "Magier", spec: "DPS", armoryUrl: null, logsUrl: null },
  { name: "Timo", class: "Magier", spec: "DPS", armoryUrl: null, logsUrl: null },
  { name: "Karl", class: "Druide", spec: "Hybrid", armoryUrl: null, logsUrl: null },
  { name: "Francis", class: "TBD", spec: "Heal", armoryUrl: null, logsUrl: null }
];

// Klassen, für die noch niemand im Kader steht.
const OPEN_CLASSES = ["Jäger"];
