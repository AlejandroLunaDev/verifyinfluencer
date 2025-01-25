import { Influencer } from '@/types/influencer';
import { create } from 'zustand';



export interface Claim {
  id: string;
  influencerId: string;
  claim: string;
  date: Date;
}

interface InfluencerState {
  influencers: Influencer[];
  selectedInfluencer: Influencer | null;
  claims: Claim[];
  setInfluencers: (influencers: Influencer[]) => void;
  setSelectedInfluencer: (selectedInfluencer: Influencer | null) => void;
  setClaims: (claims: Claim[]) => void;
  fetchInfluencers: () => Promise<void>;
  addInfluencer: (influencer: Omit<Influencer, 'id'>) => Promise<void>;
  fetchClaims: () => Promise<void>;
  addClaim: (claim: Omit<Claim, 'id' | 'date'>) => Promise<void>;
}

export const useInfluencerStore = create<InfluencerState>((set, get) => ({
  influencers: [],
  selectedInfluencer: null,
  claims: [],

  setInfluencers: (influencers) => set({ influencers }),
  setSelectedInfluencer: (selectedInfluencer) => set({ selectedInfluencer }),
  setClaims: (claims) => set({ claims }),

  async fetchInfluencers() {
    try {
      const res = await fetch('http://localhost:3000/api/influencers', {
        method: 'GET',
      });
      const data: Influencer[] = await res.json();
      set({ influencers: data });
    } catch (error) {
      console.error(error);
    }
  },

  async addInfluencer(influencer) {
    try {
      const res = await fetch('http://localhost:3000/api/influencers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(influencer),
      });
      const newInfluencer: Influencer = await res.json();
      set({ influencers: [...get().influencers, newInfluencer] });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchClaims() {
    try {
      const res = await fetch('http://localhost:3000/api/claim', {
        method: 'GET',
      });
      const data: Claim[] = await res.json();
      set({ claims: data });
    } catch (error) {
      console.error(error);
    }
  },

  async addClaim(claim) {
    try {
      const res = await fetch('http://localhost:3000/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claim),
      });
      const newClaim: Claim = await res.json();
      set({ claims: [...get().claims, newClaim] });
    } catch (error) {
      console.error(error);
    }
  },
}));
