function isPalindrome(s: string): boolean {
    // Clean the string: remove non-alphanumeric chars and convert to lowercase
    const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    // Reverse the cleaned string and compare
    return cleaned === cleaned.split('').reverse().join('');
}
function isPalindrome(s: string): boolean {
    const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
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
console.log(isPalindrome("")); // true (edge case)
