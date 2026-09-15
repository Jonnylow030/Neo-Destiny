// Release-Datum von WoW Forever.
const RELEASE_DATE = new Date("2026-11-04T00:00:00");

function updateCountdown() {
  const els = {
    days: document.getElementById("cdDays"),
    hours: document.getElementById("cdHours"),
    minutes: document.getElementById("cdMinutes"),
    seconds: document.getElementById("cdSeconds")
  };
  if (!els.days) return;

  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) {
    els.days.textContent = "0";
    els.hours.textContent = "0";
    els.minutes.textContent = "0";
    els.seconds.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  els.days.textContent = days;
  els.hours.textContent = String(hours).padStart(2, "0");
  els.minutes.textContent = String(minutes).padStart(2, "0");
  els.seconds.textContent = String(seconds).padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
