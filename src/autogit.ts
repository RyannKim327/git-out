export function longestCommonPrefixPairwise(strs: string[]): string {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    // Shorten prefix until it's a prefix of strs[i]
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}

// Example
console.log(longestCommonPrefixPairwise(['flower', 'flow', 'flight'])); // 'fl'
export function longestCommonPrefixSort(strs: string[]): string {
  if (strs.length === 0) return '';
  const s = strs.slice().sort();
  const first = s[0];
  const last = s[s.length - 1];
  let i = 0;
  const minLen = Math.min(first.length, last.length);
  while (i < minLen && first[i] === last[i]) i++;
  return first.substring(0, i);
}

// Example
console.log(longestCommonPrefixSort(['flower', 'flow', 'flight'])); // 'fl'
