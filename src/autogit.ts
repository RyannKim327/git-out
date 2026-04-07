const original = [1, 2, 3, 2, 4, 1];

const withoutDups = Array.from(new Set(original)); // [1, 2, 3, 4]
const arr = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 1, name: 'A' }, // duplicate by id
];

const seen = new Set<number>();
const unique = arr.filter(item => {
  const key = item.id;                 // pick what defines uniqueness
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});
// [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
const arr = [
  { id: 'x', data: 10 },
  { id: 'y', data: 20 },
  { id: 'x', data: 30 }, // later duplicate
];

const map = new Map<string, typeof arr[0]>();
for (const item of arr) {
  if (!map.has(item.id)) map.set(item.id, item);
}
const withoutDups = Array.from(map.values()); // keeps the first 'x'
function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
const nums = uniq([4, 5, 4, 6, 5]); // [4, 5, 6]
const arr = [1, 2, 3, 2, 4];

const unique = arr.reduce<T[]>((acc, cur) => {
  if (!acc.includes(cur)) acc.push(cur);
  return acc;
}, []); // [1, 2, 3, 4]
function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

console.log(dedupe([1, 2, 2, 3])); // 1 2 3
console.log(dedupe(['a', 'b', 'a'])); // a b
