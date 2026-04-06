const original = [1, 2, 3, 4, 5];

// Suppose you want to drop all 3’s (or just the first one you hit)
const removed = original.filter(v => v !== 3);
console.log(removed); // [1, 2, 4, 5]
const idx = original.indexOf(3);
const removedFirst =
  idx === -1 ? original : [...original.slice(0, idx), ...original.slice(idx + 1)];
const arr = [1, 2, 3, 4, 5];
const index = arr.indexOf(3);
if (index !== -1) {
  arr.splice(index, 1); // removes 1 element at that index
}
console.log(arr); // [1, 2, 4, 5]
const original = ['a', 'b', 'c', 'd'];
const removeAt = 2; // remove the element at position 2 ("c")
const newArr = [...original.slice(0, removeAt), ...original.slice(removeAt + 1)];
console.log(newArr); // ['a', 'b', 'd']
const arr = ['a', 'b', 'c', 'd'];
arr.splice(2, 1); // remove the element at index 2
console.log(arr); // ['a', 'b', 'd']
const items = ['red', 'green', 'blue', 'green'];
const toRemove = 'green';
const result = Array.from(new Set(items.filter(v => v !== toRemove)));
function removeByValue<T>(arr: readonly T[], value: T): T[] {
  return arr.filter(v => !Object.is(v, value));
}

// Usage
const numbers = [1, 2, 3, 3, 4];
const cleaned = removeByValue(numbers, 3); // [1, 2, 4]
