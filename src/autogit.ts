const numbers = [3, 5, 3, 7, 5, 9];
const unique = [...new Set(numbers)];   // [3, 5, 7, 9]
type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },
];

const uniqueUsers = Array.from(
  new Map(users.map(u => [u.id, u])).values()
); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
