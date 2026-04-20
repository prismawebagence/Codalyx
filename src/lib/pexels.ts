import "server-only";

/**
 * Helper serveur pour récupérer photos & vidéos depuis l'API Pexels.
 *
 * - Nécessite la variable d'env `PEXELS_API_KEY` (voir `.env.local`).
 * - Cache agressif : chaque résultat est mis en cache 24h côté Next.js
 *   via `next.revalidate` pour éviter de cramer le quota gratuit (200 req/h).
 * - Fallback silencieux : si l'API échoue ou la clé est absente, renvoie
 *   un objet « vide » plutôt que de crasher la page.
 * - Le contenu Pexels est gratuit pour un usage commercial (cf. licence
 *   Pexels). Le crédit photographe est renvoyé pour permettre l'attribution.
 */

const PHOTO_API = "https://api.pexels.com/v1";
const VIDEO_API = "https://api.pexels.com/videos";

const CACHE_SECONDS = 60 * 60 * 24; // 24h

type Orientation = "landscape" | "portrait" | "square";
type PhotoSize = "large2x" | "large" | "medium" | "small" | "portrait" | "landscape" | "tiny";

export interface PexelsPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  avgColor: string;
  photographer: string;
  photographerUrl: string;
  pexelsUrl: string;
}

export interface PexelsVideo {
  src: string;
  poster: string;
  width: number;
  height: number;
  duration: number;
  photographer: string;
  photographerUrl: string;
  pexelsUrl: string;
}

const EMPTY_PHOTO: PexelsPhoto = {
  src: "",
  alt: "",
  width: 1200,
  height: 800,
  avgColor: "#3D2817",
  photographer: "",
  photographerUrl: "",
  pexelsUrl: "",
};

const EMPTY_VIDEO: PexelsVideo = {
  src: "",
  poster: "",
  width: 1920,
  height: 1080,
  duration: 0,
  photographer: "",
  photographerUrl: "",
  pexelsUrl: "",
};

/* -------------------------------------------------------------- */
/* Raw API types                                                   */
/* -------------------------------------------------------------- */

interface RawPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  alt: string | null;
  avg_color: string;
  src: Record<PhotoSize, string>;
}

interface RawPhotosResponse {
  photos: RawPhoto[];
  total_results: number;
}

interface RawVideoFile {
  id: number;
  quality: "hd" | "sd" | "uhd";
  file_type: string;
  width: number;
  height: number;
  link: string;
}

interface RawVideoPicture {
  id: number;
  picture: string;
}

interface RawVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: { name: string; url: string };
  video_files: RawVideoFile[];
  video_pictures: RawVideoPicture[];
}

interface RawVideosResponse {
  videos: RawVideo[];
  total_results: number;
}

/* -------------------------------------------------------------- */
/* Internals                                                       */
/* -------------------------------------------------------------- */

function apiKey(): string | null {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[pexels] PEXELS_API_KEY manquante — fallback activé");
    }
    return null;
  }
  return key;
}

function mapPhoto(p: RawPhoto, size: PhotoSize): PexelsPhoto {
  return {
    src: p.src[size] ?? p.src.large,
    alt: p.alt || "",
    width: p.width,
    height: p.height,
    avgColor: p.avg_color,
    photographer: p.photographer,
    photographerUrl: p.photographer_url,
    pexelsUrl: p.url,
  };
}

function pickVideoFile(
  files: RawVideoFile[],
  target: "hd" | "sd" = "hd",
): RawVideoFile | undefined {
  // Préférence : mp4 à la qualité demandée, sinon première dispo.
  const mp4 = files.filter((f) => f.file_type === "video/mp4");
  const pool = mp4.length > 0 ? mp4 : files;
  const match = pool.find((f) => f.quality === target);
  if (match) return match;
  return pool[0];
}

function mapVideo(v: RawVideo, quality: "hd" | "sd" = "hd"): PexelsVideo {
  const file = pickVideoFile(v.video_files, quality);
  return {
    src: file?.link ?? "",
    poster: v.image,
    width: file?.width ?? v.width,
    height: file?.height ?? v.height,
    duration: v.duration,
    photographer: v.user.name,
    photographerUrl: v.user.url,
    pexelsUrl: v.url,
  };
}

