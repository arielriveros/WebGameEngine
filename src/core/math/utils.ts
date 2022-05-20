/**
 * Random number generator between min and max
 * @param max Upper bound
 * @param min Lower Bound
 * @returns Random number between min and max
 */
export function randomNumber(max: number = 1, min: number = 0): number {
    return Math.random() * (max - min) + min;
}