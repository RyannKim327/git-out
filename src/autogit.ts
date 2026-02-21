const original = [1, 2, 3, 2, 4, 1, 5];

// Method 1 – quick & crumb‑free
const withoutDups = [...new Set(original)];
console.log(withoutDups); // [1, 2, 3, 4, 5]

// Method 2 – If you prefer a pure function that you can re‑use
function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

const uniqueColors = uniq(['red', 'green', 'red', 'blue']);
function uniqBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

// Example: removing duplicate users by id
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alicia' },
];

const uniqueUsers = uniqBy(users, u => u.id);
console.log(uniqueUsers);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
