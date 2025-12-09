// Fisher-Yates shuffle (aka Knuth shuffle) – a “sort” that randomizes order
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();          // don’t mutate caller’s array
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];  // swap
  }
  return a;
}

// Quick-sort with random pivot selection
function quickSortRandom<T>(arr: T[]): T[] {
  if (arr.length < 2) return arr.slice();
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const left: T[] = [];
  const right: T[] = [];
  for (const x of arr) (x < pivot ? left : right).push(x);
  return [...quickSortRandom(left), ...quickSortRandom(right)];
}

// tiny demo
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("shuffled:", shuffle(nums));
console.log("sorted  :", quickSortRandom(nums));
