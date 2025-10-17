function isSortedAscending(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

// Example usage:
console.log(isSortedAscending([1, 2, 3, 4])); // true
console.log(isSortedAscending([1, 3, 2]));   // false
function isSortedAscending<T>(arr: T[], compareFn: (a: T, b: T) => number): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (compareFn(arr[i - 1], arr[i]) > 0) {
      return false;
    }
  }
  return true;
}

// Example with strings:
console.log(isSortedAscending(['a', 'b', 'c'], (a, b) => a.localeCompare(b))); // true
