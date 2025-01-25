"use client"

import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils" 
import { Influencer } from "@/types/influencer"

interface InfluencerTableProps {
  influencers: Influencer[]
}
export function InfluencerTable({ influencers }: InfluencerTableProps) {
  console.log('influencers', influencers)
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-500" />
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getScoreColor = (score: number) =>
    cn({
      "text-green-500": score >= 90,
      "text-yellow-300": score >= 50 && score < 90,
      "text-red-500": score < 50,
    })

  const headers = [
    "RANK",
    "INFLUENCER",
    "CATEGORY",
    "TRUST SCORE",
    "TREND",
    "FOLLOWERS",
    "VERIFIED CLAIMS",
  ]

  // Ordenar los influencers por trustScore de mayor a menor
  const rankedInfluencers = [...influencers].sort((a, b) => b.trustScore - a.trustScore)

  return (
    <div className="rounded-xl border border-gray-600 bg-background2 ">
      <Table >
        <TableHeader >
          <TableRow >
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody >
  {rankedInfluencers.map((influencer, index) => (
    <TableRow key={influencer._id} className="h-20 border-b border-gray-500">
      <TableCell className="font-medium ">#{index + 1}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={influencer.avatar} alt={influencer.name} />
            <AvatarFallback>{influencer.name[0]}</AvatarFallback>
          </Avatar>
          <span>{influencer.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="ghost">{influencer.category}</Badge>
      </TableCell>
      <TableCell className={getScoreColor(influencer.trustScore)}>
        {influencer.trustScore}%
      </TableCell>
      <TableCell>{getTrendIcon(influencer.trend || "stable")}</TableCell>
      <TableCell>{influencer.followers.toLocaleString()}</TableCell>
      <TableCell>{influencer.verifiedClaims}</TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </div>
  )
}
