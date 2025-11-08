// Fisher-Yates shuffle (random sort) in TypeScript
function randomSort<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Example usage:
const nums = [9, 2, 7, 4, 5, 6, 3, 8, 1];
console.log("Original:", nums);
console.log("Shuffled:", randomSort(nums));
