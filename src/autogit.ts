const nums = [1, 2, 3, 2, 4, 1, 5];

const uniq = Array.from(new Set(nums));
// or: const uniq = [...new Set(nums)];

console.log(uniq); // [1, 2, 3, 4, 5]
const words = ["foo", "bar", "baz", "foo", "bar"];

const unique = words.filter((w, i, arr) => arr.indexOf(w) === i);

console.log(unique); // ["foo", "bar", "baz"]
const objs = [{a: 1}, {a: 1}, {a: 2}];
console.log([...new Set(objs)]); // keeps both {a:1} objects
function uniqByKey<T>(arr: T[], keyFn: (item: T) => string) {
  const seen = new Set<string>();
  return arr.filter(item => {
    const key = keyFn(item);
    return seen.has(key) ? false : seen.add(key);
  });
}

const uniqueObjs = uniqByKey(objs, obj => JSON.stringify(obj));
console.log(uniqueObjs); // [{a:1}, {a:2}]
const arr = [1, 2, 3, 2, 1];
const seen = new Set<number>();
let writeIdx = 0;

for (let readIdx = 0; readIdx < arr.length; readIdx++) {
  const value = arr[readIdx];
  if (!seen.has(value)) {
    seen.add(value);
    arr[writeIdx++] = value;
  }
}

arr.length = writeIdx; // shrink the array
console.log(arr); // [1, 2, 3]
