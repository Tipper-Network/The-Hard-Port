# Google Apps Script Intake Webhook (Option A)

Controlled review location: **Google Sheet** + optional email notification.

## 1. Create the review sheet

1. Create a Google Sheet named `THP Intake Applications`.
2. Optional: import headers from [`THP-INTAKE-SHEET-HEADERS.csv`](./THP-INTAKE-SHEET-HEADERS.csv) into tab `Applications` (the script creates this tab if missing).

## 2. Install the webhook script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete default `Code.gs` content.
3. Paste [`THP-INTAKE-WEBHOOK.gs`](./THP-INTAKE-WEBHOOK.gs).
4. Save the project as `THP Intake Webhook`.

## 3. Set script properties

**Project settings → Script properties:**

| Property | Value |
|---|---|
| `WEBHOOK_SECRET` | Random string (e.g. `openssl rand -hex 24`) — same value in `apps/web/.env` |
| `NOTIFY_EMAIL` | Optional — your intake inbox |

## 4. Deploy as web app

1. **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Deploy → copy the **Web app URL** (ends in `/exec`)

Test in browser: open the URL — should return `{"ok":true,"service":"THP intake webhook"}`.

## 5. Configure the site

Create `apps/web/.env` (not committed):

```env
THP_INTAKE_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
THP_INTAKE_WEBHOOK_SECRET=your-matching-secret
```

Restart dev server (`pnpm dev`) or redeploy production.

## 6. Verify `/apply`

1. Run `pnpm dev` in `apps/web`.
2. Submit a test application at `http://localhost:3000/apply`.
3. Confirm a new row appears in the Sheet `Applications` tab.
4. On receipt: assign `THP-CLIENT-001`, duplicate [`clients/_TEMPLATE/`](../../../clients/_TEMPLATE/), update [`THP-LIFECYCLE-PIPELINE-TRACKER.csv`](../templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv).

## Architecture

```text
/apply form  →  submitIntake (server)  →  Google Apps Script  →  Sheet row
                     ↑
              THP_INTAKE_WEBHOOK_URL (secret stays server-side)
```

The browser never sees the webhook URL or secret.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Manual JSON fallback on submit | `.env` missing or server not restarted |
| `Unauthorized` in logs | `WEBHOOK_SECRET` mismatch between Sheet script and `.env` |
| Empty row / script error | Redeploy web app after script edits (**Manage deployments → Edit → New version**) |
| CORS errors | Form must use `/api/intake`, not the GAS URL directly |
