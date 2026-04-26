/**
 * Checks if an array of numbers is in ascending order.
 */
function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

/**
 * Randomly shuffles an array in place using Fisher‑Yates.
 */
function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * A “random sort”—shuffle until the array is sorted.
 *
 * The function is deliberately small and intentionally slow.
 * Good for teaching randomness, not for production work.
 */
export function completelyRandomSort<T extends number>(arr: T[]): T[] {
  // Work on a copy so the original stays untouched.
  const working = [...arr];

  // Keep an iteration counter for demonstration.
  let attempts = 0;

  // Guard against accidentally running forever on empty or single‑element arrays.
  if (working.length <= 1) return working;

  while (!isSorted(working)) {
    shuffleInPlace(working);
    attempts++;
    // Optional: print progress every 1000 attempts (comment this out in tight loops).
    // if (attempts % 1000 === 0) console.log(`Still sorting… attempt #${attempts}`);
  }

  console.log(`Sorted after ${attempts} random shuffles!`);
  return working;
}
const data = [42, 7, 13, 2, 27];
const sorted = completelyRandomSort(data);
console.log(sorted); // → [2, 7, 13, 27, 42]
