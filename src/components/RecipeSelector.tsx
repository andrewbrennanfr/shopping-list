import { Category, makeCategoriesDisplayable } from "@/entities/Category"
import { Data } from "@/entities/Data"
import { Recipe } from "@/entities/Recipe"

export const RecipeSelector = ({
    data,
    selectedRecipeIds,
    setSelectedRecipeIds,
}: {
    data: Data
    selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
    setSelectedRecipeIds: (
        selectedRecipeIds: Record<Category["id"], Recipe["id"][]>
    ) => void
}): JSX.Element => (
    <div className="pb-5">
        <div className="indicator">
            <span className="badge badge-neutral badge-outline indicator-item">
                {Object.values(selectedRecipeIds).flat().length}
            </span>

            <h1 className="font-light pr-5 text-2xl">🧑‍🍳 Select your recipes</h1>
        </div>

        {makeCategoriesDisplayable(data).map((categoryDisplayble) => (
            <div
                className="form-control mt-3 w-full"
                key={categoryDisplayble.id}
            >
                <label className="label">
                    <span className="label-text">
                        {categoryDisplayble.name}
                    </span>
                </label>

                <select
                    className="select select-bordered"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedRecipeIds({
                            ...selectedRecipeIds,
                            [categoryDisplayble.id]: Array.prototype.slice
                                .call(event.target.options)
                                .filter((option) => option.selected)
                                .map((option) => option.value),
                        })
                    }}
                    multiple
                    tabIndex={-1}
                    value={selectedRecipeIds[categoryDisplayble.id] || []}
                >
                    {categoryDisplayble.contents.map(
                        ({ recipeId, recipeName }) => (
                            <option key={recipeId} value={recipeId}>
                                {recipeName}
                            </option>
                        )
                    )}
                </select>
            </div>
        ))}
    </div>
)
