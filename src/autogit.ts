function removeVowelsRegex(text: string): string {
  // Explanation of the regex:
  // [aeiou]  : Matches any lowercase vowel (a, e, i, o, u)
  // i        : Flag for case-insensitive matching (so it also matches A, E, I, O, U)
  // g        : Flag for global matching (so it replaces *all* occurrences, not just the first one)
  return text.replace(/[aeiou]/gi, '');
}

// --- Examples ---
const sentence1 = "Hello, World!";
const sentence2 = "TypeScript is awesome!";
const sentence3 = "AEIOUaeiou";
const sentence4 = "Rhythm"; // No vowels

console.log(`Original: "${sentence1}" -> No vowels: "${removeVowelsRegex(sentence1)}"`);
// Expected: Original: "Hello, World!" -> No vowels: "Hll, Wrld!"

console.log(`Original: "${sentence2}" -> No vowels: "${removeVowelsRegex(sentence2)}"`);
// Expected: Original: "TypeScript is awesome!" -> No vowels: "TypScrpt s wsm!"

console.log(`Original: "${sentence3}" -> No vowels: "${removeVowelsRegex(sentence3)}"`);
// Expected: Original: "AEIOUaeiou" -> No vowels: ""

console.log(`Original: "${sentence4}" -> No vowels: "${removeVowelsRegex(sentence4)}"`);
// Expected: Original: "Rhythm" -> No vowels: "Rhythm"
function removeVowelsLoop(text: string): string {
  const vowels = "aeiouAEIOU"; // Define all vowels (both cases)
  let result = "";

  for (const char of text) {
    // If the character is NOT found in our 'vowels' string, append it to the result
    if (!vowels.includes(char)) {
      result += char;
    }
  }
  return result;
}

// --- Examples ---
const sentence1 = "Hello, World!";
const sentence2 = "TypeScript is awesome!";

console.log(`Original: "${sentence1}" -> No vowels: "${removeVowelsLoop(sentence1)}"`);
// Expected: Original: "Hello, World!" -> No vowels: "Hll, Wrld!"

console.log(`Original: "${sentence2}" -> No vowels: "${removeVowelsLoop(sentence2)}"`);
// Expected: Original: "TypeScript is awesome!" -> No vowels: "TypScrpt s wsm!"
