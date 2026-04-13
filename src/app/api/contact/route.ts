import { z } from "zod";
import { NextResponse } from "next/server";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Log the submission (replace with email service later)
    console.log("\n========================================");
    console.log("NOUVEAU MESSAGE DE CONTACT");
    console.log("========================================");
    console.log(`Nom      : ${data.name}`);
    console.log(`Email    : ${data.email}`);
    console.log(`Tél.     : ${data.phone || "Non renseigné"}`);
    console.log(`Formule  : ${data.projectType}`);
    console.log(`Message  : ${data.message}`);
    console.log("========================================\n");

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
