function uniq<T>(arr: T[]): T[] {
  // A Set only keeps one copy of each value.
  return [...new Set(arr)];
}

/* Example */
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqNumbers = uniq(numbers); // [1, 2, 3, 4, 5]

const strings = ['a', 'b', 'a', 'c'];
const uniqStrings = uniq(strings); // ['a', 'b', 'c']
function uniq<T>(arr: T[]): T[] {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

/* Example */
const uniqNumbers = uniq([1, 2, 2, 3]); // [1, 2, 3]
function uniq<T>(arr: T[]): T[] {
  const seen = new Map<T, true>();
  return arr.reduce<T[]>((result, item) => {
    if (!seen.has(item)) {
      seen.set(item, true);
      result.push(item);
    }
    return result;
  }, []);
}
interface User {
  id: number;
  name: string;
}

/**
 * Returns a new array with only the first occurrence of each `key`.
 */
function uniqBy<T, K extends keyof any>(arr: T[], key: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter(item => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* Example */
const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (duplicate)' },
];

const uniqueUsers = uniqBy(users, u => u.id);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
function uniqByKeepLast<T, K extends keyof any>(arr: T[], key: (item: T) => K): T[] {
  const map = new Map<K, T>();
  arr.forEach(item => map.set(key(item), item));
  return Array.from(map.values());
}
import { uniq, uniqBy } from 'lodash';

const uniqNumbers = uniq([1, 2, 2, 3]);               // [1, 2, 3]
const uniqUsers   = uniqBy(users, u => u.id);       // same as our `uniqBy` above
/**
 * Remove duplicates from an array.
 *
 * @param arr   The source array.
 * @param keyFn Optional function that returns a value used for equality.
 *              If omitted, strict equality (`===`) is used.
 */
export function uniq<T, K = T>(arr: T[], keyFn?: (item: T) => K): T[] {
  const seen = new Set<K>();
  const getKey = keyFn ?? ((x: any) => x as unknown as K);

  return arr.filter(item => {
    const k = getKey(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* Usage */
const uniqNumbers = uniq([1, 2, 2, 3]);                     // primitives
const uniqUsers   = uniq(users, u => u.id);                // objects by id
// 1️⃣ Primitive array
const uniqPrimitives = [...new Set(myArray)];

// 2️⃣ Object array, dedupe by `id`
const uniqObjects = myArray.filter(
  (obj, i) => myArray.findIndex(o => o.id === obj.id) === i
);
// or, more efficiently:
const uniqObjects = uniqBy(myArray, o => o.id);
