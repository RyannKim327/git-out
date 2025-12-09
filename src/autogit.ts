function reverseWords(str: string): string {
  return str.trim().split(/\s+/).reverse().join(' ');
}

// Example usage
console.log(reverseWords("Hello World"));          // "World Hello"
console.log(reverseWords("  TypeScript is great  ")); // "great is TypeScript"
console.log(reverseWords(""));                // ""
console.log(reverseWords("   "));             // ""
console.log(reverseWords("SingleWord"));      // "SingleWord"
console.log(reverseWords("Line\nBreaks"));    // "Breaks Line"
console.log(reverseWords("Multiple   spaces")); // "spaces Multiple"
