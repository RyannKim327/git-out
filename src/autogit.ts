function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non-alphanumeric chars from left
        while (left < right && !isAlphaNumeric(s[left])) left++;

        // Skip non-alphanumeric chars from right
        while (left < right && !isAlphaNumeric(s[right])) right--;

        // Compare lowercase chars
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

// Helper: checks if a character is alphanumeric
function isAlphaNumeric(ch: string): boolean {
    const code = ch.charCodeAt(0);
    return (
        (code >= 48 && code <= 57) || // 0-9
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122)    // a-z
    );
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
