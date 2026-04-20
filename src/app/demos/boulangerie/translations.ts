/**
 * Traductions FR / DE / EN pour la démo Maison Farine.
 *
 * Strasbourg est frontalière — les touristes allemands et anglophones
 * sont une clientèle réelle, d'où les trois langues.
 *
 * La structure est dupliquée intentionnellement entre langues : chaque
 * clé est typée via `Translations` pour garantir qu'aucune n'est oubliée
 * en ajoutant une nouvelle langue.
 */

export type LocaleCode = "fr" | "de" | "en";

export const LOCALES: { code: LocaleCode; label: string; name: string }[] = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "en", label: "EN", name: "English" },
];

/** Locale BCP-47 pour les APIs natives (ex: toLocaleDateString). */
export const BCP47: Record<LocaleCode, string> = {
  fr: "fr-FR",
  de: "de-DE",
  en: "en-GB",
};

export interface Translations {
  demoBanner: {
    notice: string;
    by: string;
    suffix: string;
    back: string;
  };
  nav: {
    fournee: string;
    carte: string;
    rituel: string;
    instagram: string;
    trouver: string;
    order: string;
    openMenu: string;
    closeMenu: string;
    menuTag: string;
    orderToday: string;
  };
  hero: {
    tagRunning: string;
    title1: string;
    titleConnector: string;
    titleEnd: string;
    rotatingWords: string[];
    sideBadge: string;
    paragraph: string;
    cta: string;
  };
  stats: { value: string; label: string }[];
  ticker: string[];
  fournee: {
    kicker: string;
    heading1: string;
    heading2: string;
    heading3Time: string;
    description: string;
    badge: string;
    dayLabel: string;
    productName: string;
    productDescription: string;
    priceUnit: string;
    cta: string;
  };
  carte: {
    kicker: string;
    heading1: string;
    heading2: string;
    description: string;
    endKicker: string;
    endTitle1: string;
    endTitle2: string;
    endCta: string;
    currency: string;
  };
  pains: {
    name: string;
    tag: string;
    note: string;
  }[];
  rituel: {
    kicker: string;
    heading1: string;
    heading2: string;
    stepLabel: string;
    steps: { title: string; text: string }[];
  };
  testimonialsSection: {
    kicker: string;
    srLabel: string;
  };
  testimonials: { name: string; role: string; quote: string }[];
  instagram: {
    kicker: string;
    handle: string;
    follow: string;
  };
  trouver: {
    kicker: string;
    heading1: string;
    heading2: string;
    addressLabel: string;
    addressLine1: string;
    addressLine2: string;
    directions: string;
    phoneLabel: string;
    phoneHint: string;
    hoursLabel: string;
    horaires: { jour: string; heures: string }[];
  };
  footer: {
    brand1: string;
    brand2: string;
    disclaimerPrefix: string;
    disclaimerSuffix: string;
    photosBy: string;
    copyright: string;
    coords: string;
  };
  switcher: {
    ariaLabel: string;
  };
}

