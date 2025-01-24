// models/influencer.ts
import  { Schema, model, models, Document } from 'mongoose';

export interface IInfluencer extends Document {
  name: string;
  category: string;
  followers: number;
  trustScore?: number;
  claimsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const InfluencerSchema = new Schema<IInfluencer>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    followers: { type: Number, required: true },
    trustScore: { type: Number, default: 0 },
    claimsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Influencer = models.Influencer || model<IInfluencer>('Influencer', InfluencerSchema);
export default Influencer;
