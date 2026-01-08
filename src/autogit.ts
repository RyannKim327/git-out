function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return '';
  if (strs.length === 1) return strs[0];

  strs.sort();                       // lexicographic order
  const first = strs[0];
  const last  = strs[strs.length - 1];
  let i = 0;

  while (i < first.length && i < last.length && first[i] === last[i]) {
    i++;
  }
  return first.slice(0, i);
}

/* ---------- quick tests ---------- */
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));  // ""
console.log(longestCommonPrefix(['interspecies', 'interstellar', 'interstate'])); // "inters"
