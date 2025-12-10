function isSortedAscending<T>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}
console.log(isSortedAscending([1, 2, 3, 4])); // true
console.log(isSortedAscending([1, 3, 2]));     // false
console.log(isSortedAscending([]));           // true (empty array is considered sorted)
