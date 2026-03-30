const a = [1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7];

const intersection = a.filter(item => new Set(b).has(item));
console.log(intersection); // [3, 4, 5]
const a = [1, 2, 3, 4, 5, 5];
const b = [3, 4, 5, 5, 6];

const setA = new Set(a);
const setB = new Set(b);

const intersection = [...setA].filter(item => setB.has(item));
console.log(intersection); // [3, 4, 5]
function multisetIntersection<T>(arr1: T[], arr2: T[]): T[] {
  const counter = new Map<T, number>();

  // Count each element of arr1
  for (const v of arr1) {
    counter.set(v, (counter.get(v) ?? 0) + 1);
  }

  // For each element in arr2, if it exists in the counter use it
  const result: T[] = [];
  for (const v of arr2) {
    const count = counter.get(v);
    if (count && count > 0) {
      result.push(v);
      counter.set(v, count - 1);
    }
  }
  return result;
}

console.log(multisetIntersection([1, 2, 2, 3], [2, 2, 4]));
// → [2, 2]
const intersection = a.reduce((acc, item) => {
  if (b.includes(item) && !acc.includes(item)) acc.push(item);
  return acc;
}, [] as number[]);
