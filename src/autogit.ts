// ------------------------------------------------------------
// 1️⃣  In‑place quick‑sort – most common for competitive coding
// ------------------------------------------------------------
function quickSortInPlace<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): void {
  const swap = (i: number, j: number) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  function partition(low: number, high: number): number {
    // Pick the last element as pivot (simple but fine for demo)
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (compare(arr[j], pivot) <= 0) {
        i++;
        swap(i, j);
      }
    }
    swap(i + 1, high);
    return i + 1;
  }

  function quick(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);
      quick(low, pi - 1);
      quick(pi + 1, high);
    }
  }

  quick(0, arr.length - 1);
}

// ------------------------------------------------------------
// 2️⃣  Functional quick‑sort – returns a new sorted array
// ------------------------------------------------------------
function quickSortFunctional<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (arr.length <= 1) return arr.slice(); // immutable copy

  // Random pivot for better average performance on already‑sorted data
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const lows = arr.filter((v) => compare(v, pivot) < 0);
  const highs = arr.filter((v) => compare(v, pivot) > 0);
  const pivots = arr.filter((v) => compare(v, pivot) === 0);

  return [
    ...quickSortFunctional(lows, compare),
    ...pivots,
    ...quickSortFunctional(highs, compare),
  ];
}

// ------------------------------------------------------------
// 3️⃣  Small helper that wraps the in‑place version and offers
//     a better pivot strategy
// ------------------------------------------------------------
function quickSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  // Randomize the array first; this keeps the pivot “good” on many inputs
  // and eliminates the worst‑case for already‑sorted data.
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  quickSortInPlace(shuffled, compare);
  return shuffled;
}

// ---------------------------
// Demo usage
// ---------------------------

const numbers = [34, 7, 23, 32, 5, 62, 32];
console.log('in‑place:', (() => {
  const copy = [...numbers];
  quickSortInPlace(copy);
  return copy;
})());

console.log('functional:', quickSortFunctional(numbers));

console.log('wrapper:', quickSort(numbers));

// ------------------------------------------------------------
// Done!
// ------------------------------------------------------------
const byLength = (a: string, b: string) => a.length - b.length;
quickSort(stringsArray, byLength);
