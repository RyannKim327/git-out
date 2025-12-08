function isPalindrome(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Usage
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("A man, a plan, a canal, Panama")); // true
function isPalindrome(str: string): boolean {
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
function isPalindrome(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (s[start] !== s[end]) return false;
        return checkPalindrome(s, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanedStr, 0, cleanedStr.length - 1);
}
function isPalindrome(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanedStr.split('').every((char, index) => {
        return char === cleanedStr[cleanedStr.length - 1 - index];
    });
}
function isPalindromeCaseSensitive(str: string): boolean {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Usage
console.log(isPalindromeCaseSensitive("Racecar")); // false (because 'R' != 'r')
class PalindromeChecker {
    static isPalindrome(str: string, caseSensitive: boolean = false): boolean {
        let cleanedStr: string;
        
        if (caseSensitive) {
            cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '');
        } else {
            cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        }
        
        // Use two-pointer technique for efficiency
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
}

// Test cases
const testCases = [
    "racecar",
    "A man, a plan, a canal, Panama",
    "hello",
    "12321",
    "No 'x' in Nixon"
];

testCases.forEach(test => {
    console.log(`"${test}" -> ${PalindromeChecker.isPalindrome(test)}`);
});
