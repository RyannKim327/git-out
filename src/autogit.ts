function removeBySplice<T>(arr: T[], value: T): void {
  const index = arr.indexOf(value);   // works for primitives (string, number, etc.)
  if (index !== -1) {
    arr.splice(index, 1);             // remove 1 element at that index
  }
}

// Example
const numbers = [1, 2, 3, 4];
removeBySplice(numbers, 3);
console.log(numbers); // [1, 2, 4]
function removeByFilter<T>(arr: T[], value: T): T[] {
  return arr.filter(item => item !== value);
}

// Example
const fruits = ['apple', 'banana', 'cherry'];
const withoutBanana = removeByFilter(fruits, 'banana');
console.log(withoutBanana); // ['apple', 'cherry']
interface User {
  id: number;
  name: string;
}

function removeUserById(users: User[], idToRemove: number): void {
  const idx = users.findIndex(u => u.id === idToRemove);
  if (idx !== -1) {
    users.splice(idx, 1);
  }
}

// Example
const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' },
];
removeUserById(users, 2);
console.log(users); // [{id:1,…},{id:3,…}]
function removeWithReduce<T>(arr: T[], value: T): { result: T[]; removed: number } {
  return arr.reduce(
    (acc, cur) => {
      if (cur === value) {
        acc.removed += 1;
      } else {
        acc.result.push(cur);
      }
      return acc;
    },
    { result: [] as T[], removed: 0 }
  );
}

// Example
const data = [5, 6, 5, 7];
const { result, removed } = removeWithReduce(data, 5);
console.log(result); // [6, 7]
console.log(removed); // 2
function removeUsingSet<T>(arr: T[], value: T): T[] {
  const s = new Set(arr);
  s.delete(value);
  return Array.from(s);
}

// Example
const letters = ['a', 'b', 'c', 'b'];
const uniq = removeUsingSet(letters, 'b');
console.log(uniq); // ['a', 'c']  (duplicates removed)
// Mutating version (primitive)
arr.splice(arr.indexOf(value), 1);

// Immutable version (primitive)
arr = arr.filter(v => v !== value);

// Immutable version (object, by property)
arr = arr.filter(item => item.id !== idToRemove);
/**
 * Removes the first occurrence of `value` from `arr`.
 * Mutates the original array and returns a boolean indicating success.
 */
export function removeFirst<T>(arr: T[], value: T): boolean {
  const idx = arr.indexOf(value);
  if (idx === -1) return false;
  arr.splice(idx, 1);
  return true;
}

/**
 * Returns a new array without any elements that satisfy `predicate`.
 * Does **not** mutate the original array.
 */
export function removeWhere<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item));
}

/**
 * Removes an element by a key (e.g., `id`) from an array of objects.
 * Mutates the original array.
 */
export function removeByKey<T extends Record<K, unknown>, K extends keyof T>(
  arr: T[],
  key: K,
  keyValue: T[K]
): boolean {
  const idx = arr.findIndex(item => item[key] === keyValue);
  if (idx === -1) return false;
  arr.splice(idx, 1);
  return true;
}
