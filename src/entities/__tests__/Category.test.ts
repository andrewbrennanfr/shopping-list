import { findCategory, makeCategoriesDisplayable } from "@/entities/Category"
import { describe, expect, it } from "bun:test"

/* -------------------------------------------------------------------------- */

describe("findCategory", () => {
    it("returns the category with the given id", () => {
        expect(
            findCategory(
                [
                    { contents: [], id: "c_0", name: "a" },
                    { contents: [], id: "c_1", name: "b" },
                    { contents: [], id: "c_2", name: "c" },
                ],
                "c_1"
            )
        ).toEqual({ contents: [], id: "c_1", name: "b" })
    })

    it("returns undefined when no category is found", () => {
        expect(
            findCategory(
                [
                    { contents: [], id: "c_0", name: "a" },
                    { contents: [], id: "c_1", name: "b" },
                    { contents: [], id: "c_2", name: "c" },
                ],
                "c_3"
            )
        ).toEqual(undefined)
    })
})

/* -------------------------------------------------------------------------- */

describe("makeCategoriesDisplayable", () => {
    it("returns the categories in a displayable format", () => {
        expect(
            makeCategoriesDisplayable({
                amounts: [],
                categories: [
                    { contents: ["r_0"], id: "c_0", name: "🐢 Slow food" },
                    {
                        contents: ["r_1", "r_2"],
                        id: "c_1",
                        name: "🍟 Fast food",
                    },
                ],
                ingredients: [],
                recipes: [
                    { contents: [], id: "r_0", name: "🥛 Milk" },
                    { contents: [], id: "r_1", name: "🥤 Juice" },
                    { contents: [], id: "r_2", name: "🍞 Bread" },
                ],
                units: [],
            })
        ).toEqual([
            {
                contents: [
                    { recipeId: "r_2", recipeName: "🍞 Bread" },
                    { recipeId: "r_1", recipeName: "🥤 Juice" },
                ],
                id: "c_1",
                name: "🍟 Fast food",
            },
            {
                contents: [{ recipeId: "r_0", recipeName: "🥛 Milk" }],
                id: "c_0",
                name: "🐢 Slow food",
            },
        ])
    })
})
