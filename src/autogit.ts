function removeVowels(text: string): string {
  // Matches a, e, i, o, u in either case – change the set if you need accents, etc.
  return text.replace(/[aeiouAEIOU]/g, '');
}
const original = "Hello, World!";
const cleaned = removeVowels(original);
console.log(cleaned); // "Hll, Wrld!"
// Includes accented vowels and lowercase “y”
const regex = /[aeiouáéíóúAEIOUÁÉÍÓÚyY]/g;
function removeVowelsSafe(text?: string | null): string {
  const safeText = text ?? '';
  return safeText.replace(/[aeiouAEIOU]/g, '');
}
