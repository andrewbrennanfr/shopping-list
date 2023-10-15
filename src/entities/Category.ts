import { Data } from "@/entities/Data"
import { removeAllEmojis } from "@/entities/Emoji"
import { Recipe, findRecipe } from "@/entities/Recipe"

/* -------------------------------------------------------------------------- */

export type Category = {
    contents: Recipe["id"][]
    id: string
    name: string
}

export type CategoriesDisplayable = {
    id: string
    contents: { recipeId: string; recipeName: string }[]
    name: string
}[]

/* -------------------------------------------------------------------------- */

export const findCategory = (
    categories: Category[],
    categoryId: Category["id"]
): Category | undefined => categories.find(({ id }) => id === categoryId)

export const makeCategoriesDisplayable = ({
    categories,
    recipes,
}: Data): CategoriesDisplayable =>
    categories
        .map(({ id, contents, name }) => ({
            id,
            contents: contents
                .map((recipeId) => findRecipe(recipes, recipeId))
                .filter((recipe): recipe is Recipe => !!recipe)
                .map(({ id: recipeId, name: recipeName }) => ({
                    recipeId,
                    recipeName,
                }))
                .sort(
                    (
                        { recipeName: recipeNameA },
                        { recipeName: recipeNameB }
                    ) =>
                        removeAllEmojis(recipeNameA).localeCompare(
                            removeAllEmojis(recipeNameB)
                        )
                ),
            name,
        }))
        .sort(({ name: nameA }, { name: nameB }) =>
            removeAllEmojis(nameA).localeCompare(removeAllEmojis(nameB))
        )
