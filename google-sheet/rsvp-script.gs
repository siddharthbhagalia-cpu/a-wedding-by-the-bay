/**
 * A Wedding by the Bay — RSVP receiver
 * Paste this whole file into Extensions → Apps Script of your RSVP Google Sheet.
 * Then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Copy the Web app URL into src/content.js → RSVP_ENDPOINT.
 */

// Optional: get an email each time someone RSVPs. Leave "" to switch off.
const NOTIFY_EMAIL = "";

const SHEET_NAME = "RSVPs";
const HEADERS = ["Submitted at", "Name", "Number of guests", "Celebrations", "Dietary preferences", "Anything else"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    const clean = (v, max) => String(v || "").replace(/^[=+\-@]/, "'$&").slice(0, max);

    const name = clean(p.name, 120).trim();
    if (!name) return json({ ok: false, error: "missing name" });

    const sheet = getSheet();
    const row = [
      new Date(),
      name,
      Math.max(1, Math.min(20, parseInt(p.guests, 10) || 1)),
      clean(p.events, 200),
      clean(p.dietary, 300),
      clean(p.message, 1000),
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New RSVP: " + name + " (" + row[2] + ")",
        body:
          "Name: " + name +
          "\nGuests: " + row[2] +
          "\nCelebrations: " + row[3] +
          "\nDietary: " + (row[4] || "—") +
          "\nNote: " + (row[5] || "—"),
      });
    }
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the URL in a browser just confirms it's live.
function doGet() {
  return json({ ok: true, service: "wedding-rsvp" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
