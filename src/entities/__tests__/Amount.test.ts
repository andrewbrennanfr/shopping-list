import { findAmount } from "@/entities/Amount"
import { describe, expect, it } from "bun:test"

/* -------------------------------------------------------------------------- */

describe("findAmount", () => {
    it("returns the amount with the given id", () => {
        expect(
            findAmount(
                [
                    { id: "a_0", value: 0 },
                    { id: "a_1", value: 1 },
                    { id: "a_2", value: 2 },
                ],
                "a_1"
            )
        ).toEqual({ id: "a_1", value: 1 })
    })

    it("returns undefined when no amount is found", () => {
        expect(
            findAmount(
                [
                    { id: "a_0", value: 0 },
                    { id: "a_1", value: 1 },
                    { id: "a_2", value: 2 },
                ],
                "a_3"
            )
        ).toEqual(undefined)
    })
})
