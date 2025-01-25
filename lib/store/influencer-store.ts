import { create } from "zustand";
import type { InfluencerDetail, Claim } from "@/types/influencer";

interface InfluencerState {
  influencers: InfluencerDetail[];
  selectedInfluencer: InfluencerDetail | null;
  claims: Claim[];
  setInfluencers: (influencers: InfluencerDetail[]) => void;
  setSelectedInfluencer: (selectedInfluencer: InfluencerDetail | null) => void;
  setClaims: (claims: Claim[]) => void;
  fetchInfluencers: () => Promise<void>;
  addInfluencer: (influencer: Omit<InfluencerDetail, "id">) => Promise<void>;
  fetchClaims: () => Promise<void>;
  fetchClaimsByInfluencerId: (id: string) => Promise<void>; // Nuevo método
  addClaim: (claim: Omit<Claim, "id" | "date">) => Promise<void>;
  fetchInfluencerById: (id: string) => Promise<void>;
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
      const res = await fetch("/api/influencers", { method: "GET" });
      const data: InfluencerDetail[] = await res.json();
      set({ influencers: data });
    } catch (error) {
      console.error(error);
    }
  },

  async addInfluencer(influencer) {
    try {
      const res = await fetch("/api/influencers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(influencer),
      });
      const newInfluencer: InfluencerDetail = await res.json();
      set({ influencers: [...get().influencers, newInfluencer] });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchClaims() {
    try {
      const res = await fetch("/api/claim", { method: "GET" });
      const data: Claim[] = await res.json();
      set({ claims: data });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchClaimsByInfluencerId(id: string) {
    // Nuevo método
    try {
      const res = await fetch(`/api/claim/${id}`, { method: "GET" });
      if (!res.ok) {
        throw new Error("Error fetching claims for influencer");
      }
      const data: Claim[] = await res.json();
      set({ claims: data }); // Actualizamos el estado con los claims obtenidos
    } catch (error) {
      console.error(`fetchClaimsByInfluencerId(${id}):`, error);
      set({ claims: [] }); // Reinicia el estado si hay un error
    }
  },

  async addClaim(claim) {
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claim),
      });
      const newClaim: Claim = await res.json();
      set({ claims: [...get().claims, newClaim] });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchInfluencerById(id: string) {
    try {
      const res = await fetch(`/api/influencers/${id}`, { method: "GET" });
      if (!res.ok) {
        throw new Error("Error fetching influencer details");
      }
      const data: InfluencerDetail = await res.json();
      set({ selectedInfluencer: data });
    } catch (error) {
      console.error("fetchInfluencerById:", error);
      set({ selectedInfluencer: null });
    }
  },
}));
