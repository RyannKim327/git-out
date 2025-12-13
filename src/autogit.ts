const reverseWords = (str: string): string =>
  str.trim().split(/\s+/).reverse().join(' ');

// --- usage ---
console.log(reverseWords('  hello   world again ')); // → "again world hello"
