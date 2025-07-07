function isSortedAscending(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false; // Found a pair out of order
    }
  }
  return true; // All pairs are in order
}

// Example usage:
const array1 = [1, 2, 3, 4, 5];
const array2 = [1, 3, 2, 4, 5];

console.log(isSortedAscending(array1)); // true
console.log(isSortedAscending(array2)); // false
function isSortedAscending<T>(arr: T[], compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (compareFn(arr[i], arr[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}
