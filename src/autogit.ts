function isPalindrome(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}
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
    
    function checkPalindrome(str: string): boolean {
        if (str.length <= 1) return true;
        if (str[0] !== str[str.length - 1]) return false;
        return checkPalindrome(str.slice(1, -1));
    }
    
    return checkPalindrome(cleanStr);
}
function isPalindrome(s: string): boolean {
    // Input validation
    if (typeof s !== 'string') return false;
    if (s.length === 0) return true;
    
    // Clean the string (remove non-alphanumeric characters and convert to lowercase)
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Empty string after cleaning is considered a palindrome
    if (cleanStr.length === 0) return true;
    
    // Two-pointer technique
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
// Test cases
console.log(isPalindrome("racecar"));        // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));     // false
console.log(isPalindrome(""));               // true
console.log(isPalindrome("a"));              // true
console.log(isPalindrome("12321"));          // true
