// Original array
const original: number[] = [1, 2, 3, 4, 5];

// 1️⃣ In‑place reverse (mutates `original`)
original.reverse();
console.log(original); // [5, 4, 3, 2, 1]

// 2️⃣ Copy then reverse (keeps `original` intact)
const reversedCopy = original.slice().reverse();  // or [...original].reverse()
console.log(reversedCopy);  // [5, 4, 3, 2, 1]
type Person = { name: string; age: number };

const people: Person[] = [
  { name: 'Alice', age: 28 },
  { name: 'Bob',   age: 34 },
];

const reversedPeople = [...people].reverse(); // still Person[]
const reduceReversed = <T>(array: T[]): T[] =>
  array.reduce((acc, cur) => [cur, ...acc], [] as T[]);
