function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Example usage
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("A man, a plan, a canal, Panama")); // true
console.log(isPalindrome("hello")); // false
function isPalindrome(str: string): boolean {
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
function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (s[start] !== s[end]) return false;
        return checkPalindrome(s, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanStr, 0, cleanStr.length - 1);
}
function isPalindrome(str: string, caseSensitive = false): boolean {
    let cleanStr = str.replace(/[^a-zA-Z0-9]/g, '');
    if (!caseSensitive) {
        cleanStr = cleanStr.toLowerCase();
    }
    
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Usage examples
console.log(isPalindrome("Racecar")); // true (case-insensitive)
console.log(isPalindrome("Racecar", true)); // false (case-sensitive)
const isPalindrome = (str: string): boolean => 
    str.toLowerCase().replace(/[^a-z0-9]/g, '') === 
    str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').reverse().join('');
const testCases = [
    "racecar",
    "A man, a plan, a canal, Panama",
    "hello",
    " ",
    "a",
    "Madam, I'm Adam"
];

testCases.forEach(test => {
    console.log(`"${test}" -> ${isPalindrome(test)}`);
});
