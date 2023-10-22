import { UrlModal } from "@/components/UrlModal"
import classnames from "classnames"

export const PageHeader = (): JSX.Element => {
    const localUrl = localStorage.getItem("URL")

    const urlModalId = "urlModalId"

    return (
        <div className="bg-base-200 border-b navbar">
            <div className="navbar-start">
                <a
                    className="btn btn-ghost normal-case text-xl"
                    href="."
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                    🛒 Shopping List
                </a>
            </div>

            <div className="navbar-end">
                <button
                    className="btn btn-circle btn-neutral"
                    onClick={() => {
                        if (localUrl) {
                            localStorage.removeItem("DATA")

                            window.location.reload()

                            return
                        }

                        const urlModal = document.getElementById(urlModalId)

                        if (urlModal instanceof HTMLDialogElement)
                            urlModal.showModal()
                    }}
                >
                    <i
                        className={classnames(
                            "fa-solid",
                            localUrl ? "fa-rotate" : "fa-link"
                        )}
                    />
                </button>

                {!localUrl && <UrlModal id={urlModalId} />}
            </div>
        </div>
    )
}
