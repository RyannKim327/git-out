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
function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}
function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr.split('').every((char, index) => {
        return char === cleanStr[cleanStr.length - 1 - index];
    });
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("Was it a car or a cat I saw?")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("")); // true (empty string is a palindrome)
