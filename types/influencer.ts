export type Category = "Nutrition" | "Fitness" | "Medicine" | "Mental Health";
export interface Influencer {
  _id?: string;
  id: string;
  rank: number;
  name: string;
  avatar: string;
  category: Category;
  trustScore: number;
  trend: "up" | "down" | "stable";
  followers: number;
  verifiedClaims: number;
  description: string;
}

export interface LeaderboardStats {
  activeInfluencers: number;
  totalVerifiedClaims: number;
  averageTrustScore: number;
}
export interface InfluencerDetail extends Influencer {
  bio: string
  tags: string[]
  yearlyRevenue: number
  productsCount: number
  products: number
  claims: Claim[]
}

export interface Claim {
  _id: string
  date: string
  title: string
  trustScore: number
  status: "verified" | "questionable" | "debunked"
  source: string
  aiAnalysis: string
  text: string
  createdAt: Date
  confidence: number
  sources: { title: string; url: string }[]
}
