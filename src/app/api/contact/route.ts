import { z } from "zod";
import { NextResponse } from "next/server";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().trim().min(1).max(60),
  message: z.string().trim().min(10).max(5000),
  // Honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
});

// Naive in-memory rate limit (per-IP, sliding window).
// Replace with Upstash/Vercel KV when deploying behind multiple instances.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length <= MAX_REQUESTS;
}

function getIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Type de contenu non supporté" },
        { status: 415 }
      );
    }

    const ip = getIp(request);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Trop de requêtes, réessayez dans 1 minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    // Honeypot triggered — silently accept (bot fingerprinting).
    if (data.website) {
      return NextResponse.json({ success: true, message: "Message reçu" }, { status: 200 });
    }

    // TODO: brancher un vrai service mail (Resend / SendGrid / SES).
    // Ne PAS journaliser le contenu du message (PII) en production.

    return NextResponse.json(
      { success: true, message: "Message reçu" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
