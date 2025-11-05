class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for pattern in text using Rabin-Karp algorithm
     * @param text The text to search in
     * @param pattern The pattern to search for
     * @returns Array of starting indices where pattern is found
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) {
            return results;
        }

        // Calculate hash for pattern and first window of text
        const patternHash = this.hashString(pattern);
        let textHash = this.hashString(text.substring(0, m));

        // Precompute base^(m-1) mod modulus for rolling hash
        let highestPower = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower = (highestPower * this.base) % this.modulus;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check if hash values match
            if (textHash === patternHash) {
                // If hash matches, check character by character to avoid collisions
                if (this.verifyMatch(text, pattern, i)) {
                    results.push(i);
                }
            }

            // Calculate hash for next window of text
            if (i < n - m) {
                // Remove leftmost character and add rightmost character
                textHash = this.updateHash(
                    textHash,
                    text.charAt(i),
                    text.charAt(i + m),
                    highestPower,
                    m
                );
            }
        }

        return results;
    }

    /**
     * Calculate hash for a string
     */
    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * this.base + str.charCodeAt(i)) % this.modulus;
        }
        return hash;
    }

    /**
     * Update rolling hash for next window
     */
    private updateHash(
        currentHash: number,
        leftChar: string,
        rightChar: string,
        highestPower: number,
        patternLength: number
    ): number {
        // Remove leftmost character
        let newHash = currentHash - (leftChar.charCodeAt(0) * highestPower) % this.modulus;
        if (newHash < 0) {
            newHash += this.modulus;
        }

        // Add rightmost character
        newHash = (newHash * this.base + rightChar.charCodeAt(0)) % this.modulus;

        return newHash;
    }

    /**
     * Verify if pattern actually matches at given position
     */
    private verifyMatch(text: string, pattern: string, startIndex: number): boolean {
        for (let i = 0; i < pattern.length; i++) {
            if (text[startIndex + i] !== pattern[i]) {
                return false;
            }
        }
        return true;
    }
}
// Example usage
const rabinKarp = new RabinKarp();

// Basic search
const text = "abracadabra";
const pattern = "abra";
const results = rabinKarp.search(text, pattern);
console.log(`Pattern found at indices: ${results}`); // Output: [0, 7]

// Multiple patterns
const text2 = "the quick brown fox jumps over the lazy dog";
const pattern2 = "the";
const results2 = rabinKarp.search(text2, pattern2);
console.log(`Pattern found at indices: ${results2}`); // Output: [0, 31]

// No match found
const results3 = rabinKarp.search("hello world", "xyz");
console.log(`Pattern found at indices: ${results3}`); // Output: []

// Edge cases
console.log(rabinKarp.search("", "test")); // []
console.log(rabinKarp.search("test", "")); // []
console.log(rabinKarp.search("a", "a")); // [0]
class AdvancedRabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 1000000007) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for multiple patterns simultaneously
     */
    searchMultiplePatterns(text: string, patterns: string[]): Map<string, number[]> {
        const results = new Map<string, number[]>();
        
        for (const pattern of patterns) {
            const patternResults = this.search(text, pattern);
            results.set(pattern, patternResults);
        }
        
        return results;
    }

    /**
     * Search with custom hash parameters
     */
    searchWithParams(text: string, pattern: string, base: number, modulus: number): number[] {
        const tempRabinKarp = new RabinKarp(base, modulus);
        return tempRabinKarp.search(text, pattern);
    }
}

// Usage of advanced implementation
const advancedRK = new AdvancedRabinKarp();
const multipleResults = advancedRK.searchMultiplePatterns(
    "hello world hello universe", 
    ["hello", "world", "universe"]
);

console.log("Multiple pattern results:", multipleResults);
// Benchmark function
function benchmarkRabinKarp(text: string, pattern: string, iterations: number = 1000): number {
    const rabinKarp = new RabinKarp();
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
        rabinKarp.search(text, pattern);
    }
    
    const end = performance.now();
    return end - start;
}

// Compare with built-in string search
const longText = "a".repeat(10000) + "pattern" + "b".repeat(10000);
const pattern = "pattern";

const rkTime = benchmarkRabinKarp(longText, pattern);
const builtInTime = benchmarkBuiltInSearch(longText, pattern, 1000);

console.log(`Rabin-Karp: ${rkTime}ms`);
console.log(`Built-in: ${builtInTime}ms`);
