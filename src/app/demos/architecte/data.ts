/**
 * Source de vérité de la démo « Atelier Vauban ».
 *
 * Cabinet d'architecture FICTIF servant à illustrer l'offre Pack Pro de
 * PrismaWeb (multi-pages, journal/blog, prise de RDV, animations). Toutes les
 * données — projets, articles, équipe — sont inventées. Les images proviennent
 * de picsum.photos (seeds déterministes pour rester stables entre les builds).
 */

export const STUDIO = {
  name: "Atelier Vauban",
  signature: "Architecture & Territoire",
  city: "Strasbourg",
  foundedYear: 2009,
  email: "contact@atelier-vauban.fr",
  phone: "+33 3 88 47 12 09",
  phoneDisplay: "03 88 47 12 09",
  address: "14 quai des Bateliers, 67000 Strasbourg",
  baseline:
    "Nous concevons des lieux qui tiennent dans le temps — sobres, ancrés dans leur territoire, justes dans leurs matériaux.",
} as const;

/** Image picsum déterministe. `grayscale` donne le rendu monographie d'archi. */
export function img(seed: string, w: number, h: number, grayscale = false): string {
  const q = grayscale ? "?grayscale" : "";
  return `https://picsum.photos/seed/av-${seed}/${w}/${h}${q}`;
}

/* ------------------------------------------------------------------ */
/* Projets                                                             */
/* ------------------------------------------------------------------ */

