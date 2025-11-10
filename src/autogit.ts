const numbers = [3, 5, 3, 7, 5, 9];

const unique = [...new Set(numbers)];   // [3, 5, 7, 9]
type Item = { id: number; name: string };

function uniqueBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  const seen = new Set<T[K]>();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

const data: Item[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice II' }   // duplicate id
];

const deduped = uniqueBy(data, 'id');
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
const unique = arr.filter((v, i, a) => a.indexOf(v) === i);
