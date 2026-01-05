function trimEdges(input: string): string {
  return input.trim();
}

// Example
const raw = "   hello world   \n";
console.log(trimEdges(raw)); // "hello world"
function removeAllWhitespace(input: string): string {
  // \s matches any whitespace character (space, tab, newline, etc.)
  // The 'g' flag means “global” – replace every occurrence.
  return input.replace(/\s+/g, '');
}

// Example
const messy = "  a \t b \n c  ";
console.log(removeAllWhitespace(messy)); // "abc"
function stripWhitespaceViaSplit(input: string): string {
  // Split on any whitespace, filter out empty pieces, then join without a separator.
  return input.split(/\s+/).filter(Boolean).join('');
}

// Example
console.log(stripWhitespaceViaSplit("  a \t b \n c  ")); // "abc"
// utils/whitespace.ts
export const Whitespace = {
  /** Remove whitespace from both ends */
  trim: (s: string): string => s.trim(),

  /** Remove *all* whitespace characters */
  stripAll: (s: string): string => s.replace(/\s+/g, ''),

  /** Collapse consecutive spaces into a single space */
  collapseSpaces: (s: string): string => s.replace(/ {2,}/g, ' '),

  /** Remove only leading whitespace */
  trimStart: (s: string): string => s.replace(/^\s+/, ''),

  /** Remove only trailing whitespace */
  trimEnd: (s: string): string => s.replace(/\s+$/, ''),
};
import { Whitespace } from './utils/whitespace';

const raw = "\t  hello   world \n";
console.log(Whitespace.stripAll(raw)); // "helloworld"
const raw = "  \tHello   World\n";
const noEdges   = raw.trim();               // "Hello   World"
const noSpaces  = raw.replace(/\s+/g, '');  // "HelloWorld"
const collapsed = raw.replace(/ {2,}/g, ' '); // "  \tHello World\n"
