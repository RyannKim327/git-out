function getStringLength(str: string): number {
    let count = 0;
    for (const _ of str) { // The '_' convention denotes unused variable
        count++;
    }
    return count;
}
console.log(getStringLength("Hello"));    // Output: 5
console.log(getStringLength(""));         // Output: 0
console.log(getStringLength("🌍"));       // Output: 2 (UTF-16 surrogate pairs)
