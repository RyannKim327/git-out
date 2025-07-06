function countWordOccurrences(text: string, word: string): number {
  // Create a case-insensitive regex for the word, with word boundaries
  const regex = new RegExp(`\\b${word}\\b`, 'gi');

  // Use match() to find all occurrences
  const matches = text.match(regex);

  // If no matches found, match() returns null
  return matches ? matches.length : 0;
}

// Usage
const myString = "The quick brown fox jumps over the lazy dog. The fox was quick.";
const wordToCount = "the";

console.log(countWordOccurrences(myString, wordToCount)); // Output: 3
function countWordOccurrencesSplit(text: string, word: string): number {
  const parts = text.split(new RegExp(`\\b${word}\\b`, 'gi'));
  return parts.length - 1;
}

console.log(countWordOccurrencesSplit(myString, wordToCount)); // Output: 3
