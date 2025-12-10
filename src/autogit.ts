function isPalindrome(s: string): boolean {
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

// Example usage
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
function isPalindromeCaseInsensitive(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !s[left].match(/[a-z0-9]/i)) {
            left++;
        }
        while (left < right && !s[right].match(/[a-z0-9]/i)) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    return true;
}

// Example usage
console.log(isPalindromeCaseInsensitive("A man, a plan, a canal: Panama")); // true
console.log(isPalindromeCaseInsensitive("race a car")); // false
function isPalindromeRecursive(s: string, left: number = 0, right: number = s.length - 1): boolean {
    if (left >= right) {
        return true;
    }
    
    if (s[left] !== s[right]) {
        return false;
    }
    
    return isPalindromeRecursive(s, left + 1, right - 1);
}

// Example usage
console.log(isPalindromeRecursive("madam")); // true
console.log(isPalindromeRecursive("world")); // false
// This uses O(n) space but is concise
function isPalindromeBuiltIn(s: string): boolean {
    return s === s.split('').reverse().join('');
}

// Example usage
console.log(isPalindromeBuiltIn("level")); // true
function isValidPalindrome(s: string): boolean {
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
