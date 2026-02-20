const original = "Hello world! How are you?";
const withoutSpaces = original.replace(/ /g, ""); // "Helloworld!Howareyou?"
const original = "Hello \tworld!\u00A0How\nare you?"; // contains tab, non‑breaking space, newline
const withoutAnyWhitespace = original.replace(/\s+/gu, "");
// "Helloworld!Howareyou?"
function stripAllWhitespace(str: string): string {
  return str.replace(/\s+/gu, "");
}

// Usage
const clean = stripAllWhitespace("  Foo Bar\nBaz  ");
console.log(clean); // "FooBarBaz"
const cleaned = original.replace(/\s+/g, " ");  // collapse to single space
