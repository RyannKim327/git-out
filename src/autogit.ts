function removeVowels(str: string): string {
  // /[aeiou]/i finds a, e, i, o, u in either case
  return str.replace(/[aeiou]/gi, '');
}
console.log(removeVowels('Hello, World!')); // "Hll, Wrld!"
function removeVowels(str: string): string {
  const vowels = new Set('aeiouAEIOU');
  return str.split('').filter(ch => !vowels.has(ch)).join('');
}
return str.replace(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/gi, '');
