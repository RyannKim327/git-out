/**
 * BogoSort (a.k.a. permutation sort, stupid sort, slow sort, shotgun sort)
 * Keeps shuffling the array until it happens to be sorted.
 * Expected time-complexity: O((n+1)!) — delightfully awful.
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

  const copy = [...arr];
  while (!isSorted(copy)) shuffle(copy);
  return copy;
}

/* quick demo */
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("original:", nums);
console.log("bogo’d:  ", bogoSort(nums));
