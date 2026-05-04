// 1. Remove whitespace from the ends – trim()
const raw = "   some text   ";
const trimmed = raw.trim();          // "some text"

// 2. Remove whitespace everywhere in the string
const raw2 = "  some text  with  spaces ";
const noSpace = raw2.replace(/\s+/g, ''); // "sometextwithspaces"

// 3. Remove all *outside* whitespace but keep internal spaces
const raw3 = "   some text with  internal   spaces   ";
const keepInternal = raw3.trim();           // "some text with  internal   spaces"

// 4. If you only want to drop **all** whitespace characters (tabs, newlines, etc.)
const raw4 = "line1\n  line2\t";
const noWhitespace = raw4.replace(/\s+/g, ''); // "line1line2"

// 5. To keep only alphanumerics (remove spaces, punctuation, etc.)
const cleaned = raw2.replace(/[^a-zA-Z0-9]/g, ''); // "sometextwithspaces"
