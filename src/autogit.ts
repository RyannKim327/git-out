/**
 * BogoSort (a.k.a. permutation sort, stupid sort, or slow sort)
 * Time-complexity : O((n+1)!) on average – hilariously bad
 * Space-complexity: O(1)
 *
 * Keeps shuffling the array until it accidentally becomes sorted.
 * Useful only as a joke or for very tiny arrays.
 */
function bogoSort<T>(arr: T[]): T[] {
  const isSorted = (a: T[]): boolean => {
    for (let i = 1; i < a.length; i++) {
      if (a[i - 1] > a[i]) return false;
    }
    return true;
  };

  const shuffle = (a: T[]): void => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  };

  const copy = [...arr];          // keep original intact
  while (!isSorted(copy)) shuffle(copy);
  return copy;
}

/* ---------- quick demo ---------- */
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('original:', nums);
console.log('bogoSort:', bogoSort(nums));
