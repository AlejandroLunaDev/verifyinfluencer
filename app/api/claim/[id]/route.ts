import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Claim from "@/models/claims";

// GET: Obtener los claims por influencerId
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB(); // Conectar a la base de datos

  const { id } = params;

  try {
    const claims = await Claim.find({ influencerId: id });

    if (!claims || claims.length === 0) {
      return NextResponse.json({ message: "No claims found for this influencer" }, { status: 404 });
    }

    return NextResponse.json(claims, { status: 200 });
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json({ error: "Error fetching claims" }, { status: 500 });
  }
}
