const str = "Hello World TypeScript";
const noSpaces = str.replace(/\s/g, '');
console.log(noSpaces); // "HelloWorldTypeScript"
const str = "Hello World TypeScript";
const noSpaces = str.replaceAll(' ', '');
console.log(noSpaces); // "HelloWorldTypeScript"
const str = "Hello World TypeScript";
const noSpaces = str.split(' ').join('');
console.log(noSpaces); // "HelloWorldTypeScript"
const str = "Hello\tWorld\nTypeScript";
const noWhitespace = str.replace(/\s/g, '');
console.log(noWhitespace); // "HelloWorldTypeScript"
// Generic function that works with any string
function removeSpaces<T extends string>(str: T): string {
  return str.replace(/\s/g, '');
}

// Specific function with type annotation
const removeAllSpaces = (str: string): string => {
  return str.replace(/\s/g, '');
};

// Usage
const result1 = removeSpaces("Hello World"); // Type: string
const result2 = removeAllSpaces("Type Script"); // Type: string
const original = "Remove all spaces from this string";
const cleaned = original.replace(/\s/g, '');
console.log(cleaned); // "Removeallspacesfromthisstring"
