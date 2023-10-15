export type Amount = {
    id: string
    value: number
}

/* -------------------------------------------------------------------------- */

export const findAmount = (
    amounts: Amount[],
    amountId: Amount["id"]
): Amount | undefined => amounts.find(({ id }) => id === amountId)
