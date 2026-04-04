const raw = '  Hello,\t\nWorld!  \u3000';

const trimmed = raw.trim();                 // "Hello,\t\nWorld!  \u3000"
const noWhitespace = raw.replace(/\s+/g, ''); // "Hello,World!"
const collapsed = raw.replace(/\s+/g, ' ');   // "Hello, World!"

console.log({ trimmed, noWhitespace, collapsed });
/**
 * Strip all whitespace from a string, or optionally replace it with another string.
 *
 * @param input   The string to clean.
 * @param replace What to put in place of each whitespace run (default: empty string).
 * @returns The cleaned string.
 */
function cleanWhitespace(input: string, replace = ''): string {
  return input.replace(/\s+/g, replace);
}
