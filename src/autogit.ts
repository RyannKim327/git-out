const removeSpaces = (str: string): string => {
    return str.replace(/\s/g, '');
};

// Example usage
const text: string = "Hello World 2023";
const result: string = removeSpaces(text);
console.log(result); // Output: "HelloWorld2023"
const removeSpaces = (str: string): string => {
    return str.split(' ').join('');
};

// Example usage
const text: string = "Hello World 2023";
const result: string = removeSpaces(text);
console.log(result); // Output: "HelloWorld2023"
const removeSpaces = (str: string): string => {
    return str.replaceAll(' ', '');
};

// Example usage
const text: string = "Hello World 2023";
const result: string = removeSpaces(text);
console.log(result); // Output: "HelloWorld2023"
const removeSpaces = (str: string): string => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            result += str[i];
        }
    }
    return result;
};

// Example usage
const text: string = "Hello World 2023";
const result: string = removeSpaces(text);
console.log(result); // Output: "HelloWorld2023"
// Removes all types of whitespace (spaces, tabs, newlines)
const removeAllWhitespace = (str: string): string => {
    return str.replace(/\s/g, '');
};

// Removes only space characters
const removeSpacesOnly = (str: string): string => {
    return str.replaceAll(' ', '');
};
