# RSVP Setup — Google Sheet

The RSVP form on the bride and groom pages POSTs to a **Google Apps Script Web App**,
which appends each response as a row in a Google Sheet you own. No backend, no cost.

## 1. Create the Sheet

1. Go to <https://sheets.google.com> and create a blank spreadsheet.
2. Name it e.g. **"Fahad & Nadha RSVP"**. (You don't need to add headers — the script does it.)

## 2. Add the script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete the placeholder `function myFunction() {}`.
3. Copy the entire contents of [`rsvp-apps-script.gs`](./rsvp-apps-script.gs) and paste it in.
4. Click the **Save** (disk) icon.

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" → choose **Web app**.
3. Set:
   - **Description**: `RSVP`
   - **Execute as**: **Me**
   - **Who has access**: **Anyone**  ← important, so guests' browsers can post.
4. Click **Deploy**, then **Authorize access** and approve the permissions
   (Google will warn it's an unverified app — that's expected for your own script;
   choose *Advanced → Go to … (unsafe)* → Allow).
5. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfy.../exec`

> Tip: paste that URL into a browser. You should see `{"result":"ok",...}`.

## 4. Point the site at it

Create a file named **`.env.local`** in the project root (`c:\Fanaaa\Wedding-site`) with:

```
NEXT_PUBLIC_RSVP_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
```

Then restart the dev server (`npm run dev`). For the production deploy (Vercel etc.),
add the same `NEXT_PUBLIC_RSVP_ENDPOINT` variable in the host's Environment Variables.

## 5. Test

Submit a test RSVP from `/groom`. A new row should appear in the Sheet within a second
or two, with the three transport answers filled in. Bride-side rows leave those columns blank.

## Notes

- The form sends a **no-cors** POST, so the browser can't read the script's reply — the
  site optimistically shows the thank-you screen once the request is sent. The row still
  lands in the Sheet. (This is the standard, reliable pattern for static-site → Sheet.)
- If you ever change the script, click **Deploy → Manage deployments → Edit → Version: New
  version** so the live URL picks up the change (the URL stays the same).
- Columns: Timestamp, Side, Name, Place, WhatsApp, Relation, Attending, Guests,
  3 × Transport, Language. To count bus seats, filter `Side = groom`, `Attending = yes`,
  and sum `Guests` where each transport column = `yes`.
