const numbers = [1, 2, 3, 2, 4, 1, 5];

// One‑liner:
const unique = [...new Set(numbers)]; // [1, 2, 3, 4, 5]
numbers.length = 0;                      // clear the original array
numbers.push(...new Set(numbers));       // backfill it with unique items
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }
];

const uniqueUsers = users.filter((user, i, arr) =>
  i === arr.findIndex(u => u.id === user.id)
);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
const byId = new Map<number, User>();
for (const u of users) byId.set(u.id, u);
const uniqueUsers = Array.from(byId.values());
