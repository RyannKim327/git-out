function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World"); // "Hll Wrld"
console.log(result);
function removeVowels(str: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return str
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Usage
const result = removeVowels("TypeScript"); // "TypScrpt"
console.log(result);
function removeVowels(str: string): string {
  return str.replace(/[aeiouàèìòùáéíóúâêîôûäëïöü]/gi, '');
}

// Usage
const result = removeVowels("café naïve"); // "cf nv"
console.log(result);
function removeVowels(str: string): string {
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  return str
    .split('')
    .filter(char => !vowelSet.has(char))
    .join('');
}

// Usage
const result = removeVowels("Programming"); // "Prgrmmng"
console.log(result);
function removeVowels(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return input.replace(/[aeiou]/gi, '');
}

// Test
const testStrings = ["Hello", "TypeScript", "AEIOU", "123abc", ""];
testStrings.forEach(str => {
  console.log(`${str} -> ${removeVowels(str)}`);
});
