const raw = [1, 2, 2, 3, 4, 4, 5];

const unique = Array.from(new Set(raw));
// or: const unique = [...new Set(raw)];

console.log(unique); // [1, 2, 3, 4, 5]
function uniqueInPlace<T>(arr: T[]): void {
  const seen = new Set<T>();
  for (let i = arr.length - 1; i >= 0; i--) {
    if (seen.has(arr[i])) {
      arr.splice(i, 1);          // remove duplicate
    } else {
      seen.add(arr[i]);          // record first appearance
    }
  }
}

const data = ['a', 'b', 'a', 'c', 'b'];
uniqueInPlace(data);
console.log(data); // ['a', 'b', 'c']
const raw = [1, 2, 3, 2, 4, 1];
const unique = raw.filter((v, i) => raw.indexOf(v) === i);
console.log(unique); // [1, 2, 3, 4]
interface User { id: number; name: string }

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (dup)' }, // duplicate id
];

const uniqueById = Array.from(
  users.reduce((map, user) => {
    if (!map.has(user.id)) map.set(user.id, user);
    return map;
  }, new Map<number, User>())
);

console.log(uniqueById);
/*
[
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]
*/
