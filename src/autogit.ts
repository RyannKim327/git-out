function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
}

// Example usage
const text = "Hello World!";
console.log(removeVowels(text)); // Output: "Hll Wrld!"
function removeVowels(str: string): string {
  return str
    .split('')
    .filter(char => !/[aeiouAEIOU]/.test(char))
    .join('');
}

// Example usage
const text = "Hello World!";
console.log(removeVowels(text)); // Output: "Hll Wrld!"
function removeVowels(str: string): string {
  const vowels = 'aeiouAEIOU';
  return str.replace(new RegExp(`[${vowels}]`, 'g'), '');
}

// Example usage
const text = "Hello World!";
console.log(removeVowels(text)); // Output: "Hll Wrld!"
interface StringUtils {
  removeVowels(input: string): string;
}

const stringUtils: StringUtils = {
  removeVowels(str: string): string {
    return str.replace(/[aeiouAEIOU]/g, '');
  }
};

// Usage
const result = stringUtils.removeVowels("TypeScript is awesome!");
console.log(result); // "TypScrpt s wsm!"
