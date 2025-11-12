function isPalindrome(s: string): boolean {
    // Convert to lowercase and remove non-alphanumeric characters
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0;
    let right = cleanString.length - 1;
    
    while (left < right) {
        if (cleanString[left] !== cleanString[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}
function isPalindrome(s: string): boolean {
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedString = cleanString.split('').reverse().join('');
    return cleanString === reversedString;
}
function isPalindrome(s: string): boolean {
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(str: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (str[start] !== str[end]) return false;
        return checkPalindrome(str, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanString, 0, cleanString.length - 1);
}
function isPalindromeCaseSensitive(s: string): boolean {
    const cleanString = s.replace(/[^a-zA-Z0-9]/g, '');
    let left = 0;
    let right = cleanString.length - 1;
    
    while (left < right) {
        if (cleanString[left] !== cleanString[right]) {
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
console.log(isPalindrome("Madam")); // true
console.log(isPalindrome("hello")); // false
