const str = "  hello \t world \n";
const noWhitespace = str.replace(/\s+/g, '');
console.log(noWhitespace); // "helloworld"
const str = "   hello world   ";
const trimmed = str.trim();
console.log(trimmed); // "hello world"
const str = "hello     world    again";
const normalized = str.replace(/\s+/g, ' ').trim();
console.log(normalized); // "hello world again"
