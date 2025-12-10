function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphaNumeric(s.charCodeAt(left))) left++;

        // Skip non-alphanumeric from right
        while (left < right && !isAlphaNumeric(s.charCodeAt(right))) right--;

        // Compare lowercase versions without using toLowerCase()
        if (toLower(s.charCodeAt(left)) !== toLower(s.charCodeAt(right))) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

// Helper: check if char code is alphanumeric
function isAlphaNumeric(code: number): boolean {
    return (
        (code >= 48 && code <= 57) || // 0-9
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122)   // a-z
    );
}

// Helper: convert to lowercase without toLowerCase()
function toLower(code: number): number {
    if (code >= 65 && code <= 90) return code + 32;
    return code;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
