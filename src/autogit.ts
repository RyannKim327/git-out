function removeVowels(input: string): string {
  return input.replace(/[aeiou]/gi, '');
}

// Example usage
const result = removeVowels("Hello World"); // "Hll Wrld"
function removeVowels(input: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return input
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Example usage
const result = removeVowels("TypeScript"); // "TypScrpt"
function removeVowels(input: string): string {
  const vowels = 'aeiouAEIOU';
  let result = '';
  
  for (let i = 0; i < input.length; i++) {
    if (!vowels.includes(input[i])) {
      result += input[i];
    }
  }
  
  return result;
}

// Example usage
const result = removeVowels("Programming"); // "Prgrmmng"
function removeVowels(input: string): string {
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
  return input
    .split('')
    .filter(char => !vowelSet.has(char.toLowerCase()))
    .join('');
}

// Example usage
const result = removeVowels("JavaScript"); // "JvScrpt"
function removeVowels(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return input.replace(/[aeiou]/gi, '');
}

// Test cases
console.log(removeVowels("Hello World"));      // "Hll Wrld"
console.log(removeVowels("TypeScript"));       // "TypScrpt"
console.log(removeVowels("AEIOUaeiou"));       // ""
console.log(removeVowels(""));                 // ""
