function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World"); // "Hll Wrld"
console.log(result);
function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
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
const result = removeVowels("TypeScript"); // "TypScrpt"
function removeVowels(input: string): string {
  const vowelPattern: RegExp = /[aeiou]/gi;
  return input.replace(vowelPattern, '');
}

// Usage
const text: string = "Programming is fun";
const vowelFree: string = removeVowels(text); // "Prgrmmng s fn"
function removeVowels(str: string): string {
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  return str
    .split('')
    .filter(char => !vowelSet.has(char))
    .join('');
}
function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Test cases
const testCases = [
  "Hello World",      // "Hll Wrld"
  "TypeScript",       // "TypScrpt"
  "AEIOUaeiou",       // ""
  "BCDFG",            // "BCDFG" (no vowels)
  "",                 // "" (empty string)
  "123!@#",           // "123!@#" (no letters)
];

testCases.forEach(test => {
  console.log(`Input: "${test}" -> Output: "${removeVowels(test)}"`);
});
