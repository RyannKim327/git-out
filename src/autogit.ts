let myString: string = "  Hello World!   ";
let trimmedString: string = myString.trim();

console.log(`Original: "${myString}"`);
console.log(`Trimmed:  "${trimmedString}"`);
// Output:
// Original: "  Hello World!   "
// Trimmed:  "Hello World!"
let myString: string = "  Hello   World! \n How are you? ";
let noWhitespaceString: string = myString.replace(/\s/g, '');

console.log(`Original: "${myString}"`);
console.log(`No Whitespace: "${noWhitespaceString}"`);
// Output:
// Original: "  Hello   World!
//  How are you? "
// No Whitespace: "HelloWorld!Howareyou?"
let myString: string = "  Hello   World! \n How   are you?   ";
let normalizedString: string = myString.replace(/\s+/g, ' ').trim();

console.log(`Original:    "${myString}"`);
console.log(`Normalized:  "${normalizedString}"`);
// Output:
// Original:    "  Hello   World!
//  How   are you?   "
// Normalized:  "Hello World! How are you?"
let myString: string = "Hello World! This is a test.";
let noSpacesString: string = myString.replace(/ /g, ''); // Replaces literal spaces

console.log(`Original: "${myString}"`);
console.log(`No Spaces: "${noSpacesString}"`);
// Output:
// Original: "Hello World! This is a test."
// No Spaces: "HelloWorld!Thisisatest."
let myString: string = "Line 1\nLine 2\nLine 3";
let noNewlinesString: string = myString.replace(/\n/g, ''); // Replaces newline characters

console.log(`Original:\n"${myString}"`);
console.log(`No Newlines: "${noNewlinesString}"`);
// Output:
// Original:
// "Line 1
// Line 2
// Line 3"
// No Newlines: "Line 1Line 2Line 3"
