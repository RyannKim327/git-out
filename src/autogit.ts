// Remove *every* whitespace (spaces, tabs, newlines, etc.)
const clean = str.replace(/\s+/g, '');   // <-- compressed string

// If you only want to trim the ends:
const trimmed = str.trim();              // <-- removes leading/trailing whitespace

// If you want middle‑spaces only (keeping a single space between words):
const condensed = str.replace(/\s+/g, ' ');
const original = '  Hello   world \t this\nis  a test  ';
const stripped = original.replace(/\s+/g, '');
// stripped === 'Helloworldthisisatest'

console.log(stripped);
const stripped = original.split(/\s+/).join(''); // same result
