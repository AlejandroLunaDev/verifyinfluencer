"use client"

import { useEffect, useState } from "react"
import { Stats } from "./components/stats"
import { InfluencerTable } from "./components/influencer-table"
import { CategoryFilter } from "./components/category-filter"
import { useInfluencerStore } from "@/lib/store/influencer-store"
import { Category, Influencer, LeaderboardStats } from "@/types/influencer"

export function Leaderboard() {
  const {
    influencers,
    claims,
    fetchInfluencers,
    fetchClaims,
  } = useInfluencerStore()

  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await fetchInfluencers()
        await fetchClaims()
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [fetchInfluencers, fetchClaims])

  const stats: LeaderboardStats = {
    activeInfluencers: influencers.length,
    totalVerifiedClaims: claims.length,
    averageTrustScore: 0
  }

  const filteredInfluencers: Influencer[] =
    selectedCategory === "All"
      ? influencers
      : influencers.filter((inf) => inf.category === selectedCategory)

  return (
    <section className="px-10 h-screen flex flex-col gap-5 py-20">
      
        <header className="flex flex-col gap-5 py-5">
          <h1 className="text-4xl font-bold tracking-tight">Influencer Trust Leaderboard</h1>
          <p className="text-muted-foreground w-1/2">
            Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency.
            Updated daily using AI-powered analysis.
          </p>
        </header>

        <Stats
          activeInfluencers={stats.activeInfluencers}
          verifiedClaims={stats.totalVerifiedClaims}
          averageTrustScore={stats.averageTrustScore}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <InfluencerTable influencers={filteredInfluencers} />
        )}
    </section>
  )
}
