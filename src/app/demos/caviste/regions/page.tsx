import { getPexelsPhoto } from "@/lib/pexels";
import RegionsClient from "./RegionsClient";

export const revalidate = 86400;

export default async function RegionsPage() {
  const cellarImage = await getPexelsPhoto("wine cellar cave stone dark bottles", {
    orientation: "landscape",
  });

  return <RegionsClient cellarImage={cellarImage} />;
}
