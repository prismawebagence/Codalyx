export type Region = "alsace" | "bourgogne" | "bordeaux" | "champagne";

export type Product = {
  id: number;
  nom: string;
  domaine: string;
  appellation: string;
  millesime: number;
  region: Region;
  cepages: string;
  prix: number;
  notation: number;
  badge: string | null;
  description: string;
  accord: string;
};

export type CartItem = { product: Product; qty: number };

export const PRODUCTS: Product[] = [
  {
    id: 1,
    nom: "Riesling Grand Cru Schlossberg",
    domaine: "Domaine Weinbach",
    appellation: "Alsace Grand Cru",
    millesime: 2020,
    region: "alsace",
    cepages: "Riesling",
    prix: 68,
    notation: 4.8,
    badge: "Coup de Cœur",
    description:
      "Né sur les pentes granitiques du Grand Cru Schlossberg, ce Riesling déploie une minéralité d'une pureté saisissante. Chaque gorgée révèle l'âme d'un terroir millénaire sculpté par les glaciers alsaciens.",
    accord: "Foie gras, poisson en sauce, fromages affinés",
  },
  {
    id: 2,
    nom: "Gewurztraminer Vendanges Tardives",
    domaine: "Maison Trimbach",
    appellation: "Alsace",
    millesime: 2018,
    region: "alsace",
    cepages: "Gewurztraminer",
    prix: 89,
    notation: 4.9,
    badge: "Médaille d'Or",
    description:
      "Quintessence de la rose et du litchi alsacien. Ce Gewurztraminer de vendanges tardives conjugue richesse sucrée et fraîcheur aromatique dans un équilibre d'une rare élégance.",
    accord: "Foie gras poêlé, desserts à la rose, munster",
  },
  {
    id: 3,
    nom: "Crémant d'Alsace Brut Prestige",
    domaine: "Dopff au Moulin",
    appellation: "Crémant d'Alsace",
    millesime: 2021,
    region: "alsace",
    cepages: "Pinot Blanc, Auxerrois",
    prix: 24,
    notation: 4.5,
    badge: null,
    description:
      "Effervescence soyeuse aux arômes de pomme verte et de brioche fraîche. Élaboré en méthode traditionnelle depuis 1900 dans la famille Dopff, ce Crémant incarne la fête alsacienne.",
    accord: "Apéritif, saumon fumé, tarte flambée",
  },
  {
    id: 4,
    nom: "Gevrey-Chambertin 1er Cru Les Cazetiers",
    domaine: "Domaine Faiveley",
    appellation: "Gevrey-Chambertin 1er Cru",
    millesime: 2019,
    region: "bourgogne",
    cepages: "Pinot Noir",
    prix: 145,
    notation: 4.9,
    badge: "Prestige",
    description:
      "Les Cazetiers révèle la noblesse absolue du Pinot Noir en Côte de Nuits. Cerise noire, sous-bois, truffe : un vin de méditation aux tanins soyeux qui se bonifiera encore quinze ans.",
    accord: "Coq au vin, gibier à plume, fromages de Bourgogne",
  },
  {
    id: 5,
    nom: "Meursault Les Charmes 1er Cru",
    domaine: "Domaine Matrot",
    appellation: "Meursault 1er Cru",
    millesime: 2020,
    region: "bourgogne",
    cepages: "Chardonnay",
    prix: 98,
    notation: 4.7,
    badge: null,
    description:
      "Le Meursault par excellence — beurre noisette, amande grillée et citron confit tissent une trame d'une opulence retenue. L'élégance bourguignonne exprimée avec une justesse absolue.",
    accord: "Homard, Saint-Jacques, volaille à la crème",
  },
  {
    id: 6,
    nom: "Chablis Grand Cru Valmur",
    domaine: "Domaine Raveneau",
    appellation: "Chablis Grand Cru",
    millesime: 2021,
    region: "bourgogne",
    cepages: "Chardonnay",
    prix: 185,
    notation: 5.0,
    badge: "Exclusivité",
    description:
      "Raveneau en Valmur — une rareté absolue. Minéralité crayeuse d'une intensité spectaculaire, citron de Menton, huître fraîche. L'archétype du grand Chablis, introuvable ailleurs.",
    accord: "Huîtres, turbot, fruits de mer",
  },
  {
    id: 7,
    nom: "Saint-Émilion Grand Cru Classé",
    domaine: "Château Pavie Macquin",
    appellation: "Saint-Émilion Grand Cru",
    millesime: 2018,
    region: "bordeaux",
    cepages: "Merlot, Cabernet Franc",
    prix: 78,
    notation: 4.7,
    badge: null,
    description:
      "Sur les argiles érodées de Saint-Émilion, ce Grand Cru exprime la rondeur charnelle du Merlot sublimée par la vivacité du Cabernet Franc. Un 2018 de belle structure et de longue garde.",
    accord: "Côte de bœuf, agneau rôti, truffe noire",
  },
  {
    id: 8,
    nom: "Pessac-Léognan Blanc",
    domaine: "Domaine de Chevalier",
    appellation: "Pessac-Léognan",
    millesime: 2020,
    region: "bordeaux",
    cepages: "Sauvignon Blanc, Sémillon",
    prix: 62,
    notation: 4.6,
    badge: "Coup de Cœur",
    description:
      "Chevalier Blanc réunit fumé, pamplemousse et fleurs blanches avec une précision chirurgicale. Le blanc de Pessac le plus gastronomique du millésime, à ouvrir sur dix ans.",
    accord: "Langoustines, sole meunière, chèvre frais",
  },
  {
    id: 9,
    nom: "Blanc de Blancs Grand Cru Millésimé",
    domaine: "Champagne Salon",
    appellation: "Champagne",
    millesime: 2013,
    region: "champagne",
    cepages: "Chardonnay 100 %",
    prix: 420,
    notation: 5.0,
    badge: "Icône",
    description:
      "Le Graal des amateurs de Champagne. Salon ne produit que dans les grandes années. Ce 2013 déploie une tension minérale et une profondeur aromatique d'une grandeur absolue et irréductible.",
    accord: "Caviar, homard, tartare de Saint-Jacques",
  },
];

