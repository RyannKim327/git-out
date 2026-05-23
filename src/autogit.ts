const fruits = ['apple', 'banana', 'cherry', 'banana'];

const withoutBanana = fruits.filter(f => f !== 'banana');

console.log(withoutBanana); // ['apple', 'cherry']
// Remove the first object with id === 42
const items = [{ id: 1 }, { id: 42 }, { id: 3 }];
const itemsWithout42 = items.filter(item => item.id !== 42);
const numbers = [10, 20, 30, 40];
const indexToRemove = 2; // 30

// splice(start, deleteCount)
numbers.splice(indexToRemove, 1);

console.log(numbers); // [10, 20, 40]
const arr = [1, 2, 3, 4, 5];
const cond = (x: number) => x % 2 === 0; // remove evens

// Find first match and splice it out
const idx = arr.findIndex(cond);
if (idx !== -1) arr.splice(idx, 1);

console.log(arr); // [1, 3, 5]
// Remove the first occurrence of a value
export function removeFirst<T>(arr: T[], target: T): T[] {
  const idx = arr.findIndex(v => v === target);
  if (idx === -1) return [...arr]; // not found, return copy
  const copy = [...arr];
  copy.splice(idx, 1);
  return copy; // or return copy and let caller decide
}

// Remove by index (mutable)
export function removeAt<T>(arr: T[], index: number): void {
  if (index >= 0 && index < arr.length) {
    arr.splice(index, 1);
  }
}
// Keep everything except index 3
const newArr = [...arr.slice(0, 3), ...arr.slice(4)];
