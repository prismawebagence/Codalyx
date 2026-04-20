import { getPexelsPhotos } from "@/lib/pexels";
import CatalogueClient from "./CatalogueClient";

export const revalidate = 86400;

export default async function CataloguePage() {
  const productImages = await getPexelsPhotos("wine bottle dark elegant luxury", 9, {
    orientation: "portrait",
    size: "large",
  });

  return <CatalogueClient productImages={productImages} />;
}
