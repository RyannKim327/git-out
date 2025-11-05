const nums = [1, 2, 3, 2, 4];
const without2 = nums.filter(n => n !== 2);   // [1, 3, 4]
const idx = nums.indexOf(2);      // first index of `2`
if (idx !== -1) nums.splice(idx, 1);   // mutates original array
const removeFirst = <T>(arr: T[], predicate: (t: T) => boolean): T[] => {
  const i = arr.findIndex(predicate);
  return i === -1 ? [...arr] : [...arr.slice(0, i), ...arr.slice(i + 1)];
};

const withoutFirst2 = removeFirst(nums, n => n === 2); // [1, 3, 2, 4]
const pull = <T>(arr: T[], ...values: T[]): T[] =>
  arr.filter(v => !values.includes(v));

const remaining = pull(nums, 2, 4); // [1, 3]
