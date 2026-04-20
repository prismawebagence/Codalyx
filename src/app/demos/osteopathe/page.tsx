import { getPexelsPhoto, getPexelsPhotos } from "@/lib/pexels";
import OsteopatheClient from "./OsteopatheClient";

export const revalidate = 86400;

export default async function OsteopathePage() {
  const [praticienImage, cabinetGallery] = await Promise.all([
    getPexelsPhoto("female therapist portrait white coat", {
      orientation: "portrait",
    }),
    getPexelsPhotos("minimalist wellness clinic interior plants", 4, {
      orientation: "landscape",
    }),
  ]);

  return (
    <OsteopatheClient
      praticienImage={praticienImage}
      cabinetGallery={cabinetGallery}
    />
  );
}
