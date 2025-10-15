function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char: string): boolean {
    return /^[a-zA-Z0-9]$/.test(char);
}
function isPalindromeSimple(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}
function isPalindromeRecursive(s: string, left: number = 0, right: number = s.length - 1): boolean {
    // Base case
    if (left >= right) {
        return true;
    }
    
    // Skip non-alphanumeric characters
    if (!isAlphanumeric(s[left])) {
        return isPalindromeRecursive(s, left + 1, right);
    }
    if (!isAlphanumeric(s[right])) {
        return isPalindromeRecursive(s, left, right - 1);
    }
    
    // Compare characters
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
        return false;
    }
    
    return isPalindromeRecursive(s, left + 1, right - 1);
}
function isPalindromeCaseInsensitive(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        const leftChar = s[left].toLowerCase();
        const rightChar = s[right].toLowerCase();
        
        if (leftChar !== rightChar) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}
// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
