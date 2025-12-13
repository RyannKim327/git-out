function removeAtIndex<T>(arr: T[], index: number): void {
  // `splice` mutates the original array and returns the removed items
  arr.splice(index, 1);
}

// Example
const numbers = [10, 20, 30, 40];
removeAtIndex(numbers, 2);   // numbers => [10, 20, 40]
function removeByValue<T>(arr: T[], value: T): boolean {
  const idx = arr.findIndex(item => Object.is(item, value));
  if (idx === -1) return false;   // not found
  arr.splice(idx, 1);
  return true;
}

// Example
const fruits = ['apple', 'banana', 'cherry'];
removeByValue(fruits, 'banana'); // fruits => ['apple', 'cherry']
function withoutValue<T>(arr: readonly T[], value: T): T[] {
  return arr.filter(item => !Object.is(item, value));
}

// Example
const colors = ['red', 'green', 'blue', 'green'];
const newColors = withoutValue(colors, 'green'); // ['red', 'blue']
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Cara' },
];

function removeUserById(arr: readonly User[], idToRemove: number): User[] {
  return arr.filter(user => user.id !== idToRemove);
}

const remaining = removeUserById(users, 2);
// remaining => [{ id: 1, name: 'Ada' }, { id: 3, name: 'Cara' }]
import _ from 'lodash';

const nums = [1, 2, 3, 4, 5, 6];
const evens = _.remove(nums, n => n % 2 === 0);
// nums   => [1, 3, 5]
// evens  => [2, 4, 6]
const arr = [1, 2, 3];
delete arr[1];   // arr => [1, <empty>, 3]
const newArr = arr.filter(item => item !== valueToRemove);
function removeAt<T>(arr: readonly T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// Example
const letters = ['a', 'b', 'c', 'd'];
const withoutC = removeAt(letters, 2); // ['a', 'b', 'd']
/**
 * Remove the first element that satisfies `predicate`.
 * Returns a new array (immutable) and the removed element (or undefined).
 */
export function pull<T>(
  arr: readonly T[],
  predicate: (item: T, index: number, array: readonly T[]) => boolean
): { result: T[]; removed?: T } {
  const idx = arr.findIndex(predicate);
  if (idx === -1) {
    return { result: [...arr] };
  }
  const removed = arr[idx];
  const result = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
  return { result, removed };
}

// Usage
const nums = [10, 20, 30, 40];
const { result: newNums, removed } = pull(nums, n => n === 30);
// newNums => [10, 20, 40]
// removed  => 30
