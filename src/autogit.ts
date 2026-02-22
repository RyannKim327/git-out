/**
 * Reverses the order of words in a string.
 *
 * Words are split on whitespace.  Consecutive whitespace is collapsed,
 * but you can tweak the regex if you need to keep it intact.
 *
 * @param txt – The string to reverse
 * @returns The string with words in reverse order
 */
function reverseWordOrder(txt: string): string {
  return txt
    .trim()                      // Strip leading/trailing gaps
    .split(/\s+/)                // Break on any run of whitespace
    .reverse()                   // Flip the array
    .join(' ');                  // Stitch back together
}

// Example usage
const original = "Hello world, this is TypeScript.";
const reversed = reverseWordOrder(original);
console.log(reversed);  // "TypeScript. is this world, Hello"
function reverseWordOrder(txt: string) {
  const words = txt.trim().match(/\w+|\s+/g) ?? [];
  const textOnly = words.filter(Boolean).join(' ');
  const reversed = textOnly.split(/\s+/).reverse().join(' ');
  // re‑insert spaces that were originally present
  // (not shown here for brevity)
  return reversed;
}
