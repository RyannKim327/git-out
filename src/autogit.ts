function isPalindrome(s: string): boolean {
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

// Example usage:
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
function isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}
function isPalindrome(s: string): boolean {
    if (s.length === 0) return true;
    
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Handle empty string after cleaning
    if (cleaned.length === 0) return true;
    
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
    
    function checkPalindrome(str: string): boolean {
        if (str.length <= 1) return true;
        if (str[0] !== str[str.length - 1]) return false;
        return checkPalindrome(str.substring(1, str.length - 1));
    }
    
    return checkPalindrome(cleaned);
}
function isPalindrome(input: string): boolean {
    // Input validation
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    // Clean the string (remove non-alphanumeric characters and convert to lowercase)
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Use two-pointer technique
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

// Test cases
const testCases = [
    "A man, a plan, a canal: Panama",
    "race a car",
    " ",
    "12321",
    "hello",
    "Madam",
    "No 'x' in Nixon"
];

testCases.forEach(test => {
    console.log(`"${test}" -> ${isPalindrome(test)}`);
});
