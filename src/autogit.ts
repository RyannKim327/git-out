function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
function removeVowels(str: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let result = '';
  
  for (const char of str) {
    if (!vowels.includes(char)) {
      result += char;
    }
  }
  
  return result;
}

// Usage
const result = removeVowels("TypeScript");
console.log(result); // "TypScrpt"
function removeVowels(str: string): string {
  return str
    .split('')
    .filter(char => !/[aeiou]/i.test(char))
    .join('');
}

// Usage
const result = removeVowels("Programming");
console.log(result); // "Prgrmmng"
function removeVowels(
  str: string, 
  vowels: string[] = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
): string {
  return str
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Usage
const result1 = removeVowels("JavaScript"); // "JvScrpt"
const result2 = removeVowels("Hello", ['e', 'o']); // "Hll" (custom vowels)
const removeVowels = (input: string): string => {
  return input.replace(/[aeiouà-úÀ-Ú]/gi, '');
};

// Handle accented vowels (French, Spanish, etc.)
const result = removeVowels("café naïve");
console.log(result); // "cf nv"
