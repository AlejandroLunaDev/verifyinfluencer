import connectDB from '@/lib/mongodb';
import InfluencerModel from '../../../models/influencers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Obtener todos los influencers
export async function GET() {
  await connectDB(); // Conectar a la base de datos

  try {
    const influencers = await InfluencerModel.find(); // Recuperar todos los influencers
    return NextResponse.json(influencers); // Responder con JSON
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Crear un nuevo influencer
interface Influencer {
  name: string;
  category: string;
  followers: number;
  avatar?: string;
  trustScore?: number;
  claimsCount?: number;
  yearlyRevenue?: number;
  products?: number;
  verifiedClaims?: number;
  description?: string;
}

export async function POST(req: NextRequest) {
  await connectDB(); // Conectar a la base de datos

  try {
    const body: Influencer = await req.json(); // Parsear el cuerpo del request
    const {
      name,
      category,
      followers,
      avatar,
      trustScore,
      claimsCount,
      yearlyRevenue,
      products,
      verifiedClaims,
      description,
    } = body;

    const newInfluencer = await InfluencerModel.create({
      name,
      category,
      followers,
      avatar,
      trustScore,
      claimsCount,
      yearlyRevenue,
      products,
      verifiedClaims,
      description,
    });

    return NextResponse.json(newInfluencer, { status: 201 }); // Responder con el nuevo influencer creado
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
