const numbers: number[] = [3, 5, 3, 7, 5, 3];
const unique = [...new Set(numbers)];   // [3, 5, 7]
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob'   },
  { id: 1, name: 'Alice' }   // duplicate id
];

// keep first occurrence of each id
const uniqueUsers = [
  ...new Map(users.map(u => [u.id, u])).values()
];
import { uniqWith } from 'lodash';

const objs = [{a:1}, {a:1}, {a:2}];
const unique = uniqWith(objs, (x, y) => JSON.stringify(x) === JSON.stringify(y));
// [{a:1}, {a:2}]
const unique = data.filter((item, idx, arr) =>
  arr.findIndex(other => JSON.stringify(other) === JSON.stringify(item)) === idx
);
function uniqueBy<T, K>(arr: T[], keyFn: (t: T) => K): T[] {
  return [...new Map(arr.map(item => [keyFn(item), item])).values()];
}

// usage
const unique = uniqueBy(users, u => u.id);
