# TODO — Pre-Launch Checklist

Lista delle cose da sistemare prima di mettere il portale online.

---

## 🔴 Blocker (da fare prima del deploy)

### 1. Form newsletter non funzionante
**File:** `src/components/BottomCTA.astro`
Il `<form>` non ha `action`/`method` né handler JS. Scelte possibili:
- [ ] Collegare a un servizio (Mailchimp, Brevo, Resend, ConvertKit)
- [ ] Implementare `mailto:` come soluzione temporanea MVP
- [ ] Creare un endpoint API custom

### 2. Link "Scopri di più" non validi
**File:** `src/components/FeatureManagement.astro`
Tutti i link delle 3 card puntano a `href="#"`.
- [ ] Definire dove devono portare (pagine dedicate? modali? scroll ancora?)
- [ ] Oppure rimuovere il CTA se non serve

### 3. Bottone secondario FinalCTA
**File:** `src/components/FinalCTA.astro`
Il bottone "Contattaci" ha `href="#"`.
- [ ] Collegare a una pagina contatti, form, o mailto

### 4. Link del Footer non validi
**File:** `src/components/Footer.astro`
Tutti i link footer puntano a `#`:
- [ ] `about` — pagina "Chi siamo"
- [ ] `blog` — blog o rimuovere
- [ ] `contact` — pagina contatti
- [ ] `privacy` — **OBBLIGATORIO per GDPR**
- [ ] `terms` — **OBBLIGATORIO**
- [ ] `cookies` — **OBBLIGATORIO**

### 5. File duplicato da rimuovere
**File:** `src/components/BottomCTA_Copy.astro`
File leftover non utilizzato in nessuna pagina.
- [ ] Eliminare (o integrare se serve)

---

## 🟡 Importanti (legali / SEO / produzione)

### 6. Cookie banner e compliance GDPR
Se raccogli email (newsletter) o usi analytics:
- [ ] Banner cookie con consenso
- [ ] Informativa privacy linkata
- [ ] Opzione "rifiuta/accetta"
- [ ] Valutare librerie: `iubenda`, `cookiebot`, `@klaro/klaro`, oppure custom

### 7. Analytics
- [ ] Scegliere piattaforma (Plausible, Umami, GA4, Fathom)
- [ ] Integrare script rispettando cookie consent

### 8. Meta tags e Open Graph
**File:** `src/layouts/Layout.astro`
- [ ] Verificare `og:image` (attualmente c'è solo `og_image_old.png` in public)
- [ ] Creare immagine social 1200x630 aggiornata
- [ ] Twitter card
- [ ] Meta description per ogni lingua
- [ ] Canonical URLs

### 9. Sitemap automatica
**File:** `public/sitemap.xml`
Attualmente statico.
- [ ] Installare `@astrojs/sitemap`
- [ ] Configurare in `astro.config.mjs`
- [ ] Rigenerare automaticamente al build

### 10. Robots.txt
**File:** `public/robots.txt`
- [ ] Verificare contenuto
- [ ] Aggiungere riferimento alla sitemap

### 11. Build di produzione
- [ ] Eseguire `npm run build` e verificare che compili senza warning/errori
- [ ] Testare `npm run preview` con la build

### 12. Favicon / PWA
- [ ] Verificare che tutte le icone (`public/favicon/`) siano configurate
- [ ] `apple-touch-icon` per iOS
- [ ] `manifest.json` se si vuole PWA

---

## 🟢 Nice to have (miglioramenti)

### 13. Ottimizzazione immagini
- [ ] Convertire in `.webp` o `.avif`:
  - `public/homepage/WorkerMobile.png`
  - `public/homepage/dashboard.png`
  - `public/homepage/mobile.png`
- [ ] Usare `<Image>` di Astro per lazy loading/responsive/srcset
- [ ] Valutare rimozione di `public/locales/` (marcato come legacy in CLAUDE.md)

### 14. Test completo delle 3 lingue
- [ ] Italiano (`/`)
- [ ] Inglese (`/en/`)
- [ ] Arabo (`/ar/`) — **verifica attenta RTL**, specialmente:
  - Floating card `Technology.astro`
  - Gradient backgrounds `Hero.astro`
  - Icone con frecce

### 15. Accessibilità
- [ ] Skip link "Salta al contenuto"
- [ ] Focus states visibili su tutti gli interattivi
- [ ] Contrasto colori verificato (WCAG AA)
- [ ] Alt text su tutte le immagini
- [ ] Labels sui form
- [ ] Test con screen reader
- [ ] Test navigazione solo con tastiera

### 16. Form validation
- [ ] Validazione email lato client (HTML5 `required` c'è, ma no feedback visuale)
- [ ] Messaggi d'errore/successo dopo submit
- [ ] Stato loading durante invio

### 17. Performance
- [ ] Eseguire Lighthouse audit
- [ ] Verificare Core Web Vitals (LCP, CLS, INP)
- [ ] Controllare bundle size
- [ ] Preload font Inter per evitare FOUT

### 18. Contenuti
- [ ] Verificare correttezza traduzioni (specie arabo, revisione madrelingua)
- [ ] Descrizione card 3 `FeatureManagement` era un placeholder iniziale — ora sistemata ma ricontrollare
- [ ] Verificare tutte le label CTA (Hero, Pricing, ecc.)

### 19. Infrastruttura deploy
- [ ] Scegliere hosting (Vercel, Netlify, Cloudflare Pages, self-hosted)
- [ ] Configurare dominio e DNS
- [ ] HTTPS / certificato SSL
- [ ] Redirect `www` ↔ non-www
- [ ] Redirect HTTP → HTTPS
- [ ] Environment variables per eventuali API keys

### 20. Monitoring post-launch
- [ ] Error tracking (Sentry, Rollbar)
- [ ] Uptime monitoring (UptimeRobot, BetterStack)
- [ ] Backup
