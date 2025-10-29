function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
}

// Usage
const result = removeVowels("Hello World"); // "Hll Wrld"
function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World"); // "Hll Wrld"
function removeVowels(str: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return str
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Usage
const result = removeVowels("TypeScript"); // "TpScrpt"
function removeVowels(input: string): string {
  const vowelRegex: RegExp = /[aeiou]/gi;
  return input.replace(vowelRegex, '');
}

// Usage
const text: string = "Programming";
const vowelFree: string = removeVowels(text); // "Prgrmmng"
function removeVowels(input: string | null | undefined): string {
  if (!input) return '';
  return input.replace(/[aeiouAEIOU]/g, '');
}

// Usage
const result1 = removeVowels("Hello"); // "Hll"
const result2 = removeVowels(null); // ""
const result3 = removeVowels(undefined); // ""
function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
}

// Test cases
console.log(removeVowels("Hello World")); // "Hll Wrld"
console.log(removeVowels("TypeScript"));  // "TpScrpt"
console.log(removeVowels("AEIOUaeiou"));  // ""
console.log(removeVowels(""));            // ""
console.log(removeVowels("123!@#"));      // "123!@#"
