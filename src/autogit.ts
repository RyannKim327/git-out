const lower = myString.toLowerCase();   // standard ASCII‑only lower‑casing
// or, if you need locale‑aware conversion:
const lower = myString.toLocaleLowerCase('tr-TR'); // Turkish example
function lowerCase(str: string): string {
  return str.toLowerCase();
}
function safeLowerCase(value: string | null | undefined): string {
  if (value == null) return '';
  return value.toLowerCase();
}
function lowerCaseLocale(str: string, locale: string = 'en-US'): string {
  return str.toLocaleLowerCase(locale);
}

// Example with Turkish locale:
lowerCaseLocale('Istanbul');          // "istanbul"
lowerCaseLocale('Istanbul', 'tr-TR'); // "ıstanbul"
const result = someArray
  .map(item => item.name)          // string[]
  .filter(name => name.startsWith('A'))
  .map(name => name.toLowerCase()); // string[]
// utils/string.ts
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

/**
 * Lower‑cases a string safely, handling null/undefined.
 */
export function safeToLowerCase(value: string | null | undefined): string {
  return value ? value.toLowerCase() : '';
}

/**
 * Locale‑aware lower‑casing.
 */
export function toLowerCaseLocale(str: string, locale: string = 'en-US'): string {
  return str.toLocaleLowerCase(locale);
}

// ---------------------------------------------------
// Usage elsewhere
import { toLowerCase, safeToLowerCase, toLowerCaseLocale } from './utils/string';

const raw = 'Hello WORLD';
console.log(toLowerCase(raw));               // "hello world"

const maybeNull: string | null = null;
console.log(safeToLowerCase(maybeNull));     // ""

console.log(toLowerCaseLocale('İstanbul', 'tr-TR')); // "ıstanbul"
