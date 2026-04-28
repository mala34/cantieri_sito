# Come scrivere un articolo per il Blog di Cantieri AI

Guida alle best practice per creare post ottimizzati per la SEO e utili per i lettori.

---

## Frontmatter obbligatorio

Ogni file `.md` in `src/content/blog/` deve iniziare con questo blocco:

```yaml
---
title: 'Titolo dell articolo (50-60 caratteri ideali)'
description: 'Meta description per Google e card social (120-155 caratteri)'
date: 2026-04-27
categoria: innovazione
image: /images/blog/nome-immagine.jpg
author: Cantieri AI
---
```

| Campo | Obbligatorio | Note |
|---|---|---|
| `title` | Si | 50-60 caratteri. Deve contenere la keyword principale. |
| `description` | Fortemente consigliato | 120-155 caratteri. Riassume il contenuto, appare su Google sotto il titolo. |
| `date` | Si | Formato `YYYY-MM-DD`. |
| `categoria` | Si | Uno tra: `innovazione`, `normative`, `gestione`, `tecnologia`, `sicurezza`. |
| `image` | Consigliato | Immagine di copertina in `/public/images/blog/`. Formato JPG/WebP, almeno 1200x630px. |
| `author` | Opzionale | Default: "Cantieri AI". |

---

## Lunghezza dell'articolo

| Tipo di contenuto | Parole minime | Parole ideali |
|---|---|---|
| Articolo informativo / guida | 800 | 1200-1500 |
| Approfondimento tecnico / normativo | 1000 | 1500-2500 |
| News / aggiornamento breve | 500 | 600-800 |

**Regola generale**: un articolo sotto le 800 parole ha pochissime possibilita di posizionarsi su Google per keyword competitive. Punta sempre ad almeno 1000 parole per contenuti informativi.

---

## Struttura consigliata

Un buon articolo segue questa struttura:

```
Introduzione (2-3 paragrafi)
  -> Presenta il problema/tema
  -> Anticipa cosa trovera il lettore

## Sezione principale 1
  -> Sviluppa il primo punto chiave
  -> Usa dati, esempi concreti, riferimenti normativi

## Sezione principale 2
  -> Secondo punto chiave

## Sezione principale 3
  -> Terzo punto chiave

## [Opzionale] Caso pratico / Esempio reale
  -> Scenario concreto che il lettore puo applicare

## Conclusione / Call to action
  -> Riassumi i punti chiave
  -> Invita all'azione (provare Cantieri AI, contattarci, leggere un altro articolo)
```

### Regole sulla struttura

- **Un solo `h1`**: il titolo nel frontmatter genera l'h1. Nel corpo usa solo `##` (h2) e `###` (h3).
- **Almeno 3-4 sezioni h2**: suddividi il contenuto in blocchi leggibili.
- **Paragrafi brevi**: massimo 3-4 righe per paragrafo. Il testo lungo scoraggia la lettura.
- **Liste puntate/numerate**: usale per elencare vantaggi, passaggi, requisiti.
- **Grassetto** per i concetti chiave: aiuta la scansione visiva e segnala a Google i termini importanti.

---

## SEO: keyword e ottimizzazione

### Keyword principale

Ogni articolo deve avere **una keyword principale** (la query per cui vuoi posizionarti).

- Inseriscila nel `title` del frontmatter
- Inseriscila nella `description`
- Usala nell'introduzione (primi 100 caratteri del corpo)
- Ripetila naturalmente 3-5 volte nel testo (no keyword stuffing)
- Usala in almeno un h2

**Esempio**: per un articolo sui rapportini digitali:
- Keyword: "rapportini digitali cantiere"
- Title: "Rapportini digitali: 5 vantaggi per la tua impresa edile"
- H2: "Perche passare ai rapportini digitali"

### Keyword secondarie / correlate

Aggiungi 2-3 keyword correlate nel testo per coprire piu intenti di ricerca:
- "rapportini digitali cantiere" (principale)
- "compilazione rapportini online" (correlata)
- "software gestione cantiere" (correlata — linka alla homepage)

---

## Link interni (fondamentale)

Ogni articolo **deve** contenere link interni. I link interni:
- Aiutano Google a scoprire e indicizzare le pagine
- Distribuiscono "link juice" (autorita) tra le pagine
- Tengono il lettore sul sito piu a lungo

