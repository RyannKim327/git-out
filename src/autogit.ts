const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

const common = arr1.filter(v => arr2.includes(v));
console.log(common); // [3, 4]
function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter(v => b.includes(v));
}
function intersectionSet<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter(v => setB.has(v));
}
function intersectionMultiset<T>(a: T[], b: T[]): T[] {
  const freq = new Map<T, number>();
  for (const val of b) freq.set(val, (freq.get(val) ?? 0) + 1);

  const result: T[] = [];
  for (const val of a) {
    const count = freq.get(val);
    if (count && count > 0) {
      result.push(val);
      freq.set(val, count - 1);
    }
  }
  return result;
}
interface User { id: number; name: string; }

const usersA: User[] = [ {id:1, name:'Alice'}, {id:2, name:'Bob'} ];
const usersB: User[] = [ {id:2, name:'Bobby'}, {id:3, name:'Charlie'} ];

const intersectionById = usersA.filter(uA =>
  usersB.some(uB => uB.id === uA.id)
);
console.log(intersectionById); // [{id:2,name:'Bob'}]
const intersection = <T>(a: T[], b: T[]): T[] =>
  a.filter(v => new Set(b).has(v));
const setIntersection = <T>(a: T[], b: T[]): Set<T> => {
  const setA = new Set(a);
  const setB = new Set(b);
  const result = new Set<T>();
  for (const v of setA) if (setB.has(v)) result.add(v);
  return result;
};
