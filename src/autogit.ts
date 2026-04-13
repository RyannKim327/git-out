const text = "The quick brown fox jumps over the lazy dog";

function contains(sub: string, str: string = text): boolean {
  return str.includes(sub);
}

console.log(contains("brown"));          // true
console.log(contains("cat"));            // false
console.log(contains("Brown", text));    // false – includes is case‑sensitive
function containsRegex(pattern: RegExp, str: string = text): boolean {
  return pattern.test(str);
}

console.log(containsRegex(/BROWN/i));  // true – case‑insensitive match
const hasSub = s.includes(sub);            // ✅
const hasSubOld = s.indexOf(sub) !== -1;   // ✅
const starts = s.startsWith(prefix);       // ✅
const ends = s.endsWith(suffix);           // ✅
const matches = /pattern/.test(s);         // ✅
