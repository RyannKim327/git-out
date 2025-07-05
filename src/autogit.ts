function countOccurrences(text: string, word: string): number {
    // Normalize the input by converting both to lowercase
    const normalizedText = text.toLowerCase();
    const normalizedWord = word.toLowerCase();

    // Split the text and filter for the specific word
    const words = normalizedText.split(/\W+/); // Split by non-word characters
    const count = words.filter(w => w === normalizedWord).length;

    return count;
}

// Example usage:
const text = "Hello world! Hello everyone. Welcome to the world of TypeScript.";
const wordToCount = "hello";
const occurrences = countOccurrences(text, wordToCount);

console.log(`The word "${wordToCount}" occurs ${occurrences} time(s).`);
function countOccurrencesRegex(text: string, word: string): number {
    // Normalize the input by converting both to lowercase
    const normalizedText = text.toLowerCase();
    const normalizedWord = word.toLowerCase();

    // Create a regular expression to match the word
    const regex = new RegExp(`\\b${normalizedWord}\\b`, 'g'); // \b ensures whole word match

    // Match the regex and count occurrences
    const matches = normalizedText.match(regex);
    
    // Return the count of matches or 0 if none found
    return matches ? matches.length : 0;
}

// Example usage:
const text = "Hello world! Hello everyone. Welcome to the world of TypeScript.";
const wordToCount = "hello";
const occurrences = countOccurrencesRegex(text, wordToCount);

console.log(`The word "${wordToCount}" occurs ${occurrences} time(s).`);
