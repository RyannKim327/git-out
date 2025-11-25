function countOccurrences(str: string, char: string): number {
  return str.split(char).length - 1;
}

// Example:
const text = "hello world";
const count = countOccurrences(text, "l"); // 3
function countOccurrences(str: string, char: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) count++;
  }
  return count;
}

// Example:
const count = countOccurrences("typescript", "t"); // 2
function countOccurrences(str: string, char: string): number {
  // Escape special regex characters (e.g., ".", "*")
  const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedChar, "g");
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

// Example:
const count = countOccurrences("a.b.c.d", "."); // 3 (correctly counts literal dots)
