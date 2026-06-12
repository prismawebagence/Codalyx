import HomeClient from "./HomeClient";

/**
 * Hero : image locale fournie par le client (servie depuis /public, même
 * origine — fiable, sans optimiseur réseau). Le CTA reste sur une photo
 * Pexels libre de droits, chargée en direct par le navigateur.
 */
const HERO_IMG = "/demos/architecte/hero.jpg";
const CTA_IMG =
  "https://images.pexels.com/photos/4161846/pexels-photo-4161846.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function ArchitectePage() {
  return <HomeClient heroSrc={HERO_IMG} ctaSrc={CTA_IMG} />;
}
