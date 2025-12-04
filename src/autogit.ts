function isPalindromeSimple(str: string): boolean {
    const lowerStr = str.toLowerCase();
    return lowerStr === lowerStr.split('').reverse().join('');
}
function isPalindromeStrict(str: string): boolean {
    // Remove non-alphanumeric characters and lowercase
    const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    // Two-pointer approach for efficiency
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}
console.log(isPalindromeSimple("racecar"));  // true
console.log(isPalindromeSimple("RaceCar"));  // true
console.log(isPalindromeSimple("hello"));    // false

console.log(isPalindromeStrict("A man, a plan, a canal: Panama"));  // true
console.log(isPalindromeStrict("0P"));       // false ("0" vs "P")
console.log(isPalindromeStrict("12321"));    // true
