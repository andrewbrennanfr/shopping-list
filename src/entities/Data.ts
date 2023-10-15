import { Amount } from "@/entities/Amount"
import { Category } from "@/entities/Category"
import { Ingredient, findIngredient } from "@/entities/Ingredient"
import { Recipe } from "@/entities/Recipe"
import { Unit } from "@/entities/Unit"

/* -------------------------------------------------------------------------- */

export type Data = {
    amounts: Amount[]
    categories: Category[]
    ingredients: Ingredient[]
    recipes: Recipe[]
    units: Unit[]
}

export type DataJson = {
    table: {
        rows: {
            c: ({
                v: string
            } | null)[]
        }[]
    }
}

export type DataRows = [
    NonNullable<DataJson["table"]["rows"][number]["c"][number]>["v"], // Recipe
    NonNullable<DataJson["table"]["rows"][number]["c"][number]>["v"], // Ingredient
    NonNullable<DataJson["table"]["rows"][number]["c"][number]>["v"], // Amount
    NonNullable<DataJson["table"]["rows"][number]["c"][number]>["v"], // Unit
    NonNullable<DataJson["table"]["rows"][number]["c"][number]>["v"] // Category
][]

/* -------------------------------------------------------------------------- */

export const fetchData = (
    fetchArg?: typeof window.fetch,
    storageArg?: Pick<typeof window.localStorage, "getItem" | "setItem">
): Promise<Data | null> => {
    const request = fetchArg || fetch
    const storage = storageArg || localStorage

    const cached = storage.getItem("DATA")
    const url = storage.getItem("URL")

    if (cached) return Promise.resolve(JSON.parse(cached))

    if (!url) return Promise.resolve(null)

    return request(url)
        .then((response) => response.text())
        .then((body) => {
            const json = JSON.parse(body.slice(47).slice(0, -2)) as DataJson
            const rows = json.table.rows
                .map(({ c }) => c.map((cc) => cc?.v || ""))
                .filter((row) => row.some(Boolean)) as DataRows

            const amounts = [
                ...new Set(rows.map(([, , amount]) => amount)),
            ].map((value, i) => ({ id: `a_${i}`, value: parseFloat(value) }))

            const ingredients = [
                ...new Set(rows.map(([, ingredient]) => ingredient)),
            ].map((name, i) => ({ id: `i_${i}`, name }))

            const units = [...new Set(rows.map(([, , , unit]) => unit))].map(
                (type, i) => ({ id: `u_${i}`, type })
            )

            const recipes = rows.reduce<Recipe[]>(
                (recipes, [recipe, ingredient, amount, unit]) => {
                    const amountId = amounts.find(
                        ({ value }) => value === parseFloat(amount)
                    )?.id

                    const ingredientId = ingredients.find(
                        ({ name }) => name === ingredient
                    )?.id

                    const unitId = units.find(({ type }) => type === unit)?.id

                    if (!amountId || !ingredientId || !unitId) return recipes

                    const content = { amountId, ingredientId, unitId }

                    if (recipe)
                        return [
                            ...recipes,
                            {
                                contents: [content],
                                id: `r_${recipes.length}`,
                                name: recipe,
                            },
                        ]

                    const lastRecipe = recipes.at(-1)

                    if (lastRecipe)
                        return [
                            ...recipes.slice(0, -1),
                            {
                                ...lastRecipe,
                                contents: [...lastRecipe.contents, content],
                            },
                        ]

                    return recipes
                },
                []
            )

            const categories = rows
                .map(([, , , , category]) => category)
                .filter((category) => category)
                .map((name, i) => ({ name, recipeId: `r_${i}` }))
                .reduce<Category[]>((categories, { name, recipeId }) => {
                    const contents = [recipeId]

                    if (categories.find((category) => category.name === name)) {
                        return categories.map((category) =>
                            category.name === name
                                ? {
                                      ...category,
                                      contents: [
                                          ...category.contents,
                                          ...contents,
                                      ],
                                  }
                                : category
                        )
                    }

                    return [
                        ...categories,
                        { contents, id: `c_${categories.length}`, name },
                    ]
                }, [])

            const data = { amounts, categories, ingredients, recipes, units }

            storage.setItem("DATA", JSON.stringify(data))

            return data
        })
}

export const searchDataIngredients = (
    { ingredients }: Data,
    query: string
): Ingredient[] =>
    ingredients.filter(({ name }) =>
        name.toLowerCase().trim().includes(query.toLowerCase().trim())
    )

export const searchDataRecipes = (
    { ingredients, recipes, ...partialData }: Data,
    query: string
): Recipe[] =>
    recipes.filter(
        ({ contents, name }) =>
            name.toLowerCase().trim().includes(query.toLowerCase().trim()) ||
            searchDataIngredients(
                {
                    ...partialData,
                    ingredients: contents
                        .map(({ ingredientId }) =>
                            findIngredient(ingredients, ingredientId)
                        )
                        .filter(
                            (ingredient): ingredient is Ingredient =>
                                !!ingredient
                        ),
                    recipes,
                },
                query
            ).length
    )
