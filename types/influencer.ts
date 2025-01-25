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
}

export interface LeaderboardStats {
  activeInfluencers: number;
  totalVerifiedClaims: number;
  averageTrustScore: number;
}
