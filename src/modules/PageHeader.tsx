import { useLocalStorage } from "@/hooks/useLocalStorage"
import classnames from "classnames"

/* -------------------------------------------------------------------------- */

export const PageHeader = () => {
    const { handleUpdateLocalStorage, localUrl } = useLocalStorage()

    return (
        <nav className="bg-light border-bottom navbar navbar-expand-lg shadow-sm">
            <div className="container-fluid">
                <h1
                    className="fw-light mb-0"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                    🛒 Shopping
                </h1>

                <button
                    className="btn btn-outline-secondary"
                    onClick={handleUpdateLocalStorage}
                >
                    <i
                        className={classnames(
                            "bi",
                            localUrl ? "bi-arrow-clockwise" : "bi-gear"
                        )}
                    />
                </button>
            </div>
        </nav>
    )
}
