Bun.serve({
    fetch: ({ url }) => {
        const pathName = new URL(url).pathname
        const fileName = pathName.replace(/^\//, "") || "index.html"
        const fileContents = Bun.file(`./docs/${fileName}`)

        return new Response(fileContents)
    },
})
