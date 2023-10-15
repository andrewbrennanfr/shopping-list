Bun.serve({
    fetch: ({ url }) => {
        const { pathname } = new URL(url)
        const file = pathname.slice(1) || "index.html"

        return new Response(Bun.file(`./docs/${file}`))
    },
})
