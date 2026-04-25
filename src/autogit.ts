function removeItem<T>(arr: T[], item: T): void {
  const idx = arr.indexOf(item);      // first occurrence
  if (idx !== -1) {
    arr.splice(idx, 1);               // mutate the original array
  }
}
function removed<T>(arr: T[], item: T): T[] {
  return arr.filter(x => x !== item); // keeps unchanged items
}
function removeAt<T>(arr: T[], idx: number): void {
  if (idx >= 0 && idx < arr.length) {
    arr.splice(idx, 1);
  }
}
const set = new Set(arr);   // unique elements
set.delete(item);           // removes it if present
const newArr = [...set];    // back to an array
type RemoveOptions = {
  /** If true, only remove the first matching element */
  firstOnly?: boolean;
};

function remove<T>(
  arr: T[],
  itemOrIdx: T | number,
  options: RemoveOptions = {}
): T[] {
  const { firstOnly = false } = options;

  // Remove by index
  if (typeof itemOrIdx === 'number') {
    const idx = itemOrIdx;
    if (idx >= 0 && idx < arr.length) {
      return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    }
    return arr;
  }

  // Remove by value
  const item = itemOrIdx as T;
  const idx = arr.indexOf(item);

  if (idx === -1) return arr; // nothing to do

  if (firstOnly) {
    // fast path: mutate in place
    arr.splice(idx, 1);
    return arr;
  }

  // immutable: create a new array
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}
let nums = [1, 2, 3, 2, 4];
remove(nums, 2);          // → [1, 3, 2, 4]   (removes first 2)
remove(nums, 2, {firstOnly: false}); // → [1, 3, 4] (all 2s)
remove(nums, 2, {firstOnly: true});  // -> removes the first 2, mutates the same array
