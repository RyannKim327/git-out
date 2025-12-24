const without = <T>(arr: T[], value: T): T[] =>
  arr.filter(item => item !== value);

const nums = [3, 5, 3, 7];
const cleaned = without(nums, 3);   // [5, 7]
const removeAt = <T>(arr: T[], index: number): T[] => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1)
];

const letters = ['a', 'b', 'c'];
const cropped = removeAt(letters, 1); // ['a', 'c']
const index = arr.indexOf(value);   // or whatever logic gives you the index
if (index !== -1) arr.splice(index, 1);
const remove = <T>(arr: T[], pred: (t: T) => boolean): T[] =>
  arr.filter(item => !pred(item));

const users = [{id: 1}, {id: 2}, {id: 3}];
const remaining = remove(users, u => u.id === 2); // [{id:1},{id:3}]
