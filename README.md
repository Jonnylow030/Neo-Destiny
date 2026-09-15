# PW Freetrans LoL

Website für die deutsche Allianz-Gilde **PW Freetrans LoL** in World of Warcraft Forever
(Release: 04.11.2026).

## Struktur

- `index.html` — Startseite mit Logo, Gildenname und Release-Countdown
- `kader.html` — Kader mit Profilen (Klasse, Specc, Armory-/Warcraftlogs-Links)
- `bewerbung.html` — Bewerbungsformular
- `assets/css/style.css` — Styles
- `assets/js/roster-data.js` — Kaderdaten (hier neue Mitglieder eintragen)
- `assets/js/kader.js` — rendert die Kader-Karten
- `assets/js/countdown.js` — Release-Countdown
- `assets/js/bewerbung.js` — Formular-Handling (Bewerbungen gehen per Mailto raus)
- `assets/img/logo.svg` — Platzhalter-Logo

## Kader pflegen

Neue Mitglieder oder Änderungen an Klasse/Specc werden direkt in
`assets/js/roster-data.js` eingetragen. Sobald nach Release echte
Armory- und Warcraftlogs-Profile existieren, können `armoryUrl` und
`logsUrl` pro Spieler ergänzt werden.

## Lokal ansehen

Da die Seite aus reinem HTML/CSS/JS besteht, reicht es, `index.html`
in einem lokalen Webserver zu öffnen, z. B.:

```
python3 -m http.server
```

und dann `http://localhost:8000` aufzurufen.
