import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | WebCraft Studio",
  description: "Mentions légales du site WebCraft Studio, agence web à Strasbourg.",
};

export default function MentionsLegales() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
        <h1 className="font-heading text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
          Mentions légales
        </h1>

        <h2 className="mt-10 font-heading text-xl font-semibold text-[#0A0A0A]">
          Éditeur du site
        </h2>
        <p className="mt-3 text-[#6B7280] leading-relaxed">
          <strong className="text-[#0A0A0A]">WebCraft Studio</strong><br />
          SIRET : [à compléter]<br />
          15 Place Kléber, 67000 Strasbourg, France<br />
          Téléphone : 03 88 00 00 00<br />
          E-mail : contact@webcraft-studio.fr
        </p>

        <h2 className="mt-10 font-heading text-xl font-semibold text-[#0A0A0A]">
          Directeur de la publication
        </h2>
        <p className="mt-3 text-[#6B7280]">[À compléter]</p>

        <h2 className="mt-10 font-heading text-xl font-semibold text-[#0A0A0A]">
          Hébergeur
        </h2>
        <p className="mt-3 text-[#6B7280] leading-relaxed">
          Vercel Inc.<br />
          340 S Lemon Ave #4133<br />
          Walnut, CA 91789, États-Unis<br />
          https://vercel.com
        </p>

        <h2 className="mt-10 font-heading text-xl font-semibold text-[#0A0A0A]">
          Propriété intellectuelle
        </h2>
        <p className="mt-3 text-[#6B7280] leading-relaxed">
          L&apos;ensemble des contenus de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de WebCraft Studio ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite sauf autorisation écrite préalable.
        </p>

        <h2 className="mt-10 font-heading text-xl font-semibold text-[#0A0A0A]">
          Protection des données personnelles
        </h2>
        <p className="mt-3 text-[#6B7280] leading-relaxed">
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données personnelles. Pour exercer ces droits, contactez-nous à contact@webcraft-studio.fr. Pour plus d&apos;informations, consultez notre politique de confidentialité.
        </p>

        <h2 className="mt-10 font-heading text-xl font-semibold text-[#0A0A0A]">
          Cookies
        </h2>
        <p className="mt-3 text-[#6B7280] leading-relaxed">
          Ce site n&apos;utilise pas de cookies de suivi publicitaire. Seuls des cookies techniques strictement nécessaires au bon fonctionnement du site peuvent être utilisés. Aucune donnée personnelle n&apos;est collectée à des fins de profilage.
        </p>

        <h2 className="mt-10 font-heading text-xl font-semibold text-[#0A0A0A]">
          Limitation de responsabilité
        </h2>
        <p className="mt-3 text-[#6B7280] leading-relaxed">
          WebCraft Studio s&apos;efforce de fournir des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour. WebCraft Studio décline toute responsabilité pour les dommages résultant de l&apos;utilisation de ce site.
        </p>
      </div>
    </section>
  );
}
