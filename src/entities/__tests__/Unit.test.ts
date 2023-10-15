import { findUnit } from "@/entities/Unit"
import { describe, expect, it } from "bun:test"

/* -------------------------------------------------------------------------- */

describe("findUnit", () => {
    it("returns the unit with the given id", () => {
        expect(
            findUnit(
                [
                    { id: "u_0", type: "a" },
                    { id: "u_1", type: "b" },
                    { id: "u_2", type: "c" },
                ],
                "u_1"
            )
        ).toEqual({ id: "u_1", type: "b" })
    })

    it("returns undefined when no unit is found", () => {
        expect(
            findUnit(
                [
                    { id: "u_0", type: "a" },
                    { id: "u_1", type: "b" },
                    { id: "u_2", type: "c" },
                ],
                "u_4"
            )
        ).toEqual(undefined)
    })
})