/* -------------------------------------------------------------- */
/* Public API                                                      */
/* -------------------------------------------------------------- */

export interface GetPhotoOptions {
  orientation?: Orientation;
  size?: PhotoSize;
  /** Index du résultat à retourner (0 = plus pertinent). Permet de varier
   *  les images pour des requêtes voisines. */
  index?: number;
}

/**
 * Récupère une photo depuis une recherche Pexels.
 * Renvoie un objet vide (src: "") si l'API échoue — à la charge de l'appelant
 * d'afficher un fallback visuel (ex: dégradé de couleur).
 */
export async function getPexelsPhoto(
  query: string,
  opts: GetPhotoOptions = {},
): Promise<PexelsPhoto> {
  const { orientation = "landscape", size = "large", index = 0 } = opts;
  const key = apiKey();
  if (!key) return EMPTY_PHOTO;

  const url = new URL(`${PHOTO_API}/search`);
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", String(Math.max(1, index + 1)));

  try {
    const res = await fetch(url, {
      headers: { Authorization: key },
      next: { revalidate: CACHE_SECONDS, tags: ["pexels"] },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: RawPhotosResponse = await res.json();
    const photo = data.photos[index] ?? data.photos[0];
    if (!photo) return EMPTY_PHOTO;
    return mapPhoto(photo, size);
  } catch (err) {
    console.error(`[pexels] getPexelsPhoto("${query}") failed:`, err);
    return EMPTY_PHOTO;
  }
}

export interface GetPhotosOptions {
  orientation?: Orientation;
  size?: PhotoSize;
}

/**
 * Récupère plusieurs photos pour une même requête (galerie, mosaïque, etc.).
 * Complète avec des fallbacks si l'API renvoie moins de résultats que demandé.
 */
export async function getPexelsPhotos(
  query: string,
  count: number,
  opts: GetPhotosOptions = {},
): Promise<PexelsPhoto[]> {
  const { orientation = "landscape", size = "large" } = opts;
  const key = apiKey();
  if (!key) return Array.from({ length: count }, () => EMPTY_PHOTO);

  const url = new URL(`${PHOTO_API}/search`);
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", String(count));

  try {
    const res = await fetch(url, {
      headers: { Authorization: key },
      next: { revalidate: CACHE_SECONDS, tags: ["pexels"] },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: RawPhotosResponse = await res.json();
    const mapped = data.photos.map((p) => mapPhoto(p, size));
    while (mapped.length < count) mapped.push(EMPTY_PHOTO);
    return mapped.slice(0, count);
  } catch (err) {
    console.error(`[pexels] getPexelsPhotos("${query}") failed:`, err);
    return Array.from({ length: count }, () => EMPTY_PHOTO);
  }
}

export interface GetVideoOptions {
  orientation?: Orientation;
  quality?: "hd" | "sd";
  index?: number;
}

/**
 * Récupère une vidéo depuis une recherche Pexels.
 * Idéal pour un background vidéo de hero.
 */
export async function getPexelsVideo(
  query: string,
  opts: GetVideoOptions = {},
): Promise<PexelsVideo> {
  const { orientation = "landscape", quality = "hd", index = 0 } = opts;
  const key = apiKey();
  if (!key) return EMPTY_VIDEO;

  const url = new URL(`${VIDEO_API}/search`);
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", String(Math.max(1, index + 1)));

  try {
    const res = await fetch(url, {
      headers: { Authorization: key },
      next: { revalidate: CACHE_SECONDS, tags: ["pexels"] },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: RawVideosResponse = await res.json();
    const video = data.videos[index] ?? data.videos[0];
    if (!video) return EMPTY_VIDEO;
    return mapVideo(video, quality);
  } catch (err) {
    console.error(`[pexels] getPexelsVideo("${query}") failed:`, err);
    return EMPTY_VIDEO;
  }
}

/**
 * Style inline pratique pour afficher un fallback coloré lorsqu'une photo
 * est manquante (src vide). À utiliser côté composant :
 *   <img src={photo.src || undefined} style={{ backgroundColor: photo.avgColor }} />
 */
export function photoFallbackStyle(photo: PexelsPhoto): React.CSSProperties {
  return { backgroundColor: photo.avgColor };
}
