function reverseWords(s: string): string {
  return s.trim().split(/\s+/).reverse().join(' ');
}

// --- usage ---
console.log(reverseWords('  hello   world  again ')); // "again world hello"
