/**
 * Is `s` a palindrome?
 *
 * @param s           – the string to test
 * @param options     – optional tweaks:
 *          ignoreCase    – true → 'A' and 'a' are the same
 *          ignoreSpaces  – true → ' ' are ignored
 *          ignoreNonAlnum – true → anything that doesn’t match /[A-Za-z0-9]/ is dropped
 */
function isPalindrome(
    s: string,
    options: { ignoreCase?: boolean; ignoreSpaces?: boolean; ignoreNonAlnum?: boolean } = {}
): boolean {
    let { ignoreCase, ignoreSpaces, ignoreNonAlnum } = options;

    // 1. Normalise
    if (ignoreCase) s = s.toLowerCase();

    // 2. Strip unwanted characters
    if (ignoreSpaces) s = s.replace(/\s+/g, '');
    if (ignoreNonAlnum) s = s.replace(/[^a-z0-9]/gi, '');

    // 3. Compare to its reverse
    const rev = s.split('').reverse().join('');
    return s === rev;
}
console.log(isPalindrome("radar"));                 // true
console.log(isPalindrome("Radar"));                 // false
console.log(isPalindrome("Radar", { ignoreCase: true })); // true

console.log(isPalindrome("A man, a plan, a canal: Panama",
                          { ignoreCase: true, ignoreNonAlnum: true })); // true
function isPlainPalindrome(s: string): boolean {
    const rev = s.split('').reverse().join('');
    return s === rev;
}
