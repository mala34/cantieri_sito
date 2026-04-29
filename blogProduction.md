# Blog Production — Guida completa Setup & Deploy

Guida per mettere in produzione un blog statico Astro + Sveltia CMS + GitHub + hosting tradizionale (Aruba).
Riutilizzabile per altri portali.

---

## Architettura

- **Astro 6** — genera HTML statico
- **Sveltia CMS** — admin panel per creare/modificare post (alternativa a Decap CMS)
- **GitHub** — repository del codice, Sveltia committa direttamente qui
- **GitHub Actions** — build automatica + deploy via FTP
- **Aruba** — hosting tradizionale (FTP)

Flusso: Sveltia CMS → commit su GitHub → GitHub Action → `npm run build` → FTP upload su Aruba → sito aggiornato in ~2 min

---

## Fase 0: Migrazione a GitHub (se vieni da Bitbucket)

- [x] Cambiare remote: `git remote set-url origin https://github.com/USER/REPO.git`
- [x] Push di tutti i branch: `git push origin --all`
- [x] Push dei tag: `git push origin --tags`
- [x] Bitbucket resta come backup, non viene toccato

---

## Fase 1: Configurare Sveltia CMS

### 1.1 File struttura CMS
```
public/
  admin/
    index.html        ← pagina admin (file statico, NON astro)
    config.yml         ← configurazione CMS (backend, collections, campi)
    sveltia-cms.js     ← script CMS scaricato in locale (evita blocco CSP)
```

### 1.2 admin/index.html
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Admin</title>
  </head>
  <body>
    <script src="/admin/sveltia-cms.js"></script>
  </body>
</html>
```

Nota: lo script Sveltia va scaricato in locale (`curl -L -o public/admin/sveltia-cms.js "https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"`) per evitare blocchi CSP su hosting come Aruba. Aggiornarlo periodicamente.

### 1.3 admin/config.yml
```yaml
backend:
  name: github
  repo: USER/REPO
  branch: main

media_folder: public/images/blog
public_folder: /images/blog

collections:
  - name: blog
    label: Blog
    folder: src/content/blog
    create: true
    slug: "{{slug}}"
    extension: md
    format: yaml-frontmatter
    fields:
      - { label: "Titolo", name: "title", widget: "string" }
      - { label: "Descrizione", name: "description", widget: "text" }
      - { label: "Data", name: "date", widget: "datetime", date_format: "YYYY-MM-DD", time_format: false }
      - label: "Categoria"
        name: "categoria"
        widget: "select"
        options:
          - { label: "Cat 1", value: "cat1" }
          - { label: "Cat 2", value: "cat2" }
      - { label: "Immagine", name: "image", widget: "image", required: false }
      - { label: "Autore", name: "author", widget: "string", default: "Nome Autore" }
      - { label: "Contenuto", name: "body", widget: "markdown" }
```

### 1.4 Autenticazione
- **Produzione:** GitHub Personal Access Token (fine-grained, solo repo specifico, permesso Contents read/write). Login da `/admin/index.html` → "Sign in using access token"
- **Locale:** "Work with a local Git repository" su Chrome/Edge → selezionare la cartella root del progetto

### 1.5 CSP nel .htaccess
Aggiungere questi domini alla Content Security Policy:
- `connect-src`: `https://api.github.com https://raw.githubusercontent.com`
- `Cross-Origin-Resource-Policy`: `cross-origin` (necessario per social crawlers)

### 1.6 Limitazioni note di Sveltia CMS
- Le immagini pre-esistenti non si vedono nella preview dell'editor (Issue #497, #57) — funzionano sul sito pubblico
- Serve Chrome o Edge per l'uso in locale (File System Access API)

---

## Fase 2: GitHub Action — Build + Deploy FTP

### 2.1 Secrets da configurare su GitHub
Settings > Secrets and variables > Actions:
- [x] `FTP_SERVER`
- [x] `FTP_USERNAME`
- [x] `FTP_PASSWORD`
- [x] `FTP_REMOTE_DIR` (es. `/`)

