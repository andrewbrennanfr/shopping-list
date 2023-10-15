import { Data, fetchData } from "@/entities/Data"
import { useEffect, useState } from "react"

/* -------------------------------------------------------------------------- */

export const useData = (): { data: Data | null } => {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
        fetchData().then(setData)
    }, [])

    return { data }
}
