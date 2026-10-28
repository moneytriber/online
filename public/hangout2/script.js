(() => {
  "use strict";

  /* Settings */
  const CONFIG = {
    whatsappLink: "https://wa.link/wafswq",
    eventStart: "2026-12-05T09:00:00+01:00",
  };

  /* Real sign-ups only. Add confirmed guests here: { name: "Amaka", area: "Gwarinpa", time: "2026-10-28T14:05:00+01:00" } */
  const SIGNUPS = [];

  /* Sample data for previewing the notification design. Never shown to visitors */
  const DEMO_SIGNUPS = [
    ["Amaka", "Gwarinpa"], ["Tunde", "Wuse 2"], ["Hauwa", "Maitama"], ["Chidi", "Lugbe"],
    ["Zainab", "Garki"], ["Femi", "Kubwa"], ["Ngozi", "Jabi"], ["Ibrahim", "Lokogoma"],
    ["Bisola", "Asokoro"], ["Emeka", "Life Camp"], ["Aisha", "Katampe"], ["Seyi", "Utako"],
  ];

  const isDemo = window.MFT_DEMO === true || new URLSearchParams(location.search).has("demo") || location.hash === "#demo";

  /* WhatsApp links */
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = CONFIG.whatsappLink;
    el.target = "_blank";
    el.rel = "noopener";
    el.addEventListener("click", () => {
      if (typeof window.fbq === "function") window.fbq("track", "Contact", { content_name: el.dataset.wa });
      if (typeof window.gtag === "function") window.gtag("event", "whatsapp_click", { placement: el.dataset.wa });
    });
  });

  /* Countdown */
  const target = new Date(CONFIG.eventStart).getTime();
  const cd = {
    d: document.getElementById("cd-days"),
    h: document.getElementById("cd-hours"),
    m: document.getElementById("cd-mins"),
    s: document.getElementById("cd-secs"),
  };
  const pad = (n) => String(n).padStart(2, "0");

  const tick = () => {
    const left = Math.max(0, target - Date.now());
    cd.d.textContent = pad(Math.floor(left / 864e5));
    cd.h.textContent = pad(Math.floor((left / 36e5) % 24));
    cd.m.textContent = pad(Math.floor((left / 6e4) % 60));
    cd.s.textContent = pad(Math.floor((left / 1e3) % 60));
    return left > 0;
  };
  if (cd.d && tick()) {
    const timer = setInterval(() => { if (!tick()) clearInterval(timer); }, 1000);
  }

  /* Sign-up notifications */
  const toast = document.getElementById("toast");
  if (!toast) return;

  const ago = (iso) => {
    const mins = Math.round((Date.now() - new Date(iso).getTime()) / 6e4);
    if (mins < 2) return "just now";
    if (mins < 60) return `${mins} minutes ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    const days = Math.round(hrs / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const queue = isDemo
    ? DEMO_SIGNUPS
        .map(([name, area]) => ({ name, area, meta: `${2 + Math.floor(Math.random() * 40)} minutes ago · preview sample` }))
        .sort(() => Math.random() - 0.5)
    : SIGNUPS
        .filter((s) => s.name && s.area && s.time)
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .map((s) => ({ name: s.name, area: s.area, meta: ago(s.time) }));

  if (!queue.length) return;

  const nameEl = document.getElementById("toast-name");
  const textEl = document.getElementById("toast-text");
  const metaEl = document.getElementById("toast-meta");
  const MAX_SHOWN = 6;
  let shown = 0;
  let stopped = false;
  let hideTimer;
  let nextTimer;

  const show = () => {
    if (stopped || shown >= MAX_SHOWN || document.hidden) {
      if (!stopped && shown < MAX_SHOWN) nextTimer = setTimeout(show, 4000);
      return;
    }
    const item = queue[shown % queue.length];
    nameEl.textContent = `${item.name} from ${item.area}`;
    textEl.textContent = "secured a seat";
    metaEl.textContent = item.meta;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("show"));
    shown += 1;
    hideTimer = setTimeout(() => {
      toast.classList.remove("show");
      nextTimer = setTimeout(show, 9000 + Math.random() * 7000);
    }, 5000);
  };

  document.getElementById("toast-close").addEventListener("click", () => {
    stopped = true;
    clearTimeout(hideTimer);
    clearTimeout(nextTimer);
    toast.classList.remove("show");
    setTimeout(() => { toast.hidden = true; }, 500);
  });

  nextTimer = setTimeout(show, 6000);
})();
