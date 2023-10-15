import { Category } from "@/entities/Category"
import { Data } from "@/entities/Data"
import { makeList, makeListDisplayable, makeListPlain } from "@/entities/List"
import { Recipe } from "@/entities/Recipe"
import classnames from "classnames"
import { useState } from "react"

/* -------------------------------------------------------------------------- */

export const ShoppingList = ({
    data,
    selectedRecipeIds,
}: {
    data: Data
    selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
}) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleClickCopy = () => {
        navigator.clipboard.writeText(makeListPlain(list, data))

        setIsCopied(true)

        setTimeout(setIsCopied, 2000, false)
    }

    /* -------------------------------------------------------------------------- */

    const selectedRecipes = data.recipes.filter((recipe) =>
        Object.values(selectedRecipeIds).flat().includes(recipe.id)
    )

    const list = makeList(selectedRecipes)

    const listDisplayable = makeListDisplayable(list, data)

    /* -------------------------------------------------------------------------- */

    return (
        <div className="container-fluid mt-5 pb-5">
            <h2 className="align-items-center d-flex fw-light justify-content-between mb-3">
                📝 Your shopping list
                <button
                    className={classnames(
                        "btn",
                        isCopied ? "btn-success" : "btn-primary"
                    )}
                    onClick={handleClickCopy}
                >
                    <i
                        className={classnames(
                            "bi",
                            isCopied
                                ? "bi-check-circle-fill"
                                : "bi-arrow-down-circle-fill"
                        )}
                    />
                </button>
            </h2>

            <table className="mb-5 table table-sm">
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {listDisplayable.map(
                        ({ id, ingredientName, totalAmount, unitType }) => (
                            <tr key={id}>
                                <td>{ingredientName}</td>
                                <td>
                                    {totalAmount} {unitType}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}
