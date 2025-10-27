function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
function removeVowels(str: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return str
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Usage
const result = removeVowels("TypeScript is awesome");
console.log(result); // "TypScrpt s wsm"
function removeVowels(str: string): string {
  const vowels = 'aeiouAEIOU';
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    if (!vowels.includes(str[i])) {
      result += str[i];
    }
  }
  
  return result;
}

// Usage
const result = removeVowels("Programming");
console.log(result); // "Prgrmmng"
const removeVowels = (str: string): string => str.replace(/[aeiou]/gi, '');

// Usage
const result = removeVowels("JavaScript");
console.log(result); // "JvScrpt"
function removeCharacters(str: string, charactersToRemove: string[] = ['a', 'e', 'i', 'o', 'u']): string {
  const regex = new RegExp(`[${charactersToRemove.join('')}]`, 'gi');
  return str.replace(regex, '');
}

// Usage
const result1 = removeCharacters("Hello World"); // removes default vowels
const result2 = removeCharacters("Hello World", ['e', 'o']); // removes only 'e' and 'o'
console.log(result1); // "Hll Wrld"
console.log(result2); // "Hll Wrld"
