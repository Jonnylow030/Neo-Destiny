// Kontaktadresse für Bewerbungen. Bei Bedarf hier anpassen.
const GUILD_CONTACT_EMAIL = "hanschkefelix@googlemail.com";

function buildMailBody(data) {
  return [
    `Neue Bewerbung für PW Freetrans LoL`,
    ``,
    `Name: ${data.name}`,
    `Alter: ${data.age}`,
    `E-Mail: ${data.email}`,
    `Klasse: ${data.klasse}`,
    `Specc: ${data.specc}`,
    ``,
    `Bewerbungstext:`,
    data.text
  ].join("\n");
}

function showStatus(el, type, message) {
  el.textContent = message;
  el.className = `form-status show ${type}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bewerbungForm");
  if (!form) return;
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      age: form.age.value.trim(),
      email: form.email.value.trim(),
      klasse: form.klasse.value,
      specc: form.specc.value,
      text: form.text.value.trim()
    };

    if (!data.name || !data.age || !data.email || !data.klasse || !data.specc || !data.text) {
      showStatus(status, "err", "Bitte fülle alle Felder aus, bevor du deine Bewerbung abschickst.");
      return;
    }

    const subject = encodeURIComponent(`Bewerbung PW Freetrans LoL – ${data.name}`);
    const body = encodeURIComponent(buildMailBody(data));
    const mailtoLink = `mailto:${GUILD_CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    showStatus(
      status,
      "ok",
      "Dein E-Mail-Programm sollte sich jetzt mit deiner vorausgefüllten Bewerbung öffnen. Bitte sende die E-Mail von dort ab, um die Bewerbung abzuschließen."
    );
  });
});
