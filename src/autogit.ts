function removeVowelsRegex(inputString: string): string {
  // The regular expression /[aeiou]/gi does the following:
  // - `[aeiou]`: Matches any single character that is 'a', 'e', 'i', 'o', or 'u'.
  // - `g` (global flag): Ensures that ALL occurrences of vowels are matched and replaced,
  //                     not just the first one.
  // - `i` (case-insensitive flag): Ensures that both lowercase (a, e, i, o, u)
  //                                and uppercase (A, E, I, O, U) vowels are matched.
  return inputString.replace(/[aeiou]/gi, '');
}

// --- Examples ---
console.log(removeVowelsRegex("Hello World"));           // Hll Wrld
console.log(removeVowelsRegex("TypeScript Programming")); // TypScrpt Prgrmmng
console.log(removeVowelsRegex("AEIOUaeiou"));           //
console.log(removeVowelsRegex("Rhythm"));                // Rhythm (no standard vowels removed)
console.log(removeVowelsRegex(""));                     //
function removeVowelsFilter(inputString: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return inputString
    .split('') // 1. Split the string into an array of individual characters
    .filter(char => !vowels.includes(char.toLowerCase())) // 2. Filter out vowels
    .join(''); // 3. Join the remaining characters back into a string
}

// --- Examples ---
console.log(removeVowelsFilter("Hello World"));           // Hll Wrld
console.log(removeVowelsFilter("TypeScript Programming")); // TypScrpt Prgrmmng
console.log(removeVowelsFilter("AEIOUaeiou"));           //
console.log(removeVowelsFilter("Rhythm"));                // Rhythm
console.log(removeVowelsFilter(""));                     //
