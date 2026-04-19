const original = "HeLLo WoRLd";
const lower = original.toLowerCase();

console.log(lower); // "hello world"
function toLowerCaseSafe(value: string | undefined | null): string {
  return value?.toLowerCase() ?? "";
}
const turkish = "İstanbul";
console.log(turkish.toLocaleLowerCase('tr-TR')); // "istanbul"
