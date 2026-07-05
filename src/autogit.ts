function kthSmallestBySort<T>(arr: T[], k: number, compareFn?: (a: T, b: T) => number): T | undefined {
  if (k < 1 || k > arr.length) return undefined;          // out of range

  // cloning so we don’t mutate the caller’s array
  const copy = [...arr];

  // If you need custom ordering, pass a compare function.
  // Default: numeric ascending.
  copy.sort(compareFn ?? ((a, b) => (a as any) - (b as any)));

  // Arrays are zero‑indexed
  return copy[k - 1];
}

// Example
const nums = [7, 3, 5, 2, 9];
console.log(kthSmallestBySort(nums, 2));   // 3
function kthSmallestQuickSelect<T>(arr: T[], k: number, compareFn?: (a: T, b: T) => number): T | undefined {
  if (k < 1 || k > arr.length) return undefined;

  const comp = compareFn ?? ((a, b) => (a as any) - (b as any));
  const clone = [...arr]; // keep the original untouched

  function partition(left: number, right: number, pivotIndex: number): number {
    const pivotValue = clone[pivotIndex];
    // move pivot to end
    [clone[pivotIndex], clone[right]] = [clone[right], clone[pivotIndex]];

    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (comp(clone[i], pivotValue) < 0) {
        [clone[storeIndex], clone[i]] = [clone[i], clone[storeIndex]];
        storeIndex++;
      }
    }
    // move pivot to its final place
    [clone[right], clone[storeIndex]] = [clone[storeIndex], clone[right]];
    return storeIndex;
  }

  let left = 0;
  let right = clone.length - 1;
  let pivotIndex;

  while (true) {
    pivotIndex = partition(left, right, Math.floor((left + right) / 2));
    if (pivotIndex === k - 1) return clone[pivotIndex];
    if (pivotIndex > k - 1) right = pivotIndex - 1;
    else left = pivotIndex + 1;
  }
}
const data = [12, 3, 5, 7, 4, 19, 26];
console.log(kthSmallestQuickSelect(data, 4)); // 7
class MinHeap<T> {
  private data: T[] = [];
  constructor(private compare: (a: T, b: T) => number) {}
  // heap methods omitted for brevity...
}

function kthSmallestWithHeap<T>(arr: T[], k: number, compareFn?: (a: T, b: T) => number): T | undefined {
  if (k < 1 || k > arr.length) return undefined;
  const cmp = compareFn ?? ((a, b) => (a as any) - (b as any));
  const heap = new MinHeap<T>(cmp);
  for (const v of arr) heap.insert(v);
  let result: T | undefined;
  for (let i = 0; i < k; i++) result = heap.extractMin();
  return result;
}
const people = [
  { name: 'Alice', age: 24 },
  { name: 'Bob', age: 19 },
  { name: 'Carol', age: 32 },
  { name: 'Dave', age: 28 }
];

// 3rd youngest
const thirdYoungest = kthSmallestQuickSelect(
  people,
  3,
  (a, b) => a.age - b.age
);

console.log(thirdYoungest); // shows Bob (age 19)
