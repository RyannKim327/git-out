function isPalindrome(s: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
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

// Examples
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
function isPalindromeBuiltIn(s: string): boolean {
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanString.split('').reverse().join('');
    return cleanString === reversed;
}
function isPalindromeRecursive(s: string): boolean {
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(str: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (str[start] !== str[end]) return false;
        return checkPalindrome(str, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanString, 0, cleanString.length - 1);
}
function isPalindromeComplete(s: string): boolean {
    // Handle empty string or single character
    if (s.length <= 1) return true;
    
    // Clean the string: remove non-alphanumeric and convert to lowercase
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Use two pointers technique
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
const testCases = [
    "A man, a plan, a canal: Panama", // true
    "race a car",                     // false
    " ",                              // true
    "a",                              // true
    "ab",                             // false
    "aba",                            // true
    "racecar",                        // true
    "hello",                          // false
    "12321",                          // true
    "Was it a car or a cat I saw?",   // true
];

testCases.forEach(test => {
    console.log(`"${test}" -> ${isPalindromeComplete(test)}`);
});
