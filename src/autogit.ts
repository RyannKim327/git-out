const str = "   Hello, World!   ";
const trimmedStr = str.trim();
console.log(trimmedStr); // Output: "Hello, World!"
const str = "  Hello,\t World! \n ";
const noWhitespaceStr = str.replace(/\s+/g, '');
console.log(noWhitespaceStr); // Output: "Hello,World!"
const startTrimmed = str.replace(/^\s+/, '');
const endTrimmed = str.replace(/\s+$/, '');
