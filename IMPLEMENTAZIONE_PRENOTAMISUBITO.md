# Implementazione Privacy, Cookie Policy e Cookie Banner — Prenotami Subito

Guida per replicare su **prenotamisubito.it** tutto quello che abbiamo implementato su associamisubito.it.

> **Nota**: ovunque vedi `GTM-XXXXXXXX` sostituisci con l'ID GTM di Prenotami Subito.
> Se usi lo stesso container GTM di Associami Subito (`GTM-MH2QWRRK`), lascialo uguale.

---

## 1. Installazione dipendenza

```bash
npm install vanilla-cookieconsent
```

---

## 2. Consent Mode v2 — nel Layout principale

Nel `<head>`, **PRIMA** dello script GTM, aggiungi:

```html
<!-- Google Consent Mode v2 — default deny BEFORE GTM loads -->
<script is:inline>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
});
</script>

<!-- Google Tag Manager -->
<script is:inline>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Prima della chiusura di `</body>`, aggiungi:

```html
<script>
    import '../scripts/cookieconsent-config';
</script>
```

---

## 3. Configurazione Cookie Banner

Crea `src/scripts/cookieconsent-config.ts`:

```typescript
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import '../styles/cookieconsent-theme.css';
import * as CookieConsent from 'vanilla-cookieconsent';

CookieConsent.run({
  guiOptions: {
    consentModal: { layout: 'box inline', position: 'bottom left' },
    preferencesModal: { layout: 'box' },
  },
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {
      autoClear: { cookies: [{ name: /^_ga/ }, { name: '_gid' }] },
    },
  },
  onFirstConsent: ({ cookie }) => {
    updateGtmConsent(cookie.categories);
  },
  onChange: ({ cookie }) => {
    updateGtmConsent(cookie.categories);
  },
  language: {
    default: 'it',
    translations: {
      it: {
        consentModal: {
          title: 'Utilizziamo i cookie',
          description:
            'Questo sito utilizza cookie tecnici necessari al funzionamento e, con il tuo consenso, cookie analitici per migliorare la tua esperienza.',
          acceptAllBtn: 'Accetta tutti',
          acceptNecessaryBtn: 'Solo necessari',
          showPreferencesBtn: 'Gestisci preferenze',
          footer:
            '<a href="/privacy-policy">Privacy Policy</a>  <a href="/cookie-policy">Cookie Policy</a>',
        },
        preferencesModal: {
          title: 'Preferenze cookie',
          acceptAllBtn: 'Accetta tutti',
          acceptNecessaryBtn: 'Solo necessari',
          savePreferencesBtn: 'Salva preferenze',
          sections: [
            {
              title: 'Utilizzo dei cookie',
              description:
                'Utilizziamo i cookie per garantire le funzionalità di base del sito e per migliorare la tua esperienza online.',
            },
            {
              title: 'Cookie strettamente necessari',
              description:
                'Essenziali per il corretto funzionamento del sito. Non possono essere disattivati.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookie analitici',
              description:
                'Ci permettono di capire come utilizzi il sito, raccogliendo dati in forma aggregata per finalità statistiche. Fornitore: Google Analytics.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Maggiori informazioni',
              description:
                'Per domande sul trattamento dei dati, <a href="mailto:info@prenotamisubito.it" class="cc-link">contattaci</a>.',
            },
          ],
        },
      },
    },
  },
});

function updateGtmConsent(categories: string[]) {
  const hasAnalytics = categories.includes('analytics');
  const status = hasAnalytics ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  });
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
```

---

## 4. Tema CSS del Cookie Banner

Crea `src/styles/cookieconsent-theme.css`.

**Adatta i colori al tema di Prenotami Subito** — sotto il file usato su Associami Subito come base. Sostituisci `#F28F16` con il colore primario di Prenotami Subito e `rgba(242, 143, 22, ...)` con il corrispettivo rgba.

