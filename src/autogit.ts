function removeVowelsRegex(inputString: string): string {
  // The regex /[aeiou]/gi means:
  // [aeiou]: Match any character that is 'a', 'e', 'i', 'o', or 'u'.
  // g: Global flag, meaning find all matches, not just the first one.
  // i: Case-insensitive flag, meaning match both lowercase and uppercase vowels.
  return inputString.replace(/[aeiou]/gi, '');
}

// --- Examples ---
console.log("Regex Method:");
console.log(`"Hello World": ${removeVowelsRegex("Hello World")}`);       // Output: Hll Wrld
console.log(`"TypeScript": ${removeVowelsRegex("TypeScript")}`);      // Output: TypScrpt
console.log(`"AEIOUaeiou": ${removeVowelsRegex("AEIOUaeiou")}`);     // Output: ""
console.log(`"Rhythm": ${removeVowelsRegex("Rhythm")}`);           // Output: Rhythm (no vowels to remove)
console.log(`"": ${removeVowelsRegex("")}`);                       // Output: ""
console.log(`"JavaScript is awesome": ${removeVowelsRegex("JavaScript is awesome")}`); // Output: JvScrpt s wsm
function removeVowelsFilter(inputString: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return inputString
    .split('') // Convert the string into an array of characters
    .filter(char => !vowels.includes(char.toLowerCase())) // Filter out vowels
    .join(''); // Join the remaining characters back into a string
}

// --- Examples ---
console.log("\nFilter Method:");
console.log(`"Hello World": ${removeVowelsFilter("Hello World")}`);       // Output: Hll Wrld
console.log(`"TypeScript": ${removeVowelsFilter("TypeScript")}`);      // Output: TypScrpt
console.log(`"AEIOUaeiou": ${removeVowelsFilter("AEIOUaeiou")}`);     // Output: ""
console.log(`"Rhythm": ${removeVowelsFilter("Rhythm")}`);           // Output: Rhythm
console.log(`"": ${removeVowelsFilter("")}`);                       // Output: ""
console.log(`"JavaScript is awesome": ${removeVowelsFilter("JavaScript is awesome")}`); // Output: JvScrpt s wsm
function removeVowelsLoop(inputString: string): string {
  let result = '';
  const vowels = 'aeiouAEIOU'; // A string of all possible vowels (case-sensitive for direct lookup)

  for (const char of inputString) {
    if (!vowels.includes(char)) { // If the character is not found in our vowel string
      result += char; // Add it to the result
    }
  }
  return result;
}

// --- Examples ---
console.log("\nLoop Method:");
console.log(`"Hello World": ${removeVowelsLoop("Hello World")}`);       // Output: Hll Wrld
console.log(`"TypeScript": ${removeVowelsLoop("TypeScript")}`);      // Output: TypScrpt
console.log(`"AEIOUaeiou": ${removeVowelsLoop("AEIOUaeiou")}`);     // Output: ""
console.log(`"Rhythm": ${removeVowelsLoop("Rhythm")}`);           // Output: Rhythm
console.log(`"": ${removeVowelsLoop("")}`);                       // Output: ""
console.log(`"JavaScript is awesome": ${removeVowelsLoop("JavaScript is awesome")}`); // Output: JvScrpt s wsm
