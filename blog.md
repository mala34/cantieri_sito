# Blog - Documentazione

## Stack Tecnico
- Astro Content Collections (file markdown in `src/content/blog/`)
- Tailwind CSS v4 + @tailwindcss/typography (per stili prose negli articoli)
- Sveltia CMS per gestione articoli da interfaccia grafica
- Client-side search e category filter (vanilla JS)
- Solo italiano per ora

## Checklist

### Infrastruttura
- [x] `src/content.config.ts` con schema blog post
- [x] `src/content/blog/` con post di esempio
- [x] `@tailwindcss/typography` installato
- [x] `src/lib/posts.ts` (getBlogPosts, formatDate, sort)
- [x] `src/lib/categories.ts` (mappa categorie)

### Componenti
- [x] `src/components/blog/PostCard.astro`
- [x] `src/components/blog/CategoryFilter.astro`

### Pagine
- [x] `src/pages/blog/index.astro` (lista blog)
- [x] `src/pages/blog/[slug].astro` (dettaglio articolo)

### CMS
- [x] `public/admin/index.html` (Sveltia CMS)
- [x] `public/admin/config.yml` (configurazione CMS)

### Navigazione
- [x] Navbar con link Blog
- [x] Footer con link Blog

### SEO
- [x] Meta tags e structured data (BlogPosting schema.org)
- [x] Open Graph

### Testing
- [x] `npm run build` senza errori (10 pagine)
- [ ] Verifica visuale pagine blog
- [ ] Verifica Sveltia CMS in locale
- [ ] Verifica filtri categoria
- [ ] Verifica ricerca
- [ ] Aggiungere immagini in `public/images/blog/`

---

## Sveltia CMS - Come usare l'admin

### Avviare il CMS in locale

Sveltia CMS ha bisogno di un proxy locale per funzionare in sviluppo. Servono due terminali:

**Terminale 1 - Dev server Astro:**
```bash
npm run dev
```

**Terminale 2 - Proxy per il CMS locale:**
```bash
npx @sveltia/cms-proxy
```

Poi apri nel browser: **http://localhost:4321/admin/**

Da qui puoi:
- Creare nuovi articoli con editor visuale
- Modificare articoli esistenti
- Caricare immagini
- Scegliere la categoria dal menu a tendina
- Salvare (crea un commit nel repo git)

### In produzione

Per la produzione, il CMS usa `git-gateway` come backend. Serve configurare:
1. Il servizio di hosting (Netlify, Cloudflare Pages, ecc.) con Identity + Git Gateway
2. Oppure cambiare il backend in `public/admin/config.yml` (es. `github` diretto)

---

## Come aggiungere un articolo (manualmente)

Se preferisci non usare il CMS, puoi creare articoli direttamente come file markdown.

### 1. Crea il file

Crea un file `.md` in `src/content/blog/`. Il nome del file = slug nell'URL.

**Esempio:** `src/content/blog/il-mio-articolo.md` -> `/blog/il-mio-articolo/`

### 2. Frontmatter

```yaml
---
title: 'Titolo del tuo articolo'
description: 'Breve descrizione per SEO e card'
date: 2026-04-24
categoria: 'innovazione'
image: '/images/blog/nome-immagine.jpg'
author: 'Cantieri AI'
---
```

**Campi obbligatori:**
| Campo | Descrizione |
|---|---|
| `title` | Titolo dell'articolo |
| `date` | Data pubblicazione (YYYY-MM-DD) |
| `categoria` | Slug categoria (vedi sotto) |

**Campi opzionali:**
| Campo | Descrizione |
|---|---|
| `description` | Testo per SEO e card (consigliato) |
| `image` | Percorso immagine di copertina |
| `author` | Nome autore |

### 3. Contenuto

Scrivi in Markdown standard dopo il frontmatter:

```markdown
Introduzione dell'articolo...

## Sottotitolo

Testo con **grassetto** e *corsivo*.

- Punto 1
- Punto 2

![Alt immagine](/images/blog/esempio.jpg)
```

### 4. Build

```bash
npm run dev     # Vedi subito in locale
npm run build   # Genera per produzione
```

---

## Categorie

Definite in `src/lib/categories.ts`:

| Slug | Etichetta |
|---|---|
| `innovazione` | Innovazione |
| `normative` | Normative |
| `gestione` | Gestione Cantiere |
| `tecnologia` | Tecnologia |
| `sicurezza` | Sicurezza |

### Aggiungere una categoria

1. Apri `src/lib/categories.ts` e aggiungi alla mappa:
```typescript
"nuovo-slug": "Nuova Etichetta",
```

2. Apri `public/admin/config.yml` e aggiungi all'elenco delle opzioni:
```yaml
- { label: "Nuova Etichetta", value: "nuovo-slug" }
```

---

## Struttura file

```
src/
  content/
    blog/                       # Articoli markdown
  content.config.ts             # Schema post
  lib/
    posts.ts                    # Helper fetch/sort
    categories.ts               # Mappa categorie
  components/blog/
    PostCard.astro              # Card nella lista
    CategoryFilter.astro        # Filtri categoria
  pages/blog/
    index.astro                 # Lista blog
    [slug].astro                # Dettaglio articolo
public/
  admin/
    index.html                  # Sveltia CMS
    config.yml                  # Config CMS
  images/blog/                  # Immagini articoli
```
