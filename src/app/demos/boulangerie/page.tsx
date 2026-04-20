import { getPexelsPhoto, getPexelsPhotos } from "@/lib/pexels";
import BoulangerieClient from "./BoulangerieClient";

// Re-valide toutes les 24h — les photos Pexels n'ont pas besoin d'être fraîches.
export const revalidate = 86400;

/**
 * Server Component : fait tous les appels Pexels en parallèle et passe les
 * photos au Client Component. Chaque query est choisie pour coller au mieux
 * au contexte visuel du slot (cf. mapping ci-dessous).
 */
export default async function BoulangeriePage() {
  const [
    heroSideImage,
    fourneeImage,
    painTradition,
    baguetteLevain,
    painCereales,
    kougelhopf,
    painSeigle,
    briochePurBeurre,
    farineImage,
    levainImage,
    faconnageImage,
    cuissonImage,
    galleryImages,
  ] = await Promise.all([
    // Hero : brioche dorée en format portrait
    getPexelsPhoto("golden brioche bread", { orientation: "portrait" }),
    // Fournée du jour : pain rustique en gros plan
    getPexelsPhoto("rustic bread loaf", { orientation: "landscape" }),
    // Six pains de la carte — chaque query est spécifique au produit
    getPexelsPhoto("artisan bread", { orientation: "portrait", index: 0 }),
    getPexelsPhoto("french baguette", { orientation: "portrait", index: 0 }),
    getPexelsPhoto("multigrain bread", { orientation: "portrait", index: 0 }),
    getPexelsPhoto("brioche pastry", { orientation: "portrait", index: 1 }),
    getPexelsPhoto("rye bread", { orientation: "portrait", index: 0 }),
    getPexelsPhoto("brioche butter", { orientation: "portrait", index: 0 }),
    // Quatre étapes du rituel
    getPexelsPhoto("flour mill grain", { orientation: "landscape" }),
    getPexelsPhoto("sourdough starter", { orientation: "landscape" }),
    getPexelsPhoto("baker kneading dough", { orientation: "landscape" }),
    getPexelsPhoto("wood fire oven bread", { orientation: "landscape" }),
    // Galerie Instagram : 6 photos variées
    getPexelsPhotos("bakery artisan", 6, { orientation: "square" }),
  ]);

  const painImages = [
    painTradition,
    baguetteLevain,
    painCereales,
    kougelhopf,
    painSeigle,
    briochePurBeurre,
  ];

  const processImages = [farineImage, levainImage, faconnageImage, cuissonImage];

  return (
    <BoulangerieClient
      heroSideImage={heroSideImage}
      fourneeImage={fourneeImage}
      painImages={painImages}
      processImages={processImages}
      galleryImages={galleryImages}
    />
  );
}
