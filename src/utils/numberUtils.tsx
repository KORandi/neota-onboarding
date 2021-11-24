export function round(number: number, decimals = 2): number {
  if (decimals < 0) {
    return number;
  }
  return Math.round(number * 10 ** decimals) / 10 ** decimals;
}
