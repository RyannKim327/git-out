const original = [1, 2, 3, 4, 5];

// remove every 3
const withoutThree = original.filter(v => v !== 3);

console.log(original);       // [1, 2, 3, 4, 5]
console.log(withoutThree);   // [1, 2, 4, 5]
const removeFirstThree = original.filter((v, i) => v !== 3 || i !== 1);
const arr = [1, 2, 3, 4, 5];

// find the index you want to remove
const idx = arr.indexOf(3);
if (idx !== -1) {
  arr.splice(idx, 1);      // remove 1 element at idx
}
console.log(arr);           // [1, 2, 4, 5]
let i = 0;
while (i < arr.length) {
  if (arr[i] === 3) {
    arr.splice(i, 1);
  } else {
    i++;
  }
}
function removeAtIndex<T>(arr: T[], idx: number): T[] {
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

const withoutIdx = removeAtIndex(original, 2);
const set = new Set(original);
set.delete(3);
const arrFromSet = Array.from(set);
interface Person { id: number; name: string }
const people = [{ id: 1 }, { id: 2 }, { id: 3 }];

const withoutId2 = people.filter(p => p.id !== 2);   // immutable
// or
const idx = people.findIndex(p => p.id === 2);
if (idx !== -1) people.splice(idx, 1);               // mutate
