function firstRepeated(s: string): string | null {
  const seen = new Set<string>();

  for (const ch of s) {
    if (seen.has(ch)) {
      return ch;          // first repeat!
    }
    seen.add(ch);
  }

  return null;   // no repeats
}
console.log(firstRepeated("abca")); // → "a"
console.log(firstRepeated("abcdef")); // → null
console.log(firstRepeated("hello world")); // → "l"
function firstRepeatedCaseInsensitive(s: string): string | null {
  const seen = new Set<string>();
  for (const ch of s.toLowerCase()) {
    if (seen.has(ch)) return ch;
    seen.add(ch);
  }
  return null;
}
function firstRepeatIndex(s: string): number {
  const seen = new Set<string>();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (seen.has(ch)) return i;   // second appearance
    seen.add(ch);
  }
  return -1; // no repeat
}
function firstRepeatLater(s: string): string | null {
  const seen = new Set<string>();
  for (let i = s.length - 1; i >= 0; i--) {
    const ch = s[i];
    if (seen.has(ch)) return ch; // this appears again later
    seen.add(ch);
  }
  return null;
}
