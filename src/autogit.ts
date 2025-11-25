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

// Usage examples
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
function isPalindrome(s: string): boolean {
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanString === cleanString.split('').reverse().join('');
}
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphaNumeric(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphaNumeric(s[right])) {
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

function isAlphaNumeric(char: string): boolean {
    const code = char.charCodeAt(0);
    return (code >= 48 && code <= 57) ||  // 0-9
           (code >= 65 && code <= 90) ||  // A-Z
           (code >= 97 && code <= 122);   // a-z
}
class PalindromeChecker {
    static isPalindrome(s: string): boolean {
        const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleanString === cleanString.split('').reverse().join('');
    }
}

// Usage
console.log(PalindromeChecker.isPalindrome("madam")); // true
function isPalindrome(s: string): boolean {
    const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(str: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (str[start] !== str[end]) return false;
        return checkPalindrome(str, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanString, 0, cleanString.length - 1);
}
// Test function
function testPalindrome() {
    const testCases = [
        { input: "A man, a plan, a canal: Panama", expected: true },
        { input: "race a car", expected: false },
        { input: " ", expected: true },
        { input: "madam", expected: true },
        { input: "hello", expected: false },
        { input: "12321", expected: true },
        { input: "No 'x' in Nixon", expected: true }
    ];

    testCases.forEach((test, index) => {
        const result = isPalindrome(test.input);
        console.log(`Test ${index + 1}: ${result === test.expected ? 'PASS' : 'FAIL'}`);
        console.log(`Input: "${test.input}" -> Result: ${result}`);
    });
}

testPalindrome();
