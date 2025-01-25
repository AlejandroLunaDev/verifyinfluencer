// components/ui/loader.tsx

"use client"

import { ClipLoader } from "react-spinners"

interface LoaderProps {
  size?: number
  color?: string
}

export function Loader({ size = 50, color = "#4ade80" }: LoaderProps) { // Puedes ajustar el color según tu diseño
  return (
    <div className="flex items-center justify-center py-10">
      <ClipLoader size={size} color={color} />
    </div>
  )
}
