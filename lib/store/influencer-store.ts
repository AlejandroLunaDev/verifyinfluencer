import { create } from 'zustand';

export interface Influencer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  profileImage: string;
}

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
}

export const useInfluencerStore = create<InfluencerState>((set) => ({
  influencers: [],
  selectedInfluencer: null,
  claims: [],
  setInfluencers: (influencers) => set({ influencers }),
  setSelectedInfluencer: (selectedInfluencer) => set({ selectedInfluencer }),
  setClaims: (claims) => set({ claims }),
}));
