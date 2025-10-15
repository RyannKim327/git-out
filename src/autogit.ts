function isValidPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Compare characters (case insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// Helper function to check if a character is alphanumeric
function isAlphanumeric(char: string): boolean {
    const code = char.charCodeAt(0);
    // Check for letters (a-z, A-Z) or digits (0-9)
    return (code >= 65 && code <= 90) || // A-Z
           (code >= 97 && code <= 122) || // a-z
           (code >= 48 && code <= 57);    // 0-9
}

// Usage examples
console.log(isValidPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isValidPalindrome("race a car")); // false
console.log(isValidPalindrome(" ")); // true
console.log(isValidPalindrome(".,")); // true
console.log(isValidPalindrome("ab")); // true
function isValidPalindrome(s: string): boolean {
    const validChars = s.toLowerCase().match(/[a-z0-9]/g);
    
    if (!validChars) return true;
    
    let left = 0;
    let right = validChars.length - 1;
    
    while (left < right) {
        if (validChars[left] !== validChars[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}
