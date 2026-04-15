function firstRepeatedChar(s: string): string | undefined {
  // Use a set to record characters we've already seen.
  const seen = new Set<string>();

  for (const ch of s) {
    if (seen.has(ch)) {
      // This is the first time we hit a duplicate.
      return ch;
    }
    seen.add(ch);
  }

  // No duplicates found.
  return undefined;
}

// Example usage
console.log(firstRepeatedChar("hello"));    // → "l"
console.log(firstRepeatedChar("abcdef"));   // → undefined
console.log(firstRepeatedChar("aabbcc"));   // → "a"
function firstRepeatedCharImmutable(s: string): string | undefined {
  return Array.from(s).find((ch, idx, arr) => arr.indexOf(ch) !== idx);
}
