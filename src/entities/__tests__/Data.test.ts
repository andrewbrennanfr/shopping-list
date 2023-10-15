import {
    fetchData,
    searchDataIngredients,
    searchDataRecipes,
} from "@/entities/Data"
import { describe, expect, it, jest } from "bun:test"

/* -------------------------------------------------------------------------- */

const BODY = [
    new Array(47).fill("*").join(""),
    JSON.stringify({
        table: {
            rows: [
                {
                    c: [
                        { v: "🍔 Cheeseburger" },
                        { v: "🍞 Bun" },
                        { v: "1" },
                        { v: "piece(s)" },
                        { v: "🍟 Fast food" },
                    ],
                },
                { c: [null, { v: "🥩 Beef" }, { v: "100" }, { v: "g" }, null] },
                {
                    c: [
                        null,
                        { v: "🧀 Cheese" },
                        { v: "2" },
                        { v: "slice(s)" },
                        null,
                    ],
                },
                { c: [null, null, null, null, null] },
                {
                    c: [
                        { v: "🫓 Wrap" },
                        { v: "🫓 Tortilla" },
                        { v: "3" },
                        { v: "piece(s)" },
                        { v: "🐢 Slow food" },
                    ],
                },
                {
                    c: [
                        null,
                        { v: "🍗 Chicken" },
                        { v: "150" },
                        { v: "g" },
                        null,
                    ],
                },
                {
                    c: [
                        null,
                        { v: "🧀 Cheese" },
                        { v: "200" },
                        { v: "g" },
                        null,
                    ],
                },
                {
                    c: [
                        null,
                        { v: "🥬 Lettuce" },
                        { v: "1" },
                        { v: "packet(s)" },
                        null,
                    ],
                },
                { c: [null, null, null, null, null] },
                {
                    c: [
                        { v: "🍝 Cheese pasta" },
                        { v: "🍝 Pasta" },
                        { v: "100" },
                        { v: "g" },
                        { v: "🐢 Slow food" },
                    ],
                },
                {
                    c: [
                        null,
                        { v: "🧀 Cheese" },
                        { v: "100" },
                        { v: "g" },
                        null,
                    ],
                },
            ],
        },
    }),
    new Array(2).fill("*").join(""),
].join("")

/* -------------------------------------------------------------------------- */

const DATA = {
    amounts: [
        { id: "a_0", value: 1 },
        { id: "a_1", value: 100 },
        { id: "a_2", value: 2 },
        { id: "a_3", value: 3 },
        { id: "a_4", value: 150 },
        { id: "a_5", value: 200 },
    ],
    categories: [
        { contents: ["r_0"], id: "c_0", name: "🍟 Fast food" },
        { contents: ["r_1", "r_2"], id: "c_1", name: "🐢 Slow food" },
    ],
    ingredients: [
        { id: "i_0", name: "🍞 Bun" },
        { id: "i_1", name: "🥩 Beef" },
        { id: "i_2", name: "🧀 Cheese" },
        { id: "i_3", name: "🫓 Tortilla" },
        { id: "i_4", name: "🍗 Chicken" },
        { id: "i_5", name: "🥬 Lettuce" },
        { id: "i_6", name: "🍝 Pasta" },
    ],
    recipes: [
        {
            contents: [
                { amountId: "a_0", ingredientId: "i_0", unitId: "u_0" },
                { amountId: "a_1", ingredientId: "i_1", unitId: "u_1" },
                { amountId: "a_2", ingredientId: "i_2", unitId: "u_2" },
            ],
            id: "r_0",
            name: "🍔 Cheeseburger",
        },
        {
            contents: [
                { amountId: "a_3", ingredientId: "i_3", unitId: "u_0" },
                { amountId: "a_4", ingredientId: "i_4", unitId: "u_1" },
                { amountId: "a_5", ingredientId: "i_2", unitId: "u_1" },
                { amountId: "a_0", ingredientId: "i_5", unitId: "u_3" },
            ],
            id: "r_1",
            name: "🫓 Wrap",
        },
        {
            contents: [
                { amountId: "a_1", ingredientId: "i_6", unitId: "u_1" },
                { amountId: "a_1", ingredientId: "i_2", unitId: "u_1" },
            ],
            id: "r_2",
            name: "🍝 Cheese pasta",
        },
    ],
    units: [
        { id: "u_0", type: "piece(s)" },
        { id: "u_1", type: "g" },
        { id: "u_2", type: "slice(s)" },
        { id: "u_3", type: "packet(s)" },
    ],
}

/* -------------------------------------------------------------------------- */

describe("fetchData", () => {
    it("returns the cached result when it exists", async () => {
        const fetch = jest.fn()

        const response = await fetchData(fetch, {
            getItem: (key: string) =>
                ({
                    DATA: JSON.stringify({ hello: "world!" }),
                    URL: "",
                }[key] || ""),
            setItem: jest.fn(),
        })

        expect(response).toEqual({ hello: "world!" })
        expect(fetch).not.toHaveBeenCalled()
    })

    it("returns null when there is no url", async () => {
        const fetch = jest.fn()

        const response = await fetchData(fetch, {
            getItem: (key: string) => ({ DATA: "", URL: "" }[key] || ""),
            setItem: jest.fn(),
        })

        expect(response).toEqual(null)
        expect(fetch).not.toHaveBeenCalled()
    })

    it("returns the fetched data & caches it", async () => {
        const fetch = jest.fn(() => Promise.resolve({ text: () => BODY }))

        const setItem = jest.fn()

        const response = await fetchData(fetch as any, {
            getItem: (key: string) =>
                ({
                    DATA: "",
                    URL: "http://github.com",
                }[key] || ""),
            setItem,
        })

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch.mock.calls[0]).toEqual(["http://github.com"])

        expect(response).toEqual(DATA)
        expect(setItem).toHaveBeenCalledTimes(1)
        expect(setItem.mock.calls[0]).toEqual(["DATA", JSON.stringify(DATA)])
    })
})

/* -------------------------------------------------------------------------- */

describe("searchDataIngredients", () => {
    it("returns the ingredients ith a name that match the given query", () => {
        expect(searchDataIngredients(DATA, " chEEse ")).toEqual([
            { id: "i_2", name: "🧀 Cheese" },
        ])
    })
})

/* -------------------------------------------------------------------------- */

describe("searchDataRecipes", () => {
    it("returns the recipes with a name that matches the given query", () => {
        expect(searchDataRecipes(DATA, " buRGer ")).toEqual([
            {
                contents: [
                    {
                        amountId: "a_0",
                        ingredientId: "i_0",
                        unitId: "u_0",
                    },
                    {
                        amountId: "a_1",
                        ingredientId: "i_1",
                        unitId: "u_1",
                    },
                    {
                        amountId: "a_2",
                        ingredientId: "i_2",
                        unitId: "u_2",
                    },
                ],
                id: "r_0",
                name: "🍔 Cheeseburger",
            },
        ])
    })

    it("returns the recipes with an ingredient that matches the given query", () => {
        expect(searchDataRecipes(DATA, " leTTuce ")).toEqual([
            {
                contents: [
                    {
                        amountId: "a_3",
                        ingredientId: "i_3",
                        unitId: "u_0",
                    },
                    {
                        amountId: "a_4",
                        ingredientId: "i_4",
                        unitId: "u_1",
                    },
                    {
                        amountId: "a_5",
                        ingredientId: "i_2",
                        unitId: "u_1",
                    },
                    {
                        amountId: "a_0",
                        ingredientId: "i_5",
                        unitId: "u_3",
                    },
                ],
                id: "r_1",
                name: "🫓 Wrap",
            },
        ])
    })
})
