// original array
const numbers = [3, 5, 3, 7, 5, 3, 9];

// remove duplicates
const unique = [...new Set(numbers)];

console.log(unique); // [3, 5, 7, 9]
type Item = { id: number; name: string };

const items: Item[] = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 1, name: 'A' },   // duplicate id
];

// keep first occurrence of each id
const uniqueById = Array.from(
  new Map(items.map(i => [i.id, i])).values()
);

console.log(uniqueById); // [{id:1,name:'A'}, {id:2,name:'B'}]
const unique = numbers.filter((v, idx, arr) => arr.indexOf(v) === idx);
