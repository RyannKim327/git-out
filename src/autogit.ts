const numbers: number[] = [3, 5, 3, 7, 5, 3];
const unique: number[] = [...new Set(numbers)];

console.log(unique); // [3, 5, 7]
type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },   // duplicate id
];

// keep first occurrence of each id
const uniqueUsers = Array.from(
  new Map(users.map(u => [u.id, u])).values()
);

console.log(uniqueUsers); // [{id:1, name:'Alice'}, {id:2, name:'Bob'}]
const unique = numbers.filter((v, i, a) => a.indexOf(v) === i);
