function secondLargestSort(arr: number[]): number | undefined {
  if (arr.length < 2) return undefined;

  const sorted = [...arr].sort((a, b) => b - a); // Descending
  return sorted[1];
}
function secondLargestSinglePass(arr: number[]): number | undefined {
  if (arr.length < 2) return undefined;

  let max = -Infinity;
  let second = -Infinity;

  for (const num of arr) {
    if (num > max) {
      second = max;
      max = num;
    } else if (num > second && num !== max) {
      second = num;
    }
  }

  return second === -Infinity ? undefined : second;
}
function secondLargestSet(arr: number[]): number | undefined {
  const unique = [...new Set(arr)];
  if (unique.length < 2) return undefined;

  const sorted = unique.sort((a, b) => b - a);
  return sorted[1];
}
function secondLargestMathMax(arr: number[]): number | undefined {
  if (arr.length < 2) return undefined;

  const max = Math.max(...arr);
  const maxFiltered = arr.filter(num => num !== max);
  return Math.max(...maxFiltered);
}
