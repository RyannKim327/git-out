function isPalindrome(str: string): boolean {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}

// Example usage
console.log(isPalindrome("racecar"));      // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello"));        // false
function isPalindrome(str: string): boolean {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const len = cleanedStr.length;
    
    for (let i = 0; i < len / 2; i++) {
        if (cleanedStr[i] !== cleanedStr[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
function isPalindrome(str: string): boolean {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    function checkPalindrome(s: string): boolean {
        if (s.length <= 1) return true;
        if (s[0] !== s[s.length - 1]) return false;
        return checkPalindrome(s.slice(1, -1));
    }
    
    return checkPalindrome(cleanedStr);
}
function isPalindrome(str: string): boolean {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
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
function isPalindrome(str: string, caseSensitive: boolean = false): boolean {
    let cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '');
    
    if (!caseSensitive) {
        cleanedStr = cleanedStr.toLowerCase();
    }
    
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}

// Usage examples
console.log(isPalindrome("RaceCar"));                  // true (case-insensitive)
console.log(isPalindrome("RaceCar", true));           // false (case-sensitive)
console.log(isPalindrome("Madam, I'm Adam"));         // true