### Regole

| Tipo di link | Quanti | Dove |
|---|---|---|
| Verso la homepage | 1-2 | Quando menzioni Cantieri AI o il software |
| Verso /contattaci/ | 1 | Nella conclusione / CTA finale |
| Verso altri articoli del blog | 1-2 | Quando un tema e approfondito in un altro post |

### Come inserirli in Markdown

```markdown
Con piattaforme come [Cantieri AI](https://www.cantieri.ai/) puoi gestire tutto il cantiere.

Scopri anche [come i rapportini digitali migliorano l'efficienza](/blog/rapportini-digitali-vantaggi/).

Hai domande? [Contattaci](/contattaci/) per una demo gratuita.
```

**Importante**: usa anchor text descrittivi, non "clicca qui" o "leggi di piu". L'anchor text deve descrivere la pagina di destinazione.

---

## Qualita del testo

### Accenti e grammatica

Scrivi in italiano corretto con tutti gli accenti:
- `e` -> `e` (congiunzione) vs `e` con accento -> `è` (verbo essere)
- `piu` -> `più`
- `attivita` -> `attività`
- `perche` -> `perché`
- `cioe` -> `cioè`
- `gia` -> `già`

Un testo senza accenti appare poco professionale e penalizza la percezione di qualita sia da Google che dai lettori.

### Tono di voce

- **Professionale ma accessibile**: non troppo tecnico, non troppo informale
- **Seconda persona**: "la tua impresa", "il tuo cantiere", "puoi gestire"
- **Concreto**: usa numeri, percentuali, esempi reali
- **Evita**: gergo eccessivo, frasi troppo lunghe, ripetizioni

### Contenuto di valore

Google premia contenuti che rispondono davvero alle domande degli utenti:
- **Dati concreti**: "riduzione del 30% dei tempi" e meglio di "notevole risparmio"
- **Riferimenti normativi**: cita leggi e decreti con precisione (es. D.Lgs. 81/2008, Titolo IV)
- **Esempi pratici**: scenari reali che il lettore puo applicare
- **Fonti**: se citi dati o statistiche, indica la fonte

---

## Immagini

- Ogni articolo dovrebbe avere almeno l'immagine di copertina (`image` nel frontmatter)
- Formato consigliato: JPG o WebP, 1200x630px minimo
- Comprimi le immagini prima di caricarle (sotto i 200KB)
- Usa nomi file descrittivi: `rapportini-digitali-cantiere.jpg`, non `IMG_1234.jpg`
- Nel corpo dell'articolo, aggiungi immagini con alt text descrittivo:

```markdown
![Dashboard rapportini digitali di Cantieri AI](/images/blog/dashboard-rapportini.jpg)
```

---

## Checklist pre-pubblicazione

Prima di pubblicare un articolo, verifica:

- [ ] Il titolo contiene la keyword principale ed e sotto i 60 caratteri
- [ ] La description e tra 120 e 155 caratteri
- [ ] L'articolo ha almeno 800 parole (idealmente 1000+)
- [ ] Ci sono almeno 3 sezioni h2
- [ ] Tutti gli accenti sono corretti
- [ ] C'e almeno 1 link alla homepage di Cantieri AI
- [ ] C'e almeno 1 link a /contattaci/ (preferibilmente nella CTA finale)
- [ ] C'e almeno 1 link a un altro articolo del blog (se esistente)
- [ ] L'immagine di copertina e presente e ha dimensioni adeguate
- [ ] La categoria e corretta
- [ ] Il testo e stato riletto per errori grammaticali
- [ ] Il contenuto risponde davvero a una domanda/esigenza del lettore

---

## Slug (nome file)

Il nome del file `.md` diventa lo slug nell'URL:

`sicurezza-cantiere-normative.md` -> `cantieri.ai/blog/sicurezza-cantiere-normative/`

- Usa la keyword principale nello slug
- Separa le parole con trattini `-`
- Tieni lo slug breve (3-5 parole)
- Solo lettere minuscole, numeri e trattini
- No articoli o preposizioni inutili: `vantaggi-rapportini-digitali` e meglio di `i-vantaggi-dei-rapportini-digitali`
