/**
 * Reverses the order of words in a string.
 *
 *      "Hello world again"  →  "again world Hello"
 *
 * Words are defined as sequences of non‑whitespace characters.
 */
function reverseWords(s: string): string {
  return s
    .trim()                // remove leading/trailing blanks
    .split(/\s+/)          // break into words (any amount of whitespace)
    .reverse()             // flip the array
    .join(' ');            // stitch back together
}

// demo
console.log(reverseWords('Hello world again')); // “again world Hello”
