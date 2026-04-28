# Blog Production — Checklist Deploy & CMS

## Il problema

Astro genera file HTML statici. Quando Sveltia CMS crea un nuovo post (commit su GitHub), il sito su Aruba non si aggiorna perche mancano:
1. Una build automatica (`npm run build`)
2. Un upload automatico dei file `dist/` su Aruba via FTP

---

## Fase 1: Configurare Sveltia CMS per produzione

### 1.1 Aggiornare il backend nel config.yml
- [x] Repo configurato: `mala34/cantieri_sito`
- [ ] Verificare che `branch` sia quello corretto (main o develop)

### 1.2 Sveltia CMS (configurato)
- [x] Script tag in `public/admin/index.html` usa `@sveltia/cms`
- [x] Admin servito come file statico da `public/admin/`
- [x] Redirect da `/admin/` a `/admin/index.html` via `src/pages/admin.astro`

### 1.3 Autenticazione GitHub per produzione
Sveltia CMS supporta login GitHub diretto, ma serve un OAuth gateway:
- [ ] **Opzione A (consigliata):** Registrare una GitHub OAuth App (Settings > Developer settings > OAuth Apps) e deployare il proxy gratuito `netlify-cms-github-oauth-provider` su Render/Railway
- [ ] **Opzione B:** Usare Netlify come OAuth gateway gratuito (crei un sito Netlify collegato al repo solo per OAuth, il sito resta su Aruba)

### 1.4 Uso in localhost (sviluppo) — funzionante
- [x] Aprire `/admin/index.html` su **Chrome o Edge** (richiede File System Access API)
- [x] Cliccare "Work with a local Git repository"
- [x] Selezionare la cartella root del progetto (`cantieri_sito`)
- [x] Modifica i file `.md` direttamente su disco, senza bisogno di GitHub

---

## Fase 2: GitHub Action — Build + Deploy FTP automatico

Quando un nuovo post viene committato (da CMS o manualmente), la GitHub Action:
1. Fa checkout del repo
2. Installa dipendenze e fa `npm run build`
3. Carica `dist/` su Aruba via FTP

### 2.1 Creare i secrets su GitHub
Nel repo: Settings > Secrets and variables > Actions, aggiungere:
- [x] `FTP_SERVER` — configurato
- [x] `FTP_USERNAME` — configurato
- [x] `FTP_PASSWORD` — configurato
- [x] `FTP_REMOTE_DIR` — configurato (`/`)

### 2.2 Creare il file della GitHub Action
- [x] Creato `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy to Aruba

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: ${{ secrets.FTP_REMOTE_DIR }}
```

### 2.3 Testare il deploy
- [x] Primo deploy automatico completato con successo
- [x] File arrivano su Aruba nella cartella corretta
- [ ] Verificare che il sito e raggiungibile e funziona dopo deploy automatico

---

## Fase 3: SEO Blog Posts

### 3.1 Frontmatter completo per ogni post
Ogni post `.md` deve avere:
- [ ] `title` — max 60 caratteri, keyword principale all'inizio
- [ ] `description` — max 155 caratteri, compelling, con keyword
- [ ] `date` — formato YYYY-MM-DD
- [ ] `categoria` — una delle categorie definite in config.yml
- [ ] `image` — immagine di copertina (usata per og:image)
- [ ] `author` — nome autore

### 3.2 Immagini blog
- [ ] Creare la cartella `public/images/blog/` se non esiste
- [ ] Ogni post deve avere un'immagine reale (non placeholder) — idealmente 1200x630 per social sharing
- [ ] Verificare che le immagini referenziate nel frontmatter esistano effettivamente

### 3.3 Meta tags nel layout blog
- [x] `[slug].astro` passa `title`, `description` e `image` al Layout
- [x] Layout genera `og:title`, `og:description`, `og:image` specifici per ogni post
- [x] `og:type` impostato a `article` per i post (non `website`)
- [x] `article:published_time` aggiunto nei meta
- [x] `article:author` aggiunto nei meta
- [x] Canonical URL per ogni post (`https://www.cantieri.ai/blog/slug/`)
- [x] Twitter Card con immagine del post

### 3.4 Structured Data (JSON-LD)
- [x] Schema `BlogPosting` con `headline`, `datePublished`, `author`, `image`, `description`, `publisher`
- [ ] Testare con Google Rich Results Test

### 3.5 Sitemap
- [x] Sitemap dinamica che include i post automaticamente (gia fatto)
- [ ] Verificare che i post compaiono nella sitemap generata
- [ ] Pingare Google Search Console dopo il deploy

### 3.6 Internal linking
- [ ] I post devono linkarsi tra loro dove rilevante (gia fatto parzialmente)
- [ ] Ogni post deve linkare alla homepage o alla pagina prodotto

### 3.7 URL structure
- [ ] Verificare che gli URL siano puliti: `/blog/nome-post/`
- [ ] Niente date nell'URL, niente underscore — solo slug leggibili

---

## Fase 4: Flusso completo di pubblicazione

Una volta completato tutto:
1. Vai su `https://tuodominio.it/admin/index.html`
2. Autenticati con GitHub
3. Crea un nuovo post con titolo, descrizione, categoria, immagine, contenuto
4. Clicca "Pubblica" — Sveltia crea un commit su `main`
5. GitHub Action parte automaticamente — build — FTP upload
6. In ~2-3 minuti il post e live sul sito

---

## Note

- Se Aruba supporta SSH/SFTP, puoi usare `SamKirkland/FTP-Deploy-Action` con protocollo FTPS per maggiore sicurezza
- In locale: `npm run dev` + apri `/admin/index.html` su Chrome + "Work with local Git repository" + seleziona cartella root `cantieri_sito`
- Se vuoi preview dei post prima della pubblicazione, puoi configurare un branch `draft` e una Action separata che deploya su un sottodominio di staging
