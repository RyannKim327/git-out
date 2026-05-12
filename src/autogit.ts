/**
 * Remove all vowels (a, e, i, o, u) from a string.
 * Case‑insensitive and works for ASCII‑only vowels.
 */
function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
}

// Example
console.log(removeVowels('Hello, World!')); // Hll, Wrld!
function removeVowelsIncludingY(str: string): string {
  return str.replace(/[aeiouyAEIOUY]/g, '');
}
function removeAnyLatinVowel(str: string): string {
  // Matches any letter in the Latin script that is a vowel
  return str.replace(/\p{Script=Latin}\p{Vowel}/gu, '');
}
function removeVowelsLoop(str: string): string {
  const vowels = new Set('aeiouAEIOU');
  let result = '';
  for (const ch of str) {
    if (!vowels.has(ch)) {
      result += ch;
    }
  }
  return result;
}
