function areAnagrams(str1: string, str2: string): boolean {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // remove non-alphanumeric
      .split('')
      .sort()
      .join('');

  return normalize(str1) === normalize(str2);
}

// Usage
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('Hello', 'Olelh!'));   // true
console.log(areAnagrams('apple', 'pale'));    // false
function areAnagramsLinear(str1: string, str2: string): boolean {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

  const s1 = clean(str1);
  const s2 = clean(str2);

  if (s1.length !== s2.length) return false;

  const freq: Record<string, number> = {};

  for (const char of s1) freq[char] = (freq[char] || 0) + 1;
  for (const char of s2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}
