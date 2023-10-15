export type Ingredient = {
    id: string
    name: string
}

/* -------------------------------------------------------------------------- */

export const findIngredient = (
    ingredients: Ingredient[],
    ingredientId: Ingredient["id"]
): Ingredient | undefined => ingredients.find(({ id }) => id === ingredientId)
