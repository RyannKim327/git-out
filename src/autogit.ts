function removeVowels(text: string): string {
  return text.replace(/[aeiou]/gi, '');
}

// Example usage
const result = removeVowels("Hello World"); // "Hll Wrld"
console.log(result);
function removeVowels(text: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return text
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Example usage
const result = removeVowels("TypeScript"); // "TypScrpt"
console.log(result);
function removeVowels(text: string): string {
  // The 'i' flag makes it case-insensitive
  return text.replace(/[aeiou]/gi, '');
}

// Example usage
const result = removeVowels("Programming"); // "Prgrmmng"
console.log(result);
function removeVowels(text: string): string {
  const vowelRegex = /[aeiou]/gi;
  return text.replace(vowelRegex, '');
}

// Example usage
const input = "Remove Vowels From This String";
const output = removeVowels(input); // "Rmv Vwls Frm Ths Strng"
console.log(output);
function removeVowels(text: string): string {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return text.replace(/[aeiou]/gi, '');
}

// Test cases
console.log(removeVowels("Hello"));      // "Hll"
console.log(removeVowels("TypeScript")); // "TypScrpt"
console.log(removeVowels("AEIOU"));      // ""
console.log(removeVowels(""));           // ""
