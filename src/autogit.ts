class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Searches for pattern in text using Rabin-Karp algorithm
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

        // Calculate the hash value for pattern and first window of text
        let patternHash = 0;
        let textHash = 0;
        let h = 1;

        // The value of h would be "pow(base, m-1) % modulus"
        for (let i = 0; i < m - 1; i++) {
            h = (h * this.base) % this.modulus;
        }

        // Calculate initial hash values
        for (let i = 0; i < m; i++) {
            patternHash = (this.base * patternHash + pattern.charCodeAt(i)) % this.modulus;
            textHash = (this.base * textHash + text.charCodeAt(i)) % this.modulus;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check the hash values of current window of text and pattern
            if (patternHash === textHash) {
                // If hash values match, check character by character
                let j = 0;
                for (j = 0; j < m; j++) {
                    if (text[i + j] !== pattern[j]) {
                        break;
                    }
                }

                if (j === m) {
                    results.push(i);
                }
            }

            // Calculate hash value for next window of text
            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % this.modulus;

                // Handle negative hash values
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }

    /**
     * Case-insensitive search with optional multiple patterns
     */
    searchCaseInsensitive(text: string, pattern: string): number[] {
        return this.search(text.toLowerCase(), pattern.toLowerCase());
    }

    /**
     * Search for multiple patterns simultaneously
     */
    searchMultiplePatterns(text: string, patterns: string[]): Map<string, number[]> {
        const results = new Map<string, number[]>();
        
        for (const pattern of patterns) {
            const patternResults = this.search(text, pattern);
            if (patternResults.length > 0) {
                results.set(pattern, patternResults);
            }
        }
        
        return results;
    }
}
// Basic usage
const rk = new RabinKarp();

const text = "This is a sample text for testing Rabin-Karp algorithm";
const pattern = "sample";

const results = rk.search(text, pattern);
console.log(`Pattern found at indices: ${results}`);

// Case-insensitive search
const caseInsensitiveResults = rk.searchCaseInsensitive("Hello World", "world");
console.log(`Case-insensitive results: ${caseInsensitiveResults}`);

// Multiple patterns search
const multipleResults = rk.searchMultiplePatterns(
    "The quick brown fox jumps over the lazy dog",
    ["quick", "fox", "dog"]
);
console.log("Multiple patterns:", multipleResults);

// Performance test
const longText = "A".repeat(1000000) + "PATTERN" + "B".repeat(1000000);
console.time("RabinKarp Search");
const perfResults = rk.search(longText, "PATTERN");
console.timeEnd("RabinKarp Search");
console.log(`Found pattern at: ${perfResults}`);
class RabinKarpOptimized {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    private computeHash(str: string, start: number, end: number): number {
        let hash = 0;
        for (let i = start; i < end; i++) {
            hash = (this.base * hash + str.charCodeAt(i)) % this.modulus;
        }
        return hash;
    }

    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) return results;

        const patternHash = this.computeHash(pattern, 0, m);
        let textHash = this.computeHash(text, 0, m);

        // Precompute base^(m-1) mod modulus
        let highestPower = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower = (highestPower * this.base) % this.modulus;
        }

        for (let i = 0; i <= n - m; i++) {
            if (textHash === patternHash) {
                // Verify potential match character by character
                let match = true;
                for (let j = 0; j < m; j++) {
                    if (text[i + j] !== pattern[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    results.push(i);
                }
            }

            // Roll the hash for the next window
            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * highestPower) 
                           + text.charCodeAt(i + m)) % this.modulus;
                
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }
}
