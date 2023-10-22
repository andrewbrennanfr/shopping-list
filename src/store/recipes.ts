import { defineStore } from "pinia"
import localforage from "localforage"

type Recipe = {
    categories: string[]
    ingredients: {
        amount: number
        name: string
        unit: string
    }[]
    name: string
}

type Table = {
    rows: {
        c: ({
            v: string | number
        } | null)[]
    }[]
}

export const useRecipesStore = defineStore("recipes", {
    state: (): {
        data: Recipe[] | null
    } => ({
        data: null,
    }),
    actions: {
        async fetch(url: string) {
            const cachedTable = await localforage.getItem<Table>("table")

            if (!cachedTable) {
                const response = await fetch(url)

                const text = await response.text()

                const { table } = JSON.parse(text.slice(47).slice(0, -2)) as {
                    table: Table
                }

                await localforage.setItem("table", table)
            }

            const table = await localforage.getItem<Table>("table")

            if (!table) throw new Error("No table found in cache")

            const recipes = table.rows
                .map((row) => row.c.map((col) => String(col?.v || "").trim()))
                .reduce<Recipe[]>(
                    (
                        recipes,
                        [
                            recipe = "",
                            ingredient = "",
                            amount = "",
                            unit = "",
                            category = "",
                        ]
                    ) => {
                        if (recipe)
                            recipes.push({
                                categories: [],
                                ingredients: [],
                                name: recipe,
                            })

                        const lastRecipe = recipes.at(-1)

                        if (!lastRecipe) throw new Error("No last recipe found")

                        if (category) lastRecipe.categories.push(category)

                        if (ingredient && amount && unit)
                            lastRecipe.ingredients.push({
                                amount: Number(amount),
                                name: ingredient,
                                unit,
                            })

                        return recipes
                    },
                    []
                )

            this.data = recipes
        },
    },
})
