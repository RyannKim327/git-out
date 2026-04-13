/**
 * Return the same sentence but with the words in reverse order.
 *
 * @param sentence - Any string you want to flip.
 * @returns A new string with the word order reversed.
 */
export function reverseWords(sentence: string): string {
  return sentence
    .trim()                      // Remove leading/trailing spaces
    .split(/\s+/)                // Split on one or more whitespace characters
    .reverse()                   // Reverse the word array
    .join(' ');                  // Re‑join with a single space
}

/* Example usage */
const original = "The quick brown   fox jumps over the lazy dog";
console.log(reverseWords(original));
// → "dog lazy the over jumps fox brown quick The"
export function reverseWordsWithSpacing(str: string): string {
  const parts = str.match(/(\S+|\s+)/g) ?? []; // captures words and whitespace chunks
  let words: string[] = [];
  const wordTokens: string[] = [];

  // Extract words while preserving the positions of the separators
  for (const part of parts) {
    if (part.trim() === '') {
      words.push(part); // this part is whitespace
    } else {
      wordTokens.push(part); // capture the word
    }
  }

  // Reverse only the words, then reconstruct
  const reversedWords = wordTokens.reverse();
  let i = 0;
  const result = parts.map(p => (p.trim() === '' ? p : reversedWords[i++])).join('');
  return result;
}
