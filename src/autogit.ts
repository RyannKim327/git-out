const secondLargest = (arr: number[]): number | undefined => {
  if (arr.length < 2) return undefined;          // guard clause
  const uniq = [...new Set(arr)];              // drop duplicates
  return uniq.length < 2 ? undefined          // still not enough
                         : uniq.sort((a, b) => b - a)[1];
};

// usage
console.log(secondLargest([7, 3, 9, 9, 2])); // 7
const secondLargest = (arr: number[]): number | undefined => {
  if (arr.length < 2) return undefined;

  let max = -Infinity;
  let second = -Infinity;

  for (const v of arr) {
    if (v > max) {          // new largest found
      second = max;
      max = v;
    } else if (v > second && v !== max) {
      second = v;           // v is between max and second
    }
  }
  return second === -Infinity ? undefined : second;
};

// usage
console.log(secondLargest([7, 3, 9, 9, 2])); // 7
