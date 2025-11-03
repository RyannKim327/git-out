function isPalindrome(str: string): boolean {
    // Convert to lowercase and remove non-alphanumeric characters
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

// Usage
console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("No 'x' in Nixon")); // true
function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}

// Usage
console.log(isPalindrome("Madam I'm Adam")); // true
console.log(isPalindrome("hello")); // false
function isPalindromeExact(str: string): boolean {
    return str === str.split('').reverse().join('');
}

// Usage
console.log(isPalindromeExact("racecar")); // true
console.log(isPalindromeExact("Racecar")); // false (case-sensitive)
console.log(isPalindromeExact("race car")); // false (space matters)
function isPalindromeFunctional(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === [...cleanStr].reverse().join('');
}
interface PalindromeChecker {
    isPalindrome(input: string): boolean;
    isPalindromeExact(input: string): boolean;
}

class PalindromeService implements PalindromeChecker {
    isPalindrome(str: string): boolean {
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
    
    isPalindromeExact(str: string): boolean {
        return str === str.split('').reverse().join('');
    }
}

// Usage
const checker = new PalindromeService();
console.log(checker.isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(checker.isPalindromeExact("racecar")); // true
console.log(checker.isPalindromeExact("Racecar")); // false
