function longestCommonPrefix(strings: string[]): string {
    // 1. Handle edge cases:
    // If the array is empty or null, there's no common prefix.
    if (!strings || strings.length === 0) {
        return "";
    }

    // If there's only one string, it is its own longest common prefix.
    if (strings.length === 1) {
        return strings[0];
    }

    // 2. Take the first string as a reference.
    const firstString = strings[0];

    // 3. Iterate through the characters of the first string.
    for (let i = 0; i < firstString.length; i++) {
        const char = firstString[i];

        // 4. For each character, compare it with the corresponding character
        //    in all other strings in the array.
        //    Start from the second string (index 1) since the first is our reference.
        for (let j = 1; j < strings.length; j++) {
            const currentString = strings[j];

            // 5. Check two conditions to determine if the prefix ends:
            //    a) If the current string is shorter than the current character index `i`.
            //    b) If the character at index `i` in the current string doesn't match `char`.
            if (i >= currentString.length || currentString[i] !== char) {
                // If either condition is true, we've found the end of the LCP.
                // Return the substring of the first string from index 0 up to (but not including) `i`.
                return firstString.substring(0, i);
            }
        }
    }

    // 6. If the loop completes, it means all characters of the first string
    //    are common to all other strings. In this case, the first string itself
    //    is the longest common prefix.
    return firstString;
}

// --- Examples ---

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // Output: ""
console.log(longestCommonPrefix(["apple", "apricot", "apply"])); // Output: "ap"
console.log(longestCommonPrefix(["apple"]));                     // Output: "apple"
console.log(longestCommonPrefix([]));                            // Output: ""
console.log(longestCommonPrefix(["", "abc", "def"]));           // Output: ""
console.log(longestCommonPrefix(["hello", "hell", "heaven"]));   // Output: "he"
console.log(longestCommonPrefix(["aa", "a"]));                 // Output: "a"
