import { Button } from "@/components/ui/button"
import type { Category } from "@/types/influencer"

interface CategoryFilterProps {
  selectedCategory: Category | "All"
  onCategoryChange: (category: Category | "All") => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: (Category | "All")[] = ["All", "Nutrition", "Fitness", "Medicine", "Mental Health"]

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "alt"}
          onClick={() => onCategoryChange(category)}
          className="whitespace-nowrap rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

