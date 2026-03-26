function reverseWordOrder(sentence: string): string {
  // 1️⃣ split on whitespace (handles multiple spaces, tabs, newlines)
  const words = sentence.trim().split(/\s+/);

  // 2️⃣ reverse the array
  const reversed = words.reverse();

  // 3️⃣ join back into a string
  return reversed.join(' ');
}

// Example usage
const original = "Hello world from TypeScript";
const reversed = reverseWordOrder(original);
console.log(reversed); // "TypeScript from world Hello"
