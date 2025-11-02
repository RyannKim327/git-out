const arr = ['a', 'b', 'c', 'd'];
const index = arr.indexOf('b');   // 1
if (index !== -1) arr.splice(index, 1); // ['a', 'c', 'd']
const toRemove = 'b';
for (let i = arr.length - 1; i >= 0; i--) { // iterate backwards
  if (arr[i] === toRemove) arr.splice(i, 1);
}
const arr = ['a', 'b', 'c', 'b'];
const value = 'b';

const newArr = [...arr.slice(0, arr.indexOf(value)),
                ...arr.slice(arr.indexOf(value) + 1)];
// ['a', 'c', 'b']
const newArr = arr.filter(item => item !== 'b'); // ['a', 'c']
function remove<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item));
}

// usage
const nums = [1, 2, 3, 2, 4];
const noTwos = remove(nums, n => n === 2); // [1, 3, 4]
