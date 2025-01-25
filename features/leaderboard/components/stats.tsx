import { Card, CardContent } from "@/components/ui/card"
import { Users, CheckCircle, PieChart } from "lucide-react"

interface StatsProps {
  activeInfluencers: number
  verifiedClaims: number
  averageTrustScore: number
}

export function Stats({ activeInfluencers, verifiedClaims, averageTrustScore }: StatsProps) {
  const statsData = [
    {
      label: "Active Influencers",
      value: activeInfluencers.toLocaleString(),
      icon: Users
    },
    {
      label: "Verified Claims",
      value: verifiedClaims.toLocaleString(),
      icon: CheckCircle
    },
    {
      label: "Average Trust Score",
      value: `${averageTrustScore}%`,
      icon: PieChart
    }
  ]

  return (
    <div className="flex justify-center gap-4 mb-6">
      {statsData.map(({ label, value, icon: Icon }, index) => (
        <Card key={index} variant="alt" className="w-full  border-gray-600">
          <CardContent className="flex items-center p-8 gap-4">
          <Icon className="w-10 h-10  text-primary" />

            <div>
              <div className="text-2xl text-white font-bold">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
