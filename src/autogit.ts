const numbers: number[] = [34, 7, 23, 32, 5, 62];

// 1️⃣ Basic MDN‑style numeric sort
const sorted = numbers.slice().sort((a, b) => a - b);
console.log(sorted); // [5, 7, 23, 32, 34, 62]
[34, 7, 23, 32, 5, 62].sort(); // [23, 32, 34, 5, 62, 7]
const descending = numbers.slice().sort((a, b) => b - a);
console.log(descending); // [62, 34, 32, 23, 7, 5]
function insertionSort(arr: number[]): number[] {
  const res = arr.slice();
  for (let i = 1; i < res.length; i++) {
    let key = res[i];
    let j = i - 1;
    while (j >= 0 && res[j] > key) {
      res[j + 1] = res[j];
      j--;
    }
    res[j + 1] = key;
  }
  return res;
}

console.log(insertionSort(numbers)); // same sorted output
