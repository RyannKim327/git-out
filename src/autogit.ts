/**
 * BogoSort (a.k.a. Monkey Sort, Stupid Sort)
 * Time complexity: O((n+1)!) on average – not a typo!
 * Only useful for educational purposes or pranking colleagues.
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

/* ------------------- Demo ------------------- */
const nums = [5, 2, 9, 1, 5, 6];
console.log('Original:', nums);
console.log('BogoSorted:', bogoSort(nums));
