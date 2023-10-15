import { Category } from "@/entities/Category"
import { Recipe } from "@/entities/Recipe"
import { useState } from "react"

/* -------------------------------------------------------------------------- */

export const useSelectedRecipeIds = (): {
    handleSelectRecipeIds: (
        categoryId: Category["id"],
        recipeIds: Recipe["id"][]
    ) => void
    hasSelectedRecipeIds: (
        selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
    ) => boolean
    selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
} => {
    const [selectedRecipeIds, setSelectedRecipeIds] = useState<
        Record<Category["id"], Recipe["id"][]>
    >({})

    const handleSelectRecipeIds = (
        categoryId: Category["id"],
        recipeIds: Recipe["id"][]
    ): void => {
        setSelectedRecipeIds({ ...selectedRecipeIds, [categoryId]: recipeIds })
    }

    const hasSelectedRecipeIds = (
        selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
    ): boolean => !!Object.values(selectedRecipeIds).flat().length

    return {
        handleSelectRecipeIds,
        hasSelectedRecipeIds,
        selectedRecipeIds,
    }
}
