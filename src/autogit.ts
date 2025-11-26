function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Move left pointer to the next alphanumeric character
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Move right pointer to the previous alphanumeric character
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        // Compare characters (case-insensitive)
        if (left < right && toLower(s[left]) !== toLower(s[right])) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// Checks if a character is alphanumeric
function isAlphanumeric(char: string): boolean {
    const code = char.charCodeAt(0);
    return (
        (code >= 48 && code <= 57) ||    // 0-9
        (code >= 65 && code <= 90) ||    // A-Z
        (code >= 97 && code <= 122)      // a-z
    );
}

// Converts a character to lowercase
function toLower(char: string): string {
    return char.toLowerCase();
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(""));                               // true
console.log(isPalindrome(" !@#$%^&*()"));                    // true (only non-alphanumeric)
