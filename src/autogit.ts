function firstRepeatedChar(str: string): string | null {
  const seen = new Set<string>();

  for (const ch of str) {
    if (seen.has(ch)) {
      return ch;            // ❗ hit the first duplicate
    }
    seen.add(ch);
  }

  return null;               // no duplicate found
}

// Demo
console.log(firstRepeatedChar("abca")); // → 'a'
console.log(firstRepeatedChar("abcdef")); // → null
function firstRepeatedIndex(str: string): number | -1 {
  const seen = new Map<string, number>();

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen.has(ch)) {
      return i;   // index of the first occurrence that was repeated
    }
    seen.set(ch, i);
  }

  return -1;
}
