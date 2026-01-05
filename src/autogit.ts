function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return '';

  // 1. Find the shortest string (the prefix can’t be longer than this).
  const shortest = strs.reduce((min, s) => (s.length < min.length ? s : min));

  // 2. Binary-search the prefix length inside that shortest string.
  let low = 0;
  let high = shortest.length;

  while (low < high) {
    const mid = Math.ceil((low + high) / 2); // ceil to avoid infinite loop
    const candidate = shortest.slice(0, mid);

    // 3. Check if every string starts with this candidate.
    if (strs.every(s => s.startsWith(candidate))) {
      low = mid;          // try to grow
    } else {
      high = mid - 1;     // shrink
    }
  }

  return shortest.slice(0, low);
}

/* ---- Quick sanity checks ---- */
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));     // ""
console.log(longestCommonPrefix([]));                             // ""
console.log(longestCommonPrefix(['single']));                   // "single"
