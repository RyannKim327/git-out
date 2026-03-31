// Generic helper – keeps the original array untouched
function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
const numbers = [1, 2, 3, 2, 4, 1, 5];
console.log(uniq(numbers));      // [1, 2, 3, 4, 5]

const words = ['apple', 'banana', 'apple', 'orange'];
console.log(uniq(words));        // ['apple', 'banana', 'orange']

// With objects – note that Set checks reference equality
const objs = [{ id: 1 }, { id: 2 }, { id: 1 }];
console.log(uniq(objs));         // [{ id: 1 }, { id: 2 }, { id: 1 }]
function uniqByKey<T, K extends keyof T>(arr: T[], key: K): T[] {
  const seen = new Map<T[K], T>();
  for (const item of arr) {
    if (!seen.has(item[key])) {
      seen.set(item[key], item);
    }
  }
  return Array.from(seen.values());
}

const people = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Ben' },
  { id: 1, name: 'Ana' },
];
console.log(uniqByKey(people, 'id'));  // [{ id: 1, name: 'Ana' }, { id: 2, name: 'Ben' }]
function uniqInPlace<T>(arr: T[]): void {
  const seen = new Set<T>();
  let writeIdx = 0;
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      arr[writeIdx++] = item;
    }
  }
  arr.length = writeIdx; // truncate the rest
}
