const reverseWords = (str: string): string =>
  str.trim().split(/\s+/).reverse().join(' ');

// --- usage ---
console.log(reverseWords('  hello   world  this is   TypeScript  '));
// → "TypeScript is this world hello"
