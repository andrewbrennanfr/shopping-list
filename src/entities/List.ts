import { Amount, findAmount } from "@/entities/Amount"
import { Data } from "@/entities/Data"
import { extractLeadingEmoji, removeAllEmojis } from "@/entities/Emoji"
import { Ingredient, findIngredient } from "@/entities/Ingredient"
import { Recipe } from "@/entities/Recipe"
import { Unit, findUnit } from "@/entities/Unit"

/* -------------------------------------------------------------------------- */

export type List = {
    amountIds: Amount["id"][]
    id: string
    ingredientId: Ingredient["id"]
    unitId: Unit["id"]
}[]

export type ListDisplayable = {
    id: string
    ingredientName: Ingredient["name"]
    totalAmount: Amount["value"]
    unitType: Unit["type"]
}[]

/* -------------------------------------------------------------------------- */

export const makeList = (recipes: Recipe[]): List =>
    Object.values(
        recipes
            .map(({ contents }) => contents)
            .flat()
            .reduce<Record<string, List[number]>>(
                (record, { amountId, ingredientId, unitId }, i) => {
                    const id = `${ingredientId}_${unitId}`
                    const ingredient = record[id]
                    const amountIds = [amountId]

                    if (ingredient)
                        return {
                            ...record,
                            [id]: {
                                ...ingredient,
                                amountIds: [
                                    ...ingredient.amountIds,
                                    ...amountIds,
                                ],
                            },
                        }

                    return {
                        ...record,
                        [id]: {
                            amountIds,
                            id,
                            ingredientId,
                            unitId,
                        },
                    }
                },
                {}
            )
    )

export const makeListDisplayable = (
    list: List,
    { amounts, ingredients, units }: Data
): ListDisplayable =>
    list
        .map(({ amountIds, id, ingredientId, unitId }) => ({
            id,

            ingredientName:
                findIngredient(ingredients, ingredientId)?.name || "",

            totalAmount: amountIds
                .map((amountId) => findAmount(amounts, amountId))
                .filter((amount): amount is Amount => !!amount)
                .reduce((totalAmount, { value }) => totalAmount + value, 0),

            unitType: findUnit(units, unitId)?.type || "",
        }))
        .sort(
            (
                { ingredientName: ingredientNameA },
                { ingredientName: ingredientNameB }
            ) =>
                removeAllEmojis(ingredientNameA)
                    .trim()
                    .localeCompare(removeAllEmojis(ingredientNameB).trim())
        )

export const makeListPlain = (list: List, data: Data): string =>
    makeListDisplayable(list, data)
        .map(({ ingredientName, totalAmount, unitType }) => ({
            ...extractLeadingEmoji(ingredientName),
            totalAmount,
            unitType,
        }))
        .map(({ emoji, text, totalAmount, unitType }) =>
            `- ${text.trim()} - ${totalAmount}${unitType} ${emoji || ""}`.trim()
        )
        .join("\n")
