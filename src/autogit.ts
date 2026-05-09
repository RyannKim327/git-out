function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}
const foo = [1, 2, 3, 4];
const bar = [3, 4, 5, 6];
console.log(intersection(foo, bar)); // [3, 4]
function intersectionSorted<T>(a: T[], b: T[]): T[] {
  const sortedA = [...a].sort((x,y)=>x>y?1:-1);
  const sortedB = [...b].sort((x,y)=>x>y?1:-1);
  const res: T[] = [];
  let i = 0, j = 0;

  while (i < sortedA.length && j < sortedB.length) {
    if (sortedA[i] === sortedB[j]) {
      res.push(sortedA[i]); i++; j++;
    } else if (sortedA[i] < sortedB[j]) {
      i++;
    } else {
      j++;
    }
  }
  return res;
}
function uniqueIntersection<T>(a: T[], b: T[]): T[] {
  const seen = new Set(b);
  const out = new Set<T>();
  for (const x of a) if (seen.has(x) && !out.has(x)) out.add(x);
  return [...out];
}
function intersectionBy<T, K>(
  a: T[],
  b: T[],
  keyFn: (item: T) => K
): T[] {
  const setB = new Set(b.map(keyFn));
  return a.filter(x => setB.has(keyFn(x)));
}
const usersA = [{id: 1, name: 'A'}, {id: 2, name: 'B'}];
const usersB = [{id: 2, name: 'B'}, {id: 3, name: 'C'}];

console.log(intersectionBy(usersA, usersB, u => u.id)); // [{id:2,name:'B'}]
const common = a.filter(v => b.includes(v));
type KeyFn<T, K> = (item: T) => K;

// Fastest for primitives
export function intersection<T>(a: T[], b: T[]): T[] {
  const set = new Set(b);
  return a.filter(x => set.has(x));
}

// Preserve order, unique results
export function uniqueIntersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  const out = new Set<T>();
  for (const x of a) if (setB.has(x) && !out.has(x)) out.add(x);
  return [...out];
}

// For objects or custom equality
export function intersectionBy<T, K>(a: T[], b: T[], keyFn: KeyFn<T, K>): T[] {
  const set = new Set(b.map(keyFn));
  return a.filter(x => set.has(keyFn(x)));
}
