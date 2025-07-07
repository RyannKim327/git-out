function reverseWords(input: string): string {
    // Step 1: Split the string into an array of words
    const wordsArray = input.split(' ');

    // Step 2: Reverse the array of words
    const reversedArray = wordsArray.reverse();

    // Step 3: Join the reversed array back into a string
    const reversedString = reversedArray.join(' ');

    return reversedString;
}

// Example usage
const originalString = "Hello world this is TypeScript";
const reversed = reverseWords(originalString);
console.log(reversed); // Output: "TypeScript is this world Hello"
function reverseWords(input: string): string {
    // Step 1: Trim the input and split by one or more spaces
    const wordsArray = input.trim().split(/\s+/);

    // Step 2: Reverse the array of words
    const reversedArray = wordsArray.reverse();

    // Step 3: Join the reversed array back into a string
    const reversedString = reversedArray.join(' ');

    return reversedString;
}

// Example usage
const originalString = "   Hello   world  this is TypeScript   ";
const reversed = reverseWords(originalString);
console.log(reversed); // Output: "TypeScript is this world Hello"
