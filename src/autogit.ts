function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Examples
console.log(isPalindrome("racecar"));     // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello"));       // false
function isPalindromeTwoPointers(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
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
function isPalindromeRecursive(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (s[start] !== s[end]) return false;
        return checkPalindrome(s, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanStr, 0, cleanStr.length - 1);
}
function isPalindromeCaseSensitive(str: string): boolean {
    // Keep original case if case sensitivity matters
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}
const isPalindrome = (str: string): boolean => 
    str.toLowerCase().replace(/[^a-z0-9]/g, '') === 
    str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').reverse().join('');
function testPalindrome(): void {
    const testCases: { input: string; expected: boolean }[] = [
        { input: "racecar", expected: true },
        { input: "A man, a plan, a canal: Panama", expected: true },
        { input: "hello", expected: false },
        { input: "12321", expected: true },
        { input: "Was it a car or a cat I saw?", expected: true },
        { input: "", expected: true }, // Empty string is a palindrome
        { input: "a", expected: true }, // Single character is a palindrome
    ];

    testCases.forEach(({ input, expected }) => {
        const result = isPalindrome(input);
        console.log(`"${input}" -> ${result} (expected: ${expected})`);
    });
}

testPalindrome();
