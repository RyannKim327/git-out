/**
 * Randomly sorts (shuffles) an array in place.
 * Uses the Fisher‑Yates algorithm for a uniform shuffle.
 */
function randomSort<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Swap arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
console.log('Before:', numbers);
console.log('After  :', randomSort([...numbers])); // clone to keep original unchanged
function randomComparator<T>(a: T, b: T) {
  return Math.random() - 0.5;   // not guaranteed to be a stable sort
}
const scrambled = [...numbers].sort(randomComparator);
console.log(scrambled);
