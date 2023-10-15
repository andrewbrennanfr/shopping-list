import { findRecipe } from "@/entities/Recipe"
import { describe, expect, it } from "bun:test"

/* -------------------------------------------------------------------------- */

describe("findRecipe", () => {
    it("returns the recipe with the given id", () => {
        expect(
            findRecipe(
                [
                    { id: "r_0", contents: [], name: "a" },
                    { id: "r_1", contents: [], name: "b" },
                    { id: "r_2", contents: [], name: "c" },
                ],
                "r_1"
            )
        ).toEqual({ id: "r_1", contents: [], name: "b" })
    })

    it("returns undefined when no recipe is found", () => {
        expect(
            findRecipe(
                [
                    { id: "r_0", contents: [], name: "a" },
                    { id: "r_1", contents: [], name: "b" },
                    { id: "r_2", contents: [], name: "c" },
                ],
                "r_3"
            )
        ).toEqual(undefined)
    })
})
