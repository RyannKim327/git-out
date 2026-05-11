const original = [1, 2, 3, 4];

const filtered = original.filter(n => n !== 3); // [1, 2, 4]
const arr = [1, 2, 3, 4, 3];

const idx = arr.indexOf(3);
if (idx !== -1) {
  arr.splice(idx, 1); // arr is now [1, 2, 4, 3]
}
const arr = ['a', 'b', 'c', 'd'];
arr.splice(2, 1); // removes element at index 2
// arr is now ['a', 'b', 'd']
function removeItem<T>(arr: T[], item: T): T[] {
  const idx = arr.indexOf(item);
  if (idx !== -1) {
    const copy = [...arr];
    copy.splice(idx, 1);
    return copy;
  }
  return arr;
}

const nums = [7, 8, 9];
const updated = removeItem(nums, 8); // [7, 9]
type Item = { id: number; name: string };

const items: Item[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' }
];

const withoutBob = items.filter(item => item.id !== 2);
// smallest change, clean and declarative
const unique = new Set([1, 2, 3, 4]); // Set<number>
unique.delete(3); // removes 3
const arr = [...unique]; // back to an array if needed
