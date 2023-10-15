/// <reference lib="dom" />

import { useData } from "@/hooks/useData"
import { useSelectedRecipeIds } from "@/hooks/useSelectedRecipeIds"
import { PageHeader } from "@/modules/PageHeader"
import { RecipeSelector } from "@/modules/RecipeSelector"
import { ShoppingList } from "@/modules/ShoppingList"
import { createRoot } from "react-dom/client"

/* -------------------------------------------------------------------------- */

const App = () => {
    const { data } = useData()

    const { handleSelectRecipeIds, hasSelectedRecipeIds, selectedRecipeIds } =
        useSelectedRecipeIds()

    return (
        <>
            <PageHeader />

            {data && (
                <>
                    <RecipeSelector
                        data={data}
                        onSelectRecipeIds={handleSelectRecipeIds}
                        selectedRecipeIds={selectedRecipeIds}
                    />

                    {hasSelectedRecipeIds(selectedRecipeIds) && (
                        <ShoppingList
                            data={data}
                            selectedRecipeIds={selectedRecipeIds}
                        />
                    )}
                </>
            )}
        </>
    )
}

/* -------------------------------------------------------------------------- */

const main = document.getElementById("main")

if (main) createRoot(main).render(<App />)
