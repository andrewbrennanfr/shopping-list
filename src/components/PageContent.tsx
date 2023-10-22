import { RecipeSelector } from "@/components/RecipeSelector"
import { ShoppingList } from "@/components/ShoppingList"
import { Category } from "@/entities/Category"
import { Data, fetchData } from "@/entities/Data"
import { Recipe } from "@/entities/Recipe"
import { useEffect, useState } from "react"

export const PageContent = (): JSX.Element => {
    const [selectedRecipeIds, setSelectedRecipeIds] = useState<
        Record<Category["id"], Recipe["id"][]>
    >({})

    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
        fetchData().then(setData)
    }, [])

    return (
        <div className="pb-7 pt-7 px-5">
            {data && (
                <>
                    <RecipeSelector
                        data={data}
                        selectedRecipeIds={selectedRecipeIds}
                        setSelectedRecipeIds={setSelectedRecipeIds}
                    />

                    {!!Object.values(selectedRecipeIds).flat().length && (
                        <>
                            <div className="divider text-3xl">👇</div>

                            <ShoppingList
                                data={data}
                                selectedRecipeIds={selectedRecipeIds}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    )
}
