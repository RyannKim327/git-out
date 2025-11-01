const removeSpaces = (str: string): string => {
  return str.replace(/ /g, ''); // Removes all space characters
};

// Example
const result = removeSpaces('H e l l o   W o r l d'); 
console.log(result); // Output: "HelloWorld"
const removeSpaces = (str: string): string => {
  return str.replaceAll(' ', '');
};

// Example
const result = removeSpaces('T y p e S c r i p t');
console.log(result); // Output: "TypeScript"
const removeSpaces = (str: string): string => {
  return str.split(' ').join('');
};

// Example
const result = removeSpaces('T e s t S t r i n g');
console.log(result); // Output: "TestString"
