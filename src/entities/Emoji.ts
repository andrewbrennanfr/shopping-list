export const Emoji = /\p{Emoji}/u

/* -------------------------------------------------------------------------- */

export const extractLeadingEmoji = (
    string: string
): { emoji: string | null; text: string } => {
    const match = string.match(Emoji)

    return match && match[0] && match.index === 0
        ? { emoji: match[0], text: string.replace(Emoji, "") }
        : { emoji: null, text: string }
}

export const removeAllEmojis = (string: string): string =>
    string.replaceAll(new RegExp(Emoji.source, `g${Emoji.flags}`), "")