### 2.2 File `.github/workflows/deploy.yml`
```yaml
name: Build & Deploy

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

### 2.3 Stato deploy
- [x] Primo deploy automatico completato
- [x] Ogni push su `main` triggera build + deploy automatico
- [x] Sveltia CMS committa su `main` → Action parte → sito aggiornato in ~2 min

---

## Fase 3: SEO Blog Posts

### 3.1 Frontmatter richiesto per ogni post
```yaml
---
title: "Titolo max 60 char con keyword"
description: "Descrizione max 155 char"
date: 2026-04-20
categoria: innovazione
image: /images/blog/nome-file-senza-spazi.jpg
author: Cantieri AI
---
```

Regole immagini:
- Formato: JPG o PNG, ideale 1200x630
- Nome file: **senza spazi, senza maiuscole, senza caratteri speciali** (es. `digitalizzazione-cantieri.jpg`)

### 3.2 Meta tags automatici (Layout.astro)
Ogni post genera automaticamente:
- [x] `og:type="article"`
- [x] `og:title`, `og:description`, `og:image` dal frontmatter
- [x] `article:published_time` e `article:author`
- [x] Twitter Card `summary_large_image`
- [x] Canonical URL

Props aggiunte al Layout: `ogType`, `ogImage`, `articlePublishedTime`, `articleAuthor`

### 3.3 Structured Data JSON-LD (BlogPosting)
Ogni post include automaticamente:
- [x] `@type: BlogPosting`
- [x] `headline`, `description`, `datePublished`
- [x] `author` (Organization con URL)
- [x] `publisher` con logo
- [x] `image`, `mainEntityOfPage`
- [x] Testato con Google Rich Results Test — valido

### 3.4 Sitemap
- [x] Sitemap dinamica (`src/pages/sitemap.xml.ts`) include i post automaticamente
- [x] `robots.txt` punta alla sitemap

### 3.5 Internal linking
- [x] I post si linkano tra loro dove rilevante
- [x] I post linkano alla homepage/prodotto

### 3.6 URL structure
- [x] URL puliti: `/blog/nome-post/` (niente date, niente underscore)

---

## Fase 4: Google Search Console

- [x] Meta tag di verifica in Layout.astro
- [x] Sitemap reinviata
- [ ] Richiedere indicizzazione dei singoli post (Controllo URL → Richiedi indicizzazione)

---

## Fase 5: Social preview (Facebook/WhatsApp/LinkedIn)

### Problema noto: Aruba blocca i crawler social
Aruba ha un firewall/WAF che restituisce 403 ai bot di Facebook (`facebookexternalhit`).
- [ ] Accedere al pannello Aruba → Sicurezza/Firewall/WAF
- [ ] Disattivare il blocco anti-bot o aggiungere `facebookexternalhit` alla whitelist
- [ ] Dopo la fix, usare il [Facebook Debugger](https://developers.facebook.com/tools/debug/) per forzare il refresh

### Invalidare cache social
- **Facebook:** debugger → "Esegui lo scraping di nuovo"
- **WhatsApp:** cache fino a 7 giorni, workaround: aggiungere `?v=2` all'URL
- **LinkedIn:** [Post Inspector](https://www.linkedin.com/post-inspector/)

---

## Checklist per nuovo portale

Se vuoi replicare questo setup su un altro sito:

1. [ ] Creare repo GitHub
2. [ ] Configurare `public/admin/` (index.html, config.yml, sveltia-cms.js)
3. [ ] Aggiornare `config.yml` con repo, branch, collections
4. [ ] Creare GitHub Personal Access Token per il nuovo repo
5. [ ] Creare GitHub Secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_DIR)
6. [ ] Creare `.github/workflows/deploy.yml`
7. [ ] Aggiungere props SEO al Layout (ogType, ogImage, articlePublishedTime, articleAuthor)
8. [ ] Aggiungere JSON-LD BlogPosting nella pagina [slug]
9. [ ] Configurare sitemap dinamica
10. [ ] Configurare `.htaccess` con CSP corretta (connect-src per GitHub, cross-origin per social)
11. [ ] Verificare su Google Search Console
12. [ ] Verificare social preview con Facebook Debugger
13. [ ] Sbloccare WAF/firewall hosting per crawler social
