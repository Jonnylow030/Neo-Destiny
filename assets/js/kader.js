function specBadge(spec) {
  const map = {
    "Tank": ["spec-tank", "Tank"],
    "Heal": ["spec-heal", "Heiler"],
    "DPS": ["spec-dps", "DPS"],
    "Hybrid": ["spec-hybrid", "Hybrid"]
  };
  const [cls, label] = map[spec] || ["spec-tbd", "Noch offen"];
  return `<span class="spec-badge ${cls}">${label}</span>`;
}

function initials(name) {
  return name.trim().charAt(0).toUpperCase();
}

function extLink(url, label, icon) {
  if (url) {
    return `<a class="ext-link" href="${url}" target="_blank" rel="noopener noreferrer">
      <span>${icon} ${label}</span><span>&rarr;</span>
    </a>`;
  }
  return `<span class="ext-link disabled">
    <span>${icon} ${label}</span><span class="tag">bald verfügbar</span>
  </span>`;
}

function renderPlayerCard(player) {
  const color = CLASS_COLORS[player.class] || CLASS_COLORS.TBD;
  const className = player.class === "TBD" ? "Klasse noch offen" : player.class;
  return `
    <article class="player-card">
      <div class="player-top">
        <div class="avatar" style="background:${color};">${initials(player.name)}</div>
        <div class="player-name-wrap">
          <div class="player-name">${player.name}</div>
          <div class="player-class" style="color:${color};">${className}</div>
        </div>
      </div>
      <div class="badge-row">${specBadge(player.spec)}</div>
      <div class="player-links">
        ${extLink(player.armoryUrl, "WoW Armory", "🛡️")}
        ${extLink(player.logsUrl, "Warcraft Logs", "📊")}
      </div>
    </article>
  `;
}

function renderRecruitCard(className) {
  return `
    <article class="player-card recruit-card">
      <div class="recruit-title">${className} gesucht</div>
      <div class="recruit-sub">Für diese Klasse haben wir noch niemanden im Kader.</div>
      <a class="nav-btn" href="bewerbung.html">Jetzt bewerben</a>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("rosterGrid");
  if (!grid) return;
  const cards = ROSTER.map(renderPlayerCard);
  const recruitCards = OPEN_CLASSES.map(renderRecruitCard);
  grid.innerHTML = cards.join("") + recruitCards.join("");

  const countEl = document.getElementById("rosterCount");
  if (countEl) countEl.textContent = ROSTER.length;
});
