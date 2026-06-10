/**
 * Symbole PrismaWeb : un prisme triangulaire qui réfracte un faisceau
 * lumineux en spectre. Conçu pour fond sombre (boîte noire du header,
 * footer, favicon). Aucune lettre — la marque reste lisible à 16 px.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {/* Prisme */}
      <path
        d="M 24 9.5 L 36.5 35 L 11.5 35 Z"
        fill="#FFFFFF"
        fillOpacity="0.07"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      {/* Faisceau incident */}
      <path d="M 4 26 L 11.5 26" stroke="#FF6B2C" strokeWidth="3.4" strokeLinecap="round" />
      {/* Spectre réfracté */}
      <path d="M 33.8 19.65 L 43.5 13.5" stroke="#FF6B2C" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M 34.5 22 L 44 22" stroke="#FF6B2C" strokeOpacity="0.6" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M 33.8 24.35 L 43.5 30.5" stroke="#FF6B2C" strokeOpacity="0.32" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
