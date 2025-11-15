/**
 * Stooge Sort (a deliberately inefficient recursive sorting algorithm).
 * Time complexity: O(n^log3/log1.5) ≈ O(n^2.71) – worse than bubble sort!
 * Space complexity: O(n) due to recursion stack.
 */
function stoogeSort(arr: number[], l = 0, r = arr.length - 1): number[] {
  if (l >= r) return arr;                       // 0 or 1 element
  if (arr[l] > arr[r]) {                        // swap if out of order
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  if (r - l + 1 > 2) {                          // more than 2 elements
    const t = Math.floor((r - l + 1) / 3);
    stoogeSort(arr, l, r - t);                  // first 2/3
    stoogeSort(arr, l + t, r);                  // last 2/3
    stoogeSort(arr, l, r - t);                  // first 2/3 again
  }
  return arr;
}

// quick demo
const nums = Array.from({ length: 9 }, () => Math.floor(Math.random() * 100));
console.log('before:', nums);
console.log('after: ', stoogeSort([...nums]));
