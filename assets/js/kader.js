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

function avatarHtml(player, size) {
  const color = CLASS_COLORS[player.class] || CLASS_COLORS.TBD;
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
      </div>
      <div class="badge-row">${specBadge(player.spec)}</div>
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

function renderClassGrid() {
  const grid = document.getElementById("classGrid");
  if (!grid) return;
  const counts = classCounts();

  const allChip = `
    <button class="class-chip class-all-chip" data-class="__all__">
      <span class="cname">Alle</span>
      <span class="ccount">${ROSTER.length} Spieler</span>
    </button>
  `;

  const classChips = ALL_CLASSES.map((cls) => {
    const color = CLASS_COLORS[cls];
    const count = counts[cls];
    const emptyClass = count === 0 ? "empty" : "";
    return `
      <button class="class-chip ${emptyClass}" data-class="${cls}">
        <span class="swatch" style="background:${color};"></span>
        <span class="cname" style="color:${color};">${cls}</span>
        <span class="ccount">${count === 0 ? "gesucht" : count + " Spieler"}</span>
      </button>
    `;
  }).join("");

  grid.innerHTML = allChip + classChips;
}

function renderRoster(filterClass) {
  const grid = document.getElementById("rosterGrid");
  const empty = document.getElementById("rosterEmpty");
  if (!grid) return;

  if (!filterClass) {
    grid.innerHTML = "";
    grid.style.display = "none";
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";
  grid.style.display = "grid";

  let players;
  if (filterClass === "__all__") {
    players = ROSTER;
  } else {
    players = ROSTER.filter((p) => p.class === filterClass);
  }

  if (players.length === 0) {
    grid.innerHTML = renderRecruitCard(filterClass);
    return;
  }

  grid.innerHTML = players.map(renderPlayerCard).join("");
}

function setActiveChip(filterClass) {
  document.querySelectorAll(".class-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.class === filterClass);
  });
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
  const grid = document.getElementById("rosterGrid");
  if (!grid) return;

  renderClassGrid();
  renderRoster(null);

  document.getElementById("classGrid").addEventListener("click", (e) => {
    const chip = e.target.closest(".class-chip");
    if (!chip) return;
    const cls = chip.dataset.class;
    setActiveChip(cls);
    renderRoster(cls);
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".player-card[data-player]");
    if (!card) return;
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
