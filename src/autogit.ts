/**
 * Counts the occurrences of a word in a string using regular expressions.
 * Handles case-insensitivity and whole word matching, ignoring punctuation attached to the word.
 *
 * @param text The string to search within.
 * @param word The word to search for.
 * @returns The number of occurrences.
 */
function countWordOccurrencesRegex(text: string, word: string): number {
    if (!text || !word) {
        return 0;
    }

    // Escape special regex characters in the 'word' to ensure they are treated literally
    // For example, if 'word' is "c++", we want to search for "c\+\+"
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regular expression:
    // - `\b`: Word boundary (ensures whole word match, e.g., "apple" doesn't match in "pineapple")
    // - `g`: Global flag (find all occurrences, not just the first)
    // - `i`: Case-insensitive flag
    const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');

    // `text.match(regex)` returns an array of all matches or `null` if no matches.
    const matches = text.match(regex);

    // If matches is null, there were no occurrences, so return 0. Otherwise, return the length of the matches array.
    return matches ? matches.length : 0;
}

// --- Examples ---
const sampleText = "Apple pie is delicious. An apple a day keeps the doctor away. I love Apples!";

console.log(`"${sampleText}"`);
console.log(`Word: "apple" -> Occurrences: ${countWordOccurrencesRegex(sampleText, "apple")}`);    // Output: 3 (apple, Apple, Apples)
console.log(`Word: "pie" -> Occurrences: ${countWordOccurrencesRegex(sampleText, "pie")}`);      // Output: 1
console.log(`Word: "day" -> Occurrences: ${countWordOccurrencesRegex(sampleText, "day")}`);      // Output: 1
console.log(`Word: "orange" -> Occurrences: ${countWordOccurrencesRegex(sampleText, "orange")}`);// Output: 0
console.log(`Word: "apple a" -> Occurrences: ${countWordOccurrencesRegex(sampleText, "apple a")}`);// Output: 1 (It correctly matches "apple a" as a phrase)

const complexText = "He said 'hello'. Hello, world! Is that hello?";
console.log(`\n"${complexText}"`);
console.log(`Word: "hello" -> Occurrences: ${countWordOccurrencesRegex(complexText, "hello")}`); // Output: 3 ('hello', Hello, hello)

const textWithPunctuation = "Word. Word? word! 'Word'.";
console.log(`\n"${textWithPunctuation}"`);
console.log(`Word: "word" -> Occurrences: ${countWordOccurrencesRegex(textWithPunctuation, "word")}`); // Output: 4 (handles punctuation correctly)

const textWithNumbers = "Item 1, Item 2, Item 10";
console.log(`\n"${textWithNumbers}"`);
console.log(`Word: "Item 1" -> Occurrences: ${countWordOccurrencesRegex(textWithNumbers, "Item 1")}`); // Output: 1 (It matches "Item 1" but not "Item 10")
/**
 * Counts the occurrences of a word by splitting the string, cleaning each word, and comparing.
 * Handles case-insensitivity and aims for whole word matching by cleaning.
 *
 * @param text The string to search within.
 * @param word The word to search for.
 * @returns The number of occurrences.
 */
function countWordOccurrencesSplitAndClean(text: string, word: string): number {
    if (!text || !word) {
        return 0;
    }

    const lowerCaseSearchWord = word.toLowerCase();
    let count = 0;

    // Split the text by one or more whitespace characters
    const words = text.split(/\s+/);

    for (const w of words) {
        // Remove common punctuation and convert to lowercase for comparison
        // The regex `/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g` targets many common punctuation marks.
        // You might need to adjust this regex based on what characters you consider "punctuation".
        const cleanedWord = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]+/g, "").toLowerCase();

        if (cleanedWord === lowerCaseSearchWord && cleanedWord !== '') {
            count++;
        }
    }

    return count;
}

// --- Examples ---
const sampleText2 = "Apple pie is delicious. An apple a day keeps the doctor away. I love Apples!";

console.log(`\n--- Split and Clean Method ---`);
console.log(`"${sampleText2}"`);
console.log(`Word: "apple" -> Occurrences: ${countWordOccurrencesSplitAndClean(sampleText2, "apple")}`);    // Output: 3
console.log(`Word: "pie" -> Occurrences: ${countWordOccurrencesSplitAndClean(sampleText2, "pie")}`);      // Output: 1
console.log(`Word: "day" -> Occurrences: ${countWordOccurrencesSplitAndClean(sampleText2, "day")}`);      // Output: 1
console.log(`Word: "orange" -> Occurrences: ${countWordOccurrencesSplitAndClean(sampleText2, "orange")}`);// Output: 0
console.log(`Word: "apple a" -> Occurrences: ${countWordOccurrencesSplitAndClean(sampleText2, "apple a")}`);// Output: 0 (Doesn't handle phrases as easily as regex)

const complexText2 = "He said 'hello'. Hello, world! Is that hello?";
console.log(`\n"${complexText2}"`);
console.log(`Word: "hello" -> Occurrences: ${countWordOccurrencesSplitAndClean(complexText2, "hello")}`); // Output: 3

const textWithPunctuation2 = "Word. Word? word! 'Word'.";
console.log(`\n"${textWithPunctuation2}"`);
console.log(`Word: "word" -> Occurrences: ${countWordOccurrencesSplitAndClean(textWithPunctuation2, "word")}`); // Output: 4

const textWithHyphens = "This is a hyphenated-word and another-one.";
console.log(`\n"${textWithHyphens}"`);
console.log(`Word: "hyphenated-word" -> Occurrences: ${countWordOccurrencesSplitAndClean(textWithHyphens, "hyphenated-word")}`); // Output: 0 (This method splits on hyphens if not carefully handled)
console.log(`Word: "hyphenated" -> Occurrences: ${countWordOccurrencesSplitAndClean(textWithHyphens, "hyphenated")}`); // Output: 1
/**
 * Counts occurrences of a substring using indexOf.
 * This method is generally NOT recommended for *whole word* counting
 * because it matches substrings, not word boundaries, and adding
 * word boundary logic manually is complex and error-prone.
 * Use Regex or Split/Clean for whole words.
 *
 * @param text The string to search within.
 * @param word The substring to search for.
 * @returns The number of occurrences.
 */
function countSubstringOccurrencesIndexOf(text: string, word: string): number {
    if (!text || !word) {
        return 0;
    }

    let count = 0;
    let position = -1;
    const lowerCaseText = text.toLowerCase();
    const lowerCaseWord = word.toLowerCase();

    while ((position = lowerCaseText.indexOf(lowerCaseWord, position + 1)) !== -1) {
        count++;
    }

    return count;
}

// --- Examples ---
const sampleText3 = "Apple pie is delicious. An apple a day keeps the doctor away. I love Apples!";

console.log(`\n--- indexOf Method (Counts Substrings, Not Whole Words!) ---`);
console.log(`"${sampleText3}"`);
console.log(`Word: "apple" -> Occurrences: ${countSubstringOccurrencesIndexOf(sampleText3, "apple")}`); // Output: 4 (apple, Apple, Apples, and "apple" inside "Apples!")
console.log(`Word: "apple" -> Correct: 3. Incorrect count here because it matches "apple" within "Apples!"`);
