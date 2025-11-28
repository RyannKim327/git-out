/**
 * Checks if a character is alphanumeric (a-z, A-Z, 0-9).
 * This helper function uses a regular expression which is concise.
 * While regex engines might involve some internal state, it's generally
 * considered constant space for a fixed pattern like this, not dependent
 * on the input string's length.
 */
function isAlphaNumeric(char: string): boolean {
    // Regex to match a single character that is a letter (case-insensitive) or a digit
    return /^[a-zA-Z0-9]$/.test(char);
}

/**
 * Checks if a string is a valid palindrome, ignoring non-alphanumeric characters
 * and case, without using extra space proportional to the input string length.
 *
 * @param s The input string.
 * @returns True if the string is a palindrome, false otherwise.
 */
function isPalindromeNoExtraSpace(s: string): boolean {
    // Handle edge cases: empty string or single character string is a palindrome
    if (!s || s.length < 2) {
        return true;
    }

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Move left pointer inward until an alphanumeric character is found
        // Ensure left < right to prevent out-of-bounds access if all remaining chars are non-alphanumeric
        while (left < right && !isAlphaNumeric(s[left])) {
            left++;
        }

        // Move right pointer inward until an alphanumeric character is found
        // Ensure left < right for the same reason
        while (left < right && !isAlphaNumeric(s[right])) {
            right--;
        }

        // If pointers have crossed or met, all valid characters have been checked
        // or the string has no valid characters (e.g., ".,,," which is a palindrome)
        if (left >= right) {
            break;
        }

        // Compare the characters, ignoring case
        // Convert to lowercase for case-insensitive comparison
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false; // Mismatch found, not a palindrome
        }

        // Move pointers inward for the next comparison
        left++;
        right--;
    }

    return true; // All valid characters matched, it's a palindrome
}

// --- Test Cases ---
console.log("--- Test Cases ---");
console.log("1. 'A man, a plan, a canal: Panama'");
console.log(`Expected: true, Actual: ${isPalindromeNoExtraSpace("A man, a plan, a canal: Panama")}`); // true

console.log("\n2. 'race a car'");
console.log(`Expected: false, Actual: ${isPalindromeNoExtraSpace("race a car")}`); // false

console.log("\n3. ' ' (empty string)");
console.log(`Expected: true, Actual: ${isPalindromeNoExtraSpace(" ")}`); // true (after trimming/skipping space, effectively empty)

console.log("\n4. 'a'");
console.log(`Expected: true, Actual: ${isPalindromeNoExtraSpace("a")}`); // true

console.log("\n5. 'ab_a'");
console.log(`Expected: true, Actual: ${isPalindromeNoExtraSpace("ab_a")}`); // true

console.log("\n6. '0P'");
console.log(`Expected: false, Actual: ${isPalindromeNoExtraSpace("0P")}`); // false

console.log("\n7. 'Madam'");
console.log(`Expected: true, Actual: ${isPalindromeNoExtraSpace("Madam")}`); // true

console.log("\n8. 'Live not on evil'");
console.log(`Expected: true, Actual: ${isPalindromeNoExtraSpace("Live not on evil")}`); // true

console.log("\n9. ',,.,,'");
console.log(`Expected: true, Actual: ${isPalindromeNoExtraSpace(",,.,,")}`); // true (all non-alphanumeric, effectively empty)
