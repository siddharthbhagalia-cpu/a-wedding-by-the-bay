# Putting the invitation online

There are two steps, and neither costs anything:

1. **Build the site** (one command)
2. **Host it** on Netlify or Vercel (drag and drop, or connect GitHub)

> RSVPs are being collected manually for now, so the site has no RSVP form. The Google Sheet setup in section 1 is only needed if you bring the form back.

---

## 1. RSVPs → Google Sheet (only if the form comes back)

1. Go to [sheets.new](https://sheets.new) and name the sheet something like **Wedding RSVPs**.
2. In that sheet, open **Extensions → Apps Script**.
3. Delete what's in the editor, paste in everything from `google-sheet/rsvp-script.gs`, and click **Save**.
   - *Optional:* to get an email for every RSVP, put your address in `NOTIFY_EMAIL` at the top.
4. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, then **Authorize access**. Google will warn you that the app "isn't verified". That's expected, because it's your own script. Click **Advanced → Go to … (unsafe) → Allow**.
5. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy…/exec`.
6. Open `src/content.js` and paste the URL into `RSVP_ENDPOINT`:
   ```js
   export const RSVP_ENDPOINT =
       import.meta.env.VITE_RSVP_ENDPOINT ||
       "https://script.google.com/macros/s/AKfy…/exec";
   ```

To check it's working, open the URL in your browser. You should see `{"ok":true,"service":"wedding-rsvp"}`. Every RSVP becomes a new row in the **RSVPs** tab, which the script creates the first time someone responds.

> If you change the script later, use **Deploy → Manage deployments → Edit → Version: New version**. That keeps the same URL.

## 2. Build

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run build
```

This creates a `dist/` folder. That folder is the whole website.

To preview it on your computer first:

```bash
npm run dev        # live preview at http://localhost:5173
npm run preview    # preview of the built dist/ folder
```

## 3. Host

### Option A: Netlify Drop (easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and sign in. A free account is enough.
2. Drag the `dist/` folder onto the page. It goes live within seconds at something like `https://gs-wedding.netlify.app`.
3. Under **Site configuration → Change site name** you can pick a nicer address. You can also attach your own domain under **Domain management**.

To update the site later, rebuild and drag the new `dist/` folder onto **Deploys** for the same site.

### Option B: Vercel + GitHub (automatic updates)
1. Push this folder to a GitHub repository.
2. At [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects Vite automatically: the build command is `npm run build` and the output folder is `dist`.
3. *Optional:* instead of editing `content.js`, add an environment variable `VITE_RSVP_ENDPOINT` with your Apps Script URL.

After that, every push to GitHub redeploys the site.

## 4. WhatsApp link previews

WhatsApp needs a full URL for the preview image. Once you know your site address, open `index.html` and change:

```html
<meta property="og:image" content="/og.jpg" />
```
to
```html
<meta property="og:image" content="https://YOUR-SITE-ADDRESS/og.jpg" />
```

Then rebuild and redeploy.

---

## Editing content

All the words, dates, times, venues and the bucket list are in **`src/content.js`**.

**Gallery photos:**
1. Put your photos in `public/gallery/`. JPG or WebP, about 1200px on the long side, keeps the site fast.
2. List them in the `gallery.photos` array in `content.js`:
   ```js
   { src: "gallery/ladghar-sunset.jpg", caption: "Ladghar at sunset" },
   ```
