const myString = "  Hello   World!\nThis is a test.  ";

// Method 1.1: Using \s (most common)
// \s matches any whitespace character (space, tab, form feed, line feed, carriage return, vertical tab).
// The 'g' flag means "global" - replace all occurrences, not just the first.
const noWhitespace_s = myString.replace(/\s/g, '');
console.log("Using \\s/g:", noWhitespace_s);
// Output: "HelloWorld!Thisisatest."

// Method 1.2: Using \p{White_Space} (more comprehensive for Unicode whitespace)
// \p{White_Space} matches any Unicode character with the White_Space property.
// The 'u' flag is required for Unicode property escapes like \p{}.
const noWhitespace_unicode = myString.replace(/\p{White_Space}/gu, '');
console.log("Using \\p{White_Space}/gu:", noWhitespace_unicode);
// Output: "HelloWorld!Thisisatest."

// Method 1.3: Removing only standard spaces (less common for "all whitespace")
const noStandardSpaces = myString.replace(/ /g, '');
console.log("Removing only standard spaces:", noStandardSpaces);
// Output: "  HelloWorld!\nThisisatest.  " (tabs and newlines remain)
const myString = "  \t  Hello World!   \n ";

// Method 2.1: trim() - removes from both ends
const trimmedString = myString.trim();
console.log("trim():", trimmedString);
// Output: "Hello World!"

// Method 2.2: trimStart() - removes from the beginning
const trimmedStart = myString.trimStart();
console.log("trimStart():", trimmedStart);
// Output: "Hello World!   \n "

// Method 2.3: trimEnd() - removes from the end
const trimmedEnd = myString.trimEnd();
console.log("trimEnd():", trimmedEnd);
// Output: "  \t  Hello World!"
const myString = "  Hello   World!\nThis is a    test.  ";

// Method 3.1: Replace multiple spaces with a single space (normalize)
// \s+ matches one or more whitespace characters.
const normalizedSpaces = myString.replace(/\s+/g, ' ').trim();
console.log("Normalized spaces:", normalizedSpaces);
// Output: "Hello World! This is a test."

// Method 3.2: Remove only tabs
const noTabs = myString.replace(/\t/g, '');
console.log("No tabs:", noTabs);
// Output: "  Hello   World!\nThis is a    test.  " (assuming no tabs in original)

// Method 3.3: Remove only newlines
const noNewlines = myString.replace(/[\n\r]/g, '');
console.log("No newlines:", noNewlines);
// Output: "  Hello   World!This is a    test.  "
