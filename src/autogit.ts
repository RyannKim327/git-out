const original: number[] = [1, 2, 3, 4, 5];
original.reverse();          // original is now [5, 4, 3, 2, 1]
const copy = [...original].reverse(); // or use original.slice().reverse()

// original remains unchanged
function reverseArray<T>(arr: T[]): T[] {
  const len = arr.length;
  const half = Math.floor(len / 2);
  const copy = [...arr]; // keep original intact

  for (let i = 0; i < half; i++) {
    const j = len - 1 - i;
    [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
  }
  return copy;
}

const reversed = reverseArray(original);
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}
