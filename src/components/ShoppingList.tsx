import { Category } from "@/entities/Category"
import { Data } from "@/entities/Data"
import { ListDisplayable, makeList, makeListDisplayable } from "@/entities/List"
import { Recipe } from "@/entities/Recipe"
import { useState } from "react"

export const ShoppingList = ({
    data,
    selectedRecipeIds,
}: {
    data: Data
    selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
}): JSX.Element => {
    const list = makeList(
        data.recipes.filter((recipe) =>
            Object.values(selectedRecipeIds).flat().includes(recipe.id)
        )
    )

    const listDisplayable = makeListDisplayable(list, data)

    const [checkedIngredients, setCheckedIngredients] = useState<
        ListDisplayable[number]["id"][]
    >([])

    return (
        <div className="pb-20 pt-3">
            <h1 className="font-light pr-5 text-2xl">📝 To buy</h1>

            <progress
                className="mt-3 progress w-full"
                max={listDisplayable.length}
                value={checkedIngredients.length}
            />

            <div className="form-control mt-3 w-full">
                <select
                    className="select select-bordered"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        setCheckedIngredients(
                            Array.prototype.slice
                                .call(event.target.options)
                                .filter((option) => option.selected)
                                .map((option) => option.value)
                        )
                    }}
                    multiple
                    tabIndex={-1}
                    value={checkedIngredients}
                >
                    {listDisplayable.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.ingredientName} - {item.totalAmount}
                            {item.unitType}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
