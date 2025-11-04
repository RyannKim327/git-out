const str = "Hello World!  How are you?";
const result = str.replace(/\s/g, '');
console.log(result); // Output: "HelloWorld!Howareyou?"
const str = "Hello World!  How are you?";
const result = str.replace(/ /g, '');
console.log(result); // Output: "HelloWorld!Howareyou?"
const str = "Hello World!";
const result = str.split(' ').join('');
console.log(result); // Output: "HelloWorld!"
const removeSpaces = (input: string, removeAllWhitespace = true): string => {
  return removeAllWhitespace 
    ? input.replace(/\s/g, '')   // Remove all whitespace
    : input.replace(/ /g, '');   // Remove only spaces
};

// Usage
console.log(removeSpaces("Hello\t\nWorld!")); // Output: "HelloWorld!"
console.log(removeSpaces("Hello\t\nWorld!", false)); // Output: "Hello\t\nWorld!"
