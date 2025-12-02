function isSortedAscending(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

// Example usage:
console.log(isSortedAscending([1, 2, 3, 4])); // true
console.log(isSortedAscending([1, 3, 2, 4])); // false