```css
/* ==============================================
   Cookie Consent — Prenotami Subito Theme
   ============================================== */

/* ---- Consent Modal (banner) ---- */
#cc-main .cm {
  font-family: 'Inter', sans-serif;
  border-radius: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.15);
  background: #fff;
  max-width: 420px;
}

#cc-main .cm__title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: #0f172a;
  font-size: 1.25rem;
}

#cc-main .cm__desc {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #475569;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Primary button — Accetta tutti */
#cc-main .cm__btn[data-role="all"] {
  font-family: 'Inter', sans-serif;
  background: #F28F16; /* <-- COLORE PRIMARIO */
  color: #fff;
  font-weight: 900;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  box-shadow: 0 10px 25px -5px rgba(242, 143, 22, 0.3); /* <-- RGBA PRIMARIO */
  transition: transform 0.2s ease;
}

#cc-main .cm__btn[data-role="all"]:hover {
  background: #e07d0a; /* <-- COLORE PRIMARIO HOVER */
  transform: scale(1.03);
}

/* Secondary button — Solo necessari */
#cc-main .cm__btn[data-role="necessary"] {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #0f172a;
  font-weight: 900;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, background 0.2s ease;
}

#cc-main .cm__btn[data-role="necessary"]:hover {
  background: #f1f5f9;
  transform: scale(1.03);
}

/* Tertiary link — Gestisci preferenze */
#cc-main .cm__btn[data-role="show"] {
  font-family: 'Inter', sans-serif;
  color: #F28F16; /* <-- COLORE PRIMARIO */
  font-weight: 700;
  font-size: 0.75rem;
  background: transparent;
  border: none;
  padding: 0.5rem 0;
  text-decoration: none;
}

#cc-main .cm__btn[data-role="show"]:hover {
  color: #e07d0a; /* <-- COLORE PRIMARIO HOVER */
  text-decoration: underline;
}

/* Footer links */
#cc-main .cm__footer {
  background: #fff;
  border-top: 1px solid #e2e8f0;
  border-radius: 0 0 1.5rem 1.5rem;
  padding: 0.75rem 1.25rem;
  margin-top: 0;
}

#cc-main .cm__footer a {
  font-family: 'Inter', sans-serif;
  color: #475569;
  font-weight: 900;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-decoration: none;
  transition: color 0.2s ease;
}

#cc-main .cm__footer a:hover {
  color: #F28F16; /* <-- COLORE PRIMARIO */
}

/* ---- Preferences Modal ---- */
#cc-main .pm {
  font-family: 'Inter', sans-serif;
  border-radius: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  background: #fff;
}

#cc-main .pm__title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: #0f172a;
  font-size: 1.25rem;
}

#cc-main .pm__section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  color: #0f172a;
  font-size: 0.875rem;
}

#cc-main .pm__section-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #475569;
  font-size: 0.8125rem;
  line-height: 1.6;
}

#cc-main .pm__section-desc a {
  color: #F28F16; /* <-- COLORE PRIMARIO */
  font-weight: 700;
}

#cc-main .pm__section-desc a:hover {
  text-decoration: underline;
}

/* Preferences modal — primary button */
#cc-main .pm__btn[data-role="all"] {
  font-family: 'Inter', sans-serif;
  background: #F28F16; /* <-- COLORE PRIMARIO */
  color: #fff;
  font-weight: 900;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  box-shadow: 0 10px 25px -5px rgba(242, 143, 22, 0.3); /* <-- RGBA PRIMARIO */
  transition: transform 0.2s ease;
}

#cc-main .pm__btn[data-role="all"]:hover {
  background: #e07d0a; /* <-- COLORE PRIMARIO HOVER */
  transform: scale(1.03);
}

/* Preferences modal — secondary buttons */
#cc-main .pm__btn[data-role="necessary"],
#cc-main .pm__btn[data-role="save"] {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #0f172a;
  font-weight: 900;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, background 0.2s ease;
}

#cc-main .pm__btn[data-role="necessary"]:hover,
#cc-main .pm__btn[data-role="save"]:hover {
  background: #f1f5f9;
  transform: scale(1.03);
}

/* Close button */
#cc-main .pm__close-btn {
  color: #94a3b8;
  transition: color 0.2s ease;
}

#cc-main .pm__close-btn:hover {
  color: #F28F16; /* <-- COLORE PRIMARIO */
}

/* Toggle switch */
#cc-main .pm__toggle .toggle__icon--on {
  background: #F28F16; /* <-- COLORE PRIMARIO */
}

#cc-main .section__toggle input:checked + .toggle__icon {
  background: #F28F16; /* <-- COLORE PRIMARIO */
}

#cc-main .section__toggle input:checked:disabled + .toggle__icon {
  background: #F28F16; /* <-- COLORE PRIMARIO */
  opacity: 0.6;
}

/* Section dividers */
#cc-main .pm__section {
  border-color: #f1f5f9;
}

/* Overlay */
#cc-main .pm__overlay {
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
}
```

