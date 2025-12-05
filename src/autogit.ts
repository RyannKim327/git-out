function isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[\W_]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
function isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[\W_]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true (empty string is a palindrome)
