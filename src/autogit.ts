/**
 * Reverses the order of words in `text`.
 *
 * • Consecutive whitespace is treated as a single separator.
 * • Leading/trailing whitespace is trimmed out.
 *
 * @param text – The string whose words you want to reverse.
 * @returns A new string with the words in reverse order.
 */
function reverseWords(text: string): string {
  return text
    .trim()                      // remove leading/trailing spaces
    .split(/\s+/)                // split on any run of whitespace
    .reverse()                   // reverse the array
    .join(' ');                  // join back with a single space
}

// Example
const input = "  The quick  brown   fox jumps over   the lazy dog  ";
console.log(reverseWords(input));
// → "dog lazy the over jumps fox brown quick The"
function reverseWordsKeepPunct(text: string): string {
  // Matches words or any non‑space sequences
  const tokens = text.match(/\S+/g) ?? [];
  return tokens.split('').reverse().join(' ');
}
const tests = [
  { in: "", out: "" },
  { in: "hello", out: "hello" },
  { in: "one two three", out: "three two one" },
  { in: "  a   b c   ", out: "c b a" },
  { in: "Hello, world!", out: "world! Hello," },
];

tests.forEach(({ in: t, out: expected }) => {
  const result = reverseWords(t);
  console.assert(result === expected, `❌ ${t} → ${result} (expected ${expected})`);
});
console.log("All basic tests passed!");
