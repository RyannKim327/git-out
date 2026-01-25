function mean(values: number[]): number {
  if (values.length === 0) return NaN;          // empty list → no mean

  // total everything up
  const sum = values.reduce((acc, cur) => acc + cur, 0);

  // divide by how many there are
  return sum / values.length;
}
function meanLoop(values: number[]): number {
  if (values.length === 0) return NaN;

  let sum = 0;
  for (const v of values) {
    sum += v;
  }
  return sum / values.length;
}
console.log(mean([1, 2, 3, 4, 5])); // 3
console.log(mean([]));              // NaN