export const translations: Record<LocaleCode, Translations> = {
  /* ============================================================
     FRANÇAIS
     ============================================================ */
  fr: {
    demoBanner: {
      notice: "Site de démonstration créé par",
      by: "Codalyx",
      suffix: "— Entreprise fictive à vocation illustrative",
      back: "Retour sur codalyx.fr",
    },
    nav: {
      fournee: "Fournée",
      carte: "Carte",
      rituel: "Rituel",
      instagram: "Instagram",
      trouver: "Nous trouver",
      order: "Commander",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer",
      menuTag: "Menu · 2026",
      orderToday: "Commander aujourd'hui",
    },
    hero: {
      tagRunning: "Le fournil tourne —",
      title1: "L'art",
      titleConnector: "du",
      titleEnd: "depuis 1987.",
      rotatingWords: ["levain", "pain", "feu", "goût", "geste"],
      sideBadge: "Fournée n° 1284",
      paragraph:
        "Farines alsaciennes broyées sur pierre, levain-chef trentenaire, four à bois chauffé chaque matin à 6 h. Aucun raccourci, jamais.",
      cta: "Voir la carte",
    },
    stats: [
      { value: "38", label: "années de fournil" },
      { value: "06:30", label: "première fournée" },
      { value: "42", label: "références en vitrine" },
      { value: "3", label: "générations" },
    ],
    ticker: [
      "PAIN AU LEVAIN",
      "KOUGELHOPF",
      "BAGUETTE TRADITION",
      "BRIOCHE PUR BEURRE",
      "PAIN DE SEIGLE",
      "BRETZELS",
      "TARTE AUX MYRTILLES",
      "VIENNOISERIES",
    ],
    fournee: {
      kicker: "Fournée",
      heading1: "Le pain du jour,",
      heading2: "sorti à",
      heading3Time: "06:42",
      description:
        "Chaque mardi, le pain à l'épeautre sort du four. Farine ancienne, goût de noisette, quantité limitée. Réservation conseillée.",
      badge: "Limité · 40 unités",
      dayLabel: "Mardi",
      productName: "Pain à l'épeautre",
      productDescription:
        "Fermentation lente sur 36 heures, épeautre ancien du domaine Loewenberger. Goût noisette, croûte fine.",
      priceUnit: "/ 500 g",
      cta: "Réserver ma part",
    },
    carte: {
      kicker: "Carte",
      heading1: "Six pièces,",
      heading2: "une conviction.",
      description:
        "Faites défiler la page pour parcourir la sélection. La gamme complète vous attend en vitrine.",
      endKicker: "Fin de carte",
      endTitle1: "Et 36 autres,",
      endTitle2: "en vitrine.",
      endCta: "Passer nous voir",
      currency: "eur",
    },
    pains: [
      {
        name: "Pain de tradition",
        tag: "Signature",
        note: "Croûte épaisse, mie aérée, cuit au four à bois.",
      },
      {
        name: "Baguette au levain",
        tag: "Classique",
        note: "Fermentation 24 h, farine T65 locale.",
      },
      {
        name: "Pain aux céréales",
        tag: "Rustique",
        note: "Tournesol, lin, sésame et pavot.",
      },
      {
        name: "Kougelhopf",
        tag: "Alsace",
        note: "Brioche aux raisins, amandes torréfiées.",
      },
      {
        name: "Pain de seigle",
        tag: "Terroir",
        note: "Pour accompagner fromage et choucroute.",
      },
      {
        name: "Brioche pur beurre",
        tag: "Gourmand",
        note: "Beurre AOP d'Isigny, pousse lente.",
      },
    ],
    rituel: {
      kicker: "Rituel",
      heading1: "Quatre gestes,",
      heading2: "zéro raccourci.",
      stepLabel: "Étape",
      steps: [
        {
          title: "Farine",
          text: "Deux moulins alsaciens à moins de 50 km. Blés anciens écrasés sur meule de pierre, livrés chaque mardi.",
        },
        {
          title: "Levain",
          text: "Un levain-chef de trente ans, rafraîchi chaque jour. Arômes de noisette et conservation longue sans conservateur.",
        },
        {
          title: "Façonnage",
          text: "Chaque pâton est pesé, boulé, façonné à la main. Le geste transmis depuis 1987, trois générations.",
        },
        {
          title: "Cuisson",
          text: "Four à bois à 250 °C. L'humidité crée cette croûte dorée et craquante qui fait la différence.",
        },
      ],
    },
    testimonialsSection: {
      kicker: "✶ Voix du quartier",
      srLabel: "Témoignage",
    },
    testimonials: [
      {
        name: "Camille R.",
        role: "Cliente depuis 2011",
        quote:
          "Le pain à l'épeautre du mardi a ce goût de noisette qu'on ne retrouve nulle part ailleurs en ville.",
      },
      {
        name: "Yann D.",
        role: "Chef — L'Épicéa",
        quote:
          "Je me fournis ici depuis l'ouverture de mon restaurant. La régularité et la qualité sont irréprochables.",
      },
      {
        name: "Soraya M.",
        role: "Voisine de quartier",
        quote:
          "On vient pour le pain, on reste pour le café offert et les conseils. C'est une adresse de famille.",
      },
    ],
    instagram: {
      kicker: "Instagram",
      handle: "@maisonfarine",
      follow: "Suivre le fournil",
    },
    trouver: {
      kicker: "Trouver",
      heading1: "Poussez la porte,",
      heading2: "le café est offert.",
      addressLabel: "Adresse",
      addressLine1: "12 Quai Saint-Martin",
      addressLine2: "67000 Strasbourg",
      directions: "Itinéraire",
      phoneLabel: "Téléphone",
      phoneHint: "Pour réserver un pain spécial ou passer commande.",
      hoursLabel: "Horaires",
      horaires: [
        { jour: "Lundi", heures: "Fermé" },
        { jour: "Mardi — Vendredi", heures: "6h30 — 19h30" },
        { jour: "Samedi", heures: "6h30 — 19h00" },
        { jour: "Dimanche", heures: "7h00 — 13h00" },
      ],
    },
    footer: {
      brand1: "Maison",
      brand2: "Farine.",
      disclaimerPrefix: "Site fictif créé à des fins de démonstration par",
      disclaimerSuffix: ". Aucun commerce sous ce nom à cette adresse.",
      photosBy: "Photographies fournies par",
      copyright: "© 2026 — Démo Codalyx",
      coords: "Strasbourg · 48°35′N 07°44′E",
    },
    switcher: {
      ariaLabel: "Choisir la langue",
    },
  },

  /* ============================================================
     DEUTSCH
     ============================================================ */
  de: {
    demoBanner: {
      notice: "Demo-Website erstellt von",
      by: "Codalyx",
      suffix: "— Fiktives Unternehmen zu Illustrationszwecken",
      back: "Zurück zu codalyx.fr",
    },
    nav: {
      fournee: "Backcharge",
      carte: "Karte",
      rituel: "Ritual",
      instagram: "Instagram",
      trouver: "Uns finden",
      order: "Bestellen",
      openMenu: "Menü öffnen",
      closeMenu: "Schließen",
      menuTag: "Menü · 2026",
      orderToday: "Heute bestellen",
    },
    hero: {
      tagRunning: "Der Ofen läuft —",
      title1: "Die Kunst",
      titleConnector: "des",
      titleEnd: "seit 1987.",
      rotatingWords: ["Sauerteigs", "Brotes", "Feuers", "Geschmacks", "Handwerks"],
      sideBadge: "Charge Nr. 1284",
      paragraph:
        "Elsässische Mehle auf Stein gemahlen, dreißig Jahre alter Sauerteig-Starter, Holzofen täglich um 6 Uhr befeuert. Keine Abkürzungen, niemals.",
      cta: "Zur Karte",
    },
    stats: [
      { value: "38", label: "Jahre Backstube" },
      { value: "06:30", label: "erste Backcharge" },
      { value: "42", label: "Sorten in der Auslage" },
      { value: "3", label: "Generationen" },
    ],
    ticker: [
      "SAUERTEIGBROT",
      "KOUGELHOPF",
      "TRADITIONS-BAGUETTE",
      "BUTTERBRIOCHE",
      "ROGGENBROT",
      "BRETZELN",
      "HEIDELBEERTORTE",
      "WIENER GEBÄCK",
    ],
    fournee: {
      kicker: "Backcharge",
      heading1: "Das Brot des Tages,",
      heading2: "aus dem Ofen um",
      heading3Time: "06:42",
      description:
        "Jeden Dienstag kommt das Dinkelbrot aus dem Ofen. Urgetreide, nussiger Geschmack, begrenzte Menge. Reservierung empfohlen.",
      badge: "Begrenzt · 40 Stück",
      dayLabel: "Dienstag",
      productName: "Dinkelbrot",
      productDescription:
        "Langsame Gärung über 36 Stunden, alter Dinkel vom Gut Loewenberger. Nussiger Geschmack, feine Kruste.",
      priceUnit: "/ 500 g",
      cta: "Meinen Anteil reservieren",
    },
    carte: {
      kicker: "Karte",
      heading1: "Sechs Stücke,",
      heading2: "eine Überzeugung.",
      description:
        "Scrollen Sie durch die Auswahl. Das vollständige Sortiment erwartet Sie in der Auslage.",
      endKicker: "Ende der Karte",
      endTitle1: "Und 36 weitere,",
      endTitle2: "in der Auslage.",
      endCta: "Besuchen Sie uns",
      currency: "eur",
    },
    pains: [
      {
        name: "Traditionsbrot",
        tag: "Signatur",
        note: "Dicke Kruste, luftige Krume, im Holzofen gebacken.",
      },
      {
        name: "Sauerteig-Baguette",
        tag: "Klassisch",
        note: "24 h Gärung, lokales T65-Mehl.",
      },
      {
        name: "Mehrkornbrot",
        tag: "Rustikal",
        note: "Sonnenblume, Lein, Sesam und Mohn.",
      },
      {
        name: "Kougelhopf",
        tag: "Elsass",
        note: "Rosinenbrioche, geröstete Mandeln.",
      },
      {
        name: "Roggenbrot",
        tag: "Terroir",
        note: "Passt zu Käse und Sauerkraut.",
      },
      {
        name: "Butterbrioche",
        tag: "Genussvoll",
        note: "AOP-Butter aus Isigny, langsame Teigführung.",
      },
    ],
    rituel: {
      kicker: "Ritual",
      heading1: "Vier Handgriffe,",
      heading2: "keine Abkürzung.",
      stepLabel: "Schritt",
      steps: [
        {
          title: "Mehl",
          text: "Zwei elsässische Mühlen, weniger als 50 km entfernt. Urgetreide auf Steinmühle gemahlen, jeden Dienstag geliefert.",
        },
        {
          title: "Sauerteig",
          text: "Ein dreißig Jahre alter Sauerteig-Starter, täglich aufgefrischt. Nussige Aromen und lange Haltbarkeit ohne Konservierungsstoffe.",
        },
        {
          title: "Formung",
          text: "Jeder Teigling wird gewogen, rundgewirkt, von Hand geformt. Die Handgriffe werden seit 1987 überliefert, über drei Generationen.",
        },
        {
          title: "Backen",
          text: "Holzofen bei 250 °C. Die Feuchtigkeit erzeugt diese goldene, knusprige Kruste, die den Unterschied macht.",
        },
      ],
    },
    testimonialsSection: {
      kicker: "✶ Stimmen aus dem Viertel",
      srLabel: "Stimme",
    },
    testimonials: [
      {
        name: "Camille R.",
        role: "Kundin seit 2011",
        quote:
          "Das Dinkelbrot am Dienstag hat diesen nussigen Geschmack, den man sonst nirgendwo in der Stadt findet.",
      },
      {
        name: "Yann D.",
        role: "Küchenchef — L'Épicéa",
        quote:
          "Ich beziehe seit der Eröffnung meines Restaurants hier. Zuverlässigkeit und Qualität sind tadellos.",
      },
      {
        name: "Soraya M.",
        role: "Nachbarin",
        quote:
          "Man kommt wegen des Brotes, man bleibt wegen des geschenkten Kaffees und der Ratschläge. Eine Familienadresse.",
      },
    ],
    instagram: {
      kicker: "Instagram",
      handle: "@maisonfarine",
      follow: "Der Backstube folgen",
    },
    trouver: {
      kicker: "Finden",
      heading1: "Stoßen Sie die Tür auf,",
      heading2: "der Kaffee geht aufs Haus.",
      addressLabel: "Adresse",
      addressLine1: "12 Quai Saint-Martin",
      addressLine2: "67000 Straßburg",
      directions: "Route",
      phoneLabel: "Telefon",
      phoneHint:
        "Um ein besonderes Brot zu reservieren oder eine Bestellung aufzugeben.",
      hoursLabel: "Öffnungszeiten",
      horaires: [
        { jour: "Montag", heures: "Geschlossen" },
        { jour: "Dienstag — Freitag", heures: "6:30 — 19:30" },
        { jour: "Samstag", heures: "6:30 — 19:00" },
        { jour: "Sonntag", heures: "7:00 — 13:00" },
      ],
    },
    footer: {
      brand1: "Maison",
      brand2: "Farine.",
      disclaimerPrefix: "Fiktive Website zu Demonstrationszwecken erstellt von",
      disclaimerSuffix: ". Unter diesem Namen existiert kein Geschäft an dieser Adresse.",
      photosBy: "Fotos bereitgestellt von",
      copyright: "© 2026 — Codalyx Demo",
      coords: "Straßburg · 48°35′N 07°44′E",
    },
    switcher: {
      ariaLabel: "Sprache wählen",
    },
  },

  /* ============================================================
     ENGLISH
     ============================================================ */
  en: {
    demoBanner: {
      notice: "Demo website created by",
      by: "Codalyx",
      suffix: "— Fictional business for illustration purposes",
      back: "Back to codalyx.fr",
    },
    nav: {
      fournee: "Batch",
      carte: "Menu",
      rituel: "Ritual",
      instagram: "Instagram",
      trouver: "Find us",
      order: "Order",
      openMenu: "Open menu",
      closeMenu: "Close",
      menuTag: "Menu · 2026",
      orderToday: "Order today",
    },
    hero: {
      tagRunning: "The oven is running —",
      title1: "The art",
      titleConnector: "of",
      titleEnd: "since 1987.",
      rotatingWords: ["sourdough", "bread", "fire", "flavour", "craft"],
      sideBadge: "Batch no. 1284",
      paragraph:
        "Alsatian stone-milled flour, thirty-year-old sourdough starter, wood-fired oven stoked every morning at 6 a.m. No shortcuts, ever.",
      cta: "See the menu",
    },
    stats: [
      { value: "38", label: "years baking" },
      { value: "06:30", label: "first batch" },
      { value: "42", label: "items on the shelf" },
      { value: "3", label: "generations" },
    ],
    ticker: [
      "SOURDOUGH LOAF",
      "KOUGELHOPF",
      "TRADITION BAGUETTE",
      "BUTTER BRIOCHE",
      "RYE BREAD",
      "PRETZELS",
      "BLUEBERRY TART",
      "VIENNOISERIES",
    ],
    fournee: {
      kicker: "Batch",
      heading1: "Today's loaf,",
      heading2: "out at",
      heading3Time: "06:42",
      description:
        "Every Tuesday, spelt bread comes out of the oven. Ancient flour, nutty flavour, limited quantity. Reservation recommended.",
      badge: "Limited · 40 units",
      dayLabel: "Tuesday",
      productName: "Spelt bread",
      productDescription:
        "Slow 36-hour fermentation, heritage spelt from the Loewenberger estate. Nutty taste, thin crust.",
      priceUnit: "/ 500 g",
      cta: "Reserve my share",
    },
    carte: {
      kicker: "Menu",
      heading1: "Six pieces,",
      heading2: "one conviction.",
      description:
        "Scroll to browse the selection. The full range awaits you at the shop.",
      endKicker: "End of menu",
      endTitle1: "And 36 more,",
      endTitle2: "on the shelf.",
      endCta: "Come by to see us",
      currency: "eur",
    },
    pains: [
      {
        name: "Traditional loaf",
        tag: "Signature",
        note: "Thick crust, airy crumb, baked in a wood oven.",
      },
      {
        name: "Sourdough baguette",
        tag: "Classic",
        note: "24-hour fermentation, local T65 flour.",
      },
      {
        name: "Multigrain loaf",
        tag: "Rustic",
        note: "Sunflower, flax, sesame and poppy.",
      },
      {
        name: "Kougelhopf",
        tag: "Alsace",
        note: "Raisin brioche with roasted almonds.",
      },
      {
        name: "Rye bread",
        tag: "Terroir",
        note: "Pairs with cheese and sauerkraut.",
      },
      {
        name: "Butter brioche",
        tag: "Indulgent",
        note: "Isigny AOP butter, slow proof.",
      },
    ],
    rituel: {
      kicker: "Ritual",
      heading1: "Four gestures,",
      heading2: "zero shortcuts.",
      stepLabel: "Step",
      steps: [
        {
          title: "Flour",
          text: "Two Alsatian mills within 50 km. Heritage wheats stone-ground, delivered every Tuesday.",
        },
        {
          title: "Sourdough",
          text: "A thirty-year-old sourdough starter, refreshed every day. Nutty aromas and long shelf life with no preservatives.",
        },
        {
          title: "Shaping",
          text: "Every piece is weighed, pre-shaped and hand-formed. The craft has been passed down since 1987, across three generations.",
        },
        {
          title: "Baking",
          text: "Wood oven at 250 °C. Steam creates that golden, crackling crust that makes all the difference.",
        },
      ],
    },
    testimonialsSection: {
      kicker: "✶ Voices from the neighbourhood",
      srLabel: "Testimonial",
    },
    testimonials: [
      {
        name: "Camille R.",
        role: "Customer since 2011",
        quote:
          "Tuesday's spelt bread has a nutty flavour you can't find anywhere else in town.",
      },
      {
        name: "Yann D.",
        role: "Chef — L'Épicéa",
        quote:
          "I've been sourcing bread here since I opened my restaurant. Consistency and quality are flawless.",
      },
      {
        name: "Soraya M.",
        role: "Local neighbour",
        quote:
          "You come for the bread, you stay for the free coffee and the advice. A family address.",
      },
    ],
    instagram: {
      kicker: "Instagram",
      handle: "@maisonfarine",
      follow: "Follow the bakery",
    },
    trouver: {
      kicker: "Find us",
      heading1: "Push the door open,",
      heading2: "the coffee is on us.",
      addressLabel: "Address",
      addressLine1: "12 Quai Saint-Martin",
      addressLine2: "67000 Strasbourg, France",
      directions: "Directions",
      phoneLabel: "Phone",
      phoneHint: "To reserve a special loaf or place an order.",
      hoursLabel: "Opening hours",
      horaires: [
        { jour: "Monday", heures: "Closed" },
        { jour: "Tuesday — Friday", heures: "6:30 — 19:30" },
        { jour: "Saturday", heures: "6:30 — 19:00" },
        { jour: "Sunday", heures: "7:00 — 13:00" },
      ],
    },
    footer: {
      brand1: "Maison",
      brand2: "Farine.",
      disclaimerPrefix: "Fictional website created for demo purposes by",
      disclaimerSuffix: ". No shop trades under this name at this address.",
      photosBy: "Photos courtesy of",
      copyright: "© 2026 — Codalyx Demo",
      coords: "Strasbourg · 48°35′N 07°44′E",
    },
    switcher: {
      ariaLabel: "Select language",
    },
  },
};
