function isPalindrome(str: string): boolean {
    // Clean the string (remove non-alphanumeric characters and lowercase)
    const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    // Reverse the cleaned string and compare
    return cleaned === [...cleaned].reverse().join('');
}
function isPalindrome(str: string): boolean {
    const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama"));  // true
console.log(isPalindrome("racecar"));                         // true
console.log(isPalindrome("hello"));                           // false
