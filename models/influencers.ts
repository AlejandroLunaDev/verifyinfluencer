// models/Influencer.ts

import { Schema, model, models, Document } from "mongoose";

// Definir la interfaz para TypeScript
export interface HealthClaim {
  claim: string;
  category: string;
  status: string;
  source: string;
  aiAnalysis?: string;
}

export interface Influencer extends Document {
  name: string;
  username: string;
  platform: string;
  followers: number;
  engagement: string;
  specialty: string;
  contact: string;
  healthClaims: HealthClaim[];
  trustScore: number;
}

// Crear el esquema para los healthClaims
const HealthClaimSchema = new Schema<HealthClaim>({
  claim: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  source: { type: String, default: "No source available" },
  aiAnalysis: { type: String, default: "No analysis available" },
});

// Crear el esquema para los influencers
const InfluencerSchema = new Schema<Influencer>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  platform: { type: String, required: true },
  followers: { type: Number, required: true },
  engagement: { type: String, required: true },
  specialty: { type: String, required: true },
  contact: { type: String, required: true },
  healthClaims: { type: [HealthClaimSchema], default: [] },
  trustScore: { type: Number, required: true },
});

// Exportar el modelo, evitando definirlo más de una vez
export const Influencer =
  models.Influencer || model<Influencer>("Influencer", InfluencerSchema);
