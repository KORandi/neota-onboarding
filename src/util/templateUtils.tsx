export function getMeasurementUnit(searchType: string): string {
  if (searchType === 'tas') {
    // Degrees celsius
    return String.fromCharCode(8451);
  }
  if (searchType === 'pr') {
    return 'mm';
  }
  return '';
}
