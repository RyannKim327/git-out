function isPalindrome(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Usage
console.log(isPalindrome("racecar"));  // true
console.log(isPalindrome("hello"));     // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
function isPalindromeTwoPointers(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanedStr.length - 1;
    
    while (left < right) {
        if (cleanedStr[left] !== cleanedStr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
function isPalindromeRecursive(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (cleanedStr.length <= 1) {
        return true;
    }
    
    if (cleanedStr[0] !== cleanedStr[cleanedStr.length - 1]) {
        return false;
    }
    
    return isPalindromeRecursive(cleanedStr.slice(1, -1));
}
function isPalindromeArrayMethods(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanedStr.split('').every((char, index) => {
        return char === cleanedStr[cleanedStr.length - 1 - index];
    });
}
function isPalindrome(str: string, caseSensitive: boolean = false): boolean {
    // Handle null/undefined
    if (str == null) return false;
    
    // Clean the string (remove non-alphanumeric characters)
    let processedStr = str.replace(/[^a-zA-Z0-9]/g, '');
    
    if (!caseSensitive) {
        processedStr = processedStr.toLowerCase();
    }
    
    // Check for empty string after cleaning
    if (processedStr.length === 0) return true;
    
    // Use two-pointer technique
    let left = 0;
    let right = processedStr.length - 1;
    
    while (left < right) {
        if (processedStr[left] !== processedStr[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Test cases
const testCases = [
    "racecar",
    "hello",
    "A man, a plan, a canal: Panama",
    "Madam",
    "12321",
    "",
    "a",
    "No 'x' in Nixon"
];

testCases.forEach(test => {
    console.log(`"${test}" -> ${isPalindrome(test)}`);
});
