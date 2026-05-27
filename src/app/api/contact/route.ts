import { z } from "zod";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000; // 16 KB suffit largement
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 soumissions / minute / IP

// Rate limit en mémoire — suffisant pour un site vitrine sur un seul nœud.
// Pour scaler horizontalement, brancher Upstash Redis ou @vercel/firewall.
const ipHits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.reset) {
    ipHits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z
    .string()
    .max(30)
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/u)
    .or(z.literal(""))
    .optional(),
  projectType: z.enum(["vitrine", "business", "pro", "maintenance", "autre"]),
  message: z.string().min(10).max(5_000),
  // Honeypot — un bot rempli ce champ, un humain non.
  website: z.string().max(0).optional().or(z.literal("")),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // 1. Content-Type — refuse les formulaires HTML cross-origin
  const ct = request.headers.get("content-type") || "";
  if (!ct.toLowerCase().includes("application/json")) {
    return NextResponse.json({ success: false }, { status: 415 });
  }

  // 2. Origin — refuse les requêtes cross-origin non explicitement autorisées
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.endsWith(host)) {
    return NextResponse.json({ success: false }, { status: 403 });
  }

  // 3. Cap payload
  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader && Number(lengthHeader) > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false }, { status: 413 });
  }

  // 4. Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Trop de requêtes. Réessayez dans une minute." },
      { status: 429 }
    );
  }

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false }, { status: 413 });
    }

    const data = contactSchema.parse(JSON.parse(raw));

    // 5. Honeypot — si rempli, on simule un succès et on ignore.
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 6. Envoi via Resend (si configuré)
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "contact@codalyx.fr";
    const from = process.env.CONTACT_FROM_EMAIL || "Codalyx <onboarding@resend.dev>";

    if (apiKey) {
      const resend = new Resend(apiKey);
      const subject = `Nouveau contact — ${data.projectType}`;
      const html = `
        <table style="font-family:system-ui,sans-serif;font-size:14px;color:#0a0a0a;line-height:1.5">
          <tr><td style="padding:4px 12px 4px 0"><strong>Nom</strong></td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Téléphone</strong></td><td>${escapeHtml(data.phone || "—")}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Formule</strong></td><td>${escapeHtml(data.projectType)}</td></tr>
          <tr><td style="padding:12px 12px 4px 0;vertical-align:top"><strong>Message</strong></td><td style="padding-top:12px;white-space:pre-wrap">${escapeHtml(data.message)}</td></tr>
        </table>
      `;

      const result = await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject,
        html,
      });

      if (result.error) {
        // Pas de PII en logs : seulement le code d'erreur
        console.error("[contact] resend error", result.error.name);
        return NextResponse.json(
          { success: false, message: "Envoi impossible. Réessayez plus tard." },
          { status: 502 }
        );
      }
    } else {
      // Mode dev / clé manquante — on ne logge AUCUNE PII
      console.warn("[contact] RESEND_API_KEY absent — message non envoyé.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    // Pas de stack côté client
    console.error("[contact] unexpected error");
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
