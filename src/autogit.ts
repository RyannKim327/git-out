const str = "  \t  h e l l o  \n  ";

// 1. Trim ends
const trimEnds = str.trim();                   // "h e l l o"

// 2. Remove ALL whitespace characters
const removeAll = str.replace(/\s+/g, "");     // "hello"

// 3. Collapse any run of whitespace into a single space
const collapse = str.trim().replace(/\s+/g, " "); // "h e l l o"
