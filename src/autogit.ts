function uniq<T>(arr: T[]): T[] {
  // A Set only stores unique values.
  return [...new Set(arr)];
}

/* Example */
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqNumbers = uniq(numbers); // [1, 2, 3, 4, 5]
function uniq<T>(arr: T[]): T[] {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

/* Example */
const fruits = ['apple', 'banana', 'apple', 'orange'];
const uniqFruits = uniq(fruits); // ['apple', 'banana', 'orange']
type Person = { id: number; name: string };

function uniqBy<T, K extends keyof any>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Map<K, T>();
  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.set(key, item);
    }
  }
  return Array.from(seen.values());
}

/* Example */
const people: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (duplicate)' },
];

const uniqPeople = uniqBy(people, p => p.id);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
// Overload signatures
function uniq<T>(arr: T[]): T[];
function uniq<T, K extends keyof any>(arr: T[], keyFn: (item: T) => K): T[];

// Implementation
function uniq<T, K extends keyof any>(arr: T[], keyFn?: (item: T) => K): T[] {
  if (!keyFn) {
    // Primitive path – Set is fastest
    return [...new Set(arr)];
  }

  const seen = new Map<K, T>();
  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.set(key, item);
    }
  }
  return Array.from(seen.values());
}

/* Usage */
const nums = uniq([1, 2, 2, 3]); // [1, 2, 3]

type Book = { isbn: string; title: string };
const books: Book[] = [
  { isbn: '123', title: 'TS Basics' },
  { isbn: '456', title: 'Node.js' },
  { isbn: '123', title: 'Duplicate' },
];
const uniqBooks = uniq(books, b => b.isbn);
// [{ isbn: '123', title: 'TS Basics' }, { isbn: '456', title: 'Node.js' }]
import uniq from 'lodash/uniq';               // primitives only
import uniqBy from 'lodash/uniqBy';           // objects with key selector

const uniqNumbers = uniq([1, 2, 2, 3]);       // [1, 2, 3]
const uniqBooks = uniqBy(books, b => b.isbn);
/**
 * Remove duplicate entries from an array.
 * - For primitives: uses Set (fastest).
 * - For objects: provide a key selector.
 */
export function uniq<T, K extends keyof any = never>(
  arr: T[],
  keyFn?: (item: T) => K
): T[] {
  if (!keyFn) {
    // Primitive values – Set does the job.
    return [...new Set(arr)];
  }

  const seen = new Map<K, T>();
  for (const item of arr) {
    const k = keyFn(item);
    if (!seen.has(k)) seen.set(k, item);
  }
  return Array.from(seen.values());
}

/* -------------------------------------------------
   Example usage
---------------------------------------------------*/
const nums = uniq([1, 2, 2, 3]); // → [1,2,3]

type User = { id: string; name: string };
const users: User[] = [
  { id: 'a', name: 'Alice' },
  { id: 'b', name: 'Bob' },
  { id: 'a', name: 'Alice (dup)' },
];
const uniqUsers = uniq(users, u => u.id);
// → [{id:'a', name:'Alice'}, {id:'b', name:'Bob'}]
