// In‑place reversal
const arr = [1, 2, 3, 4];
arr.reverse();             // arr is now [4, 3, 2, 1]
// Make a copy first, then reverse the copy
const arr = [1, 2, 3, 4];
const reversed = [...arr].reverse();   // [4, 3, 2, 1]

 // or
const reversed = arr.slice().reverse();
const reverse = <T>(a: T[]): T[] =>
  a.reduceRight((acc, cur) => [...acc, cur], [] as T[]);
