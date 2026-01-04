const raw = "   Hello, world!   \n";
const trimmed = raw.trim();          // "Hello, world!"
function removeAllWhitespace(str: string): string {
  // \s matches any whitespace character (space, tab, newline, etc.)
  // The 'g' flag makes it replace *all* occurrences.
  return str.replace(/\s+/g, '');
}

const result = removeAllWhitespace("  a b \t c\n d  "); // "abcd"
function removeSpacesOnly(str: string): string {
  return str.replace(/ +/g, '');
}
function collapseSpaces(str: string): string {
  // Trim first, then replace any run of whitespace with a single space.
  return str.trim().replace(/\s+/g, ' ');
}

const normalized = collapseSpaces("  This   is   a   test \n");
 // "This is a test"
// Left‑trim (remove leading whitespace)
const leftTrimmed = raw.replace(/^\s+/, '');

// Right‑trim (remove trailing whitespace)
const rightTrimmed = raw.replace(/\s+$/, '');
/**
 * Removes whitespace from a string according to the supplied mode.
 *
 * @param str   The input string.
 * @param mode  How to treat whitespace.
 *              - "all":   remove every whitespace character.
 *              - "trim":  trim only leading/trailing whitespace.
 *              - "collapse": trim and collapse internal runs to a single space.
 * @returns The processed string.
 */
export function stripWhitespace(
  str: string,
  mode: "all" | "trim" | "collapse" = "all"
): string {
  switch (mode) {
    case "trim":
      return str.trim();
    case "collapse":
      return str.trim().replace(/\s+/g, " ");
    case "all":
    default:
      return str.replace(/\s+/g, "");
  }
}

// Example usage:
const a = stripWhitespace("  a b \t c\n d  ", "all");       // "abcd"
const b = stripWhitespace("  a b \t c\n d  ", "trim");      // "a b \t c\n d"
const c = stripWhitespace("  a   b   c  ", "collapse");    // "a b c"
// 1️⃣ Trim only ends
s.trim();

// 2️⃣ Remove all whitespace
s.replace(/\s+/g, '');

// 3️⃣ Collapse internal whitespace to a single space
s.trim().replace(/\s+/g, ' ');

// 4️⃣ Left‑trim / Right‑trim only
s.replace(/^\s+/, '');   // left
s.replace(/\s+$/, '');   // right
