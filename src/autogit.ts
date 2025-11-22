const arr = ['a', 'b', 'c', 'b'];

// remove first occurrence of 'b'
const index = arr.indexOf('b');
if (index !== -1) arr.splice(index, 1);

console.log(arr); // ['a', 'c', 'b']
const arr = ['a', 'b', 'c', 'b'];

// remove every occurrence of 'b'
const withoutB = arr.filter(item => item !== 'b');

console.log(withoutB); // ['a', 'c']
interface User { id: number; name: string; }

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Cara' }
];

// remove user with id === 2
const idToRemove = 2;

// immutable
const newUsers = users.filter(u => u.id !== idToRemove);

// or in-place
const idx = users.findIndex(u => u.id === idToRemove);
if (idx !== -1) users.splice(idx, 1);
function remove<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item));
}

const numbers = [1, 2, 3, 4, 5];
const evensRemoved = remove(numbers, n => n % 2 === 0); // [1, 3, 5]
