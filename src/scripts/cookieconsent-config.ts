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
            '<a href="/privacy-policy/">Privacy Policy</a>  <a href="/cookie-policy/">Cookie Policy</a>',
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
                'Utilizziamo i cookie per garantire le funzionalita di base del sito e per migliorare la tua esperienza online.',
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
                'Ci permettono di capire come utilizzi il sito, raccogliendo dati in forma aggregata per finalita statistiche. Fornitore: Google Analytics.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Maggiori informazioni',
              description:
                'Per domande sul trattamento dei dati, <a href="mailto:info@cantieri.ai" class="cc-link">contattaci</a>.',
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
