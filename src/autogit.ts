function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';

  // 1. Find the shortest string (the prefix can’t be longer than this).
  const shortest = strs.reduce((min, s) => (s.length < min.length ? s : min));

  // 2. Binary-search the length of the shared prefix.
  let low = 0;
  let high = shortest.length;

  while (low < high) {
    const mid = (low + high + 1) >>> 1;   // ceil to avoid infinite loop
    const candidate = shortest.slice(0, mid);

    if (strs.every(s => s.startsWith(candidate))) {
      low = mid;                          // try longer
    } else {
      high = mid - 1;                     // try shorter
    }
  }

  return shortest.slice(0, low);
}

/* ---------- quick sanity checks ---------- */
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));    // ""
console.log(longestCommonPrefix([]));                           // ""
console.log(longestCommonPrefix(['alone']));                    // "alone"
let prefix = shortest;
for (const s of strs) {
  while (!s.startsWith(prefix)) {
    prefix = prefix.slice(0, -1);
    if (prefix === '') return '';
  }
}
return prefix;
