const str = "  Hello World  ";
console.log(str.trim()); // "Hello World"
const str = "  Hello \t\n World  ";
console.log(str.replace(/\s/g, '')); // "HelloWorld"
const str = "  Hello \t\n World  ";
console.log(str.replace(/ /g, '')); // "Hello\t\nWorld"
