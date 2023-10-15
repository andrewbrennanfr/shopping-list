export const useLocalStorage = (): {
    handleUpdateLocalStorage: () => void
    localData: string | null
    localUrl: string | null
} => {
    const handleUpdateLocalStorage = () => {
        if (localUrl) localStorage.removeItem("DATA")
        else {
            const pastedUrl = prompt("Paste your URL")

            if (pastedUrl) localStorage.setItem("URL", pastedUrl)
        }

        window.location.reload()
    }

    const localData = localStorage.getItem("DATA")
    const localUrl = localStorage.getItem("URL")

    return { handleUpdateLocalStorage, localData, localUrl }
}
