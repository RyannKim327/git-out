function uniq<T>(arr: T[]): T[] {
  // A Set only keeps one copy of each value.
  return [...new Set(arr)];
}

/* Example */
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqNumbers = uniq(numbers); // → [1, 2, 3, 4, 5]

const strings = ['a', 'b', 'a', 'c'];
const uniqStrings = uniq(strings); // → ['a', 'b', 'c']
function uniq<T>(arr: T[]): T[] {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

/* Example */
const uniqNumbers = uniq([1, 2, 2, 3]); // → [1, 2, 3]
interface Person {
  id: number;
  name: string;
}

function uniqBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
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
// → [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
import uniq from 'lodash/uniq';          // for primitives
import uniqBy from 'lodash/uniqBy';      // for objects

const uniqNumbers = uniq([1, 2, 2, 3]);               // → [1, 2, 3]
const uniqPeople = uniqBy(people, p => p.id);        // → same as the custom `uniqBy`
const uniq = <T>(arr: readonly T[]): T[] => [...new Set(arr)];
const uniq = <T>(arr: T[]): T[] => [...new Set(arr)];
const uniqBy = <T, K>(arr: T[], key: (x: T) => K): T[] => {
  const map = new Map<K, T>();
  arr.forEach(item => {
    const k = key(item);
    if (!map.has(k)) map.set(k, item);
  });
  return Array.from(map.values());
};
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

const uniqNumbers = uniq([1, 2, 2, 3]);          // → [1, 2, 3]
const uniqPeople = uniqBy(people, p => p.id);   // → deduped by id
