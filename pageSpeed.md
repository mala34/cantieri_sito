# PageSpeed / Lighthouse — Piano di ottimizzazione

Report di riferimento: https://pagespeed.web.dev/analysis/https-www-cantieri-ai/l84b4yk6id
Data baseline: 2026-04-10

## Punteggi baseline

| Categoria     | Desktop | Mobile |
|---------------|---------|--------|
| Prestazioni   | 84      | 65     |
| Accessibilità | 81      | 87     |
| Best Practice | 100     | 100    |
| SEO           | 100     | 100    |

## Punteggi aggiornati (2026-04-10)

| Categoria     | Desktop | Mobile |
|---------------|---------|--------|
| Prestazioni   | 97      | 93     |
| Accessibilità | 94      | 96     |
| Best Practice | 100     | 100    |
| SEO           | 100     | 100    |

## Core Web Vitals baseline

| Metrica                  | Desktop | Mobile  | Target    |
|--------------------------|---------|---------|-----------|
| FCP                      | 0.7 s   | 2.6 s   | < 1.8 s   |
| LCP                      | 1.9 s   | 10.7 s  | < 2.5 s   |
| TBT                      | 0 ms    | 0 ms    | < 200 ms  |
| CLS                      | 0.173   | 0.142   | < 0.1     |
| Speed Index              | 0.7 s   | 2.9 s   | < 3.4 s   |

**Criticità principali:** LCP mobile 10.7s (grave), CLS oltre soglia, immagini non ottimizzate (~2 MB di spreco).

---

## 🔴 Blocker prestazioni

### 1. Ottimizzazione immagini (~2 MB risparmiabili)
Le immagini sono PNG non compressi, a risoluzione molto maggiore di quella mostrata.

| File                      | Peso attuale | Risoluzione file | Risoluzione visualizzata  | Azione                                                                                    |
|---------------------------|--------------|------------------|---------------------------|-------------------------------------------------------------------------------------------|
| `/homepage/dashboard.png` | 836 KiB      | 1136×1136        | 576×576 desktop, 637 mob  | Convertire in WebP/AVIF; ridurre a 1152×1152; peso target < 120 KiB                       |
| `/homepage/mobile.png`    | 797 KiB      | 1168×1180        | 448×453 desktop, 637 mob  | Convertire in WebP/AVIF; ridurre a 1024×1024; peso target < 100 KiB                       |
| `/homepage/WorkerMobile.png` | 368 KiB   | 512×512          | 512×512                   | Convertire in WebP; peso target < 80 KiB                                                  |
| `/images/logo.png`        | 108 KiB      | 266×276          | 31×32                     | **Sostituire con SVG o PNG 64×64**; peso target < 5 KiB                                   |

