function isPalindrome(str: string): boolean {
    // Clean the string: remove non-alphanumeric characters and convert to lowercase
    const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    // Reverse the cleaned string
    const reversed = cleaned.split('').reverse().join('');
    // Compare cleaned string with its reversed version
    return cleaned === reversed;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("racecar"));                        // true
console.log(isPalindrome("hello"));                          // false
console.log(isPalindrome(""));                               // true (empty string)
