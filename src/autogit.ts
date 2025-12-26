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

/* ---- demo ---- */
console.log(secondLargest([7, 3, 9, 9, 5])); // 7
console.log(secondLargest([10]));            // undefined
console.log(secondLargest([4, 4, 4]));       // undefined
function secondLargest(arr: number[]): number | undefined {
  const uniq = [...new Set(arr)].sort((a, b) => b - a);
  return uniq.length >= 2 ? uniq[1] : undefined;
}
