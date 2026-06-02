/**
 * Returns true if the array is sorted in ascending order (strictly or non‑strictly).
 * @param arr array of items that can be compared with < and ===
 * @param allowDuplicates if true, values equal to the previous one are still OK
 */
function isSortedAscending<T>(arr: T[], allowDuplicates = false): boolean {
  if (arr.length < 2) return true;           // 0 or 1 element is always sorted

  for (let i = 1; i < arr.length; i++) {
    const a = arr[i - 1];
    const b = arr[i];

    if (a > b) return false;                 // strictly smaller check

    if (!allowDuplicates && a === b) return false; // disallow equal values
  }
  return true;
}
console.log(isSortedAscending([1, 2, 3]));          // true
console.log(isSortedAscending([1, 3, 2]));          // false
console.log(isSortedAscending([1, 1, 2], false));   // false
console.log(isSortedAscending([1, 1, 2], true));    // true
function isSortedAscendingFunctional<T>(arr: T[]): boolean {
  return arr.length < 2 || arr.every((v, i, a) => i === 0 || a[i - 1] <= v);
}