**Come farlo (tool consigliati):**
- [Squoosh](https://squoosh.app/) (browser, gratis)
- [ImageOptim](https://imageoptim.com/) (macOS)
- CLI: `sharp`, `cwebp`, `avifenc`

**Astro `<Image>` component:** sarebbe la soluzione ideale perché genera automaticamente WebP/AVIF + sizes + srcset. Valutare migrazione da `<img>` a `<Image>` di `astro:assets` spostando le immagini in `src/assets/` invece di `public/`.

- [ ] Ottimizzare `dashboard.png`
- [ ] Ottimizzare `mobile.png`
- [ ] Ottimizzare `WorkerMobile.png`
- [ ] Sostituire/ridurre `logo.png`
- [ ] (opzionale) Migrare a `astro:assets` con `<Image />`

---

### 2. LCP mobile: 10.7s
L'elemento LCP su mobile è diventato l'`<h1>` del Hero (perché sul mobile l'immagine dashboard non è il primo elemento visibile). Ritardo di rendering 1300 ms causato dal **blocco sul font Google** (Inter) che tarda a caricare.

**Azioni:**
- [x] Aggiunto `fetchpriority="high"` e `loading="eager"` alla dashboard.png (fix parziale desktop)
- [ ] **Self-hostare il font Inter** in `public/fonts/` invece di usare Google Fonts CDN. Elimina round trip DNS + preload diretto del woff2.
- [ ] In alternativa, ridurre i pesi caricati (da 400/500/600/700 → solo 400 e 700).
- [ ] Aggiungere `<link rel="preload">` del woff2 specifico usato nell'h1.

---

### 3. CLS 0.173 (desktop) / 0.142 (mobile)
Il punteggio CLS è causato al 99% da `div.absolute` con `top:calc(100% - 13rem)` (il gradient blob in fondo al Hero). Man mano che le immagini caricano, l'altezza della `<section>` cambia → il blob si sposta.

**Fix applicati:**
- [x] Aggiunte `width` e `height` espliciti a `dashboard.png` (Hero)
- [x] Aggiunte `width` e `height` espliciti a `mobile.png` (AppPreview)
- [x] Aggiunte `width` e `height` espliciti a `logo.png` (Navbar + Footer)

**Test dopo il deploy:** il CLS dovrebbe scendere sotto 0.1 una volta che le immagini hanno dimensioni note.

- [ ] Ritestare CLS dopo il deploy delle immagini ottimizzate

---

### 4. CSS render-blocking (`Footer.rqAuPC48.css`)
Il CSS del Footer (6 KiB) blocca il rendering per 70 ms desktop / 190 ms mobile. È un chunk generato da Astro.

**Opzioni:**
- [ ] Valutare l'uso di `inline-stylesheets: 'auto'` in `astro.config.mjs` per inlinare i CSS piccoli nell'HTML.
- [ ] Oppure spostare il componente Footer fuori dal critical path (sotto la fold).

---

## 🟡 Accessibilità (Desktop 81 / Mobile 87)

### 5. Contrasto colore insufficiente
`bg-primary-500` (#F28F16) con testo bianco non raggiunge il ratio WCAG AA 4.5:1 (attualmente ~2.4:1). Problema riscontrato su:
- Bottone "Accedi" (navbar + hero)
- Bottone "Inizia ora"
- `h2` "Aumenta la produttività oggi stesso" (FinalCTA)
- Paragrafo descrittivo della FinalCTA
- Bottone "Contattaci"
- Selettore lingua attivo (IT/EN/AR)

**Opzioni (scelta di design):**
- [ ] Usare `bg-primary-600` o `bg-primary-700` per i bottoni (più scuro, contrasto ok)
- [ ] Oppure testo nero/scuro sui bottoni (meno coerente con il brand)
- [ ] Oppure lasciare così (trade-off: brand vs WCAG AA — decisione stakeholder)

### 6. Struttura `<dl>` in FeatureManagement
**Fix applicato:** `<article>` wrapper → `<div>` (HTML spec permette solo `div` come wrapper dentro `dl`).
- [x] Sostituito `<article>` con `<div>` in `FeatureManagement.astro`

### 7. Alt text ridondante sui logo
Navbar e Footer avevano `<img alt="Cantieri">` accanto a uno `<span>Cantieri</span>` → screen reader legge due volte.
**Fix applicato:** `alt=""` + `aria-hidden="true"` sull'img, lo span rimane accessibile.
- [x] Corretto in `Navbar.astro` e `Footer.astro`

---

## 🟡 Best Practice (Desktop 100 / Mobile 100 — ma con warning)

Lighthouse dà 100 ma segnala mancanza di header di sicurezza. I Core sono ok ma si può alzare il profilo sicurezza.

### 8. Security headers
**Fix applicato in `public/.htaccess`:**
- [x] HSTS (`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`)
- [x] COOP (`Cross-Origin-Opener-Policy: same-origin`)
- [x] CORP (`Cross-Origin-Resource-Policy: same-site`)
- [x] CSP (Content-Security-Policy con whitelist Google Fonts e inline styles di Tailwind)
- [x] X-Frame-Options già presente
- [x] Referrer-Policy già presente
- [x] Permissions-Policy già presente

**Test dopo deploy:**
- [ ] Verificare su https://securityheaders.com/ (target: A/A+)
- [ ] Testare che la CSP non blocchi risorse legittime (font, immagini, ecc.)

---

## 📋 Checklist riassuntiva

### Già fatto (in codice)
- [x] `width`/`height` espliciti su tutte le immagini principali
- [x] `fetchpriority="high"` + `loading="eager"` su LCP image
- [x] `loading="lazy"` su immagini non critiche
- [x] `decoding="async"` su immagini
- [x] Logo alt fix (Navbar + Footer)
- [x] `<dl>` structure fix in FeatureManagement
- [x] Security headers completi in `.htaccess` (HSTS, CSP, COOP, CORP, XFO, Referrer, Permissions)

### Da fare manualmente (richiede ottimizzazione asset)
- [ ] Convertire `dashboard.png` → WebP/AVIF, ridurre a ~1152px
- [ ] Convertire `mobile.png` → WebP/AVIF, ridurre a ~1024px
- [ ] Convertire `WorkerMobile.png` → WebP
- [ ] Sostituire `logo.png` con SVG o PNG 64×64
- [ ] Self-hostare il font Inter in `public/fonts/` (o ridurre i pesi)
- [ ] Decidere sul contrasto colore primary-500 (brand vs WCAG)
- [ ] Valutare migrazione a `astro:assets` `<Image />`
- [ ] Valutare `inline-stylesheets: 'auto'` in `astro.config.mjs`

### Da testare dopo il deploy
- [ ] Rifare Lighthouse desktop e mobile
- [ ] Verificare security headers su https://securityheaders.com/
- [ ] Verificare che la CSP non rompa nulla (console browser)
- [ ] Core Web Vitals reali (field data in Search Console)
- [ ] Verificare CLS < 0.1

---

## 📈 Obiettivi post-ottimizzazione

| Metrica       | Baseline   | Target     |
|---------------|------------|------------|
| Perf desktop  | 84         | ≥ 95       |
| Perf mobile   | 65         | ≥ 85       |
| LCP mobile    | 10.7 s     | < 2.5 s    |
| CLS           | 0.173      | < 0.1      |
| A11y          | 81 / 87    | ≥ 95       |
