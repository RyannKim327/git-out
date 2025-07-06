function isArraySortedAscending<T>(arr: T[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false; // Found an element out of order
    }
  }
  return true; // All elements are in ascending order
}
const array1 = [1, 2, 3, 4, 5];
console.log(isArraySortedAscending(array1)); // true

const array2 = [1, 3, 2, 4, 5];
console.log(isArraySortedAscending(array2)); // false
function isArraySortedAscending<T>(arr: T[], compareFn: (a: T, b: T) => number): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (compareFn(arr[i], arr[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}

// Usage with numbers
const numbers = [1, 2, 3, 4];
console.log(isArraySortedAscending(numbers, (a, b) => a - b)); // true

// Usage with strings
const strings = ["a", "b", "c"];
console.log(isArraySortedAscending(strings, (a, b) => a.localeCompare(b))); // true
