// Generic helper – works with any comparable type that can be used as a Map key
function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter(item => setB.has(item));
}

// Simple test
const arr1 = [1, 2, 3, 5, 8];
const arr2 = [3, 4, 5, 6, 9];

console.log(intersection(arr1, arr2)); // → [3, 5]
function firstIntersection<T>(a: T[], b: T[]): T | undefined {
  const setB = new Set(b);
  for (const item of a) {
    if (setB.has(item)) return item;
  }
}
function intersectionBy<T, K extends keyof T>(
  a: T[],
  b: T[],
  key: K
): T[] {
  const map = new Map(b.map(v => [v[key], v]));
  return a.filter(v => map.has(v[key]));
}
interface User { id: number; name: string }
const usersA = [{ id:1 },{ id:2 },{ id:3 }]
const usersB = [{ id:2 },{ id:3 },{ id:4 }]
console.log(intersectionBy(usersA, usersB, 'id')) // → [{id:2},{id:3}]
const uniqCommon = Array.from(new Set(intersection(arr1, arr2)));
