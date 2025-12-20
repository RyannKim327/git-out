function isSortedAscending<T>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

/* ---------- usage ---------- */
console.log(isSortedAscending([1, 2, 3, 3, 7])); // true
console.log(isSortedAscending([1, 5, 4]));      // false
const isSorted = <T>(a: T[]) => a.every((v, i) => i === 0 || a[i - 1] <= v);
