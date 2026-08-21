import { Translation } from './types';

export const it: Translation = {
  nav: {
    about: 'Chi Sono',
    skills: 'Competenze',
    experience: 'Esperienza',
    projects: 'Progetti',
    contact: 'Contatto',
    letsTalk: 'Parliamo',
    education: 'Istruzione',
  },
  hero: {
    greeting: 'Ciao, sono',
    name: 'Sania Shakil',
    role: 'Ingegneria Ambientale e Pianificazione Territoriale',
    specializations: [
      'Infrastrutture Sostenibili',
      'Innovazione nel Trattamento delle Acque',
      'Pianificazione Territoriale',
    ],
    description:
      'Studentessa magistrale in Ingegneria Ambientale e Pianificazione Territoriale presso il Politecnico di Milano, dedicata alla costruzione di sistemi urbani resilienti attraverso infrastrutture sostenibili e innovazione nel trattamento delle acque.',
    downloadCv: 'Scarica CV',
    viewProjects: 'Vedi Progetti',
    scrollDown: 'Scorri per esplorare',
    highlightsTitle: 'Profilo di Ingegneria',
    highlights: [
      { value: '9.75 SPI', label: 'Laureata B. Tech' },
      { value: '3+', label: 'Tirocini e Ruoli' },
      { value: '5+', label: 'Strumenti Software' },
      { value: 'Milano, Italia', label: 'Posizione Attuale' },
    ],
  },
  about: {
    label: 'Chi Sono',
    heading: 'Chi Sono',
    bio: [
      "Sono una studentessa di Ingegneria Ambientale e Pianificazione Territoriale presso il Politecnico di Milano, impegnata a utilizzare idee innovative per il trattamento delle acque e infrastrutture sostenibili per creare sistemi urbani resilienti. Ho una solida base in ingegneria civile (ottenendo un 9.75 SPI durante la mia B. Tech.",
      'La mia competenza è nello sviluppo di soluzioni basate sulla natura e strategie sostenibili. Ho creato progetti di ricerca impattanti, inclusi varie Infrastrutture Verdi in Kazakistan, India e Iran, insieme all\'analisi della Sicurezza Idrica e Alimentare in Egitto. I miei progetti includono anche la gestione dei rifiuti derivanti dall\'uso di spezie, concentrandosi su tecnologie Waste-to-Energy e Valutazione del Ciclo di Vita (LCA).',
      'Dalla previsione del grado di calcestruzzo utilizzando Machine Learning e poi analizzando il processo UASB dell\'impianto di trattamento delle acque reflue. Il mio obiettivo è colmare il divario tra ingegneria tecnica e ostacoli ambientali, utilizzando sforzi sostenibili per costruire sistemi urbani resilienti per le future generazioni.',
    ],
    stats: [
      { value: '9.75 SPI', label: 'Laureata B. Tech' },
      { value: '3+', label: 'Tirocini e Ruoli' },
      { value: '5+', label: 'Strumenti Software' },
      { value: 'Milano, Italia', label: 'Posizione Attuale' },
    ],
  },
  skills: {
    label: 'Competenze Tecniche',
    heading: 'Gli strumenti del mestiere',
    categories: [
      {
        name: 'Ingegneria e Design',
        items: [
          { name: 'AutoCAD', context: 'Disegno 2D e design' },
          { name: 'STAAD Pro', context: 'Analisi strutturale e design' },
          { name: 'Primavera', context: 'Gestione progetti e pianificazione' },
        ],
      },
      {
        name: 'Modellazione Ambientale',
        items: [
          { name: 'CROPWAT', context: 'Modellazione delle esigenze idriche delle colture' },
          { name: 'CLIMWAT', context: 'Analisi dei dati climatici' },
          { name: 'QGIS', context: 'Analisi spaziale e mappatura' },
        ],
      },
      {
        name: 'Gestione',
        items: [
          { name: 'Yap\u0131sal Analiz', context: 'Statik ve dinamik y\u00fck hesaplar\u0131' },
          { name: 'Betonarme Tasar\u0131m', context: 'Betonarme eleman tasar\u0131m\u0131' },
          { name: '\u00c7elik Yap\u0131lar', context: '\u00c7elik ba\u011flant\u0131 ve eleman tasar\u0131m\u0131' },
          { name: 'Metraj', context: 'Malzeme miktar\u0131 hesaplama' },
          { name: 'Hakedi\u015f', context: '\u00d6deme ve fatura dok\u00fcmantasyonu' },
          { name: '\u015eantiye Dok\u00fcmantasyonu', context: 'Ata\u015fman ve kalite kay\u0131tlar\u0131' },
        ],
      },
      {
        name: 'Programlama & Analiz',
        items: [
          { name: 'Matlab', context: 'Say\u0131sal analiz ve hesaplama' },
          { name: 'Teknik \u00c7izim', context: 'M\u00fchendislik plan\u0131 yorumlama' },
          { name: 'Harita M\u00fchendisli\u011fi', context: 'S\u0131f\u0131r poligonu ve boykesit' },
          { name: 'Laboratuvar Testleri', context: 'Beton, \u00e7elik ve zemin testleri' },
          { name: 'Maliyet Tahmini', context: 'Proje b\u00fct\u00e7eleme ve \u00f6ng\u00f6r\u00fc' },
          { name: '\u00d6ngerilmeli Beton', context: 'Ard\u0131 germe eleman tasar\u0131m\u0131' },
        ],
      },
    ],
  },
  experience: {
    label: 'Esperienza',
    heading: 'Esperienza Professionale',
    entries: [
      {
        title: 'Tirocinante Estivo',
        company: 'Nippon Koei India Pvt. Ltd.',
        location: 'India',
        period: 'Giugno 2023 – Luglio 2023',
        current: false,
        highlights: [
          'Ho analizzato i processi dell\'impianto di trattamento delle acque reflue (STP) e ho condotto controlli di qualità dell\'effluente trattato per l\'irrigazione.',
        ],
        tech: ['Trattamento Acque Reflue', 'Analisi Qualità Acqua'],
      },
      {
        title: 'Tirocinante Risorse Umane',
        company: 'Kirti Construction',
        location: 'India',
        period: 'Giugno 2022 – Dicembre 2022',
        current: false,
        highlights: [
          'Ho assistito nell\'assunzione, onboarding e formazione per oltre 30 membri del team. Ho gestito le operazioni HR, mantenendo registri e monitorando presenze e permessi per 30+ dipendenti.',
        ],
        tech: ['Gestione HR', 'Reclutamento'],
      },
      {
        title: 'Tirocinante Risorse Umane',
        company: 'NS Associates Pvt. Ltd.',
        location: 'India',
        period: 'Gennaio 2021 – Marzo 2021',
        current: false,
        highlights: [
          'Ho contribuito al progetto "Procedure di Conformità e Gestione Compensazione" supervisionando l\'onboarding dei dipendenti, gestendo la compensazione in linea con le normative governative e coordinando le attività di reclutamento inclusi screening dei curriculum e interviste.',
        ],
        tech: ['Conformità', 'Gestione Compensazione'],
      },
      {
        title: 'M\u00fchendislik Stajyeri',
        company: 'Karayollar\u0131 Genel M\u00fcd\u00fcrl\u00fc\u011f\u00fc (KGM)',
        location: 'Antalya, T\u00fcrkiye',
        period: 'Tem 2022 \u2014 A\u011fu 2022',
        current: false,
        highlights: [
          'Laboratuvar testleri yapt\u0131m: \u00e7elik \u00e7ekme, proctor & CBR, metilen mavisi, LA a\u015f\u0131nma, elek analizi ve beton kar\u0131\u015f\u0131m tasar\u0131m\u0131',
          'K\u0131z\u0131lkaya-Korkuteli karayolu in\u015faat\u0131n\u0131 g\u00f6zlemledim: alt temel, PMAT, PMT, binder ve a\u015f\u0131nma tabakalar\u0131',
          "Tekirova'da (Antalya-Kumluca yolu) geod\u00fcvar in\u015faat\u0131n\u0131 g\u00f6zlemledim",
          'Harita \u00f6l\u00e7\u00fcmleri yapt\u0131m: s\u0131f\u0131r poligonu ve boykesit \u00f6l\u00e7\u00fcmleri',
        ],
        tech: ['Laboratuvar Testleri', 'Yol \u0130n\u015faat\u0131', 'Harita', 'Geoteknik'],
      },
    ],
  },
  education: {
    label: 'Istruzione',
    heading: 'Background Accademico',
    entries: [
      {
        degree: 'MSc. Ingegneria Ambientale e Pianificazione Territoriale',
        institution: 'Politecnico di Milano',
        location: 'Milano, Italia',
        period: '2024 – Presente',
        description: '',
        courses: [],
      },
      {
        degree: 'B. Tech Ingegneria Civile',
        institution: 'Jamia Millia Islamia University',
        location: 'Nuova Delhi, India',
        period: '2020 – 2024',
        description: 'Ottenuto 9.75 SPI',
        courses: [],
      },
    ],
    languages: {
      label: 'Lingue',
      items: [
        { language: 'Inglese', level: 'Fluente' },
        { language: 'Hindi', level: 'Madrelingua' },
        { language: 'Italiano', level: 'A1 Principiante' },
      ],
    },
  },
  projects: {
    label: 'Progetti',
    heading: 'I Miei Progetti',
    filterAll: 'Tutti',
    filters: ['Ricerca', 'Accademico', 'Ingegneria'],
    items: [
      {
        name: 'B\u00fcy\u00fck A\u00e7\u0131kl\u0131kl\u0131 Depo Tesisi',
        description: 'Bitirme projesi: betonarme kolonlar ve \u00e7elik \u00e7at\u0131 sistemine sahip karma yap\u0131. Prof. Dr. Ercan Y\u00fcksel ve Do\u00e7. Dr. G\u00f6khan \u00c7evikbilen dan\u0131\u015fmanl\u0131\u011f\u0131nda ba\u015far\u0131yla tamamland\u0131.',
        category: 'Yap\u0131sal',
        role: 'Ba\u015f Tasar\u0131mc\u0131',
        scale: '24m a\u00e7\u0131kl\u0131k \u00d7 16m y\u00fckseklik',
        tech: ['Betonarme', '\u00c7elik Yap\u0131', 'ETABS', 'AutoCAD'],
        featured: true,
        badge: 'Bitirme Projesi',
      },
      {
        name: '3 Katl\u0131 Konut Binas\u0131',
        description: 'Betonarme II dersi kapsam\u0131nda tamamlanan ilk kapsaml\u0131 yap\u0131sal tasar\u0131m projesi. \u00dc\u00e7 katl\u0131 konut binas\u0131 i\u00e7in tam yap\u0131sal analiz ve eleman tasar\u0131m\u0131.',
        category: 'Akademik',
        role: 'Yap\u0131sal Tasar\u0131mc\u0131',
        scale: '3 kat',
        tech: ['Betonarme', 'Sta4Cad', 'AutoCAD', 'Excel'],
        featured: true,
        badge: 'Akademik',
      },
    ],
  },
  contact: {
    label: 'Contatto',
    heading: "Connettiamoci.",
    subheading: "Hai un progetto o hai bisogno di competenza in ingegneria ambientale? Sono aperta a opportunità.",
    email: 'sania.shakil@mail.polimi.it',
    form: {
      name: 'Il tuo nome',
      emailField: 'La tua email',
      message: 'Il tuo messaggio',
      send: 'Invia Messaggio',
    },
    location: 'Milano, Italia',
  },
  footer: {
    name: 'SS.',
    location: 'Milano, Italia',
    rights: 'Tutti i diritti riservati.',
  },
};
