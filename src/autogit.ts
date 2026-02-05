const uniq = <T>(arr: T[]): T[] => [...new Set(arr)];

const numbers = [1, 2, 3, 2, 4, 1];
console.log(uniq(numbers)); // [1, 2, 3, 4]
const uniq = <T>(arr: T[]): T[] =>
  arr.filter((value, index, self) => self.indexOf(value) === index);

const words = ["a", "b", "a", "c", "b"];
console.log(uniq(words)); // ["a", "b", "c"]
const uniq = <T>(arr: T[]): T[] =>
  arr.reduce((seen, val) => {
    if (!seen.includes(val)) seen.push(val);
    return seen;
  }, [] as T[]);
function uniqInPlace<T>(arr: T[]): void {
  const seen = new Set<T>();
  let writeIdx = 0;

  for (const v of arr) {
    if (!seen.has(v)) {
      seen.add(v);
      arr[writeIdx++] = v;
    }
  }

  // Optional: truncate the array
  arr.length = writeIdx;
}

const data = [5, 3, 5, 2, 3];
uniqInPlace(data);
console.log(data); // [5, 3, 2]
