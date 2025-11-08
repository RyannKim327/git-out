function isPalindrome(s: string): boolean {
    // 1. Sanitize the input string: remove non-alphanumeric chars and convert to lowercase
    const sanitized = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // 2. Check if sanitized string reads the same forwards and backwards
    return sanitized === sanitized.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(" "));                               // true (empty string is a palindrome)
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    const lowerS = s.toLowerCase();

    while (left < right) {
        // Skip non-alphanumeric characters from the left
        while (left < right && !isAlphaNumeric(lowerS[left])) left++;
        // Skip non-alphanumeric characters from the right
        while (left < right && !isAlphaNumeric(lowerS[right])) right--;
        
        if (lowerS[left] !== lowerS[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Helper function to check alphanumeric
function isAlphaNumeric(c: string): boolean {
    return (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
}
