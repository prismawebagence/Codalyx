import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://codalyx.fr";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/offres`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/offres/vitrine`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/offres/business`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/offres/pro`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/realisations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
