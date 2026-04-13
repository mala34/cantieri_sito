# Analisi SEO / SEM — cantieri.ai

Analisi pre-deploy per la pubblicazione del sito marketing su `https://www.cantieri.ai/`.

---

## 🔴 Problemi critici (da risolvere prima del deploy)

### 1. Dominio inconsistente: `cantieri.ai` vs `www.cantieri.ai`
Il file `src/layouts/Layout.astro` usa `https://cantieri.ai/` (senza `www`) in canonical, hreflang, Open Graph e JSON-LD. Il dominio di produzione sarà `https://www.cantieri.ai/`.

**Problema:** se entrambe le versioni (con e senza `www`) rispondono, Google le tratta come due siti distinti → duplicazione contenuti + dispersione di PageRank.

**Azione:**
- Scegliere un dominio canonico (consigliato: **con `www`**).
- Configurare redirect 301 permanente dall'altro.
- Sostituire ovunque `cantieri.ai` → `www.cantieri.ai` in:
  - `src/layouts/Layout.astro` (righe 30, 38, 39, 51, 55-58, 83, 84)
  - `public/robots.txt`
  - `public/sitemap.xml`

---

### 2. `robots.txt` punta al dominio sbagliato
```
Sitemap: https://app.cantieri.ai/sitemap.xml
```
`app.cantieri.ai` è l'applicazione, non il sito marketing. Deve essere `https://www.cantieri.ai/sitemap.xml`.

Inoltre i `Disallow` per `/dashboard`, `/projects`, `/activities`, ecc. sono rotte dell'app: **non esistono sul sito marketing** e non vanno messe qui.

**Robots.txt consigliato:**
```
User-agent: *
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Twitterbot
Allow: /

Sitemap: https://www.cantieri.ai/sitemap.xml
```

---

### 3. `sitemap.xml` completamente sbagliato
- Tutti gli URL puntano a `app.cantieri.ai` invece che al sito marketing.
- Non include le versioni localizzate `/en/` e `/ar/`.
- Cita una pagina `/login` che non esiste sul sito.

**Sitemap corretta (esempio):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://www.cantieri.ai/</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="it" href="https://www.cantieri.ai/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.cantieri.ai/en/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.cantieri.ai/ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.cantieri.ai/"/>
  </url>

  <url>
    <loc>https://www.cantieri.ai/en/</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.cantieri.ai/ar/</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

</urlset>
```

---

### 4. `canonical`, `hreflang` e meta OG sono statici
Tutte le pagine (IT, EN, AR) ereditano lo stesso `Layout.astro` con canonical fissa a `https://cantieri.ai/`.

**Conseguenza:** la versione EN e AR dichiarano come "pagina canonica" quella IT → Google deindicizza EN/AR considerandole duplicati.

**Soluzione:** passare come props a `Layout.astro`:
- `canonical`
- `ogLocale`
- `title`
- `description`
- `lang`
- `dir`

E impostarli diversi in ogni pagina (`src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/ar/index.astro`). `title` e `description` devono essere tradotti nella lingua della pagina.

---

### 5. `<html lang>` e `dir` non cambiano per locale
`Layout.astro` ha default `lang="it"` `dir="ltr"` ma le pagine potrebbero non passare il valore corretto. La pagina AR deve avere `<html lang="ar" dir="rtl">`.

**Azione:** verificare nei 3 file `src/pages/*/index.astro` che vengano passati correttamente `lang` e `dir`.

---

## 🟡 Problemi importanti

### 6. JSON-LD: `price: 0` è sbagliato
```json
"offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
```
Si sta dichiarando a Google che il prodotto è gratuito. Se non lo è, rimuovere `offers` o mettere il prezzo reale.

Mancano inoltre campi utili per le rich results:
- `publisher`
- `logo`
- `aggregateRating` (se disponibile)
- `sameAs` (link a social profiles)

---

### 7. Meta `keywords` inutile
`<meta name="keywords">` è ignorato da Google da anni. Non fa male ma può essere rimosso.

---

### 8. `title` troppo lungo
```
Cantieri - Gestione Cantieri, Progetti e Attività Edili | Pianificazione e Tracciamento
```
~88 caratteri. Google taglia a ~60.

**Alternativa (~55 caratteri):**
> Cantieri — Software per la Gestione dei Cantieri Edili

---

### 9. `h1` unico per pagina
Verificare che `hero.title` sia effettivamente l'unico `<h1>` della pagina (presente in `src/components/Hero.astro:38`). Nessun'altra sezione deve usare `<h1>`.

---

### 10. Alt text immagini
`<img src="/homepage/dashboard.png" alt="Cantieri Dashboard" />` in `Hero.astro:61` è troppo generico.

