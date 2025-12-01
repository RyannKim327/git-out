/**
 * BogoSort (a.k.a. permutation sort, stupid sort, slowsort, shotgun sort)
 * Time-complexity : O((n+1)!)  --  yes, really
 * Space-complexity: O(1)
 * Stable          : No
 * In-place        : Yes
 *
 * Keep shuffling the array until it happens to be sorted.
 * ⛔ Only for educational purposes – do NOT use in production!
 */
function bogoSort<T>(arr: T[]): T[] {
  const isSorted = (a: T[]): boolean => {
    for (let i = 1; i < a.length; i++) if (a[i - 1] > a[i]) return false;
    return true;
  };

  const shuffle = (a: T[]): void => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  };

  const copy = [...arr]; // do not mutate the caller’s array
  while (!isSorted(copy)) shuffle(copy);
  return copy;
}

/* ---------- small demo ---------- */
const nums = [5, 3, 7, 2];
console.log('original :', nums);
console.log('bogoSort :', bogoSort(nums));
