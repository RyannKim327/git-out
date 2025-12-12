function intersectSimple<T>(a: T[], b: T[]): T[] {
  return a.filter(item => b.includes(item));
}

// Example
const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];
console.log(intersectSimple(a, b)); // → [3, 4]
function intersectSet<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return Array.from(new Set(a.filter(item => setB.has(item))));
}

// Example
const a = ['apple', 'banana', 'cherry'];
const b = ['banana', 'date', 'apple'];
console.log(intersectSet(a, b)); // → ['apple', 'banana']
function intersectBy<T, K extends keyof any>(
  a: T[],
  b: T[],
  keyFn: (item: T) => K
): T[] {
  const keysB = new Set(b.map(keyFn));
  const seen = new Set<K>();               // optional: dedupe results
  return a.filter(item => {
    const k = keyFn(item);
    const keep = keysB.has(k) && !seen.has(k);
    if (keep) seen.add(k);
    return keep;
  });
}

// Example with objects
type User = { id: number; name: string };
const usersA: User[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Cleo' },
];
const usersB: User[] = [
  { id: 2, name: 'Bob' },
  { id: 4, name: 'Dana' },
  { id: 1, name: 'Ada' },
];

console.log(intersectBy(usersA, usersB, u => u.id));
/* → [
 *   { id: 1, name: 'Ada' },
 *   { id: 2, name: 'Bob' }
 * ] */
function intersectMultiset<T>(a: T[], b: T[]): T[] {
  const count = (arr: T[]) => {
    const map = new Map<T, number>();
    for (const v of arr) map.set(v, (map.get(v) ?? 0) + 1);
    return map;
  };

  const mapA = count(a);
  const mapB = count(b);
  const result: T[] = [];

  for (const [value, cntA] of mapA) {
    const cntB = mapB.get(value);
    if (cntB !== undefined) {
      const times = Math.min(cntA, cntB);
      for (let i = 0; i < times; i++) result.push(value);
    }
  }
  return result;
}

// Example
console.log(intersectMultiset([1, 1, 2, 3], [1, 2, 2, 4])); // → [1, 2]
import { intersection, intersectionBy, intersectionWith } from 'lodash';

const a = [1, 2, 3];
const b = [2, 3, 4];
console.log(intersection(a, b)); // → [2, 3]

// Objects by key
const result = intersectionBy(usersA, usersB, u => u.id);
// utils/arrayIntersection.ts
export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return Array.from(new Set(a.filter(item => setB.has(item))));
}

export function intersectBy<T, K extends keyof any>(
  a: T[],
  b: T[],
  keyFn: (item: T) => K
): T[] {
  const keysB = new Set(b.map(keyFn));
  const seen = new Set<K>();
  return a.filter(item => {
    const k = keyFn(item);
    if (keysB.has(k) && !seen.has(k)) {
      seen.add(k);
      return true;
    }
    return false;
  });
}

export function intersectMultiset<T>(a: T[], b: T[]): T[] {
  const count = (arr: T[]) => {
    const map = new Map<T, number>();
    for (const v of arr) map.set(v, (map.get(v) ?? 0) + 1);
    return map;
  };
  const mapA = count(a);
  const mapB = count(b);
  const out: T[] = [];

  for (const [val, cntA] of mapA) {
    const cntB = mapB.get(val);
    if (cntB) {
      const times = Math.min(cntA, cntB);
      for (let i = 0; i < times; i++) out.push(val);
    }
  }
  return out;
}
import { intersect, intersectBy, intersectMultiset } from './utils/arrayIntersection';

const common = intersect([1,2,3], [2,4,3]);          // → [2,3]
const commonObjs = intersectBy(usersA, usersB, u => u.id);
const commonMulti = intersectMultiset([1,1,2], [1,2,2]); // → [1,2]
const common = Array.from(new Set(arr1.filter(x => new Set(arr2).has(x))));