---

## 5. Pagine Privacy Policy e Cookie Policy

Crea le due pagine in `src/pages/`. Il contenuto e la struttura sono identici a quelli di Associami Subito, con queste **sostituzioni**:

| Cerca | Sostituisci con |
|---|---|
| `Associami Subito` (nel testo) | `Prenotami Subito` |
| `Associami Subito S.R.L.` | `Prenotami Subito S.R.L.` (stessa ragione sociale se è la stessa SRL, altrimenti adatta) |
| `associamisubito.it` | `prenotamisubito.it` |
| `title="Cookie Policy \| Associami Subito"` | `title="Cookie Policy \| Prenotami Subito"` |
| `title="Privacy Policy \| Associami Subito"` | `title="Privacy Policy \| Prenotami Subito"` |
| `siteUrl = 'https://associamisubito.it'` | `siteUrl = 'https://prenotamisubito.it'` |

### Nota importante sul titolare

Se entrambi i portali fanno capo alla **stessa S.R.L.**, il titolare del trattamento è lo stesso. In quel caso la ragione sociale resta `Associami Subito S.R.L.` (o come è registrata in Camera di Commercio) e aggiungi la nota:

> "Prenotami Subito e Associami Subito sono marchi che fanno capo allo stesso titolare del trattamento."

### Sezione "Come funziona: il nostro ruolo" (Privacy Policy)

Adatta il testo al target utente di Prenotami Subito (l'utente finale/sportivo, non il gestore):

> Prenotami Subito è la piattaforma che consente agli utenti di prenotare attività sportive, corsi e servizi presso le strutture convenzionate. I dati inseriti dall'utente vengono trattati da Prenotami Subito in qualità di Titolare del trattamento per le finalità proprie della piattaforma, e comunicati alla struttura sportiva scelta dall'utente per l'erogazione del servizio.

---

## 6. Footer

Aggiungi i link nel footer:

```typescript
const footerLinks = [
    { label: 'FAQ', href: '/faq', gtm: 'footer_faq' },
    { label: 'Contatti', href: '/contattaci', gtm: 'footer_contattaci' },
    { label: 'Privacy Policy', href: '/privacy-policy', gtm: 'footer_privacy' },
    { label: 'Cookie Policy', href: '/cookie-policy', gtm: 'footer_cookie' },
];
```

---

## 7. Checklist di verifica

- [ ] `npm install vanilla-cookieconsent`
- [ ] Consent Mode v2 default deny **prima** di GTM nel `<head>`
- [ ] ID GTM corretto (`GTM-XXXXXXXX`)
- [ ] `src/scripts/cookieconsent-config.ts` creato
- [ ] `src/styles/cookieconsent-theme.css` creato (colori adattati)
- [ ] Script cookie banner importato prima di `</body>`
- [ ] `/privacy-policy` creata con testi adattati a Prenotami Subito
- [ ] `/cookie-policy` creata con testi adattati a Prenotami Subito
- [ ] Footer con link a Privacy e Cookie Policy
- [ ] `npm run build` senza errori
- [ ] **Test in incognito**: banner appare, "Solo necessari" non setta `_ga`/`_gid`, "Accetta tutti" li setta
- [ ] **Test revoca**: dopo aver accettato, "Gestisci preferenze" > disattiva analitici > i cookie `_ga`/`_gid` vengono rimossi

---

## 8. Struttura file risultante

```
src/
├── scripts/
│   └── cookieconsent-config.ts
├── styles/
│   ├── global.css
│   └── cookieconsent-theme.css
├── pages/
│   ├── privacy-policy.astro
│   └── cookie-policy.astro
└── layouts/
    └── Layout.astro  (con Consent Mode v2 + script banner)
```
