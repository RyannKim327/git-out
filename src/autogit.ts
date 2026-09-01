const numbers = [1, 2, 3, 4, 5];

// remove the value 3
const withoutThree = numbers.filter(n => n !== 3);
console.log(withoutThree); // [1, 2, 4, 5]
type Person = { id: number; name: string };
const list: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const target = list[1]; // the Bob object reference
const withoutBob = list.filter(person => person !== target);
const letters = ['a', 'b', 'c', 'd', 'e'];
const idx = 2; // we want to drop 'c'

letters.splice(idx, 1); // remove 1 element at position idx
console.log(letters); // ['a', 'b', 'd', 'e']
const data = [10, 20, 30, 20, 40];
const removeVal = 20;

for (let i = data.length - 1; i >= 0; i--) {
  if (data[i] === removeVal) {
    data.splice(i, 1);
  }
}
console.log(data); // [10, 30, 40]
/**
 * Removes the first occurrence of `value` from `arr`.
 */
function removeFirst<T>(arr: T[], value: T): T[] {
  const idx = arr.indexOf(value);
  if (idx === -1) return arr;          // nothing found
  const copy = [...arr];               // keep original intact
  copy.splice(idx, 1);
  return copy;
}
