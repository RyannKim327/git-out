function manualLength(str: string): number {
  let i = 0;
  // The loop stops when the index can no longer be used to read a character.
  while (true) {
    // Trying to read past the end returns `undefined`.
    // In JavaScript/TypeScript a string can be accessed like an array of UTF‑16 code units.
    if (str[i] === undefined) break;
    i++;
  }
  return i;
}

// Example
console.log(manualLength("hello"));          // 5
console.log(manualLength("😀👍"));           // 4 (2 code units per emoji)
function codePointLength(str: string): number {
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}

// Example
console.log(codePointLength("hello"));   // 5
console.log(codePointLength("😀👍"));    // 2  (each emoji is one code point)
function recursiveLength(str: string, idx = 0): number {
  // Base case: we reached the end of the string
  if (str[idx] === undefined) return idx;
  // Tail‑recursive step
  return recursiveLength(str, idx + 1);
}

// Example
console.log(recursiveLength("typescript")); // 10
function arrayFromLength(str: string): number {
  // `Array.from` splits the string into code points.
  const arr = Array.from(str);
  // Now we can safely use the array’s length.
  return arr.reduce((c) => c + 1, 0);
}

// Example
console.log(arrayFromLength("abc"));   // 3
console.log(arrayFromLength("👩‍🚀")); // 2 (woman astronaut is two code points)
function iterableLength<T>(it: Iterable<T>): number {
  let count = 0;
  for (const _ of it) {
    count++;
  }
  return count;
}

// Use it on a string:
console.log(iterableLength("🧑‍💻")); // 2 code points
// npm i grapheme-splitter
import GraphemeSplitter from "grapheme-splitter";

function graphemeLength(str: string): number {
  const splitter = new GraphemeSplitter();
  return splitter.countGraphemes(str);
}

// Example
console.log(graphemeLength("é"));          // 1
console.log(graphemeLength("👩‍🚀"));       // 1
console.log(graphemeLength("🇺🇸"));        // 1 (flag emoji)
// manualLength.ts
export function manualLength(str: string): number {
  let i = 0;
  while (str[i] !== undefined) i++;
  return i;
}

export function codePointLength(str: string): number {
  let count = 0;
  for (const _ of str) count++;
  return count;
}

export function recursiveLength(str: string, idx = 0): number {
  return str[idx] === undefined ? idx : recursiveLength(str, idx + 1);
}

// If you need grapheme clusters, install grapheme-splitter:
// npm i grapheme-splitter
import GraphemeSplitter from "grapheme-splitter";

export function graphemeLength(str: string): number {
  const splitter = new GraphemeSplitter();
  return splitter.countGraphemes(str);
}

/* ------------------- demo ------------------- */
if (require.main === module) {
  const samples = ["hello", "😀👍", "é", "👩‍🚀", "🇺🇸"];
  for (const s of samples) {
    console.log(`"${s}"`);
    console.log("  manualLength (code units):", manualLength(s));
    console.log("  codePointLength (code points):", codePointLength(s));
    console.log("  graphemeLength (clusters):", graphemeLength(s));
    console.log();
  }
}
