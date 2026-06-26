# GEO (Generative Engine Optimization) — Checklist

Ottimizzazioni per far citare e consigliare Cantieri AI dalle intelligenze artificiali (ChatGPT, Gemini, Perplexity, etc.).

---

## Structured Data (JSON-LD / Schema.org)

- [x] Aggiungere schema `WebSite` con `SearchAction` nel Layout globale
- [x] Aggiungere schema `BreadcrumbList` sulle pagine blog (index + singoli post)
- [x] Aggiungere schema `FAQPage` — creata pagina FAQ dedicata con JSON-LD FAQPage
- [x] Aggiunto `featureList` allo schema `SoftwareApplication`
- [x] Aggiunto `sameAs` Instagram allo schema `SoftwareApplication` e `Organization`
- [ ] Aggiungere `aggregateRating` allo schema `SoftwareApplication` (quando disponibili recensioni)
- [x] Aggiunto schema `ItemList` / `CollectionPage` sulla pagina blog index
- [x] Corretto `author` nei `BlogPosting` da `Organization` a `Person`
- [x] Aggiunto `wordCount`, `inLanguage`, `articleSection` ai `BlogPosting`
- [ ] Aggiungere `founder`, `dateEstablished`, `numberOfEmployees` allo schema `Organization` (pagine contatto)

## Contenuti

- [x] Creare pagina FAQ dedicata (/faq/, /en/faq/, /ar/faq/) con 8 domande chiave del settore
- [ ] Creare pagina "Chi siamo" (`/chi-siamo/`, `/en/about/`, `/ar/about/`) con info team, storia, missione
- [ ] Riattivare componente `Stats` nell'homepage (social proof: cantieri gestiti, uptime, etc.)
- [ ] Riattivare componente `Pricing` nell'homepage (le AI citano spesso i prezzi)
- [x] Migliorato `<h1>` della pagina blog index (da "Blog" a "Blog Gestione Cantieri Edili")
- [x] ~~Testimonial / case study~~ — non applicabile al momento, nessun cliente disponibile
- [x] ~~Tradurre blog in EN/AR~~ — non previsto al momento

## Brand Entity & Trust Signals

- [x] Aggiungere link Instagram nel footer
- [x] Collegare Instagram in `sameAs` nel JSON-LD Organization
- [x] ~~Google Business Profile~~ — non applicabile, servizio digitale senza sede fisica
- [ ] Creare / verificare pagina LinkedIn aziendale
- [ ] Verificare presenza su Wikipedia / Wikidata (a lungo termine)

## HTML Semantico

- [x] Usare `<article>` invece di `<div>` per le card in `FeatureManagement.astro`
- [x] Usare `<article>` invece di `<div>` per le card in `Solutions.astro`
- [x] Aggiunto attributi `id` alle sezioni principali per deep linking
- [x] Fixato link CTA "Contattaci" in `FinalCTA.astro` (puntava a `href="#"`)

## Meta & Crawling

- [x] Aggiungere `<link rel="sitemap">` nell'head del Layout
- [x] Installare @astrojs/sitemap e configurare sitemap automatica
- [x] ~~Handle Twitter/X~~ — non applicabile, nessun account Twitter
- [x] Aggiunto `llms.txt` nella root per istruire i crawler AI sul sito
- [x] Aggiornato `robots.txt` con bot AI (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)

---

## Note

- **Priorità massima**: FAQ + FAQPage schema, BreadcrumbList, pagina Chi siamo, link social
- **Priorità media**: WebSite schema, riattivare Stats/Pricing, featureList, blog multilingua
- **Priorità bassa**: aggregateRating, Wikipedia/Wikidata, wordCount nei BlogPosting
