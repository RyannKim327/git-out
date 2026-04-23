// 1. Trim leading/trailing
const trimmed = myString.trim();

// 2. Remove every whitespace character
const noSpace = myString.replace(/\s/g, '');

// 3. Collapse multiple spaces/tabs/lines into one space
const collapsed = myString.replace(/\s+/g, ' ');

// 4. Remove only spaces (keep tabs, newlines, etc.)
const onlySpaceRemoved = myString.replace(/ /g, '');
function stripWhitespace(str: string, keepNewlines = false): string {
  const pattern = keepNewlines ? /\s/g : /[ \t\r\f\v]/g; // tweak if you need to keep or drop newlines
  return str.replace(pattern, '');
}
