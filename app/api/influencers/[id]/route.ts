import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import InfluencerModel from '@/models/influencers';
import mongoose from 'mongoose';

// GET: Obtener un influencer por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB(); // Conectar a la base de datos

  const { id } = params;

  // Validar que el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'ID de influencer inválido' }, { status: 400 });
  }

  try {
    const influencer = await InfluencerModel.findById(id);

    if (!influencer) {
      return NextResponse.json({ error: 'Influencer no encontrado' }, { status: 404 });
    }

    return NextResponse.json(influencer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


