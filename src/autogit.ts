/**
 * Returns the arithmetic mean of a non‑empty array of numbers.
 * If the array is empty, NaN is returned.
 */
function mean(values: number[]): number {
  if (values.length === 0) {
    return NaN;           // or you could throw an Error if you prefer
  }

  const sum = values.reduce((acc, cur) => acc + cur, 0);
  return sum / values.length;
}
const data = [12, 18, 30, 45];
console.log(mean(data));   // → 26.25
type Record = { id: number; value: number };

function meanFromRecords(records: Record[]): number {
  const values = records.map(r => r.value);
  return mean(values);
}
