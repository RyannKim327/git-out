const unique = (arr: readonly any[]) => [...new Set(arr)];

const numbers = [1, 2, 3, 2, 4, 1];
console.log(unique(numbers)); // [1, 2, 3, 4]
function uniqBy<T, K extends keyof T>(arr: readonly T[], key: K): T[] {
  const seen = new Set<any>();
  return arr.filter(item => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const people = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
  { id: 1, name: 'Ada' },
  { id: 3, name: 'Ken' }
];

console.log(uniqBy(people, 'id'));
/*
[
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
  { id: 3, name: 'Ken' }
]
*/
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

const dupObjs = [
  { a: 1, b: 2 },
  { a: 1, b: 2 },
  { a: 3, b: 4 }
];

console.log(uniqWith(dupObjs, isEqual));
// [{ a: 1, b: 2 }, { a: 3, b: 4 }]
const unique = (arr: readonly any[]) =>
  arr.filter((value, index, self) => self.indexOf(value) === index);

console.log(unique([1, 2, 3, 2, 4, 1])); // [1, 2, 3, 4]
const uniq = (arr: readonly any[]) => [...new Set(arr)];
// or for objects by key
const uniqByKey = (arr: readonly any[], key: string) => {
  const seen = new Set();
  return arr.filter(v => !seen.has(v[key]) && !seen.add(v[key]));
};
