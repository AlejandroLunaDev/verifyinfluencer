import './influencers'; // Importación para registrar Influencer, no asigna a variable

import { Schema, model, models, type Model, type Document, type Types } from 'mongoose';

export interface IClaim extends Document {
  influencerId: Types.ObjectId;
  text: string;
  category: string;
  status: 'Verified' | 'Questionable' | 'Debunked';
  confidence: number;
  sources: { title: string; url: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ClaimSchema = new Schema<IClaim>(
  {
    influencerId: {
      type: Schema.Types.ObjectId,
      ref: 'Influencer',
      required: true,
    },
    text: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ['Verified', 'Questionable', 'Debunked'],
      default: 'Questionable',
    },
    confidence: { type: Number, min: 0, max: 100, default: 0 },
    sources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Claim = (models.Claim as Model<IClaim>) || model<IClaim>('Claim', ClaimSchema);
export default Claim;
