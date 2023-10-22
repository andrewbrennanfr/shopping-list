/// <reference lib="dom" />

import { PageContent } from "@/components/PageContent"
import { PageHeader } from "@/components/PageHeader"
import { createRoot } from "react-dom/client"

const App = (): JSX.Element => (
    <>
        <PageHeader />

        <PageContent />
    </>
)

const main = document.getElementById("main")

if (main) createRoot(main).render(<App />)
