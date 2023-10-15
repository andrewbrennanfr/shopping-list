export type Unit = {
    id: string
    type: string
}

/* -------------------------------------------------------------------------- */

export const findUnit = (units: Unit[], unitId: Unit["id"]): Unit | undefined =>
    units.find(({ id }) => id === unitId)
