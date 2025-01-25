import { Schema, model, models, Document } from "mongoose";

export interface IInfluencer extends Document {
  name: string;
  category: string;
  followers: number;
  avatar?: string; // Foto o avatar del influencer
  trustScore?: number;
  claimsCount?: number;
  yearlyRevenue?: number; // Ingresos anuales
  products?: number; // Número de productos recomendados
  verifiedClaims?: number; // Reclamos verificados
  activeFilters?: string[]; // Filtros activos
  description?: string; // Descripción del influencer
  createdAt?: Date;
  updatedAt?: Date;
}

const InfluencerSchema = new Schema<IInfluencer>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    followers: { type: Number, required: true },
    avatar: { type: String }, // URL de la imagen del avatar
    trustScore: { type: Number, default: 0 },
    claimsCount: { type: Number, default: 0 },
    yearlyRevenue: { type: Number, default: 0 },
    products: { type: Number, default: 0 },
    verifiedClaims: { type: Number, default: 0 },
    activeFilters: { type: [String], default: [] },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Influencer = models.Influencer || model<IInfluencer>("Influencer", InfluencerSchema);
export default Influencer;
