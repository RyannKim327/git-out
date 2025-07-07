function reverseWords(input: string): string {
    // Step 1: Split the string into words
    const words = input.split(' ');

    // Step 2: Reverse the order of words
    const reversedWords = words.reverse();

    // Step 3: Join the reversed words back into a string
    return reversedWords.join(' ');
}

// Example usage:
const originalString = "Hello, how are you?";
const reversedString = reverseWords(originalString);
console.log(reversedString); // Output: "you? are how Hello,"
function reverseWords(input: string): string {
    // Trim the input and split by one or more spaces
    const words = input.trim().split(/\s+/);

    // Reverse the order of words
    const reversedWords = words.reverse();

    // Join the reversed words back into a string
    return reversedWords.join(' ');
}

// Example usage:
const originalString = "   Hello,   how are   you?   ";
const reversedString = reverseWords(originalString);
console.log(reversedString); // Output: "you? are how Hello,"
