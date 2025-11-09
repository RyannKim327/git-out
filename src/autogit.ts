function reverseWords(input: string): string {
  return input.trim().split(/\s+/).reverse().join(' ');
}

// Usage:
const original = "Hello world this is TypeScript";
const reversed = reverseWords(original);
console.log(reversed); // Output: "TypeScript is this world Hello"
