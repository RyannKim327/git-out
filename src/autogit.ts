function removeVowels(str: string): string {
  // The regex /[aeiou]/gi matches any vowel, case‑insensitively
  return str.replace(/[aeiou]/gi, '');
}

// Examples
console.log(removeVowels('Hello World'));    // "Hll Wrld"
console.log(removeVowels('Typescript'));     // "TypScrpt"
console.log(removeVowels('AEIOU aeioU'));    // ""
function removeAllVowels(str: string): string {
  // Matches any vowel character in the Latin vowel block
  return str.replace(/[aeiouAEIOU]/g, ''); // still plain Latin
  // OR with property escapes (if your environment supports it):
  // return str.replace(/\p{Script=Latin}&&[aeiou]/gi, '');
}
function removeVowels(arr: string): string {
  const vowels = new Set('aeiouAEIOU');
  return arr.split('').filter(ch => !vowels.has(ch)).join('');
}
