const myString = "  Hello World   ";
const trimmedString = myString.trim();

console.log(`Original: '${myString}'`);      // Output: '  Hello World   '
console.log(`Trimmed:  '${trimmedString}'`); // Output: 'Hello World'
const str = "  Hello World  ";
console.log(`Trim Start: '${str.trimStart()}'`); // Output: 'Hello World  '
console.log(`Trim End:   '${str.trimEnd()}'`);   // Output: '  Hello World'
const myString = "  Hello \t World \n from \r TypeScript!  ";
const noWhitespaceString = myString.replace(/\s/g, '');

console.log(`Original: '${myString}'`);
// Output: '  Hello    World 
// from 
// TypeScript!  '
console.log(`No Whitespace: '${noWhitespaceString}'`);
// Output: 'HelloWorldfromTypeScript!'
const myString = "  Hello   \t World \n again  ";
const collapsedString = myString.trim().replace(/\s+/g, ' ');

console.log(`Original: '${myString}'`);      // Output: '  Hello    World 
                                              // again  '
console.log(`Collapsed: '${collapsedString}'`); // Output: 'Hello World again'
const myString = "Line 1\nLine 2\twith tab\r\nLine 3";

// Remove only newlines (\n and \r)
const noNewlines = myString.replace(/[\n\r]/g, '');
console.log(`No Newlines: '${noNewlines}'`); // Output: 'Line 1Line 2	with tabLine 3'

// Remove only tabs (\t)
const noTabs = myString.replace(/\t/g, '');
console.log(`No Tabs: '${noTabs}'`);         // Output: 'Line 1
                                              // Line 2with tab
                                              // Line 3'

// Remove non-breaking spaces (U+00A0), which \s usually doesn't catch
const withNbsp = "This is\u00A0a non-breaking\u00A0space.";
const noNbsp = withNbsp.replace(/\xA0/g, ' '); // Replace with regular space
console.log(`No NB-Space: '${noNbsp}'`);       // Output: 'This is a non-breaking space.'
