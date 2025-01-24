import connectDB from '../../../lib/mongodb';
import ResearchTaskModel from '../../../models/researchTask';
import { NextResponse } from 'next/server';

// GET: Obtener todas las tareas de investigación
export async function GET() {
  await connectDB();

  try {
    const tasks = await ResearchTaskModel.find();
    return NextResponse.json(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// POST: Crear una nueva tarea de investigación
interface ResearchTaskRequestBody {
    influencerName: string;
    timeRange: string;
    maxClaims: number;
    selectedJournals: string[];
    includeRevenueAnalysis: boolean;
}

export async function POST(req: Request) {
    await connectDB();

    try {
        const body: ResearchTaskRequestBody = await req.json();
        const {
            influencerName,
            timeRange,
            maxClaims,
            selectedJournals,
            includeRevenueAnalysis,
        } = body;

        const newTask = await ResearchTaskModel.create({
            influencerName,
            timeRange,
            maxClaims,
            selectedJournals,
            includeRevenueAnalysis,
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
