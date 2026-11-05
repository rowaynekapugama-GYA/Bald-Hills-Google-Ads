/* Bald Hills Dental landing pages */
(function () {
  var cfg = window.BHD || {};

  // ---- Opening hours (Brisbane time, UTC+10, no daylight saving) ----
  var HOURS = { 1: [8, 17], 2: [8, 20], 3: [8, 18], 4: [8, 20], 5: [8, 17], 6: null, 0: null };
  var LABEL = { 1: "8am to 5pm", 2: "8am to 8pm", 3: "8am to 6pm", 4: "8am to 8pm", 5: "8am to 5pm", 6: "By appointment", 0: "Closed" };
  var now = new Date();
  var bris = new Date(now.getTime() + (now.getTimezoneOffset() + 600) * 60000);
  var day = bris.getDay();
  var h = bris.getHours() + bris.getMinutes() / 60;
  var today = HOURS[day];
  var isOpen = !!(today && h >= today[0] && h < today[1]);

  var statusText;
  if (isOpen) {
    statusText = "Open now until " + (today[1] > 12 ? today[1] - 12 : today[1]) + "pm";
  } else if (today && h < today[0]) {
    statusText = "Opens today at 8am";
  } else if (day === 6) {
    statusText = "Saturday by appointment";
  } else {
    statusText = "Closed now. Book online anytime";
  }
  document.querySelectorAll("[data-open-status]").forEach(function (el) { el.textContent = statusText; });
  document.querySelectorAll("[data-open-dot]").forEach(function (el) { if (isOpen) el.classList.add("open"); });
  document.querySelectorAll("[data-today-hours]").forEach(function (el) { el.textContent = "Today: " + LABEL[day]; });
  document.querySelectorAll("tr[data-day='" + day + "']").forEach(function (el) { el.classList.add("today"); });

  // ---- Google reviews badge (fill in rating + count in the BHD settings at the top of the page) ----
  var reviewsUrl = cfg.reviewsUrl || "https://www.google.com/maps/search/?api=1&query=Bald+Hills+Dental+18+Bald+Hills+Rd+Bald+Hills+QLD";
  document.querySelectorAll("[data-reviews-link]").forEach(function (a) { a.href = reviewsUrl; });
  var hasRating = cfg.rating && String(cfg.rating).trim() !== "";
  document.querySelectorAll("[data-reviews-title]").forEach(function (el) {
    el.textContent = hasRating ? cfg.rating + " out of 5 on Google" : "Read our Google reviews";
  });
  document.querySelectorAll("[data-reviews-sub]").forEach(function (el) {
    el.textContent = hasRating && cfg.reviewCount ? "From " + cfg.reviewCount + " patient reviews" : "See what local patients say";
  });
  document.querySelectorAll("[data-reviews-short]").forEach(function (el) {
    el.textContent = hasRating ? cfg.rating + " on Google" + (cfg.reviewCount ? " (" + cfg.reviewCount + ")" : "") : "Google reviews";
  });
  document.querySelectorAll("[data-stars]").forEach(function (el) { el.style.display = hasRating ? "" : "none"; });

  // ---- Conversion events for GTM (tel: and booking clicks are also caught by Click URL triggers) ----
  window.dataLayer = window.dataLayer || [];
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("tel:") === 0) {
      window.dataLayer.push({ event: "bhd_click_to_call", page_type: document.body.dataset.page, cta_location: a.dataset.loc || "" });
    } else if (href.indexOf("ultimoht.net.au") > -1) {
      window.dataLayer.push({ event: "bhd_book_online_click", page_type: document.body.dataset.page, cta_location: a.dataset.loc || "" });
    }
  });

  // ---- Reveal on scroll ----
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- Dentist photo fallback (shows initials if a photo can't load) ----
  document.querySelectorAll(".doc .ph img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) { img.remove(); return; }
    img.addEventListener("error", function () { img.remove(); });
  });
})();
