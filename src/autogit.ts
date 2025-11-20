function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
}

console.log(removeVowels("Hello World")); // "Hll Wrld"
function removeVowels(str: string, vowels: string = "aeiouAEIOU"): string {
  const pattern = new RegExp(`[${vowels}]`, 'g');
  return str.replace(pattern, '');
}

console.log(removeVowels("TypeScript", "aeiouyAEIOUY")); // "TpScrpt"
