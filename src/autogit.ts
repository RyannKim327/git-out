function removeVowels(text: string): string {
  return text.replace(/[aeiouAEIOU]/g, '');
}

// Example usage
const result = removeVowels("Hello World"); // "Hll Wrld"
console.log(result);
function removeVowels(text: string): string {
  return text.replace(/[aeiou]/gi, '');
}

// Example usage
const result = removeVowels("TypeScript is Awesome"); // "TypScrpt s wsm"
function removeVowels(text: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return text
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Example usage
const result = removeVowels("Programming"); // "Prgrmmng"
function removeVowels(text: string): string {
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  return text
    .split('')
    .filter(char => !vowelSet.has(char))
    .join('');
}
function removeCharacters(text: string, charactersToRemove: string[]): string {
  const charSet = new Set(charactersToRemove);
  return text
    .split('')
    .filter(char => !charSet.has(char))
    .join('');
}

// Remove vowels
const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
const result = removeCharacters("JavaScript", vowels); // "JvScrpt"
const removeVowels = (text: string): string => text.replace(/[aeiou]/gi, '');
