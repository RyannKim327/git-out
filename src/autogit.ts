const str: string = "  Hello World  ";
const trimmed: string = str.trim();
console.log(trimmed); // "Hello World"
const str: string = "  Hello World  ";
const trimmedStart: string = str.trimStart(); // or trimLeft()
console.log(trimmedStart); // "Hello World  "
const str: string = "  Hello World  ";
const trimmedEnd: string = str.trimEnd(); // or trimRight()
console.log(trimmedEnd); // "  Hello World"
const str: string = "  Hello   World  ";
const noWhitespace: string = str.replace(/\s/g, '');
console.log(noWhitespace); // "HelloWorld"
const str: string = "  Hello   World  ";
const singleSpaced: string = str.replace(/\s+/g, ' ').trim();
console.log(singleSpaced); // "Hello World"
function removeWhitespace(str: string, options?: {
  leading?: boolean;
  trailing?: boolean;
  all?: boolean;
}): string {
  let result = str;
  
  if (options?.all) {
    return result.replace(/\s/g, '');
  }
  
  if (options?.leading) {
    result = result.trimStart();
  }
  
  if (options?.trailing) {
    result = result.trimEnd();
  }
  
  return result;
}

// Usage examples:
const str = "  Hello   World  ";
console.log(removeWhitespace(str, { all: true })); // "HelloWorld"
console.log(removeWhitespace(str, { leading: true })); // "Hello   World  "
