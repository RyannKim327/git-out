const original = "HeLLo WoRLd!";
const lower = original.toLowerCase();

console.log(lower); // "hello world!"
const lowerLocale = original.toLocaleLowerCase('tr-TR'); // Turkish example
function lc(s: string): string {
  return s.toLowerCase();
}
