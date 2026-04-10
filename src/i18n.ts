export const languages = {
  it: 'Italiano',
  en: 'English',
  ar: 'العربية',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'it';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getDir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

const translations = {
  it: {
    // Navbar
    'nav.home': 'Home',
    'nav.features': 'Funzionalità',
    'nav.pricing': 'Prezzi',
    'nav.solutions': 'Soluzioni',
    'nav.login': 'Accedi',

    // Hero
    'hero.badge': 'Sei già registrato?',
    'hero.badge_link': 'Vai al login',
    'hero.title': 'La soluzione completa per ottimizzare i tuoi cantieri',
    'hero.subtitle': 'Pianificazione avanzata, tracciamento materiali, reportistica in tempo reale e collaborazione multi-azienda per i tuoi cantieri edili.',
    'hero.cta_login': 'Inizia ora',
    'hero.cta_features': 'Scopri le funzionalità',

    // App Preview
    'appPreview.title_light': 'Dall\'anarchia dell\'Excel al',
    'appPreview.title_accent': 'controllo totale',
    'appPreview.description': 'Smetti di rincorrere informazioni su carta e di saltare da un software all\'altro per cercare documenti. La nostra dashboard centralizzata trasforma la gestione manuale in un flusso di dati certi, accessibili e pronti per essere condivisi: tutto in un unico posto, subito.',
    'appPreview.bullet1': 'Monitoraggio live e storico automatico dei tempi di lavoro',
    'appPreview.bullet2': 'Assegnazione task con un click',
    'appPreview.bullet3': 'Report automatici, scaricabili e condivisibili',

    // Final CTA Banner
    'finalCta.title': 'Aumenta la produttività oggi stesso',
    'finalCta.subtitle': 'Unisciti a migliaia di professionisti che hanno già scelto Cantieri per gestire i loro cantieri in modo più efficiente.',
    'finalCta.button_primary': 'Inizia Ora',
    'finalCta.button_secondary': 'Contattaci',

    // Technology
    'technology.title_light': 'Tecnologia avanzata per',
    'technology.title_accent': 'l\'edilizia moderna.',
    'technology.subtitle': 'Rapportini vocali trasformati in report dall\'IA, supporto multi-lingua e infrastruttura cloud AWS S3 per la massima sicurezza dei tuoi dati.',
    'technology.compliance_title': 'Compliance Italiana Integrata',
    'technology.compliance_desc': 'Gestione semplificata di CIG/CUP, fatturazione SDI e comunicazioni via PEC integrate direttamente nel workflow.',
    'technology.templates_title': 'Template Professionali',
    'technology.templates_desc': 'Modelli pronti all\'uso per rapportini, ordini di servizio e verbali di cantiere, conformi alle normative vigenti.',
    'technology.cloud_title': 'Archiviazione Cloud AWS',
    'technology.cloud_desc': 'Tutti i tuoi documenti sono al sicuro con ridondanza geografica e crittografia di livello bancario.',
    'technology.card_label': 'Firma, compila e condividi documenti in tempo reale dall\'ufficio o dal cantiere, dal PC o dal tablet.',
    'technology.card_quote': 'Tutto si aggiorna mentre lavoriamo, ovunque. Niente più carta da recuperare.',

    // Feature Management
    'featureManagement.title': 'Soluzioni su misura per ogni cantiere',
    'featureManagement.subtitle': 'Tutto ciò di cui hai bisogno per scalare la tua impresa edile, centralizzato in un\'unica piattaforma intuitiva.',
    'featureManagement.doc_title': 'Documentazione Strutturata',
    'featureManagement.doc_desc': 'Molteplici modelli predefiniti che si compilano automaticamente con i dati dei soggetti coinvolti, sempre conformi alle ultime normative.',
    'featureManagement.company_title': 'Gestione Azienda Completa',
    'featureManagement.company_desc': 'Raccogli in un\'unica anagrafica i dati di impresa e partner e collabora in multi-azienda invitando clienti, fornitori e collaboratori sui tuoi cantieri.',
    'featureManagement.dashboard_title': 'Dashboard in Tempo Reale',
    'featureManagement.dashboard_desc': 'Stato di avanzamento di progetti e attività in un colpo d\'occhio, con indicatori che evidenziano subito scadenze e ritardi.',
    'featureManagement.cta': 'Scopri di più',

    // Features / Technology
    'features.label': 'Tecnologia avanzata',
    'features.title': 'Tutto ciò che serve per gestire i tuoi cantieri',
    'features.subtitle': 'Dalla pianificazione alla rendicontazione, tutte le funzioni in un\'unica piattaforma integrata.',
    'features.planning': 'Pianificazione avanzata',
    'features.planning_desc': 'Diagrammi di Gantt interattivi per una pianificazione precisa delle attività e delle risorse di cantiere.',
    'features.materials': 'Tracciamento materiali',
    'features.materials_desc': 'Gestione intelligente dei materiali con alert automatici per gli approvvigionamenti e l\'inventario.',
    'features.reports': 'Reportistica in tempo reale',
    'features.reports_desc': 'Dashboard personalizzabili con indicatori KPI e report generati automaticamente.',
    'features.cloud': 'Cloud nativo',
    'features.cloud_desc': 'Accedi ai tuoi dati ovunque, da qualsiasi dispositivo. Sincronizzazione in tempo reale garantita.',
    'features.security': 'Sicurezza avanzata',
    'features.security_desc': 'Crittografia end-to-end e backup automatici per proteggere tutti i tuoi dati sensibili.',
    'features.integrations': 'Integrazioni',
    'features.integrations_desc': 'Collegati con i tuoi strumenti preferiti: CAD, BIM, contabilità e gestione documentale.',

    // Stats
    'stats.sites_value': '8.000+',
    'stats.sites_label': 'Cantieri gestiti',
    'stats.uptime_value': '99.9%',
    'stats.uptime_label': 'Uptime garantito',
    'stats.companies_value': '150+',
    'stats.companies_label': 'Aziende partner',
    'stats.support_value': '24/7',
    'stats.support_label': 'Supporto dedicato',

    // Pricing
    'pricing.title': 'Piani e prezzi per ogni cantiere',
    'pricing.subtitle': 'Scegli il piano più adatto alle tue esigenze. Tutti i piani includono supporto e aggiornamenti.',
    'pricing.popular': 'Più popolare',
    'pricing.cta': 'Inizia ora',
    'pricing.cta_enterprise': 'Contattaci',
    'pricing.base_name': 'Base',
    'pricing.base_price': '€49',
    'pricing.base_period': '/mese',
    'pricing.base_desc': 'Perfetto per piccoli cantieri e imprese individuali.',
    'pricing.base_f1': 'Fino a 3 cantieri',
    'pricing.base_f2': '5 utenti inclusi',
    'pricing.base_f3': 'Reportistica base',
    'pricing.base_f4': 'Supporto email',
    'pricing.pro_name': 'Professional',
    'pricing.pro_price': '€99',
    'pricing.pro_period': '/mese',
    'pricing.pro_desc': 'Per aziende in crescita con più cantieri attivi.',
    'pricing.pro_f1': 'Cantieri illimitati',
    'pricing.pro_f2': '20 utenti inclusi',
    'pricing.pro_f3': 'Reportistica avanzata',
    'pricing.pro_f4': 'Supporto prioritario',
    'pricing.pro_f5': 'Integrazioni API',
    'pricing.enterprise_name': 'Enterprise',
    'pricing.enterprise_price': 'Custom',
    'pricing.enterprise_period': '',
    'pricing.enterprise_desc': 'Per grandi organizzazioni con esigenze specifiche.',
    'pricing.enterprise_f1': 'Cantieri illimitati',
    'pricing.enterprise_f2': 'Utenti illimitati',
    'pricing.enterprise_f3': 'Report personalizzati',
    'pricing.enterprise_f4': 'Account manager dedicato',
    'pricing.enterprise_f5': 'SLA personalizzato',

    // Solutions
    'solutions.title': 'Soluzioni su misura per ogni settore',
    'solutions.subtitle': 'Cantieri si adatta alle specifiche esigenze di ogni tipo di progetto edilizio.',
    'solutions.residential_title': 'Edilizia Residenziale',
    'solutions.residential_desc': 'Gestione completa di cantieri residenziali, dalla fondazione alla consegna delle chiavi.',
    'solutions.commercial_title': 'Edilizia Commerciale',
    'solutions.commercial_desc': 'Coordinamento di progetti commerciali complessi con team multipli e scadenze stringenti.',
    'solutions.infrastructure_title': 'Infrastrutture',
    'solutions.infrastructure_desc': 'Monitoraggio di opere infrastrutturali su larga scala con tracciamento avanzato.',
    'solutions.renovation_title': 'Ristrutturazioni',
    'solutions.renovation_desc': 'Pianificazione e gestione di interventi di ristrutturazione e restauro edilizio.',

    // Bottom CTA
    'cta.title': 'Vuoi aggiornare la gestione dei tuoi cantieri?',
    'cta.subtitle': 'Inizia oggi stesso a ottimizzare i tuoi processi. Prova Cantieri gratuitamente per 14 giorni.',
    'cta.button': 'Inizia la prova gratuita',
    'cta.button_secondary': 'Parla con un esperto',
    'cta.newsletter_lead': 'Iscriviti alla nostra newsletter per ricevere consigli settimanali sulla gestione e sconti esclusivi.',
    'cta.newsletter_privacy': 'Rispettiamo la tua privacy. Puoi disiscriverti in qualsiasi momento.',
    'cta.newsletter_title': 'Resta aggiornato sul futuro dell\'edilizia',
    'cta.newsletter_button': 'Iscriviti Ora',
    'cta.newsletter_placeholder': 'La tua email',

    // Footer
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.description': 'La piattaforma per la gestione dei cantieri edili.',
    'footer.product': 'Prodotto',
    'footer.company': 'Azienda',
    'footer.legal': 'Legale',
    'footer.about': 'Chi siamo',
    'footer.blog': 'Blog',
    'footer.contact': 'Contatti',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Termini di servizio',
    'footer.cookies': 'Cookie Policy',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.solutions': 'Solutions',
    'nav.login': 'Login',

    // Hero
    'hero.badge': 'Already registered?',
    'hero.badge_link': 'Go to login',
    'hero.title': 'The complete solution to optimize your construction sites',
    'hero.subtitle': 'Advanced planning, material tracking, real-time reporting and multi-company collaboration for your construction sites.',
    'hero.cta_login': 'Get started',
    'hero.cta_features': 'Discover the features',

    // App Preview
    'appPreview.title_light': 'From Excel chaos to',
    'appPreview.title_accent': 'total control',
    'appPreview.description': 'Stop chasing paper documents and jumping between software to find what you need. Our centralized dashboard turns manual work into a flow of reliable, accessible data ready to share: all in one place, instantly.',
    'appPreview.bullet1': 'Live tracking and automatic history of work time',
    'appPreview.bullet2': 'One-click task assignment',
    'appPreview.bullet3': 'Automated reports, ready to download and share',

    // Final CTA Banner
    'finalCta.title': 'Boost your productivity today',
    'finalCta.subtitle': 'Join thousands of professionals who have already chosen Cantieri to manage their construction sites more efficiently.',
    'finalCta.button_primary': 'Start Now',
    'finalCta.button_secondary': 'Contact Us',

    // Technology
    'technology.title_light': 'Advanced technology for',
    'technology.title_accent': 'modern construction.',
    'technology.subtitle': 'Voice reports turned into structured data by AI, multi-language support and AWS S3 cloud infrastructure for maximum data security.',
    'technology.compliance_title': 'Integrated Italian Compliance',
    'technology.compliance_desc': 'Simplified management of CIG/CUP, SDI invoicing and PEC communications integrated directly into the workflow.',
    'technology.templates_title': 'Professional Templates',
    'technology.templates_desc': 'Ready-to-use templates for reports, service orders and site minutes, compliant with current regulations.',
    'technology.cloud_title': 'AWS Cloud Storage',
    'technology.cloud_desc': 'All your documents are safe with geographic redundancy and bank-grade encryption.',
    'technology.card_label': 'Sign, fill in and share documents in real time, from the office or from the site, on PC or tablet.',
    'technology.card_quote': 'Everything updates as we work, anywhere. No more paper to chase.',

    // Feature Management
    'featureManagement.title': 'Tailored solutions for every site',
    'featureManagement.subtitle': 'Everything you need to scale your construction business, centralized in one intuitive platform.',
    'featureManagement.doc_title': 'Structured Documentation',
    'featureManagement.doc_desc': 'Multiple predefined templates that auto-fill with the data of the people involved, always compliant with the latest regulations.',
    'featureManagement.company_title': 'Complete Company Management',
    'featureManagement.company_desc': 'Gather your company and partner data in a single registry and collaborate across multiple companies by inviting clients, suppliers and collaborators to your sites.',
    'featureManagement.dashboard_title': 'Real-time Dashboard',
    'featureManagement.dashboard_desc': 'Project and task progress at a glance, with indicators that immediately highlight deadlines and delays.',
    'featureManagement.cta': 'Learn more',

    // Features / Technology
    'features.label': 'Advanced Technology',
    'features.title': 'Everything you need to manage your construction sites',
    'features.subtitle': 'From planning to reporting, all features in one integrated platform.',
    'features.planning': 'Advanced Planning',
    'features.planning_desc': 'Interactive Gantt charts for precise planning of activities and construction site resources.',
    'features.materials': 'Material Tracking',
    'features.materials_desc': 'Smart material management with automatic alerts for procurement and inventory.',
    'features.reports': 'Real-time Reporting',
    'features.reports_desc': 'Customizable dashboards with KPI indicators and automatically generated reports.',
    'features.cloud': 'Cloud Native',
    'features.cloud_desc': 'Access your data anywhere, from any device. Real-time synchronization guaranteed.',
    'features.security': 'Advanced Security',
    'features.security_desc': 'End-to-end encryption and automatic backups to protect all your sensitive data.',
    'features.integrations': 'Integrations',
    'features.integrations_desc': 'Connect with your favorite tools: CAD, BIM, accounting and document management.',

    // Stats
    'stats.sites_value': '8,000+',
    'stats.sites_label': 'Sites managed',
    'stats.uptime_value': '99.9%',
    'stats.uptime_label': 'Guaranteed uptime',
    'stats.companies_value': '150+',
    'stats.companies_label': 'Partner companies',
    'stats.support_value': '24/7',
    'stats.support_label': 'Dedicated support',

    // Pricing
    'pricing.title': 'Plans and pricing for every site',
    'pricing.subtitle': 'Choose the plan that best suits your needs. All plans include support and updates.',
    'pricing.popular': 'Most popular',
    'pricing.cta': 'Get started',
    'pricing.cta_enterprise': 'Contact us',
    'pricing.base_name': 'Starter',
    'pricing.base_price': '€49',
    'pricing.base_period': '/month',
    'pricing.base_desc': 'Perfect for small sites and individual businesses.',
    'pricing.base_f1': 'Up to 3 sites',
    'pricing.base_f2': '5 users included',
    'pricing.base_f3': 'Basic reporting',
    'pricing.base_f4': 'Email support',
    'pricing.pro_name': 'Professional',
    'pricing.pro_price': '€99',
    'pricing.pro_period': '/month',
    'pricing.pro_desc': 'For growing companies with multiple active sites.',
    'pricing.pro_f1': 'Unlimited sites',
    'pricing.pro_f2': '20 users included',
    'pricing.pro_f3': 'Advanced reporting',
    'pricing.pro_f4': 'Priority support',
    'pricing.pro_f5': 'API integrations',
    'pricing.enterprise_name': 'Enterprise',
    'pricing.enterprise_price': 'Custom',
    'pricing.enterprise_period': '',
    'pricing.enterprise_desc': 'For large organizations with specific needs.',
    'pricing.enterprise_f1': 'Unlimited sites',
    'pricing.enterprise_f2': 'Unlimited users',
    'pricing.enterprise_f3': 'Custom reports',
    'pricing.enterprise_f4': 'Dedicated account manager',
    'pricing.enterprise_f5': 'Custom SLA',

    // Solutions
    'solutions.title': 'Tailored solutions for every sector',
    'solutions.subtitle': 'Cantieri adapts to the specific needs of every type of construction project.',
    'solutions.residential_title': 'Residential Construction',
    'solutions.residential_desc': 'Complete management of residential sites, from foundation to key handover.',
    'solutions.commercial_title': 'Commercial Construction',
    'solutions.commercial_desc': 'Coordination of complex commercial projects with multiple teams and tight deadlines.',
    'solutions.infrastructure_title': 'Infrastructure',
    'solutions.infrastructure_desc': 'Monitoring of large-scale infrastructure works with advanced tracking.',
    'solutions.renovation_title': 'Renovations',
    'solutions.renovation_desc': 'Planning and management of renovation and building restoration projects.',

    // Bottom CTA
    'cta.title': 'Ready to upgrade your construction management?',
    'cta.subtitle': 'Start optimizing your processes today. Try Cantieri free for 14 days.',
    'cta.button': 'Start free trial',
    'cta.button_secondary': 'Talk to an expert',
    'cta.newsletter_lead': 'Subscribe to our newsletter to receive weekly management tips and exclusive discounts.',
    'cta.newsletter_privacy': 'We respect your privacy. You can unsubscribe at any time.',
    'cta.newsletter_title': 'Stay updated on the future of construction',
    'cta.newsletter_button': 'Subscribe Now',
    'cta.newsletter_placeholder': 'Your email',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.description': 'The platform for construction site management.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.about': 'About us',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of service',
    'footer.cookies': 'Cookie Policy',
  },
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.features': 'الميزات',
    'nav.pricing': 'الأسعار',
    'nav.solutions': 'الحلول',
    'nav.login': 'تسجيل الدخول',

    // Hero
    'hero.badge': 'هل أنت مسجّل بالفعل؟',
    'hero.badge_link': 'الذهاب إلى تسجيل الدخول',
    'hero.title': 'الحل الشامل لتحسين مواقع البناء الخاصة بك',
    'hero.subtitle': 'تخطيط متقدم، تتبع المواد، تقارير في الوقت الفعلي والتعاون بين الشركات لمواقع البناء الخاصة بك.',
    'hero.cta_login': 'ابدأ الآن',
    'hero.cta_features': 'اكتشف الميزات',

    // App Preview
    'appPreview.title_light': 'من فوضى Excel إلى',
    'appPreview.title_accent': 'السيطرة الكاملة',
    'appPreview.description': 'توقف عن ملاحقة المستندات الورقية والتنقل بين البرامج للبحث عن المعلومات. لوحة التحكم المركزية لدينا تحوّل الإدارة اليدوية إلى تدفق بيانات موثوقة وسهلة الوصول وجاهزة للمشاركة: كل شيء في مكان واحد، فورًا.',
    'appPreview.bullet1': 'مراقبة مباشرة وسجل تلقائي لأوقات العمل',
    'appPreview.bullet2': 'تعيين المهام بنقرة واحدة',
    'appPreview.bullet3': 'تقارير آلية قابلة للتنزيل والمشاركة',

    // Final CTA Banner
    'finalCta.title': 'عزّز إنتاجيتك اليوم',
    'finalCta.subtitle': 'انضم إلى آلاف المحترفين الذين اختاروا Cantieri لإدارة مواقع البناء بكفاءة أكبر.',
    'finalCta.button_primary': 'ابدأ الآن',
    'finalCta.button_secondary': 'تواصل معنا',

    // Technology
    'technology.title_light': 'تكنولوجيا متقدمة',
    'technology.title_accent': 'للبناء الحديث.',
    'technology.subtitle': 'تقارير صوتية يحوّلها الذكاء الاصطناعي إلى بيانات منظمة، ودعم متعدد اللغات، وبنية تحتية سحابية AWS S3 لأقصى درجات الأمان لبياناتك.',
    'technology.compliance_title': 'امتثال إيطالي متكامل',
    'technology.compliance_desc': 'إدارة مبسطة لـ CIG/CUP والفوترة الإلكترونية SDI واتصالات PEC مدمجة مباشرة في سير العمل.',
    'technology.templates_title': 'قوالب احترافية',
    'technology.templates_desc': 'نماذج جاهزة للاستخدام للتقارير وأوامر الخدمة ومحاضر موقع العمل، متوافقة مع اللوائح الحالية.',
    'technology.cloud_title': 'تخزين سحابي AWS',
    'technology.cloud_desc': 'جميع مستنداتك آمنة مع التكرار الجغرافي والتشفير على مستوى البنوك.',
    'technology.card_label': 'وقّع المستندات واملأها وشاركها في الوقت الفعلي من المكتب أو من الموقع، عبر الحاسوب أو الجهاز اللوحي.',
    'technology.card_quote': 'كل شيء يتحدث أثناء عملنا، أينما كنا. لا مزيد من الأوراق التي يجب تعقبها.',

    // Feature Management
    'featureManagement.title': 'حلول مصممة لكل موقع بناء',
    'featureManagement.subtitle': 'كل ما تحتاجه لتوسيع أعمال البناء الخاصة بك، مجمعة في منصة واحدة بديهية.',
    'featureManagement.doc_title': 'توثيق منظم',
    'featureManagement.doc_desc': 'نماذج متعددة محددة مسبقاً تُعبَّأ تلقائياً ببيانات الأشخاص المعنيين، ومتوافقة دائماً مع أحدث اللوائح.',
    'featureManagement.company_title': 'إدارة شركة متكاملة',
    'featureManagement.company_desc': 'اجمع بيانات شركتك وشركائك في سجل واحد، وتعاون بين شركات متعددة بدعوة العملاء والموردين والمتعاونين إلى مواقع عملك.',
    'featureManagement.dashboard_title': 'لوحة في الوقت الفعلي',
    'featureManagement.dashboard_desc': 'تقدّم المشاريع والمهام في لمحة واحدة، مع مؤشرات تُبرز فوراً المواعيد النهائية والتأخيرات.',
    'featureManagement.cta': 'اعرف المزيد',

    // Features / Technology
    'features.label': 'تكنولوجيا متقدمة',
    'features.title': 'كل ما تحتاجه لإدارة مواقع البناء',
    'features.subtitle': 'من التخطيط إلى إعداد التقارير، جميع الوظائف في منصة واحدة متكاملة.',
    'features.planning': 'تخطيط متقدم',
    'features.planning_desc': 'مخططات جانت التفاعلية للتخطيط الدقيق للأنشطة وموارد موقع البناء.',
    'features.materials': 'تتبع المواد',
    'features.materials_desc': 'إدارة ذكية للمواد مع تنبيهات تلقائية للمشتريات والمخزون.',
    'features.reports': 'تقارير في الوقت الفعلي',
    'features.reports_desc': 'لوحات معلومات قابلة للتخصيص مع مؤشرات الأداء وتقارير يتم إنشاؤها تلقائياً.',
    'features.cloud': 'سحابي أصلي',
    'features.cloud_desc': 'الوصول إلى بياناتك من أي مكان ومن أي جهاز. مزامنة في الوقت الفعلي مضمونة.',
    'features.security': 'أمان متقدم',
    'features.security_desc': 'تشفير من طرف إلى طرف ونسخ احتياطية تلقائية لحماية جميع بياناتك الحساسة.',
    'features.integrations': 'التكاملات',
    'features.integrations_desc': 'اتصل بأدواتك المفضلة: CAD، BIM، المحاسبة وإدارة المستندات.',

    // Stats
    'stats.sites_value': '+8,000',
    'stats.sites_label': 'مواقع مُدارة',
    'stats.uptime_value': '99.9%',
    'stats.uptime_label': 'وقت تشغيل مضمون',
    'stats.companies_value': '+150',
    'stats.companies_label': 'شركات شريكة',
    'stats.support_value': '24/7',
    'stats.support_label': 'دعم مخصص',

    // Pricing
    'pricing.title': 'خطط وأسعار لكل موقع بناء',
    'pricing.subtitle': 'اختر الخطة الأنسب لاحتياجاتك. جميع الخطط تشمل الدعم والتحديثات.',
    'pricing.popular': 'الأكثر شعبية',
    'pricing.cta': 'ابدأ الآن',
    'pricing.cta_enterprise': 'اتصل بنا',
    'pricing.base_name': 'أساسي',
    'pricing.base_price': '€49',
    'pricing.base_period': '/شهر',
    'pricing.base_desc': 'مثالي للمواقع الصغيرة والأعمال الفردية.',
    'pricing.base_f1': 'حتى 3 مواقع',
    'pricing.base_f2': '5 مستخدمين',
    'pricing.base_f3': 'تقارير أساسية',
    'pricing.base_f4': 'دعم بالبريد الإلكتروني',
    'pricing.pro_name': 'احترافي',
    'pricing.pro_price': '€99',
    'pricing.pro_period': '/شهر',
    'pricing.pro_desc': 'للشركات النامية مع مواقع متعددة نشطة.',
    'pricing.pro_f1': 'مواقع غير محدودة',
    'pricing.pro_f2': '20 مستخدم',
    'pricing.pro_f3': 'تقارير متقدمة',
    'pricing.pro_f4': 'دعم ذو أولوية',
    'pricing.pro_f5': 'تكاملات API',
    'pricing.enterprise_name': 'مؤسسات',
    'pricing.enterprise_price': 'مخصص',
    'pricing.enterprise_period': '',
    'pricing.enterprise_desc': 'للمؤسسات الكبيرة ذات الاحتياجات الخاصة.',
    'pricing.enterprise_f1': 'مواقع غير محدودة',
    'pricing.enterprise_f2': 'مستخدمون غير محدودون',
    'pricing.enterprise_f3': 'تقارير مخصصة',
    'pricing.enterprise_f4': 'مدير حساب مخصص',
    'pricing.enterprise_f5': 'اتفاقية مستوى خدمة مخصصة',

    // Solutions
    'solutions.title': 'حلول مصممة لكل قطاع',
    'solutions.subtitle': 'تتكيف Cantieri مع الاحتياجات الخاصة لكل نوع من مشاريع البناء.',
    'solutions.residential_title': 'البناء السكني',
    'solutions.residential_desc': 'إدارة كاملة للمواقع السكنية، من الأساس إلى تسليم المفاتيح.',
    'solutions.commercial_title': 'البناء التجاري',
    'solutions.commercial_desc': 'تنسيق المشاريع التجارية المعقدة مع فرق متعددة ومواعيد نهائية صارمة.',
    'solutions.infrastructure_title': 'البنية التحتية',
    'solutions.infrastructure_desc': 'مراقبة أعمال البنية التحتية واسعة النطاق مع تتبع متقدم.',
    'solutions.renovation_title': 'التجديدات',
    'solutions.renovation_desc': 'تخطيط وإدارة مشاريع التجديد وترميم المباني.',

    // Bottom CTA
    'cta.title': 'هل تريد تحديث إدارة مواقع البناء الخاصة بك؟',
    'cta.subtitle': 'ابدأ بتحسين عملياتك اليوم. جرّب Cantieri مجاناً لمدة 14 يوماً.',
    'cta.button': 'ابدأ التجربة المجانية',
    'cta.button_secondary': 'تحدث مع خبير',
    'cta.newsletter_lead': 'اشترك في نشرتنا الإخبارية لتلقي نصائح إدارية أسبوعية وخصومات حصرية.',
    'cta.newsletter_privacy': 'نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
    'cta.newsletter_title': 'ابق على اطلاع بمستقبل البناء',
    'cta.newsletter_button': 'اشترك الآن',
    'cta.newsletter_placeholder': 'بريدك الإلكتروني',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.description': 'منصة إدارة مواقع البناء.',
    'footer.product': 'المنتج',
    'footer.company': 'الشركة',
    'footer.legal': 'قانوني',
    'footer.about': 'من نحن',
    'footer.blog': 'المدونة',
    'footer.contact': 'اتصل بنا',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
  },
} as const;

type TranslationKey = keyof typeof translations.it;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations.it[key] ?? key;
}

export function localePath(lang: Lang, path: string = ''): string {
  if (lang === defaultLang) return `/${path}`;
  return `/${lang}/${path}`;
}
