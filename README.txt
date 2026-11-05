BALD HILLS DENTAL: GOOGLE ADS LANDING PAGES
Built by Generate Your Audience, November 2026

WHAT'S IN HERE
  index.html                    Simple preview page linking to both landing pages
                                (handy for Vercel/Netlify previews; not needed on the live site)
  new-patients/index.html       New Patient page (Ad groups: Dentist Near Me, Suburbs)
  emergency-dentist/index.html  Emergency page (Ad group: Emergency Dentist)
  assets/css, assets/js, assets/images   Shared by both pages

UPLOAD
  Upload the whole folder to the web root so the pages sit at:
    https://baldhillsdental.com.au/new-patients/
    https://baldhillsdental.com.au/emergency-dentist/
  Keep the folder structure as is (pages load ../assets/).
  Check the paths don't clash with existing WordPress pages first.

BEFORE GOING LIVE
  1. Google rating: open each index.html, find window.BHD near the top and fill in
     rating (e.g. "4.9") and reviewCount (e.g. "320+"). Paste the GBP reviews link into reviewsUrl.
     Left blank, the badge just says "Read our Google reviews" (no stars shown).
  2. GTM: both pages already load the practice container GTM-NWV7RPR8.
     Conversions to track (Primary in Google Ads):
       - Click to call: Click URL starts with tel:
       - Book Online click: Click URL contains ultimoht.net.au
     The pages also push dataLayer events bhd_click_to_call and bhd_book_online_click
     (with page_type and cta_location) if you prefer custom event triggers.
  3. The booking window is the Ultimo booking page in an iframe. Clicks inside it can't be
     tracked from our page, so the Book Online buttons are the conversion. Test it on an
     iPhone: if Safari shows a blank box, hide the iframe and keep the buttons.
  4. Dentist photos load from the live website's media library. If any are renamed,
     update the src in the "Meet the dentists" section (initials show if a photo fails).
  5. Both pages are set to noindex so they don't compete with the main site in search.

TEST
  iPhone and Android: tap to call, Book Online (opens booking), map loads, sticky bottom bar.
  Desktop: header buttons, booking embed, no layout breaks at 1024px and 1440px.
