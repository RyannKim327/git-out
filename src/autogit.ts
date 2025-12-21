const str = "  Hello\tWorld\n ";
const result = str.replace(/\s/g, ''); // "HelloWorld"
const str = "  Hello World";
const result = str.replace(/^\s+/, ''); // "Hello World"
const str = "Hello World  ";
const result = str.replace(/\s+$/, ''); // "Hello World"
const str = "  Hello World  ";
const result = str.trim(); // "Hello World"
const str = "  Hello World  ";

// Remove both leading and trailing whitespace
const trimmed = str.trim(); // "Hello World"

// Remove leading whitespace only
const leftTrimmed = str.trimStart(); // "Hello World  "

// Remove trailing whitespace only
const rightTrimmed = str.trimEnd(); // "  Hello World"
function removeWhitespace(input: string, type: 'all' | 'leading' | 'trailing' | 'both' = 'both'): string {
  switch (type) {
    case 'all':
      return input.replace(/\s/g, '');
    case 'leading':
      return input.replace(/^\s+/, '');
    case 'trailing':
      return input.replace(/\s+$/, '');
    case 'both':
      return input.trim();
    default:
      return input.trim();
  }
}

// Usage
const str = "  Hello\tWorld\n ";
console.log(removeWhitespace(str, 'all')); // "HelloWorld"
console.log(removeWhitespace(str, 'leading')); // "Hello\tWorld\n "
console.log(removeWhitespace(str, 'trailing')); // "  Hello\tWorld"
console.log(removeWhitespace(str, 'both')); // "Hello\tWorld"
const str = "  Hello    World  ";
const result = str.trim().replace(/\s+/g, ' '); // "Hello World"
