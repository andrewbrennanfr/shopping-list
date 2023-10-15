import { Amount } from "@/entities/Amount"
import { Ingredient } from "@/entities/Ingredient"
import { Unit } from "@/entities/Unit"

/* -------------------------------------------------------------------------- */

export type Recipe = {
    contents: {
        amountId: Amount["id"]
        ingredientId: Ingredient["id"]
        unitId: Unit["id"]
    }[]
    id: string
    name: string
}

/* -------------------------------------------------------------------------- */

export const findRecipe = (
    recipes: Recipe[],
    recipeId: Recipe["id"]
): Recipe | undefined => recipes.find(({ id }) => id === recipeId)
