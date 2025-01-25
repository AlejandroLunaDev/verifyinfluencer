import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  description?: string; // Puede ser texto fijo o dinámico
  trend?: "up" | "down" | "none";
  icon?: React.ReactNode;
}

export function MetricCard({
  label,
  value,
  description,
  trend,
  icon,
}: MetricCardProps) {
  return (
    <Card className="bg-background2 h-40 border border-gray-600 p-4">
      <CardContent className="flex flex-col gap-3 h-full">
  
          <div className="flex items-center justify-between">
            <p className="text-sm text-white">{label}</p>
            {trend && (
              <div
                className={cn(
                  "h-5 w-5",
                  trend === "up" && "text-green-500",
                  trend === "down" && "text-red-500",
                  trend === "none" && "text-gray-500"
                )}
              >
                {trend === "up" && <TrendingUp />}
                {trend === "down" && <TrendingDown />}
                {trend === "none" && <Minus />}
              </div>
            )}
            {icon && <div className="text-muted-foreground">{icon}</div>}
          </div>
          <h3 className="text-4xl font-bold mt-1 text-[#34d399]">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}

      </CardContent>
    </Card>
  );
}
