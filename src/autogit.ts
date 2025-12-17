function firstRepeatedChar(s: string): string | null {
  const seen = new Set<string>();
  for (const ch of s) {
    if (seen.has(ch)) return ch;
    seen.add(ch);
  }
  return null;
}
function firstRepeatedCharIndex(s: string): number {
  const seen = new Set<string>();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (seen.has(ch)) return i;
    seen.add(ch);
  }
  return -1;
}
console.log(firstRepeatedChar("hello")); // 'l'
console.log(firstRepeatedChar("abcdef")); // null

console.log(firstRepeatedCharIndex("hello")); // 2 (the second 'l' at index 2)
console.log(firstRepeatedCharIndex("abcdef")); // -1
