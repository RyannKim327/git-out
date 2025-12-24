function isSortedAscending<T>(arr: T[]): boolean {
  if (arr.length <= 1) return true;
  
  return arr.every((value, index) => {
    if (index === 0) return true;
    return value >= arr[index - 1];
  });
}

// Usage examples:
console.log(isSortedAscending([1, 2, 3, 4, 5]));     // true
console.log(isSortedAscending([5, 3, 1, 4, 2]));     // false
console.log(isSortedAscending([1, 2, 2, 3, 4]));     // true (duplicates allowed)
console.log(isSortedAscending(["a", "b", "c"]));     // true (works with strings)
console.log(isSortedAscending([]));                  // true
console.log(isSortedAscending([1]));                 // true
function isSortedAscending<T>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}
function isSortedAscending<T>(arr: T[]): boolean {
  if (arr.length <= 1) return true;
  
  return arr.reduce((isSorted, current, index) => {
    if (index === 0) return isSorted;
    return isSorted && current >= arr[index - 1];
  }, true);
}
function isSortedAscending<T>(
  arr: T[], 
  comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (comparator(arr[i], arr[i - 1]) < 0) {
      return false;
    }
  }
  return true;
}

// Usage with custom comparator for objects:
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 20 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 }
];

console.log(isSortedAscending(people, (a, b) => a.age - b.age)); // true
function isSortedAscending<T extends number | string | Date>(arr: T[]): boolean {
  if (arr.length <= 1) return true;
  
  return arr.every((value, index) => {
    if (index === 0) return true;
    return value >= arr[index - 1];
  });
}
