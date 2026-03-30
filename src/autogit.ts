const arr = ['a', 'b', 'c', 'd'];
const indexToRemove = 2;           // want to drop "c"

if (indexToRemove > -1 && indexToRemove < arr.length) {
  arr.splice(indexToRemove, 1);
}

console.log(arr); // ['a', 'b', 'd']
const index = arr.indexOf('b');
if (index !== -1) arr.splice(index, 1);
const arr = [1, 2, 3, 4, 2];
const valueToRemove = 2;

// keep everything that isn’t the value you want gone
const newArr = arr.filter(item => item !== valueToRemove);

console.log(newArr); // [1, 3, 4]
let removed = false;
const newArr = arr.filter(item => {
  if (!removed && item === valueToRemove) {
    removed = true;           // skip first match
    return false;
  }
  return true;
});
const arr = [{id: 1}, {id: 2}, {id: 3}];
function removeIf(predicate: (elem: any) => boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      arr.splice(i, 1);
    }
  }
}

removeIf(e => e.id === 2);
console.log(arr); // [{id: 1}, {id: 3}]
