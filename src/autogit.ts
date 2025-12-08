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
    return /[a-zA-Z0-9]/.test(char);
}

// Usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        const leftChar = s[left].toLowerCase();
        const rightChar = s[right].toLowerCase();
        
        if (!/[a-z0-9]/.test(leftChar)) {
            left++;
        } else if (!/[a-z0-9]/.test(rightChar)) {
            right--;
        } else if (leftChar !== rightChar) {
            return false;
        } else {
            left++;
            right--;
        }
    }
    
    return true;
}
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

// Usage - only works for strings without spaces/special chars
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
