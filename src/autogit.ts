const text = "The quick brown fox jumps over the lazy dog";

const hasFox = text.includes("fox");          // true
const hasCat = text.indexOf("cat") !== -1;    // false
const containsLazy = /^.*lazy.*$/.test(text); // true (regex)
function containsIgnoreCase(str: string, sub: string): boolean {
  return str.toLowerCase().includes(sub.toLowerCase());
}

console.log(containsIgnoreCase("Hello World", "WORLD")); // true
