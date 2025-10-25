function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
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
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
function removeVowels(str: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  return str
    .split('')
    .reduce((acc, char) => vowels.has(char) ? acc : acc + char, '');
}

// Usage
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
const removeVowels = (str: string): string => str.replace(/[aeiou]/gi, '');

// Usage
const result = removeVowels("Hello World");
console.log(result); // "Hll Wrld"
interface StringProcessor {
  process(str: string): string;
}

class VowelRemover implements StringProcessor {
  process(str: string): string {
    return str.replace(/[aeiou]/gi, '');
  }
}

// Usage
const remover = new VowelRemover();
console.log(remover.process("Hello World")); // "Hll Wrld"
console.log(remover.process("TypeScript"));   // "TypScrpt"
console.log(remover.process("AEIOU"));        // ""
