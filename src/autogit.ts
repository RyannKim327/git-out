function removeValue<T>(arr: T[], value: T): T[] {
  return arr.filter((el) => el !== value);
}

// Example
const numbers = [1, 2, 3, 4, 5];
const withoutThree = removeValue(numbers, 3);
console.log(withoutThree); // [1, 2, 4, 5]
function removeAtIndex<T>(arr: T[], index: number): void {
  if (index >= 0 && index < arr.length) {
    arr.splice(index, 1); // splice mutates the array
  }
}

// Example
const letters = ['a', 'b', 'c', 'd'];
removeAtIndex(letters, 2);
console.log(letters); // ['a', 'b', 'd']
function removeIf<T>(arr: T[], predicate: (el: T) => boolean): T[] {
  return arr.filter(el => !predicate(el));
}

// Example: remove all even numbers
const evensGone = removeIf(numbers, n => n % 2 === 0);
console.log(evensGone); // [1, 3, 5]
type User = { id: number; name: string };
const users: User[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Cal' },
];

function removeById(arr: User[], id: number): User[] {
  return arr.filter(u => u.id !== id);
}

const afterRemoval = removeById(users, 2);
console.log(afterRemoval); // keeps Bob out
function removeInPlace<T>(arr: T[], predicate: (el: T) => boolean): void {
  for (let i = 0; i < arr.length; ) {
    if (predicate(arr[i])) {
      arr.splice(i, 1); // or use arr.splice(i--, 1) if you want to keep index logic simple
    } else {
      i++;
    }
  }
}
