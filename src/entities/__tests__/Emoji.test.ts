import { extractLeadingEmoji, removeAllEmojis } from "@/entities/Emoji"
import { describe, expect, it } from "bun:test"

/* -------------------------------------------------------------------------- */

describe("extractLeadingEmoji", () => {
    it("returns the leading emoji in a string", () => {
        expect(extractLeadingEmoji("😀 Hello World!")).toEqual({
            emoji: "😀",
            text: " Hello World!",
        })
    })

    it("returns undefined when there is no leading emoji", () => {
        expect(extractLeadingEmoji("Hello😀 World!")).toEqual({
            emoji: null,
            text: "Hello😀 World!",
        })
    })
})

/* -------------------------------------------------------------------------- */

describe("removeAllEmojis", () => {
    it("returns the string with all emojis replaced", () => {
        expect(removeAllEmojis("😀 Hello 😁World! 😊")).toEqual(
            " Hello World! "
        )
    })
})
