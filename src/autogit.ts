// O(n log n) – fine for typical lengths
const areAnagrams = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false; // quick length check
  const sortedA = a.split('').sort().join('');
  const sortedB = b.split('').sort().join('');
  return sortedA === sortedB;
};
// O(n) – best for long strings
const areAnagrams = (first: string, second: string): boolean => {
  if (first.length !== second.length) return false;

  const count = new Map<string, number>();

  // Count chars from the first string
  for (const ch of first) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }

  // Decrement with the second string
  for (const ch of second) {
    const cur = count.get(ch);
    if (!cur) return false;          // char not in first
    if (cur === 1) count.delete(ch);
    else count.set(ch, cur - 1);
  }

  return count.size === 0;
};
// Works only for ISO‑8859‑1 / 8‑bit chars
const areAnagrams = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;

  const freq = new Int16Array(256);

  for (let i = 0; i < a.length; i++) {
    freq[a.charCodeAt(i)]++;
    freq[b.charCodeAt(i)]--;
  }

  return freq.every(v => v === 0);
};
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
