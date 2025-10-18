// Remove all whitespace from entire string
const str = " Hello  World\n\t! ";
const result = str.replace(/\s/g, "");
console.log(result); // "HelloWorld!"
// Remove whitespace from both ends
const str = "   Hello World   ";
const trimmed = str.trim();
console.log(trimmed); // "Hello World"

// Remove only leading whitespace
const leftTrimmed = str.trimStart();
console.log(leftTrimmed); // "Hello World   "

// Remove only trailing whitespace
const rightTrimmed = str.trimEnd();
console.log(rightTrimmed); // "   Hello World"
// Remove only spaces
const noSpaces = str.replace(/ /g, "");

// Remove only tabs
const noTabs = str.replace(/\t/g, "");

// Remove only newlines
const noNewlines = str.replace(/\n/g, "");
// Replace multiple spaces with single space
const str = "Hello    World   !";
const collapsed = str.replace(/\s+/g, " ");
console.log(collapsed); // "Hello World !"
function removeWhitespace(input: string, options?: {
  trim?: boolean;
  removeAll?: boolean;
  collapse?: boolean;
}): string {
  let result = input;
  
  if (options?.trim) {
    result = result.trim();
  }
  
  if (options?.removeAll) {
    result = result.replace(/\s/g, "");
  } else if (options?.collapse) {
    result = result.replace(/\s+/g, " ");
  }
  
  return result;
}

// Usage examples
const example = "  Hello   World  \n\t! ";
console.log(removeWhitespace(example, { trim: true, removeAll: true })); // "HelloWorld!"
console.log(removeWhitespace(example, { trim: true, collapse: true })); // "Hello World !"
const str: string = "  Hello World  ";

// TypeScript will infer the return type as string
const trimmed: string = str.trim();
const noSpaces: string = str.replace(/\s/g, "");
