/**
 * Reverses the order of words in a string.
 *
 * Whitespace punctuation is preserved around the words.
 */
function reverseWords(text: string): string {
  // Split on any whitespace – this covers spaces, tabs, new‑lines.
  const words = text.trim().split(/\s+/); // keeps only real words
  return words.reverse().join(' ');
}

// Demo
console.log(reverseWords("Hello world, how are you?"));
// → "you? are how world, Hello"
