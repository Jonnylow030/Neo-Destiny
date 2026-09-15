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

function avatarHtml(player) {
  if (player.photo) {
    return `<img src="${player.photo}" alt="${player.name}">`;
  }
  return initials(player.name);
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
    <article class="player-card" data-player="${player.name}">
      <div class="player-top">
        <div class="avatar" style="background:${color};">${avatarHtml(player)}</div>
        <div class="player-name-wrap">
          <div class="player-name">${player.name}</div>
          <div class="player-class" style="color:${color};">${className}</div>
        </div>
        <span class="card-chevron">&rsaquo;</span>
      </div>
      <div class="badge-row">
        ${specBadge(player.spec)}
        <span class="card-hint">Profil ansehen &rarr;</span>
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

function classCounts() {
  const counts = {};
  ALL_CLASSES.forEach((c) => { counts[c] = 0; });
  ROSTER.forEach((p) => { if (counts[p.class] !== undefined) counts[p.class]++; });
  return counts;
}

function renderClassBar(key, label, color, count, playersHtml) {
  return `
    <details class="class-acc" name="kader-accordion" data-class="${key}">
      <summary class="class-bar" style="--c:${color};">
        <span class="cb-left">
          <span class="cb-name">${label}</span>
        </span>
        <span class="cb-right">
          <span class="cb-count ${count === 0 ? "empty" : ""}">${count === 0 ? "gesucht" : count + " Spieler"}</span>
          <span class="cb-chevron">&#9662;</span>
        </span>
      </summary>
      <div class="class-panel">
        <div class="roster-grid">${playersHtml}</div>
      </div>
    </details>
  `;
}

function renderAccordion() {
  const wrap = document.getElementById("classAccordion");
  if (!wrap) return;
  const counts = classCounts();

  const allBar = renderClassBar(
    "__all__", "Alle Klassen", "var(--green)", ROSTER.length,
    ROSTER.map(renderPlayerCard).join("")
  );

  const classBars = ALL_CLASSES.map((cls) => {
    const color = CLASS_COLORS[cls];
    const count = counts[cls];
    const players = ROSTER.filter((p) => p.class === cls);
    const playersHtml = players.length ? players.map(renderPlayerCard).join("") : renderRecruitCard(cls);
    return renderClassBar(cls, cls, color, count, playersHtml);
  }).join("");

  wrap.innerHTML = allBar + classBars;
}

function openProfile(name) {
  const player = ROSTER.find((p) => p.name === name);
  if (!player) return;

  const overlay = document.getElementById("profileOverlay");
  const color = CLASS_COLORS[player.class] || CLASS_COLORS.TBD;
  const className = player.class === "TBD" ? "Klasse noch offen" : player.class;

  document.getElementById("profileAvatar").innerHTML = avatarHtml(player);
  document.getElementById("profileAvatar").style.background = color;
  document.getElementById("profileName").textContent = player.name;
  const classEl = document.getElementById("profileClass");
  classEl.textContent = className;
  classEl.style.color = color;
  document.getElementById("profileSpec").innerHTML = specBadge(player.spec);
  document.getElementById("profileLinks").innerHTML =
    extLink(player.armoryUrl, "WoW Armory", "🛡️") + extLink(player.logsUrl, "Warcraft Logs", "📊");

  overlay.classList.add("open");
  history.replaceState(null, "", `#${encodeURIComponent(player.name)}`);
}

function closeProfile() {
  document.getElementById("profileOverlay").classList.remove("open");
  history.replaceState(null, "", window.location.pathname);
}

document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("classAccordion");
  if (!wrap) return;

  renderAccordion();

  wrap.addEventListener("click", (e) => {
    const card = e.target.closest(".player-card[data-player]");
    if (!card) return;
    e.preventDefault();
    openProfile(card.dataset.player);
  });

  document.getElementById("modalClose").addEventListener("click", closeProfile);
  document.getElementById("profileOverlay").addEventListener("click", (e) => {
    if (e.target.id === "profileOverlay") closeProfile();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProfile();
  });

  const hashName = decodeURIComponent(window.location.hash.replace("#", ""));
  if (hashName && ROSTER.some((p) => p.name === hashName)) {
    openProfile(hashName);
  }
});
