function removeVowels(text: string): string {
  return text.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World"); // "Hll Wrld"
console.log(result);
function removeVowels(text: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return text.split('').filter(char => !vowels.includes(char)).join('');
}

// Usage
const result = removeVowels("TypeScript"); // "TypScrpt"
console.log(result);
function removeVowels(text: string): string {
  const vowels = 'aeiouAEIOU';
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    if (!vowels.includes(text[i])) {
      result += text[i];
    }
  }
  
  return result;
}

// Usage
const result = removeVowels("Programming"); // "Prgrmmng"
console.log(result);
function removeVowels(text: string): string {
  const isVowel = (char: string): boolean => 
    'aeiouAEIOU'.includes(char);
  
  return Array.from(text)
    .filter(char => !isVowel(char))
    .join('');
}

// Usage
const result = removeVowels("JavaScript"); // "JvScrpt"
console.log(result);
const removeVowels = (text: string): string => 
  text.replace(/[aeiou]/gi, '');

// Usage
const result = removeVowels("Beautiful"); // "Btfl"
console.log(result);
function removeVowels(text: string): string {
  return text.replace(/[aeiouy]/gi, '');
}

// Usage
const result = removeVowels("Mystery"); // "Mstr"
console.log(result);
