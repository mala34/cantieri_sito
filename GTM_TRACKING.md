# GTM + GA4 — Tracciamento Click Pulsanti

## Configurazione

- **GTM Container:** `GTM-P6VMNCPX`
- **GA4 Measurement ID:** `G-BK2BLX26SY`
- **GA4 Property:** Cantieri AI — Sito Web

## Come funziona

Ogni pulsante/link con l'attributo `data-gtm="nome_evento"` viene tracciato automaticamente in GA4. Non serve toccare GTM per aggiungere nuovi pulsanti: basta aggiungere `data-gtm` nel codice HTML e deployare.

### Esempio

```html
<a href="https://app.cantieri.ai/login" data-gtm="cta_inizia_ora">Inizia Ora</a>
```

Questo genera un evento `cta_inizia_ora` in GA4 ogni volta che viene cliccato.

## Convenzione nomi: interno vs esterno

| Prefisso | Tipo | Destinazione |
|---|---|---|
| `cta_` | **ESTERNO** — conversione | Porta fuori da `cantieri.ai` (app.cantieri.ai, mailto, tel, Instagram) |
| `form_` | **ESTERNO** — conversione | Invio form (POST a endpoint) |
| `nav_` | **INTERNO** — navigazione | Resta su `cantieri.ai` (sezioni, pagine) |
| `footer_` | **INTERNO** — navigazione | Link footer interni al sito |

### Regola

- Se l'href porta a `cantieri.ai` (stesso dominio) → `nav_` o `footer_`
- Se l'href porta FUORI (`app.cantieri.ai`, `mailto:`, `tel:`, `instagram.com`) → `cta_` o `form_`

---

## Pulsanti tracciati

### CTA Esterni (conversioni) — prefisso `cta_`

Tutti portano fuori da `www.cantieri.ai`.

| Componente | Pulsante | href | `data-gtm` |
|---|---|---|---|
| Hero | Vai al login (badge) | `https://app.cantieri.ai/login` | `cta_hero_vai_al_login` |
| Hero | Inizia ora (CTA primario) | `https://app.cantieri.ai/login` | `cta_inizia_ora` |
| Navbar desktop | Accedi | `https://app.cantieri.ai/login` | `cta_nav_accedi` |
| Navbar mobile | Accedi | `https://app.cantieri.ai/login` | `cta_nav_accedi_mobile` |
| FinalCTA | Inizia Ora | `https://app.cantieri.ai/login` | `cta_finale_inizia_ora` |
| BottomCTA_Copy | Inizia la prova gratuita | `https://app.cantieri.ai/login` | `cta_prova_gratuita` |
| BottomCTA | Email info@cantieri.ai | `mailto:info@cantieri.ai` | `cta_bottom_email` |
| Footer | Instagram | `https://www.instagram.com/cantieri.ai/` | `cta_footer_instagram` |
| Footer | Telefono | `tel:+393480407500` | `cta_footer_telefono` |
| Footer | Email | `mailto:info@cantieri.ai` | `cta_footer_email` |

### Form (conversioni) — prefisso `form_`

| Pagina | Pulsante | `data-gtm` |
|---|---|---|
| /contattaci/ | Invia messaggio | `form_invia` |
| /en/contact/ | Send message | `form_invia` |
| /ar/contact/ | Send message (AR) | `form_invia` |

### Navigazione interna — prefisso `nav_`

| Componente | Pulsante | `data-gtm` |
|---|---|---|
| Navbar desktop | Funzionalita | `nav_funzionalita` |
| Navbar desktop | Soluzioni | `nav_soluzioni` |
| Navbar desktop | Blog | `nav_blog` |
| Navbar desktop | FAQ | `nav_faq` |
| Navbar desktop | Contattaci | `nav_contattaci` |
| Navbar mobile | Funzionalita | `nav_funzionalita_mobile` |
| Navbar mobile | Soluzioni | `nav_soluzioni_mobile` |
| Navbar mobile | Blog | `nav_blog_mobile` |
| Navbar mobile | FAQ | `nav_faq_mobile` |
| Navbar mobile | Contattaci | `nav_contattaci_mobile` |
| Hero | Scopri le funzionalita | `nav_scopri_funzionalita` |
| FinalCTA | Contattaci (secondario) | `nav_finale_contattaci` |
| BottomCTA | Contattaci | `nav_bottom_contattaci` |
| FAQ | Contattaci (CTA) | `faq_cta_contattaci` |

### Footer interno — prefisso `footer_`

| Pulsante | `data-gtm` |
|---|---|
| Funzionalita | `footer_funzionalita` |
| Soluzioni | `footer_soluzioni` |
| Blog | `footer_blog` |
| FAQ | `footer_faq` |
| Contattaci | `footer_contattaci` |

---

## Configurazione GTM (da fare una sola volta)

### 1. Variabile: Click Data GTM

- **Tipo:** Variabile evento automatico > Attributo elemento
- **Nome attributo:** `data-gtm`
- **Nome variabile:** `Click Data GTM`

### 2. Trigger: Click Data GTM

- **Tipo:** Click - Tutti gli elementi > Alcuni click
- **Condizione:** `Click Data GTM` — non e uguale a — `undefined`

### 3. Tag: GA4 - Click Pulsanti

- **Tipo:** Google Analytics: evento GA4
- **Tag ID:** `G-BK2BLX26SY`
- **Nome evento:** `{{Click Data GTM}}`
- **Attivatore:** Click Data GTM

### 4. Pubblica

- Clicca **Invia** in alto a destra
- **Nome versione:** `v2 — Tracking click pulsanti`
- Clicca **Pubblica**

---

## Aggiungere un nuovo pulsante

1. Aggiungi `data-gtm="nome_evento"` al pulsante nel codice Astro
2. Scegli il prefisso giusto:
   - `cta_` se porta FUORI da cantieri.ai
   - `nav_` se resta DENTRO cantieri.ai
   - `footer_` se e un link nel footer interno
   - `form_` se e un invio form
3. Deploya il sito
4. Il pulsante viene tracciato automaticamente — non serve modificare GTM

---

## Dove vedere i dati

- **Tempo reale:** GA4 > Report > Panoramica in tempo reale > Conteggio eventi
- **Storico (dopo 24-48h):** GA4 > Report > Coinvolgimento > Eventi
- **Conversioni:** Puoi marcare gli eventi `cta_*` e `form_*` come eventi chiave in GA4 > Amministrazione > Eventi
