# Money With a Plan landing page

Static site for The Money Flex Tribe Hangout 2.0, Saturday 5 December 2026, Abuja. Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Files

```
index.html      page markup
styles.css      all styles
script.js       WhatsApp links, countdown, sign-up notifications
assets/olori.jpg   convener photo
assets/share.jpg   social share image (event flyer)
```

## Before going live

1. **WhatsApp link.** Every button uses `CONFIG.whatsappLink` in `script.js`, currently `https://wa.link/wafswq`. Change it there if it ever moves.
2. **Share image URL.** In `index.html`, change `og:image` to the absolute URL once the subdomain is live, e.g. `https://event.example.com/assets/share.jpg`. Facebook and WhatsApp ignore relative paths.
3. **Tracking (optional).** If the Meta Pixel or Google tag is added to `<head>`, WhatsApp clicks are already reported as `Contact` and `whatsapp_click` events.

## Sign-up notifications

The "secured a seat" pop-ups only use real entries in the `SIGNUPS` array in `script.js`:

```js
const SIGNUPS = [
  { name: "Amaka", area: "Gwarinpa", time: "2026-10-28T14:05:00+01:00" },
];
```

With an empty array, nothing shows. Use first names only, with each guest's permission.

To preview the design with sample names, open the page with `?demo` on the end of the URL. Sample notifications are labelled "preview sample" and never show to normal visitors.

## Deploy on Vercel

1. Push this folder to a Git repo, or run `vercel` from inside it.
2. Framework preset: **Other**. No build command. Output directory: the project root.
3. Project Settings → Domains → add the subdomain, then add the CNAME record Vercel shows at the DNS provider.
