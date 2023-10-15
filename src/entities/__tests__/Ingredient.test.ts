import { findIngredient } from "@/entities/Ingredient"
import { describe, expect, it } from "bun:test"

/* -------------------------------------------------------------------------- */

describe("findIngredient", () => {
    it("returns the ingedient with the given id", () => {
        expect(
            findIngredient(
                [
                    { id: "i_0", name: "a" },
                    { id: "i_1", name: "b" },
                    { id: "i_2", name: "c" },
                ],
                "i_1"
            )
        ).toEqual({ id: "i_1", name: "b" })
    })

    it("returns undefined when no ingredient is found", () => {
        expect(
            findIngredient(
                [
                    { id: "i_0", name: "a" },
                    { id: "i_1", name: "b" },
                    { id: "i_2", name: "c" },
                ],
                "i_3"
            )
        ).toEqual(undefined)
    })
})
