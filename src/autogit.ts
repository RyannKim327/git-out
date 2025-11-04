function secondLargest(arr: number[]): number | undefined {
  if (arr.length < 2) return undefined;

  let max = -Infinity;
  let second = -Infinity;

  for (const v of arr) {
    if (v > max) {
      second = max;
      max = v;
    } else if (v > second && v < max) {
      second = v;
    }
  }
  return second === -Infinity ? undefined : second;
}

/* ---- usage ---- */
console.log(secondLargest([7, 3, 9, 9, 5])); // 7
console.log(secondLargest([10]));             // undefined
console.log(secondLargest([3, 3, 3]));        // undefined
