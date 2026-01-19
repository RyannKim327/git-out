function longestCommonSubstring(a: string, b: string): string {
  if (!a || !b) return '';

  let maxLen = 0;
  let maxStart = 0;          // start index inside `a`

  const aLen = a.length;
  const bLen = b.length;

  // Pick the shorter string as the outer loop to reduce the number of starts
  const [short, long] = aLen < bLen ? [a, b] : [b, a];
  const shortLen = short.length;
  const longLen = long.length;

  for (let i = 0; i < shortLen; i++) {
    for (let j = 0; j < longLen; j++) {
      let length = 0;
      while (
        i + length < shortLen &&
        j + length < longLen &&
        short[i + length] === long[j + length]
      ) {
        length++;
      }
      if (length > maxLen) {
        maxLen = length;
        maxStart = i;           // starts in `short`
      }
    }
  }

  // Return the slice from the original string that contains the substring
  const result = short.substr(maxStart, maxLen);
  // If we swapped the strings we need to return the same slice from the original `a`
  return aLen < bLen ? result : result; // same, just explicit
}
console.log(longestCommonSubstring('abxabc', 'abcaby')); // → 'abc'
function longestCommonSubstringDP(s1: string, s2: string): string {
  const n = s1.length;
  const m = s2.length;
  if (!n || !m) return '';

  // 2‑row DP to save memory – only previous row needed for current row calculation
  let prev = new Array(m + 1).fill(0);
  let curr = new Array(m + 1).fill(0);

  let maxLen = 0;
  let maxEndIdxS1 = 0; // end index in s1 of longest common substring

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        curr[j] = prev[j - 1] + 1; // extend the previous match
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          maxEndIdxS1 = i; // i is 1‑based
        }
      } else {
        curr[j] = 0;
      }
    }
    // swap rows for next iteration
    [prev, curr] = [curr, prev];
    curr.fill(0); // reset current row
  }

  // Extract the substring from s1 using the end index and length
  return s1.slice(maxEndIdxS1 - maxLen, maxEndIdxS1);
}
console.log(longestCommonSubstringDP('abxabc', 'abcaby')); // → 'abc'
