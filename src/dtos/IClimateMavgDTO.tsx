export interface IClimateMavgDTO {
    gcm: string,
    variable?: string,
    monthVals: number[],
    fromYear?: number,
    toYear?: number
}
