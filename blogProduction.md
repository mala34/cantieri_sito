# Blog Production — Checklist Deploy & CMS

## Il problema

Astro genera file HTML statici. Quando Sveltia CMS crea un nuovo post (commit su GitHub), il sito su Aruba non si aggiorna perche mancano:
1. Una build automatica (`npm run build`)
2. Un upload automatico dei file `dist/` su Aruba via FTP

---

## Fase 1: Configurare Sveltia CMS per produzione

### 1.1 Aggiornare il backend nel config.yml
- [x] Repo configurato: `mala34/cantieri_sito`
- [x] Branch: `main`

### 1.2 Sveltia CMS (configurato)
- [x] Script tag in `public/admin/index.html` usa `@sveltia/cms`
- [x] Admin servito come file statico da `public/admin/`
- [x] Script Sveltia scaricato in locale (`public/admin/sveltia-cms.js`) per evitare blocco CSP
- [x] CSP aggiornata in `.htaccess` per permettere `connect-src` a `api.github.com` e `raw.githubusercontent.com`

### 1.3 Autenticazione GitHub per produzione
- [x] Login tramite GitHub Personal Access Token (fine-grained, repo-scoped)
- [x] Testato e funzionante su `https://www.cantieri.ai/admin/index.html`

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
- [x] Sito raggiungibile e funzionante dopo deploy automatico

---

## Fase 3: SEO Blog Posts

### 3.1 Frontmatter completo per ogni post
Ogni post `.md` deve avere:
- [x] `title` — tutti entro 60 caratteri con keyword
- [x] `description` — tutti entro 155 caratteri
- [x] `date` — formato YYYY-MM-DD
- [x] `categoria` — presente su tutti
- [x] `image` — presente su tutti
- [x] `author` — presente su tutti (Cantieri AI)

### 3.2 Immagini blog
- [x] Cartella `public/images/blog/` presente con 3 immagini
- [x] Tutte le immagini sono 1200x630 (ideali per social sharing)
- [x] Tutte le immagini referenziate nel frontmatter esistono

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
- [x] Testato con Google Rich Results Test — 2 elementi validi, 0 errori

### 3.5 Sitemap
- [x] Sitemap dinamica che include i post automaticamente
- [x] 3 post presenti nella sitemap con URL e date corretti
- [x] `robots.txt` punta a `https://www.cantieri.ai/sitemap.xml`
- [ ] Inviare sitemap su Google Search Console
- [ ] Richiedere indicizzazione dei 3 post su Google Search Console

### 3.6 Internal linking
- [x] I post si linkano tra loro (digitalizzazione → rapportini, digitalizzazione → sicurezza)
- [x] I post linkano alla homepage (`https://www.cantieri.ai/`)

### 3.7 URL structure
- [x] URL puliti: `/blog/nome-post/`
- [x] Niente date nell'URL, niente underscore — solo slug leggibili

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
