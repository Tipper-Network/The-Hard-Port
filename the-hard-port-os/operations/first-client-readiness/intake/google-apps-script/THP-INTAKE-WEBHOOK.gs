/**
 * THP Engagement Readiness Application — intake webhook (Option A)
 *
 * Deploy: Extensions → Apps Script → paste → Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Script properties (Project settings → Script properties):
 *   WEBHOOK_SECRET — must match apps/web/.env THP_INTAKE_WEBHOOK_SECRET
 *   NOTIFY_EMAIL   — optional; email on each submission
 */

const SHEET_NAME = 'Applications';

function doGet() {
  return jsonResponse({ ok: true, service: 'THP intake webhook' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (!e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Missing body' });
    }

    const payload = JSON.parse(e.postData.contents);
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');

    if (expectedSecret && payload._webhookSecret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'Unauthorized' });
    }

    delete payload._webhookSecret;

    const sheet = getOrCreateSheet();
    appendApplication_(sheet, payload);

    const notifyEmail = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
    if (notifyEmail) {
      MailApp.sendEmail({
        to: notifyEmail,
        subject: '[THP Apply] ' + (payload.businessName || 'New application'),
        body: formatEmailBody_(payload),
      });
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = getHeaders_();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getHeaders_() {
  return [
    'submittedAt',
    'form',
    'version',
    'founderName',
    'businessName',
    'email',
    'contactPhone',
    'coreOffer',
    'payingCustomers',
    'deliveryHistory',
    'operatingStatus',
    'founderContinuation',
    'onlineActivity',
    'primaryProblems',
    'availableRecords',
    'discoverySource',
    'willingnessExamine',
    'willingnessEvidence',
    'willingnessFeedback',
    'crisisIndicators',
    'privacyAck',
    'client_id_provisional',
  ];
}

function appendApplication_(sheet, p) {
  sheet.appendRow([
    p.submittedAt || new Date().toISOString(),
    p.form || '',
    p.version || '',
    p.founderName || '',
    p.businessName || '',
    p.email || '',
    p.contactPhone || '',
    p.coreOffer || '',
    p.payingCustomers || '',
    p.deliveryHistory || '',
    p.operatingStatus || '',
    p.founderContinuation || '',
    p.onlineActivity || '',
    p.primaryProblems || '',
    p.availableRecords || '',
    p.discoverySource || '',
    yesNo_(p.willingnessExamine),
    yesNo_(p.willingnessEvidence),
    yesNo_(p.willingnessFeedback),
    p.crisisIndicators || '',
    yesNo_(p.privacyAck),
    '',
  ]);
}

function yesNo_(value) {
  return value === true || value === 'true' ? 'yes' : 'no';
}

function formatEmailBody_(p) {
  return getHeaders_()
    .filter(function (key) {
      return key !== 'client_id_provisional';
    })
    .map(function (key) {
      return key + ': ' + (p[key] !== undefined ? p[key] : '');
    })
    .join('\n');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
