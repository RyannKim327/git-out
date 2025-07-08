function countOccurrences(text: string, word: string): number {
    // Normalize the text and the word to lower case for case-insensitive comparison
    const normalizedText = text.toLowerCase();
    const normalizedWord = word.toLowerCase();

    // Split the text by word boundaries (spaces, punctuation, etc.)
    // The regular expression \b is used to match word boundaries.
    const wordsArray = normalizedText.split(/\b/);

    // Filter the words array to count occurrences of the specific word
    let count = 0;
    for (const w of wordsArray) {
        // Trim whitespace and check
        if (w.trim() === normalizedWord) {
            count++;
        }
    }

    return count;
}

// Example usage
const text = "Hello world! This is a test. Hello world again.";
const word = "hello";
const occurrences = countOccurrences(text, word);
console.log(`The word "${word}" occurs ${occurrences} times.`); // Output: The word "hello" occurs 2 times.
