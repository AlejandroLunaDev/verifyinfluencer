import connectDB from '../../../lib/mongodb';
import InfluencerModel from '../../../models/influencers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Obtener todos los influencers
export async function GET() {
  await connectDB(); // Conectar a la base de datos

  try {
    const influencers = await InfluencerModel.find();
    return NextResponse.json(influencers);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Crear un nuevo influencer
interface Influencer {
    name: string;
    category: string;
    followers: number;
    trustScore: number;
    claimsCount: number;
}

export async function POST(req: NextRequest) {
    await connectDB(); // Conectar a la base de datos

    try {
        const body: Influencer = await req.json(); // Parsear el body del request
        const { name, category, followers, trustScore, claimsCount } = body;

        const newInfluencer = await InfluencerModel.create({
            name,
            category,
            followers,
            trustScore,
            claimsCount,
        });

        return NextResponse.json(newInfluencer, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
