"use client";

import { useInfluencerStore } from "@/lib/store/influencer-store";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Definimos la interfaz para los datos de los influencers
interface Influencer {
  id: string;
  name: string;
  avatar: string;
  category: string;
  trustScore: number;
  trend: "up" | "down";
  followers: string;
  verifiedClaims: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  bio: string;
}

export default function LeaderBoard(){
  const { influencers, setInfluencers } = useInfluencerStore();

  useEffect(() => {
    const data: Influencer[] = [
      {
        id: uuidv4(),
        email: "peter.hsu@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
      bio: "Dr. Peter Hsu is a renowned medical expert with over 20 years of experience.",
      avatar:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        category: "Medicine",
        trustScore: 94,
        trend: "up",
        followers: "1.2M+",
        verifiedClaims: 203,
      },
    ];
    console.log("Data before setting influencers:", data);
    setInfluencers(data);
  }, [setInfluencers]);

  return (
    <section>
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Influencer Trust Leaderboard</h1>
        <p className="text-muted-foreground mb-8">
          Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.
        </p>
        <LeaderboardStats />
        <LeaderboardFilters />
        <LeaderboardTable influencers={influencers} />
      </div>
    </section>
  );
}
