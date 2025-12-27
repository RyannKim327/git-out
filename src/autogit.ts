/**
 * 🎲 Random Sort: Bogosort (a.k.a. Monkey Sort, Stupid Sort)
 * Time complexity: O((n+1)!) on average
 * Space complexity: O(1)
 * Use case: absolutely none (educational only)
 */
export function bogosort<T>(arr: T[]): T[] {
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

/* ------------------ quick sanity check ------------------ */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('bogosort eventually sorts', () => {
    const nums = [3, 1, 4, 1, 5, 9, 2, 6];
    const sorted = bogosort(nums);
    expect(sorted).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });
}
