// Bogosort (random sort) - not practical for large arrays, just for fun.

type Comparator<T> = (a: T, b: T) => number;

function defaultCompare(a: any, b: any): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

function isSorted<T>(arr: T[], compare: Comparator<T>): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i - 1], arr[i]) > 0) return false;
  }
  return true;
}

function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function bogosort<T>(
  arr: T[],
  compare?: Comparator<T>,
  maxIterations?: number
): T[] {
  const a = arr.slice();
  const cmp = compare ?? defaultCompare;
  let iterations = 0;

  while (!isSorted(a, cmp)) {
    if (maxIterations != null && iterations >= maxIterations) break;
    shuffleInPlace(a);
    iterations++;
  }

  return a;
}

// Example usage:
const data = [3, 1, 4, 1, 5, 9, 2];
const sorted = bogosort<number>(data);
console.log("Original:", data);
console.log("Bogosorted (may be unsorted if maxIterations hit):", sorted);
