/**
 * Fahad & Nadha Wedding — RSVP collector
 * Paste this into the Apps Script editor of a Google Sheet, then deploy as a Web App.
 * See RSVP-SETUP.md for step-by-step instructions.
 */

var SHEET_NAME = 'RSVP';

var HEADERS = [
  'Timestamp',
  'Side',
  'Name',
  'Place',
  'WhatsApp',
  'Relation',
  'Attending',
  'Guests',
  'Transport: Kodungallur → Hall',
  'Transport: Hall → Kodungallur',
  'Transport: Hall → Ernakulam Stations',
  'Language',
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var d = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      d.side || '',
      d.name || '',
      d.place || '',
      "'" + (d.whatsapp || ''), // leading quote keeps long numbers as text
      d.relation || '',
      d.attending || '',
      d.guests || '',
      d.t_to_hall || '',
      d.t_from_hall || '',
      d.t_to_station || '',
      d.lang || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Optional: lets you open the web-app URL in a browser to confirm it is live.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok', message: 'RSVP endpoint is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
