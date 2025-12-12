const fullText: string = "The quick brown fox jumps over the lazy dog";
const searchTerm: string = "brown";

if (fullText.includes(searchTerm)) {
  console.log("✅ Found!");
}
if (fullText.indexOf(searchTerm) !== -1) {
  console.log("✅ Found!");
}
const pattern = /brown/;               // case‑sensitive
// const pattern = /brown/i;           // case‑insensitive (add the `i` flag)

if (fullText.search(pattern) !== -1) {
  console.log("✅ Found!");
}
const regex = /brown/;   // or /brown/i for case‑insensitive
if (regex.test(fullText)) {
  console.log("✅ Found!");
}
/**
 * Returns true if `needle` is found inside `haystack`.
 *
 * @param haystack - The string to search in.
 * @param needle   - The substring (or RegExp) to look for.
 * @param caseSensitive - Optional flag; defaults to true.
 */
export function contains(
  haystack: string,
  needle: string | RegExp,
  caseSensitive: boolean = true
): boolean {
  if (typeof needle === "string") {
    if (!caseSensitive) {
      haystack = haystack.toLowerCase();
      needle = needle.toLowerCase();
    }
    return haystack.includes(needle as string);
  }

  // needle is a RegExp
  const flags = caseSensitive
    ? needle.flags.replace("i", "")
    : needle.flags.includes("i")
    ? needle.flags
    : needle.flags + "i";

  const regex = new RegExp(needle.source, flags);
  return regex.test(haystack);
}

// Usage examples:
contains("Hello World", "world", false); // true
contains("Hello World", /world/i);       // true
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole match
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(value: string, term: string, caseSensitive = false): string {
    if (!term) return value;
    const escaped = escapeRegExp(term);
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(escaped, flags);
    return value.replace(regex, match => `<mark>${match}</mark>`);
  }
}
<p [innerHTML]="sentence | highlight:searchTerm:false"></p>
