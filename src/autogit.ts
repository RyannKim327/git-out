function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Example usage
const result1 = removeVowels("Hello World"); // "Hll Wrld"
const result2 = removeVowels("TypeScript"); // "TypScrpt"
function removeVowels(str: string): string {
  return str.replaceAll(/[aeiou]/gi, '');
}

// Example usage
const result = removeVowels("Programming"); // "Prgrmmng"
function removeVowels(str: string): string {
  const vowels = 'aeiou';
  return str
    .split('')
    .filter(char => !vowels.includes(char.toLowerCase()))
    .join('');
}

// Example usage
const result = removeVowels("JavaScript"); // "JvScrpt"
function removeVowels(str: string): string {
  const vowels = 'aeiou';
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!vowels.includes(char.toLowerCase())) {
      result += char;
    }
  }
  
  return result;
}

// Example usage
const result = removeVowels("Beautiful"); // "Btfl"
function removeVowels(str: string, caseSensitive: boolean = false): string {
  const pattern = caseSensitive ? /[aeiou]/g : /[aeiou]/gi;
  return str.replace(pattern, '');
}

// Example usage
const result1 = removeVowels("Hello"); // "Hll" (case insensitive)
const result2 = removeVowels("Hello", true); // "Hll" (case sensitive)
