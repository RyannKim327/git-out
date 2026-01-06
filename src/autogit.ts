const secondLargest = (arr: number[]): number | undefined => {
  if (arr.length < 2) return undefined;          // not enough elements
  const uniq = [...new Set(arr)].sort((a, b) => b - a); // unique & desc
  return uniq.length >= 2 ? uniq[1] : undefined;
};

// usage
console.log(secondLargest([7, 3, 9, 9, 2])); // 7
const secondLargest = (arr: number[]): number | undefined => {
  let max = -Infinity;
  let second = -Infinity;

  for (const v of arr) {
    if (v > max) {
      second = max;   // old max becomes 2nd
      max = v;        // new max
    } else if (v < max && v > second) {
      second = v;     // v is between max and current 2nd
    }
  }
  return second === -Infinity ? undefined : second;
};

// usage
console.log(secondLargest([7, 3, 9, 2])); // 7
