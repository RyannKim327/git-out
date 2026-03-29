function firstRepeated(str: string): string | null {
  // Map will keep a count of each char we’ve seen
  const seen = new Map<string, number>();

  for (const ch of str) {
    const count = seen.get(ch) ?? 0;
    if (count === 1) {
      // This is the second time we’re seeing `ch`
      return ch;
    }
    // Mark that we’ve seen this char once (or increment if it’s that later)
    seen.set(ch, count + 1);
  }
  // No repeats
  return null;
}
console.log(firstRepeated("hello")); // → "l"  (first ‘l’ repeats)
console.log(firstRepeated("world")); // → null  (no repeats)
console.log(firstRepeated("javascript")); // → "a"
