/**
 * BogoSort (a.k.a. permutation sort, stupid sort, or slow sort)
 * Keeps shuffling the array until it happens to be sorted.
 * Expected time-complexity: O((n+1)!)  –  yes, really.
 * Only for educational purposes … or for torturing CPUs.
 */
function bogoSort<T>(arr: T[]): T[] {
  const isSorted = (a: T[]): boolean =>
    a.every((v, i) => i === 0 || a[i - 1] <= v);

  const shuffle = (a: T[]): void => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  };

  const snapshot = [...arr];          // leave original untouched
  while (!isSorted(snapshot)) shuffle(snapshot);
  return snapshot;
}

/* ---------- tiny demo ---------- */
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("original:", nums);
console.log("bogo’d:  ", bogoSort(nums));
