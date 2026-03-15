function reverseWords(str: string): string {
  // Split on any amount of whitespace, filter out empty chunks,
  // reverse the array, then join with a single space.
  return str
    .trim()
    .split(/\s+/)
    .reverse()
    .join(' ');
}

// Example
console.log(reverseWords("Hello world this is TypeScript")); // "TypeScript is this world Hello"
