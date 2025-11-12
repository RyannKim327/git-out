function isPalindrome(s: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
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
function isValidPalindrome(str: string): boolean {
    if (str.length === 0) return true;
    
    // Clean the string: remove non-alphanumeric chars and lowercase
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Use two pointers to check from both ends
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
function isPalindromeRecursive(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(str: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (str[start] !== str[end]) return false;
        return checkPalindrome(str, start + 1, end - 1);
    }
    
    return checkPalindrome(cleaned, 0, cleaned.length - 1);
}
// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
console.log(isPalindrome("0P")); // false
console.log(isPalindrome("madam")); // true
