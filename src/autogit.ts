function isPalindrome(str: string): boolean {
    // Step 1: Clean the string (remove non-alphanumeric, lowercase)
    const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    // Step 2: Check if the cleaned string is a palindrome
    return cleaned === cleaned.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(""));                               // true
console.log(isPalindrome("_a__"));                           // true
