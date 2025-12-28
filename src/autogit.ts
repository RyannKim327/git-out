function removeVowels(input: string): string {
  return input.replace(/[aeiou]/gi, '');
}

// Usage
const result = removeVowels("Hello World!"); // "Hll Wrld!"
console.log(result);
function removeVowels(input: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  return input
    .split('')
    .filter(char => !vowels.includes(char))
    .join('');
}

// Usage
const result = removeVowels("Typescript"); // "Typscrpt"
console.log(result);
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

// Usage
const result = removeVowels("Programming"); // "Prgrmmng"
console.log(result);
function removeVowels(input: string, includeY: boolean = false): string {
  let vowelPattern = includeY ? /[aeiouy]/gi : /[aeiou]/gi;
  return input.replace(vowelPattern, '');
}

// Usage
const result1 = removeVowels("Happy Day"); // "Hppy Dy"
const result2 = removeVowels("Happy Day", true); // "Hp D"
console.log(result1, result2);
function removeVowels(input: string | null | undefined): string {
  if (input == null) return '';
  return input.replace(/[aeiou]/gi, '');
}

// Usage with type safety
const result1 = removeVowels("Hello"); // "Hll"
const result2 = removeVowels(null); // ""