export const REGIONS: {
  id: Region;
  label: string;
  sub: string;
  count: number;
  color: string;
}[] = [
  { id: "alsace", label: "Alsace", sub: "Riesling · Gewurztraminer · Crémant", count: 3, color: "#8B6914" },
  { id: "bourgogne", label: "Bourgogne", sub: "Pinot Noir · Chardonnay · Chablis", count: 3, color: "#722F37" },
  { id: "bordeaux", label: "Bordeaux", sub: "Merlot · Cabernet · Sauvignon", count: 2, color: "#4A1C1C" },
  { id: "champagne", label: "Champagne", sub: "Blanc de Blancs · Rosé · Vintage", count: 1, color: "#5C4A1A" },
];

export const EVENTS: {
  date: string;
  title: string;
  description: string;
  prix: number;
  places: number;
  duree: string;
}[] = [
  {
    date: "12 Mai 2026",
    title: "Grande Dégustation Alsace",
    description: "20 cuvées de Riesling et Gewurztraminer en présence des domaines producteurs.",
    prix: 45,
    places: 8,
    duree: "3h",
  },
  {
    date: "26 Mai 2026",
    title: "Soirée Bourgognes Rouges",
    description: "Voyage sensoriel de Gevrey-Chambertin à Pommard, millésimes 2018 à 2022.",
    prix: 85,
    places: 12,
    duree: "2h30",
  },
  {
    date: "7 Juin 2026",
    title: "Champagnes de Vignerons",
    description: "La réconciliation avec le champagne artisan — 15 maisons indépendantes.",
    prix: 60,
    places: 3,
    duree: "2h",
  },
];
