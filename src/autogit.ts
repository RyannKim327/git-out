function removeByValue<T>(arr: T[], value: T): void {
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);   // remove 1 element at `index`
  }
}

// Example
const nums = [1, 2, 3, 2];
removeByValue(nums, 2);
console.log(nums); // [1, 3, 2]   (only the first 2 removed)
function removeAll<T>(arr: T[], value: T): T[] {
  return arr.filter(item => item !== value);
}

// Example
const letters = ['a', 'b', 'c', 'b'];
const withoutB = removeAll(letters, 'b');
console.log(withoutB); // ['a', 'c']
interface Person {
  id: number;
  name: string;
}

function removeById(arr: Person[], id: number): void {
  const idx = arr.findIndex(p => p.id === id);
  if (idx !== -1) {
    arr.splice(idx, 1);
  }
}

// Example
const people: Person[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Cara' },
];
removeById(people, 2);
console.log(people); // [{id:1,…},{id:3,…}]
function removeByIdImmutable(arr: Person[], id: number): Person[] {
  const idx = arr.findIndex(p => p.id === id);
  if (idx === -1) return arr; // nothing to remove
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}
function removeWhere<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item));
}

// Example: drop all even numbers
const numbers = [1, 2, 3, 4, 5];
const odds = removeWhere(numbers, n => n % 2 === 0);
console.log(odds); // [1,3,5]
/**
 * Remove the first element that satisfies `predicate`.
 * Returns a **new** array (immutable) – the original is left untouched.
 */
function removeFirst<T>(arr: readonly T[], predicate: (item: T) => boolean): T[] {
  const idx = arr.findIndex(predicate);
  if (idx === -1) return [...arr]; // nothing matched
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

// Usage
type Todo = { id: number; text: string };
const todos: Todo[] = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Write code' },
];
const updated = removeFirst(todos, t => t.id === 2);
console.log(updated); // [{id:1,…}]
// Mutating (fast, in‑place)
arr.splice(arr.indexOf(value), 1);

// Immutable (safe for React/Redux)
const newArr = arr.filter(v => v !== value);
