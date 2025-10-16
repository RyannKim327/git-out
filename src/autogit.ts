function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    if (strs.length === 1) return strs[0];
    
    const minLen = Math.min(...strs.map(str => str.length));
    let prefix = '';
    
    for (let i = 0; i < minLen; i++) {
        const char = strs[0][i];
        for (const str of strs.slice(1)) {
            if (str[i] !== char) {
                return prefix;
            }
        }
        prefix += char;
    }
    
    return prefix;
}
