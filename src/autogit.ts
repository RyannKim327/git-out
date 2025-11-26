const numbers = [3, 5, 3, 7, 5, 3];
const unique = [...new Set(numbers)]; // [3, 5, 7]
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alicia' },   // duplicate id
];

// keep first occurrence of each id
const uniqueUsers = Array.from(
  users.reduce((map, u) => map.set(u.id, u), new Map<number, User>()).values()
);
// → [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
// 1. Preserve original order, but case-insensitive for strings
const uniqCI = (arr: string[]) =>
  [...new Map(arr.map(s => [s.toLowerCase(), s])).values()];

// 2. Deep equality (slow; use only when necessary)
import { isEqual } from 'lodash';
const deepUniq = <T>(arr: T[]): T[] =>
  arr.filter((item, idx) => arr.findIndex(other => isEqual(other, item)) === idx);
