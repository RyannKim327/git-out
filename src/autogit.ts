function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}

// Example
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];
console.log(intersection(arr1, arr2)); // → [3, 4, 5]
function intersectionByOrder<T>(a: T[], b: T[]): T[] {
  const setA = new Set(a);
  return b.filter(x => setA.has(x));
}
function multisetIntersection<T>(a: T[], b: T[]): T[] {
  const counts = new Map<T, number>();
  for (const item of a)
    counts.set(item, (counts.get(item) ?? 0) + 1);

  const result: T[] = [];
  for (const item of b) {
    const cnt = counts.get(item);
    if (cnt && cnt > 0) {
      result.push(item);
      counts.set(item, cnt - 1);
    }
  }
  return result;
}

// Example
// a: [1, 2, 2, 3], b: [2, 2, 4]
console.log(multisetIntersection([1, 2, 2, 3], [2, 2, 4])); // → [2, 2]
function intersectionObjects<T>(a: T[], b: T[], keyFn: (x: T) => any): T[] {
  const map = new Map<any, T>();
  for (const item of b) map.set(keyFn(item), item);

  const result: T[] = [];
  for (const item of a) {
    const match = map.get(keyFn(item));
    if (match) result.push(match); // or push(item) if you prefer
  }
  return result;
}

// Example
interface Person { id: number; name: string }
const peopleA = [{id:1},{id:2},{id:3}];
const peopleB = [{id:2},{id:4}];
console.log(intersectionObjects(peopleA, peopleB, p => p.id)); // → [{id:2}]
export const arrayUtils = {
  intersection: <T>(a: T[], b: T[]) => new Set(b).size ? a.filter(v => new Set(b).has(v)) : [],
  // … other helpers here
};