**Meglio:**
> `"Dashboard di Cantieri: panoramica progetti, attività e tempi di lavoro"`

Da rivedere alt text di tutte le immagini del sito.

---

### 11. Ottimizzazione font / LCP
Il font Inter è caricato con `display=swap` (ok). Per migliorare LCP si può fare preload del file woff2:
```html
<link rel="preload" as="font" type="font/woff2" crossorigin href="..." />
```

---

### 12. Nessun tracking / analytics installato
Il sito non ha GA4, GTM, Meta Pixel, LinkedIn Insight Tag né altri tracker.

**Necessari per SEM:**
- **Google Analytics 4** + **Google Tag Manager** → misurare traffico, sorgenti, conversioni.
- **Google Ads conversion tracking** → se si pianificano campagne Google Ads.
- **Meta Pixel** / **LinkedIn Insight Tag** → per retargeting e campagne social.

Installarli **prima** del lancio in modo da iniziare a raccogliere dati fin dal giorno 1.

---

### 13. Verifica file `manifest.json`
`Layout.astro:73` referenzia `/favicon/site.webmanifest`. Verificare che il file esista in `public/favicon/`, altrimenti errore 404 in console.

---

## 🟢 Cose che vanno bene

- ✅ `hreflang` alternate dichiarate (vanno solo corrette sul dominio).
- ✅ OG image 1200×630 presente e corretta.
- ✅ Favicon completo (SVG + ICO + apple-touch).
- ✅ JSON-LD `SoftwareApplication` presente.
- ✅ Struttura a 3 locale coerente (IT, EN, AR).
- ✅ `lang` e `dir` previsti come props nel layout.
- ✅ Tailwind v4 → CSS ottimizzato e leggero.
- ✅ Astro static → HTML pre-renderizzato, ottimo per SEO.

---

## 📊 SEM — raccomandazioni strategiche

### Keyword research
Prima di pagare Google Ads, fare ricerca keyword su strumenti tipo **Google Keyword Planner**, **Ahrefs** o **SEMrush**. Cluster di partenza:

- *cantieri ai*
- *gestionale cantieri*
- *software cantieri edili*
- *app rapportini cantiere*
- *gestione progetti edilizia*
- *software edilizia cloud*
- *piattaforma gestione cantieri*
- *rapportini digitali edilizia*

### Landing dedicate per campagna
Per Google Ads **non** mandare tutti al sito principale. Creare landing tematiche:
- `/rapportini-cantiere`
- `/gestione-cantieri`
- `/software-edilizia`

Ciascuna con **un solo CTA chiaro** e messaggio focalizzato su una singola keyword. Il sito principale ha troppe sezioni e CTA per convertire bene da traffico Ads.

