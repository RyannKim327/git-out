function isPalindrome(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
function isPalindrome(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
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
function isPalindromeRecursive(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(str: string, left: number, right: number): boolean {
        if (left >= right) return true;
        if (str[left] !== str[right]) return false;
        return checkPalindrome(str, left + 1, right - 1);
    }
    
    return checkPalindrome(cleanStr, 0, cleanStr.length - 1);
}
// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
console.log(isPalindrome("Madam")); // true

// Case-sensitive version
console.log(isPalindromeSimple("Madam")); // false (M ≠ m)
console.log(isPalindromeSimple("madam")); // true
function isPalindromeRobust(s: string): boolean {
    if (s.length <= 1) return true;
    
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Handle empty string after cleaning
    if (cleanStr.length === 0) return true;
    
    let left = 0;
    let right = cleanStr.length - 1;
    
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
function isValidPalindrome(input: unknown): boolean {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    const s = input as string;
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    for (let i = 0; i < Math.floor(cleanStr.length / 2); i++) {
        if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
            return false;
        }
    }
    return true;
}
