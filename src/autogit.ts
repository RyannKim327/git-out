function removeVowels(input: string): string {
  // Vowels (both lower‑ and upper‑case) – feel free to add accented ones if you need
  const vowels = /[aeiouAEIOU]/g;
  return input.replace(vowels, '');
}
function removeVowels(input: string): string {
  const result: string[] = [];

  for (const char of input) {
    if (!/[aeiouAEIOU]/.test(char)) {
      result.push(char);
    }
  }

  return result.join('');
}
const vowels = /[aeiouAEIOUÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ]/gu;
const vowels = /\p{Script=Latin}\p{L}\b{vowel}/u; // not a real pattern – just an example
const demo = "Hello World! 123";
console.log(removeVowels(demo)); // "Hll Wrld! 123"