### Strumenti da registrare
- **Google Search Console** → verifica dominio + submit sitemap.
- **Bing Webmaster Tools** → stesso.
- **Google Business Profile** → per SEO locale (se l'azienda è italiana).

### Performance / Core Web Vitals
Prima del lancio, passare il sito su:
- **PageSpeed Insights** (https://pagespeed.web.dev/)
- **Lighthouse** (Chrome DevTools)
- **Google Rich Results Test** (per validare JSON-LD)

Obiettivo: tutti i Core Web Vitals in verde (LCP < 2.5s, CLS < 0.1, INP < 200ms).

---

## 📋 Checklist pre-deploy

### Blocker (obbligatori)
- [x] Scegliere dominio canonico (con/senza `www`) + redirect 301 dell'altro — canonico `www.cantieri.ai`, redirect 301 via `public/.htaccess`
- [x] Aggiornare canonical/hreflang/OG su dominio corretto in `Layout.astro`
- [x] Rendere `title`, `description`, `canonical`, `lang`, `dir` dinamici per locale — Layout accetta props `canonical`/`ogLocale`/`title`/`description`/`lang`/`dir`, passati da ogni pagina (IT/EN/AR)
- [x] Riscrivere `public/sitemap.xml` con gli URL reali del sito marketing
- [x] Aggiornare `public/robots.txt` con sitemap corretta e rimuovere Disallow dell'app
- [x] Rivedere il JSON-LD (prezzo reale, publisher, logo) — rimosso `offers` (prezzo fittizio), aggiunto `publisher` con `logo`

### Raccomandati
- [x] Accorciare il `title` tag (< 60 caratteri) — aggiornato IT/EN/AR (~55 char)
- [x] Alt text descrittivi su tutte le immagini — aggiornati `Hero`, `AppPreview`, `Technology` (dashboard, mobile, operatore)
- [ ] Installare GA4 + GTM
- [ ] Installare Meta Pixel e/o LinkedIn Insight Tag (se previsti)
- [x] Verificare presenza di `public/favicon/site.webmanifest` — file presente e valido; migliorate icone con `"purpose": "any maskable"` per maggior compatibilità
- [x] Testare con Google Rich Results Test — JSON-LD `SoftwareApplication` valido. Warning non critici: `offers` e `aggregateRating` mancanti (campi opzionali, da aggiungere in futuro quando ci saranno prezzo e recensioni reali)
- [x] Testare con Lighthouse / PageSpeed Insights — eseguito, piano di ottimizzazione in `pageSpeed.md` (Perf: 84 desktop / 65 mobile; SEO: 100/100)
- [x] Registrare sito su Google Search Console + submit sitemap — meta tag verificato, proprietà confermata (2026-04-12). Submit sitemap e richiesta indicizzazione da fare in console.
- [ ] Registrare sito su Bing Webmaster Tools

### Nice to have
- [x] Preload font Inter per migliorare LCP — aggiunto `<link rel="preload" as="style">` in `Layout.astro`
- [x] Rimuovere `<meta name="keywords">` (inutile) — rimosso da `Layout.astro`
- [x] Aggiungere `publisher`, `logo`, `sameAs` al JSON-LD — `publisher`+`logo` fatti, `sameAs` da aggiungere quando ci saranno i social profile
- [ ] Creare landing dedicate per campagne SEM

---

## 🔴 Risultati analisi Neil Patel SEO Analyzer (2026-04-12)

Report: https://neilpatel.com/seo-analyzer/

### 14. Title tag non contiene keyword popolari (priorità alta)
Il title attuale ("Cantieri — Software per la Gestione dei Cantieri Edili", 56 char) non include le keyword più usate nella pagina: "funzionalità", "soluzioni", "tempo reale".

**Azione:**
- [ ] Ottimizzare il title tag includendo keyword ad alto volume (es. "gestione cantieri", "software edilizia")
- [ ] Assicurarsi che il title sia diverso e ottimizzato per ogni locale (IT/EN/AR)

### 15. Meta description troppo lunga (priorità media)
Lunghezza attuale: 169 caratteri. Google taglia a ~155-160.

> "Cantieri: la piattaforma per la gestione dei cantieri edili. Pianificazione avanzata, tracciamento materiali, reportistica in tempo reale e collaborazione multi-azienda."

**Azione:**
- [ ] Accorciare la meta description a ≤ 155 caratteri mantenendo le keyword principali ("gestione cantieri", "tempo reale")

### 16. Keyword pollution dal language switcher (priorità media)
Il selettore lingua (IT/EN/AR/Accedi) viene letto dai crawler come contenuto della pagina. Le keyword "soluzioni en", "en ar", "en ar accedi" appaiono nella keyword density, inquinando il profilo SEO.

**Azione:**
- [ ] Escludere il language switcher dall'indicizzazione (es. `aria-hidden` o `data-nosnippet` sul nav del selettore lingua)

### 17. Word count troppo basso (priorità alta)
Solo 370 parole nella pagina (escludendo anchor text). Google favorisce contenuti più ricchi per query competitive come "gestione cantieri".

**Azione:**
- [x] Espanso il copy in tutte le sezioni principali (Hero, AppPreview, Technology, FeatureManagement, Solutions, FinalCTA, Footer) per IT/EN/AR. Aggiunto dettagli concreti, benefici specifici e keyword rilevanti. Stima ~650-800 parole visibili.
- [ ] Per superare le 1000 parole, valutare l'aggiunta di nuove sezioni (FAQ, testimonial, case study)

### 18. Backlink profile debole (priorità alta — 3-6 mesi)
Nessun backlink rilevante. Serve una strategia di link building.

**Azione (non codice):**
- [ ] Registrarsi su directory di settore (edilizia, SaaS italiani)
- [ ] Guest post su blog di settore
- [ ] Partnership con associazioni edili
- [ ] Creare contenuti linkabili (blog, guide, case study)

### 19. Social media authority assente (priorità media)
0 share su Facebook, 0 pin su Pinterest. Nessuna presenza social.

**Azione (non codice):**
- [ ] Creare profili social (LinkedIn, Facebook, Instagram)
- [ ] Aggiungere link social al footer del sito + `sameAs` nel JSON-LD
- [ ] Pianificare contenuti social regolari

### 20. 18 link duplicati nella pagina (priorità bassa)
Probabilmente link ripetuti tra navbar e footer (stesse voci di menu).

**Azione:**
- [ ] Verificare e ridurre link duplicati (diversificare anchor text tra nav e footer, o rimuovere link ridondanti dal footer)
