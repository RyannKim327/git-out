const original = [1, 2, 3, 2, 4, 1, 5];
const deduped = [...new Set(original)];   // => [1, 2, 3, 4, 5]
const original = [1, 2, 3, 2, 4, 1, 5];
const deduped = original.filter((value, index, self) =>
  self.indexOf(value) === index
); // => [1, 2, 3, 4, 5]
const original = [1, 2, 3, 2, 4, 1, 5];
const deduped = original.reduce<number[]>((acc, val) => {
  if (!acc.includes(val)) {
    acc.push(val);
  }
  return acc;
}, []);  // => [1, 2, 3, 4, 5]
function dedupe<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
const cleaned = dedupe([1, 1, 2, 3, 3]); // -> [1, 2, 3]
type Obj = Record<string, any>;

function dedupeDeep<T extends Obj>(arr: T[]): T[] {
  const seen = new Set<string>();
  return arr.filter(item => {
    const key = JSON.stringify(item);
    return seen.has(key) ? false : seen.add(key);
  });
}
