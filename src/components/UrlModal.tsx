import { useState } from "react"

export const UrlModal = ({ id }: { id: string }): JSX.Element => {
    const [url, setUrl] = useState("")

    return (
        <dialog className="modal" id={id}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">🔗 Paste your url here</h3>

                <p className="py-4">
                    <input
                        className="input input-bordered w-full"
                        onChange={(event) => {
                            setUrl(event.target.value)
                        }}
                        placeholder="https://example.com/"
                        type="text"
                        value={url}
                    />
                </p>

                <div className="modal-action">
                    <form
                        method="dialog"
                        onSubmit={() => {
                            localStorage.setItem("URL", url)

                            window.location.reload()
                        }}
                    >
                        <button className="btn btn-neutral">Save</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
