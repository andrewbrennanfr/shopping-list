import { makeList, makeListDisplayable, makeListPlain } from "@/entities/List"
import { describe, expect, it } from "bun:test"

/* -------------------------------------------------------------------------- */

describe("makeList", () => {
    it("returns a list based on the given recipes", () => {
        expect(
            makeList([
                {
                    id: "r_0",
                    contents: [
                        { amountId: "a_0", ingredientId: "i_0", unitId: "u_0" },
                        { amountId: "a_1", ingredientId: "i_1", unitId: "u_1" },
                        { amountId: "a_2", ingredientId: "i_2", unitId: "u_2" },
                    ],
                    name: "a",
                },
                {
                    id: "r_1",
                    contents: [
                        { amountId: "a_1", ingredientId: "i_1", unitId: "u_0" },
                        { amountId: "a_2", ingredientId: "i_1", unitId: "u_1" },
                        { amountId: "a_3", ingredientId: "i_3", unitId: "u_3" },
                        { amountId: "a_1", ingredientId: "i_1", unitId: "u_1" },
                    ],
                    name: "b",
                },
            ])
        ).toEqual([
            {
                amountIds: ["a_0"],
                id: "i_0_u_0",
                ingredientId: "i_0",
                unitId: "u_0",
            },
            {
                amountIds: ["a_1", "a_2", "a_1"],
                id: "i_1_u_1",
                ingredientId: "i_1",
                unitId: "u_1",
            },
            {
                amountIds: ["a_2"],
                id: "i_2_u_2",
                ingredientId: "i_2",
                unitId: "u_2",
            },
            {
                amountIds: ["a_1"],
                id: "i_1_u_0",
                ingredientId: "i_1",
                unitId: "u_0",
            },
            {
                amountIds: ["a_3"],
                id: "i_3_u_3",
                ingredientId: "i_3",
                unitId: "u_3",
            },
        ])
    })
})

/* -------------------------------------------------------------------------- */

describe("makeListDisplayable", () => {
    it("returns a list displayable based on the given data", () => {
        expect(
            makeListDisplayable(
                [
                    {
                        amountIds: ["a_0"],
                        id: "i_0_u_0",
                        ingredientId: "i_0",
                        unitId: "u_0",
                    },
                    {
                        amountIds: ["a_1", "a_2", "a_1"],
                        id: "i_1_u_1",
                        ingredientId: "i_1",
                        unitId: "u_1",
                    },
                ],
                {
                    amounts: [
                        { id: "a_0", value: 1 },
                        { id: "a_1", value: 2 },
                    ],
                    categories: [],
                    ingredients: [
                        { id: "i_0", name: "🥛 Milk" },
                        { id: "i_1", name: "🍞 Bread" },
                    ],
                    recipes: [],
                    units: [
                        { id: "u_0", type: "ml" },
                        { id: "u_1", type: "g" },
                    ],
                }
            )
        ).toEqual([
            {
                id: "i_1_u_1",
                ingredientName: "🍞 Bread",
                totalAmount: 4,
                unitType: "g",
            },
            {
                id: "i_0_u_0",
                ingredientName: "🥛 Milk",
                totalAmount: 1,
                unitType: "ml",
            },
        ])
    })
})

/* -------------------------------------------------------------------------- */

describe("makeListPlain", () => {
    it("returns a plain list based on the given data", () => {
        expect(
            makeListPlain(
                [
                    {
                        amountIds: ["a_0"],
                        id: "i_0_u_0",
                        ingredientId: "i_0",
                        unitId: "u_0",
                    },
                    {
                        amountIds: ["a_1", "a_2", "a_1"],
                        id: "i_1_u_1",
                        ingredientId: "i_1",
                        unitId: "u_1",
                    },
                ],
                {
                    amounts: [
                        { id: "a_0", value: 1 },
                        { id: "a_1", value: 2 },
                    ],
                    categories: [],
                    ingredients: [
                        { id: "i_0", name: "🥛 Milk" },
                        { id: "i_1", name: "🍞 Bread" },
                    ],
                    recipes: [],
                    units: [
                        { id: "u_0", type: "ml" },
                        { id: "u_1", type: "g" },
                    ],
                }
            )
        ).toEqual("- Bread - 4g 🍞\n- Milk - 1ml 🥛")
    })
})
