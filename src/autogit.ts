function findFirstNonRepeatingChar(text: string): string | null {
    if (!text) {
        return null; // Handle empty string case
    }

    // Use a Map to store character counts.
    // Map is generally preferred over plain objects for frequency counting
    // because keys can be any type and it avoids prototype issues.
    const charCounts = new Map<string, number>();

    // First pass: Populate the character counts
    for (const char of text) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // Second pass: Find the first character with a count of 1
    for (const char of text) {
        if (charCounts.get(char) === 1) {
            return char;
        }
    }

    // If no non-repeating character is found
    return null;
}

// --- Test Cases ---
console.log(`"" -> ${findFirstNonRepeatingChar("")}`); // null
console.log(`"a" -> ${findFirstNonRepeatingChar("a")}`); // "a"
console.log(`"aa" -> ${findFirstNonRepeatingChar("aa")}`); // null
console.log(`"aabbcdef" -> ${findFirstNonRepeatingChar("aabbcdef")}`); // "c"
console.log(`"swiss" -> ${findFirstNonRepeatingChar("swiss")}`); // "w"
console.log(`"hello" -> ${findFirstNonRepeatingChar("hello")}`); // "h"
console.log(`"programming" -> ${findFirstNonRepeatingChar("programming")}`); // "p"
console.log(`"aabbcc" -> ${findFirstNonRepeatingChar("aabbcc")}`); // null
function findFirstNonRepeatingChar_Concise(text: string): string | null {
    if (!text) {
        return null;
    }

    // Convert the string to an array of characters and use .find()
    return text.split('').find(char => 
        text.indexOf(char) === text.lastIndexOf(char)
    ) || null; // Return null if find() doesn't find anything
}

// --- Test Cases ---
console.log(`--- Concise Method ---`);
console.log(`"" -> ${findFirstNonRepeatingChar_Concise("")}`); // null
console.log(`"a" -> ${findFirstNonRepeatingChar_Concise("a")}`); // "a"
console.log(`"aa" -> ${findFirstNonRepeatingChar_Concise("aa")}`); // null
console.log(`"aabbcdef" -> ${findFirstNonRepeatingChar_Concise("aabbcdef")}`); // "c"
console.log(`"swiss" -> ${findFirstNonRepeatingChar_Concise("swiss")}`); // "w"
console.log(`"hello" -> ${findFirstNonRepeatingChar_Concise("hello")}`); // "h"
console.log(`"programming" -> ${findFirstNonRepeatingChar_Concise("programming")}`); // "p"
console.log(`"aabbcc" -> ${findFirstNonRepeatingChar_Concise("aabbcc")}`); // null
