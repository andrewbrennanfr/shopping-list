import { Category, makeCategoriesDisplayable } from "@/entities/Category"
import { Data } from "@/entities/Data"
import { Recipe } from "@/entities/Recipe"
import classnames from "classnames"
import { useState } from "react"

/* -------------------------------------------------------------------------- */

export const RecipeSelector = ({
    data,
    selectedRecipeIds,
    onSelectRecipeIds,
}: {
    data: Data
    onSelectRecipeIds: (
        categoryId: Category["id"],
        recipeIds: Recipe["id"][]
    ) => void
    selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    /* -------------------------------------------------------------------------- */

    const selectedRecipeCount = Object.values(selectedRecipeIds).flat().length

    const handleSelectRecipes = (
        categoryId: Category["id"],
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedRecipeIds = Array.prototype.slice
            .call(event.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value)

        onSelectRecipeIds(categoryId, selectedRecipeIds)
    }

    /* -------------------------------------------------------------------------- */

    const categoriesDisplayable = makeCategoriesDisplayable(data)

    /* -------------------------------------------------------------------------- */

    return (
        <div className="container-fluid mb-5 mt-5">
            <h2 className="align-items-center d-flex fw-light justify-content-between mb-3">
                <div>👩‍🍳 Choose your recipes ({selectedRecipeCount})</div>

                <button
                    className={classnames(
                        "btn",
                        isCollapsed ? "btn-secondary" : "btn-primary"
                    )}
                    onClick={handleToggleCollapse}
                >
                    <i
                        className={classnames(
                            "bi",
                            isCollapsed ? "bi-eye-slash-fill" : "bi-eye-fill"
                        )}
                    />
                </button>
            </h2>

            <div className={classnames("collapse", !isCollapsed && "show")}>
                {categoriesDisplayable.map(({ contents, id, name }) => (
                    <div className="mb-3" key={id}>
                        <label className="form-label">{name}</label>

                        <select
                            className="form-select"
                            multiple
                            onChange={handleSelectRecipes.bind(null, id)}
                            value={selectedRecipeIds[id] || []}
                        >
                            {contents.map(({ recipeId, recipeName }) => (
                                <option key={recipeId} value={recipeId}>
                                    {recipeName}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}