export type ProjectCategory =
  | "Résidentiel"
  | "Tertiaire"
  | "Équipement public"
  | "Réhabilitation";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  year: number;
  location: string;
  surface: string;
  status: "Livré" | "En chantier" | "Concours lauréat";
  client: string;
  mission: string;
  /** Phrase d'accroche affichée en survol de la grille. */
  summary: string;
  /** Paragraphes du corps de la fiche projet. */
  body: string[];
  /** Données chiffrées affichées en colonne sur la fiche. */
  facts: { label: string; value: string }[];
  coverSeed: string;
  gallerySeeds: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "maison-ill",
    name: "Maison sur l'Ill",
    category: "Résidentiel",
    year: 2024,
    location: "La Robertsau, Strasbourg",
    surface: "190 m²",
    status: "Livré",
    client: "Famille Roederer",
    mission: "Conception complète, suivi de chantier",
    summary:
      "Une maison de brique et de chêne posée au bord de l'eau, ouverte plein sud sur le jardin.",
    body: [
      "Sur une parcelle étroite bordant l'Ill, la maison s'étire en deux volumes décalés reliés par une faille vitrée. Le décalage libère une cour d'entrée protégée et cadre, depuis le séjour, une vue continue sur la rive.",
      "La brique de parement, posée à joints creux, dialogue avec les villas anciennes du quartier. À l'intérieur, le chêne massif et le béton ciré tempèrent la lumière du Nord.",
      "Le projet vise le label BBC rénovation : isolation biosourcée, ventilation double flux et une casquette béton qui protège les baies du sud en été tout en laissant entrer le soleil rasant d'hiver.",
    ],
    facts: [
      { label: "Surface", value: "190 m²" },
      { label: "Livraison", value: "Mars 2024" },
      { label: "Performance", value: "BBC rénovation" },
      { label: "Structure", value: "Brique & chêne" },
    ],
    coverSeed: "maison-ill-cover",
    gallerySeeds: ["maison-ill-1", "maison-ill-2", "maison-ill-3"],
  },
  {
    slug: "halles-krutenau",
    name: "Halles de la Krutenau",
    category: "Réhabilitation",
    year: 2023,
    location: "Krutenau, Strasbourg",
    surface: "1 240 m²",
    status: "Livré",
    client: "Ville de Strasbourg",
    mission: "Réhabilitation lourde, scénographie des espaces communs",
    summary:
      "Un ancien entrepôt de 1911 transformé en halle gourmande, charpente d'origine révélée.",
    body: [
      "L'entrepôt de douane, vacant depuis vingt ans, conservait une charpente métallique rivetée d'une grande finesse. Tout le projet a consisté à la dégager, la restaurer et la donner à voir.",
      "Une mezzanine en acier brut, volontairement détachée des murs existants, accueille les espaces de travail partagés. Les réseaux restent apparents, peints d'un gris graphite uniforme qui unifie l'ensemble.",
      "Le sol en béton poli intègre les anciennes voies de roulement comme une trace archéologique. L'éclairage, suspendu très bas sur les tables, laisse la halle dans une pénombre chaleureuse.",
    ],
    facts: [
      { label: "Surface", value: "1 240 m²" },
      { label: "Année", value: "2023" },
      { label: "Édifice", value: "Entrepôt 1911" },
      { label: "Distinction", value: "Prix Rénovation Grand Est" },
    ],
    coverSeed: "halles-cover",
    gallerySeeds: ["halles-1", "halles-2", "halles-3"],
  },
  {
    slug: "groupe-scolaire-ostwald",
    name: "Groupe scolaire des Vergers",
    category: "Équipement public",
    year: 2025,
    location: "Ostwald",
    surface: "3 600 m²",
    status: "En chantier",
    client: "Commune d'Ostwald",
    mission: "Concours lauréat, maîtrise d'œuvre complète",
    summary:
      "Une école bas carbone en ossature bois, organisée autour d'un patio planté.",
    body: [
      "Le programme réunit douze classes, un périscolaire et un restaurant autour d'un patio central. Ce vide planté devient le cœur climatique du bâtiment : il ventile, éclaire et oriente les déplacements des enfants.",
      "La structure est entièrement en bois lamellé-collé du massif vosgien, préfabriquée en atelier pour réduire la durée du chantier en site occupé. Les façades mêlent bardage mélèze et panneaux de terre crue.",
      "Le projet vise le niveau E3C2 du label énergie-carbone. Les eaux de pluie sont infiltrées sur place et la toiture accueille 600 m² de panneaux photovoltaïques.",
    ],
    facts: [
      { label: "Surface", value: "3 600 m²" },
      { label: "Livraison", value: "Rentrée 2026" },
      { label: "Structure", value: "Bois lamellé-collé" },
      { label: "Label visé", value: "E3C2" },
    ],
    coverSeed: "ecole-cover",
    gallerySeeds: ["ecole-1", "ecole-2", "ecole-3"],
  },
  {
    slug: "siege-meunier",
    name: "Siège social Meunier & Fils",
    category: "Tertiaire",
    year: 2024,
    location: "Illkirch-Graffenstaden",
    surface: "2 100 m²",
    status: "Livré",
    client: "Groupe Meunier",
    mission: "Conception, design intérieur, signalétique",
    summary:
      "Un siège tertiaire en béton matricé, pensé pour le travail hybride et la lumière naturelle.",
    body: [
      "Pour cette entreprise familiale de négoce, le bâtiment devait incarner la solidité sans ostentation. La façade en béton matricé, rythmée par de profonds tableaux, protège les bureaux de la surchauffe.",
      "Le plateau de travail s'organise sans cloisons, autour de trois patios qui amènent la lumière au cœur du volume. Une rue intérieure relie l'accueil, la cafétéria et les salles de réunion.",
      "Le mobilier, dessiné sur mesure en frêne et acier laqué, prolonge l'écriture architecturale jusqu'au détail. Toute la signalétique a été gravée dans le béton à la livraison.",
    ],
    facts: [
      { label: "Surface", value: "2 100 m²" },
      { label: "Année", value: "2024" },
      { label: "Façade", value: "Béton matricé" },
      { label: "Postes", value: "120 collaborateurs" },
    ],
    coverSeed: "siege-cover",
    gallerySeeds: ["siege-1", "siege-2", "siege-3"],
  },
  {
    slug: "mediatheque-neudorf",
    name: "Médiathèque du Neudorf",
    category: "Équipement public",
    year: 2022,
    location: "Neudorf, Strasbourg",
    surface: "2 800 m²",
    status: "Concours lauréat",
    client: "Eurométropole de Strasbourg",
    mission: "Concours lauréat 2022, études en cours",
    summary:
      "Une médiathèque-jardin en gradins, où chaque palier ouvre sur une terrasse de lecture.",
    body: [
      "Implantée à l'angle d'un square, la médiathèque se déploie en gradins successifs qui rattrapent la pente du terrain. Chaque niveau de lecture s'ouvre sur une terrasse plantée, prolongeant le parc à l'intérieur.",
      "La structure mixte bois-béton laisse de grandes portées libres, modulables au fil des usages. Les rayonnages, mobiles, peuvent s'effacer pour accueillir lectures publiques et ateliers.",
      "La peau extérieure, en céramique émaillée vert pâle, change de teinte selon la lumière. Le soir, le bâtiment devient une lanterne visible depuis l'avenue.",
    ],
    facts: [
      { label: "Surface", value: "2 800 m²" },
      { label: "Concours", value: "Lauréat 2022" },
      { label: "Structure", value: "Mixte bois-béton" },
      { label: "Vêture", value: "Céramique émaillée" },
    ],
    coverSeed: "mediatheque-cover",
    gallerySeeds: ["mediatheque-1", "mediatheque-2", "mediatheque-3"],
  },
  {
    slug: "loft-tanneurs",
    name: "Loft des Tanneurs",
    category: "Réhabilitation",
    year: 2023,
    location: "Petite France, Strasbourg",
    surface: "145 m²",
    status: "Livré",
    client: "Collection privée",
    mission: "Architecture intérieure, mobilier sur mesure",
    summary:
      "La transformation d'un ancien séchoir à peaux en loft, colombages d'époque assumés.",
    body: [
      "Sous les combles d'une maison à colombages classée, l'enjeu était de loger un appartement contemporain sans toucher à la charpente protégée. Tout le projet flotte à l'intérieur de cette structure de chêne.",
      "Un bloc en chêne clair regroupe cuisine, rangements et escalier, libérant le reste du volume. Les pans de bois anciens, simplement brossés, restent partout visibles.",
      "Le verre et le laiton patiné apportent une note précieuse, en contrepoint de la rudesse du bâti d'origine.",
    ],
    facts: [
      { label: "Surface", value: "145 m²" },
      { label: "Année", value: "2023" },
      { label: "Édifice", value: "Colombage classé" },
      { label: "Matériaux", value: "Chêne & laiton" },
    ],
    coverSeed: "loft-cover",
    gallerySeeds: ["loft-1", "loft-2", "loft-3"],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Résidentiel",
  "Tertiaire",
  "Équipement public",
  "Réhabilitation",
];

