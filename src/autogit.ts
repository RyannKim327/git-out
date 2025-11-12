function reverseWords(str: string): string {
  return str.trim().split(/\s+/).reverse().join(' ');
}

// --- demo ---
console.log(reverseWords('  hello   world  this is   TypeScript  '));
// → "TypeScript is this world hello"
