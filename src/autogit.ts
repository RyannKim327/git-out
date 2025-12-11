function isPalindrome(s: string): boolean {
    // Convert to lowercase and remove non-alphanumeric characters
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
function isPalindromeReverse(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}
function isPalindromeRecursive(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(str: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (str[start] !== str[end]) return false;
        return checkPalindrome(str, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanStr, 0, cleanStr.length - 1);
}
function isPalindromeCaseSensitive(s: string): boolean {
    const cleanStr = s.replace(/[^a-zA-Z0-9]/g, '');
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
function isPalindromeSafe(s: unknown): boolean {
    if (typeof s !== 'string') return false;
    
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Handle empty string and single character cases
    if (cleanStr.length <= 1) return true;
    
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
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
console.log(isPalindrome("Able was I ere I saw Elba")); // true
console.log(isPalindrome("hello")); // false
