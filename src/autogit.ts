// 1️⃣  Using a Set – O(m + n) time, O(n) extra space
function commonElements<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter(item => setB.has(item));
}

// 2️⃣  Using two pointers – O(m + n) time, O(1) extra space
//     (works best if both arrays are already sorted)
function commonSorted<T>(a: T[], b: T[]): T[] {
  const res: T[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      res.push(a[i]);
      i++; j++;
    } else if (a[i] < b[j]) {
      i++;
    } else {
      j++;
    }
  }
  return res;
}

// 3️⃣  Using reduce – concise but less efficient for large arrays
function commonReduce<T>(a: T[], b: T[]): T[] {
  return a.reduce((acc, val) => (b.includes(val) ? [...acc, val] : acc), [] as T[]);
}
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

console.log(commonElements(arr1, arr2)); // [3, 4, 5]
