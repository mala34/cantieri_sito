# GEO (Generative Engine Optimization) — Checklist

Ottimizzazioni per far citare e consigliare Cantieri AI dalle intelligenze artificiali (ChatGPT, Gemini, Perplexity, etc.).

---

## Structured Data (JSON-LD / Schema.org)

- [ ] Aggiungere schema `WebSite` con `SearchAction` nel Layout globale
- [ ] Aggiungere schema `BreadcrumbList` sulle pagine blog (index + singoli post)
- [ ] Aggiungere schema `FAQPage` collegato alla sezione FAQ (vedi sotto)
- [ ] Aggiungere `featureList` allo schema `SoftwareApplication` esistente
- [ ] Aggiungere `sameAs` (link social) allo schema `SoftwareApplication` e `Organization`
- [ ] Aggiungere `aggregateRating` allo schema `SoftwareApplication` (quando disponibili recensioni)
- [ ] Aggiungere schema `ItemList` / `CollectionPage` sulla pagina blog index (`/blog/`)
- [ ] Correggere `author` nei `BlogPosting` da `Organization` a `Person` (o aggiungere autore reale)
- [ ] Aggiungere `wordCount`, `inLanguage`, `articleSection` ai `BlogPosting`
- [ ] Aggiungere `founder`, `dateEstablished`, `numberOfEmployees` allo schema `Organization` (pagine contatto)

## Contenuti

- [ ] Creare sezione FAQ in homepage con domande chiave del settore (rapportini digitali, SAL, sicurezza, normative, pricing)
- [ ] Creare pagina "Chi siamo" (`/chi-siamo/`, `/en/about/`, `/ar/about/`) con info team, storia, missione
- [ ] Riattivare componente `Stats` nell'homepage (social proof: cantieri gestiti, uptime, etc.)
- [ ] Riattivare componente `Pricing` nell'homepage (le AI citano spesso i prezzi)
- [ ] Migliorare `<h1>` della pagina blog index (da "Blog" a titolo più descrittivo e ricco di keyword)
- [ ] Aggiungere testimonial / case study di clienti reali con nomi e citazioni
- [ ] Tradurre articoli blog in inglese e arabo

## Brand Entity & Trust Signals

- [ ] Aggiungere link ai profili social nel footer (LinkedIn, Facebook, Instagram, etc.)
- [ ] Collegare i social in `sameAs` nel JSON-LD Organization
- [ ] Creare / verificare profilo Google Business
- [ ] Creare / verificare pagina LinkedIn aziendale
- [ ] Verificare presenza su Wikipedia / Wikidata (a lungo termine)

## HTML Semantico

- [ ] Usare `<article>` invece di `<div>` per le card in `FeatureManagement.astro`
- [ ] Usare `<article>` invece di `<div>` per le card in `Solutions.astro`
- [ ] Aggiungere attributi `id` alle sezioni principali per deep linking
- [ ] Fixare link CTA "Contattaci" in `FinalCTA.astro` (attualmente punta a `href="#"`)

## Meta & Crawling

- [ ] Aggiungere `<link rel="sitemap">` nell'head del Layout
- [ ] Verificare che `sitemap.xml` includa tutte le pagine e i post blog
- [ ] Aggiungere handle Twitter/X nei meta tag (`twitter:site`, `twitter:creator`)
- [ ] Considerare aggiunta di `llms.txt` nella root per istruire i crawler AI sul sito

---

## Note

- **Priorità massima**: FAQ + FAQPage schema, BreadcrumbList, pagina Chi siamo, link social
- **Priorità media**: WebSite schema, riattivare Stats/Pricing, featureList, blog multilingua
- **Priorità bassa**: aggregateRating, Wikipedia/Wikidata, wordCount nei BlogPosting
