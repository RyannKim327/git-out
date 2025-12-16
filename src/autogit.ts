const values: number[] = [3, 5, 3, 7, 5, 9];
const unique: number[] = [...new Set(values)];

console.log(unique); // [3, 5, 7, 9]
interface Item { id: number; name: string; }

const items: Item[] = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 1, name: 'C' }   // duplicate id
];

// keep last occurrence
const uniqueById = [...new Map(items.map(i => [i.id, i])).values()];

console.log(uniqueById);
// [ { id: 1, name: 'C' }, { id: 2, name: 'B' } ]
function uniqueBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// usage
const uniq = uniqueBy(items, i => i.id);