/* ------------------------------------------------------------------ */
/* Expertises                                                          */
/* ------------------------------------------------------------------ */

export interface Expertise {
  index: string;
  title: string;
  description: string;
}

export const EXPERTISES: Expertise[] = [
  {
    index: "01",
    title: "Logement & maison individuelle",
    description:
      "De l'extension à la villa, nous dessinons des lieux de vie justes, lumineux et frugaux en énergie.",
  },
  {
    index: "02",
    title: "Équipements publics",
    description:
      "Écoles, médiathèques, équipements sportifs — nous portons des concours exigeants du programme à la livraison.",
  },
  {
    index: "03",
    title: "Tertiaire & lieux de travail",
    description:
      "Sièges et bureaux pensés pour le travail hybride, le confort et une identité bâtie durable.",
  },
  {
    index: "04",
    title: "Réhabilitation patrimoniale",
    description:
      "Transformer l'existant plutôt que démolir : c'est notre conviction et la part la plus vivante de notre travail.",
  },
];

/* ------------------------------------------------------------------ */
/* Démarche                                                            */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS: ProcessStep[] = [
  {
    step: "Écoute",
    title: "Comprendre le lieu et l'usage",
    description:
      "Visite du site, analyse du territoire, entretiens. Avant de dessiner, nous écoutons longuement.",
  },
  {
    step: "Esquisse",
    title: "Poser une intention claire",
    description:
      "Une idée forte, défendue en quelques traits et une maquette. Tout le projet en découle.",
  },
  {
    step: "Études",
    title: "Construire chaque détail",
    description:
      "Du permis de construire au dossier d'exécution, nous précisons matériaux, structure et économie.",
  },
  {
    step: "Chantier",
    title: "Tenir l'exigence jusqu'au bout",
    description:
      "Présents chaque semaine sur le terrain, nous veillons à ce que le bâti tienne la promesse du dessin.",
  },
];

/* ------------------------------------------------------------------ */
/* Équipe                                                              */
/* ------------------------------------------------------------------ */

export interface Member {
  name: string;
  role: string;
  bio: string;
  photoSeed: string;
}

export const TEAM: Member[] = [
  {
    name: "Inès Delaunay",
    role: "Architecte HMONP · Cofondatrice",
    bio: "Diplômée de l'ENSA Strasbourg, elle dirige les projets publics et défend une architecture du climat.",
    photoSeed: "team-ines",
  },
  {
    name: "Thibault Roederer",
    role: "Architecte DE · Cofondateur",
    bio: "Passé par Bâle et Copenhague, il pilote la construction bois et le rapport au détail constructif.",
    photoSeed: "team-thibault",
  },
  {
    name: "Naïma Bensaïd",
    role: "Cheffe de projet",
    bio: "Spécialiste de la réhabilitation patrimoniale, elle fait le lien entre l'atelier et les compagnons.",
    photoSeed: "team-naima",
  },
  {
    name: "Lucas Wertheimer",
    role: "Architecte d'intérieur",
    bio: "Il dessine les espaces intérieurs et le mobilier sur mesure, du séjour privé au siège tertiaire.",
    photoSeed: "team-lucas",
  },
];

/* ------------------------------------------------------------------ */
/* Chiffres                                                            */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 16, suffix: " ans", label: "à concevoir en Alsace" },
  { value: 84, suffix: "", label: "projets livrés" },
  { value: 7, suffix: "", label: "concours remportés" },
  { value: 92, suffix: " %", label: "de clients qui nous recommandent" },
];

