class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for all occurrences of pattern in text using Rabin-Karp algorithm
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of starting indices where pattern is found
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) {
            return results;
        }

        // Calculate the highest power for rolling hash
        let highestPower = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower = (highestPower * this.base) % this.modulus;
        }

        // Calculate hash for pattern and first window of text
        const patternHash = this.calculateHash(pattern, 0, m);
        let textHash = this.calculateHash(text, 0, m);

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check if the hash values match
            if (patternHash === textHash) {
                // If hash matches, verify character by character
                if (this.verifyMatch(text, pattern, i)) {
                    results.push(i);
                }
            }

            // Calculate hash for next window
            if (i < n - m) {
                textHash = this.calculateRollingHash(
                    text,
                    textHash,
                    i,
                    m,
                    highestPower
                );
            }
        }

        return results;
    }

    /**
     * Calculate initial hash for a substring
     */
    private calculateHash(str: string, start: number, length: number): number {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (hash * this.base + str.charCodeAt(start + i)) % this.modulus;
        }
        return hash;
    }

    /**
     * Calculate rolling hash for the next window
     */
    private calculateRollingHash(
        text: string,
        currentHash: number,
        currentStart: number,
        patternLength: number,
        highestPower: number
    ): number {
        // Remove the leading character
        let hash = currentHash - text.charCodeAt(currentStart) * highestPower;
        
        // Add the trailing character
        hash = (hash * this.base + text.charCodeAt(currentStart + patternLength)) % this.modulus;
        
        // Ensure hash is non-negative
        if (hash < 0) {
            hash += this.modulus;
        }
        
        return hash;
    }

    /**
     * Verify if pattern actually matches at given position
     */
    private verifyMatch(text: string, pattern: string, start: number): boolean {
        for (let i = 0; i < pattern.length; i++) {
            if (text[start + i] !== pattern[i]) {
                return false;
            }
        }
        return true;
    }
}

// Example usage and test cases
function demonstrateRabinKarp() {
    const rabinKarp = new RabinKarp();

    // Test case 1: Basic search
    const text1 = "ABABDABACDABABCABAB";
    const pattern1 = "ABABCABAB";
    const result1 = rabinKarp.search(text1, pattern1);
    console.log(`Searching for "${pattern1}" in "${text1}":`, result1);
    // Expected: [10]

    // Test case 2: Multiple occurrences
    const text2 = "AABAACAADAABAABA";
    const pattern2 = "AABA";
    const result2 = rabinKarp.search(text2, pattern2);
    console.log(`Searching for "${pattern2}" in "${text2}":`, result2);
    // Expected: [0, 9, 12]

    // Test case 3: No match found
    const text3 = "Hello World";
    const pattern3 = "TypeScript";
    const result3 = rabinKarp.search(text3, pattern3);
    console.log(`Searching for "${pattern3}" in "${text3}":`, result3);
    // Expected: []

    // Test case 4: Pattern longer than text
    const text4 = "short";
    const pattern4 = "verylongpattern";
    const result4 = rabinKarp.search(text4, pattern4);
    console.log(`Searching for "${pattern4}" in "${text4}":`, result4);
    // Expected: []

    // Test case 5: Empty pattern
    const text5 = "some text";
    const pattern5 = "";
    const result5 = rabinKarp.search(text5, pattern5);
    console.log(`Searching for empty pattern in "${text5}":`, result5);
    // Expected: []

    // Test case 6: Case sensitive search
    const text6 = "Hello hello HELLO";
    const pattern6 = "hello";
    const result6 = rabinKarp.search(text6, pattern6);
    console.log(`Searching for "${pattern6}" in "${text6}":`, result6);
    // Expected: [6]
}

// Run the demonstration
demonstrateRabinKarp();
class MultiPatternRabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for multiple patterns in text
     */
    searchMultiple(text: string, patterns: string[]): Map<string, number[]> {
        const results = new Map<string, number[]>();
        
        for (const pattern of patterns) {
            const rabinKarp = new RabinKarp(this.base, this.modulus);
            const patternResults = rabinKarp.search(text, pattern);
            results.set(pattern, patternResults);
        }
        
        return results;
    }
}

// Example usage of multi-pattern search
const multiSearcher = new MultiPatternRabinKarp();
const text = "The quick brown fox jumps over the lazy dog";
const patterns = ["quick", "fox", "dog", "cat"];
const multiResults = multiSearcher.searchMultiple(text, patterns);

console.log("Multi-pattern search results:");
for (const [pattern, indices] of multiResults) {
    console.log(`"${pattern}": ${indices.length > 0 ? indices : 'Not found'}`);
}
