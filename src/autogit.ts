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

        // Precompute base^(m-1) mod modulus
        let h = 1;
        for (let i = 0; i < m - 1; i++) {
            h = (h * this.base) % this.modulus;
        }

        // Compute hash for pattern and first window of text
        let patternHash = 0;
        let textHash = 0;

        for (let i = 0; i < m; i++) {
            patternHash = (this.base * patternHash + pattern.charCodeAt(i)) % this.modulus;
            textHash = (this.base * textHash + text.charCodeAt(i)) % this.modulus;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check if hash values match
            if (patternHash === textHash) {
                // Check character by character if hash collision occurs
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

            // Calculate hash for next window of text
            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % this.modulus;
                
                // Ensure hash is positive
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }

    /**
     * Case-insensitive search variant
     */
    searchCaseInsensitive(text: string, pattern: string): number[] {
        return this.search(text.toLowerCase(), pattern.toLowerCase());
    }

    /**
     * Multiple pattern search using Rabin-Karp
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

// Usage examples and tests
function main() {
    const rabinKarp = new RabinKarp();

    // Basic usage
    const text = "ABABDABACDABABCABAB";
    const pattern = "ABABCABAB";
    
    const results = rabinKarp.search(text, pattern);
    console.log(`Pattern found at indices: ${results}`);

    // Multiple patterns search
    const patterns = ["AB", "ABC", "XYZ"];
    const multipleResults = rabinKarp.searchMultiplePatterns(text, patterns);
    console.log("Multiple patterns results:");
    multipleResults.forEach((indices, pattern) => {
        console.log(`Pattern "${pattern}": ${indices}`);
    });

    // Edge cases
    console.log("Empty pattern:", rabinKarp.search(text, ""));
    console.log("Pattern longer than text:", rabinKarp.search("short", "verylongpattern"));
}

// Alternative implementation with configurable hash function
class AdvancedRabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base?: number, modulus?: number) {
        this.base = base || 131; // Larger prime base for better distribution
        this.modulus = modulus || 1e9 + 7; // Large prime modulus
    }

    /**
     * Rolling hash function
     */
    private computeHash(str: string, start: number, length: number): number {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (this.base * hash + str.charCodeAt(start + i)) % this.modulus;
        }
        return hash;
    }

    /**
     * Enhanced search with configurable parameters
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) return results;

        // Precompute base^(m-1) mod modulus
        let power = 1;
        for (let i = 0; i < m - 1; i++) {
            power = (power * this.base) % this.modulus;
        }

        const patternHash = this.computeHash(pattern, 0, m);
        let textHash = this.computeHash(text, 0, m);

        for (let i = 0; i <= n - m; i++) {
            if (patternHash === textHash) {
                // Verify potential match
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

            // Roll the hash
            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * power) + 
                           text.charCodeAt(i + m)) % this.modulus;
                
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }
}

// Export for use in other modules
export { RabinKarp, AdvancedRabinKarp };

// Run examples if this file is executed directly
if (require.main === module) {
    main();
}
const searcher = new RabinKarp();
const results = searcher.search("hello world", "world");
console.log(results); // [6]
