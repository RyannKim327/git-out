/**
 * BogoSort (a.k.a. permutation sort, stupid sort, or slow sort)
 * Keeps shuffling the array until it happens to be sorted.
 * Worst-case: unbounded (infinite) — expected O((n-1)!·n)
 * Only for educational purposes … or for driving colleagues insane.
 */
export function bogoSort<T>(arr: T[]): T[] {
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

/* quick sanity check */
if (require.main === module) {
  const data = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
  console.log('before :', data);
  console.log('after  :', bogoSort(data));
}
