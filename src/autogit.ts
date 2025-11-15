/**
 * Checks if a character is alphanumeric (a-z, A-Z, 0-9).
 * This helper function uses constant extra space.
 * @param char The character to check.
 * @returns True if the character is alphanumeric, false otherwise.
 */
function isAlphanumeric(char: string): boolean {
    // Regex is a clean way to check for alphanumeric characters.
    // The 'i' flag makes it case-insensitive.
    // We match against a single character [a-z0-9].
    return /^[a-z0-9]$/i.test(char);
}

/**
 * Checks if a string is a valid palindrome, ignoring non-alphanumeric characters
 * and case sensitivity, without using extra space.
 *
 * Time Complexity: O(n), where n is the length of the string, as we traverse the string once.
 * Space Complexity: O(1), as we only use a few pointer variables.
 *
 * @param s The input string.
 * @returns True if the string is a valid palindrome, false otherwise.
 */
function isValidPalindromeNoExtraSpace(s: string): boolean {
    // Handle empty or null/undefined strings as valid palindromes
    if (!s) {
        return true;
    }

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Move left pointer inwards until it finds an alphanumeric character
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }

        // Move right pointer inwards until it finds an alphanumeric character
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }

        // If pointers have crossed or met after skipping non-alphanumeric characters,
        // it means all relevant characters have been checked (or string was all non-alphanumeric).
        if (left >= right) {
            break;
        }

        // Compare the characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false; // Mismatch found, not a palindrome
        }

        // Move both pointers inwards
        left++;
        right--;
    }

    return true; // All checks passed, it's a palindrome
}

// --- Test Cases ---

console.log(`"" is palindrome: ${isValidPalindromeNoExtraSpace("")}`); // true
console.log(`"a" is palindrome: ${isValidPalindromeNoExtraSpace("a")}`); // true
console.log(`"ab" is palindrome: ${isValidPalindromeNoExtraSpace("ab")}`); // false
console.log(`"aba" is palindrome: ${isValidPalindromeNoExtraSpace("aba")}`); // true
console.log(`"racecar" is palindrome: ${isValidPalindromeNoExtraSpace("racecar")}`); // true
console.log(`"Racecar" is palindrome: ${isValidPalindromeNoExtraSpace("Racecar")}`); // true (case-insensitive)
console.log(`"A man, a plan, a canal: Panama" is palindrome: ${isValidPalindromeNoExtraSpace("A man, a plan, a canal: Panama")}`); // true
console.log(`"No lemon, no melon" is palindrome: ${isValidPalindromeNoExtraSpace("No lemon, no melon")}`); // true
console.log(`"Hello, world!" is palindrome: ${isValidPalindromeNoExtraSpace("Hello, world!")}`); // false
console.log(`"12321" is palindrome: ${isValidPalindromeNoExtraSpace("12321")}`); // true
console.log(`"123a321" is palindrome: ${isValidPalindromeNoExtraSpace("123a321")}`); // true
console.log(`"Madam, I'm Adam" is palindrome: ${isValidPalindromeNoExtraSpace("Madam, I'm Adam")}`); // true
console.log(`" " is palindrome: ${isValidPalindromeNoExtraSpace(" ")}`); // true (single space, treated as all non-alphanumeric)
console.log(`".,,," is palindrome: ${isValidPalindromeNoExtraSpace(".,,,")}`); // true (all non-alphanumeric)
