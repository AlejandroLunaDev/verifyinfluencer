import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import ClaimModel from '@/models/claims';

export async function GET() {
  await connectDB();
  try {
    const claims = await ClaimModel.find().populate('influencerId');
    return NextResponse.json(claims);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { influencerId, text, category, status, confidence, sources } = body;
    const newClaim = await ClaimModel.create({
      influencerId,
      text,
      category,
      status,
      confidence,
      sources,
    });
    return NextResponse.json(newClaim, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
