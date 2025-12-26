function isSortedAscending<T>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
console.log(isSortedAscending(numbers)); // true

const notSorted = [1, 3, 2, 4];
console.log(isSortedAscending(notSorted)); // false
