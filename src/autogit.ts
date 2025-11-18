const str: string = " Hello   World\t\n ";
const result: string = str.replace(/\s+/g, ''); // "HelloWorld"
const str: string = "   Hello World    ";
const result: string = str.trim(); // "Hello World"
const str: string = "   Hello World";
const result: string = str.trimStart(); // "Hello World"
const str: string = "Hello World    ";
const result: string = str.trimEnd(); // "Hello World"
const str: string = " Hello   World\t\n ";
const result: string = str.replace(/ /g, ''); // "HelloWorld\t\n"
function removeWhitespace(str: string, options: { trim?: boolean; global?: boolean } = {}): string {
  if (options.trim) return str.trim();
  if (options.global) return str.replace(/\s+/g, '');
  return str;
}

// Usage:
removeWhitespace("  foo bar\t", { global: true }); // "foobar"
removeWhitespace("  foo bar\t", { trim: true }); // "foo bar"
