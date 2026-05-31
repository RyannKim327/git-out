// Example string
const s = "  Hello,\tworld!\n  This is a test.  ";

// 1. Trim
const trimmed = s.trim(); // "Hello,\tworld!\n  This is a test."

// 2. Remove all whitespace
const noWhitespace = s.replace(/\s+/g, ''); // "Hello,world!Thisisatest."

// 3. Remove only spaces
const noSpaces = s.replaceAll(' ', ''); // keeps tabs and newlines

// 4. Keep only alphanumerics (example use‑case)
const alnum = s.replace(/[^a-zA-Z0-9]+/g, ''); // "Hello,world!Thisisatest."