/* ------------------------------------------------------------------ */
/* Journal (blog)                                                      */
/* ------------------------------------------------------------------ */

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateDisplay: string;
  readingTime: string;
  excerpt: string;
  coverSeed: string;
  body: string[];
}

export const JOURNAL: Article[] = [
  {
    slug: "construire-en-terre-crue",
    title: "Construire en terre crue, vraiment ?",
    category: "Matériaux",
    date: "2026-04-18",
    dateDisplay: "18 avril 2026",
    readingTime: "6 min",
    excerpt:
      "On la croit réservée aux maisons anciennes. La terre crue revient pourtant dans nos équipements publics — et voici pourquoi.",
    coverSeed: "journal-terre",
    body: [
      "La terre crue n'a rien d'une lubie passéiste. Disponible souvent sur le site même du chantier, elle se passe de cuisson, donc de carbone. Sa capacité à réguler l'humidité et la température en fait un matériau de confort autant que de structure.",
      "Sur le groupe scolaire d'Ostwald, nous l'employons en panneaux préfabriqués pour les façades intérieures. Le défi n'est pas technique mais culturel : il faut réapprendre des gestes, convaincre les bureaux de contrôle, documenter chaque mise en œuvre.",
      "Notre conviction : la sobriété n'est pas une contrainte esthétique, c'est une source de formes nouvelles. La terre impose ses épaisseurs, ses teintes, sa lumière — et le bâtiment s'en trouve plus juste.",
    ],
  },
  {
    slug: "rehabiliter-plutot-que-demolir",
    title: "Réhabiliter plutôt que démolir",
    category: "Engagement",
    date: "2026-03-02",
    dateDisplay: "2 mars 2026",
    readingTime: "5 min",
    excerpt:
      "Le bâtiment le plus écologique est celui qui existe déjà. Retour sur la transformation des Halles de la Krutenau.",
    coverSeed: "journal-rehab",
    body: [
      "Démolir un bâtiment, c'est jeter l'énergie grise qu'il contient — celle qu'il a fallu pour extraire, transporter et assembler chacun de ses matériaux. Réhabiliter, c'est conserver ce capital.",
      "Aux Halles de la Krutenau, nous avons fait le choix de tout garder : charpente, murs, dalles. Le projet s'est écrit en creux, par soustraction, en révélant l'existant plutôt qu'en le recouvrant.",
      "Ce travail demande une autre posture : l'architecte devient archéologue avant d'être dessinateur. Il s'agit d'écouter ce que le bâtiment a à dire, puis d'ajouter le strict nécessaire.",
    ],
  },
  {
    slug: "la-lumiere-comme-materiau",
    title: "La lumière comme matériau",
    category: "Conception",
    date: "2026-01-21",
    dateDisplay: "21 janvier 2026",
    readingTime: "4 min",
    excerpt:
      "Avant la brique ou le bois, le premier matériau d'un projet est la lumière. Comment nous la mettons en plan.",
    coverSeed: "journal-lumiere",
    body: [
      "Orienter une pièce, dimensionner une baie, creuser un patio : chaque geste de plan est d'abord une décision sur la lumière. C'est elle qui rend un espace habitable bien avant le mobilier.",
      "Nous travaillons très tôt en maquette, sous une lampe qui simule la course du soleil. Voir une ombre se déplacer sur un plâtre en dit plus long qu'un rendu photoréaliste.",
      "La belle lumière n'est pas la plus abondante mais la plus maîtrisée : un rayon cadré, un mur qui la reçoit, une pénombre pour la faire exister.",
    ],
  },
  {
    slug: "dessiner-pour-les-enfants",
    title: "Dessiner une école pour les enfants",
    category: "Projet",
    date: "2025-12-09",
    dateDisplay: "9 décembre 2025",
    readingTime: "7 min",
    excerpt:
      "Hauteur des poignées, échelle des fenêtres, refuges pour souffler : concevoir un lieu vu d'un mètre vingt.",
    coverSeed: "journal-ecole",
    body: [
      "Concevoir une école, c'est changer de point de vue — littéralement. Tout se rejoue à hauteur d'enfant : la poignée, l'appui de fenêtre, le banc où l'on attend.",
      "Au groupe scolaire des Vergers, nous avons multiplié les seuils et les recoins : des endroits où un enfant peut se mettre légèrement à l'écart sans jamais quitter le regard de l'adulte.",
      "Le patio central organise tout. C'est à la fois le poumon climatique du bâtiment et le repère qui permet à un enfant de six ans de toujours savoir où il se trouve.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return JOURNAL.find((a) => a.slug === slug);
}
