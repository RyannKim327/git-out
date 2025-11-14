function isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
function isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
function isPalindrome(s: string): boolean {
    const alphanumeric = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return isPalindromeHelper(alphanumeric);
}

function isPalindromeHelper(s: string): boolean {
    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        if (s[i] !== s[s.length - 1 - i]) {
            return false;
        }
    }
    return true;
}
function isValidPalindrome(input: string): boolean {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    // Remove non-alphanumeric characters and convert to lowercase
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if empty or single character
    if (cleaned.length <= 1) {
        return true;
    }
    
    // Two-pointer approach
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}
// Test cases
console.log(isValidPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isValidPalindrome("race a car")); // false
console.log(isValidPalindrome(" ")); // true
console.log(isValidPalindrome("0P")); // false
console.log(isValidPalindrome("madam")); // true
