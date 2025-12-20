class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for a pattern in text using Rabin-Karp algorithm
     * @param text The text to search in
     * @param pattern The pattern to search for
     * @returns Array of indices where pattern starts in text
     */
    search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];

        if (m === 0 || n < m) {
            return results;
        }

        // Calculate hash for pattern and first window of text
        const patternHash = this.computeHash(pattern, 0, m);
        let textHash = this.computeHash(text, 0, m);

        // Precompute base^(m-1) mod modulus for rolling hash
        let highestPower = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower = (highestPower * this.base) % this.modulus;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - m; i++) {
            // Check hash values first
            if (patternHash === textHash) {
                // If hash matches, check characters one by one
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

            // Calculate hash for next window
            if (i < n - m) {
                textHash = this.computeRollingHash(
                    textHash,
                    text.charCodeAt(i),
                    text.charCodeAt(i + m),
                    highestPower
                );
            }
        }

        return results;
    }

    /**
     * Compute initial hash for a substring
     */
    private computeHash(str: string, start: number, length: number): number {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (hash * this.base + str.charCodeAt(start + i)) % this.modulus;
        }
        return hash;
    }

    /**
     * Compute rolling hash for next window
     */
    private computeRollingHash(
        currentHash: number,
        removeCharCode: number,
        addCharCode: number,
        highestPower: number
    ): number {
        // Remove the leading character
        let hash = (currentHash - removeCharCode * highestPower) % this.modulus;
        
        // Handle negative hash values
        if (hash < 0) {
            hash += this.modulus;
        }
        
        // Add the new character
        hash = (hash * this.base + addCharCode) % this.modulus;
        
        return hash;
    }
}
interface PatternMatch {
    pattern: string;
    indices: number[];
}

class AdvancedRabinKarp {
    private readonly base: number;
    private readonly modulus: number;

    constructor(base: number = 256, modulus: number = 1000000007) {
        this.base = base;
        this.modulus = modulus; // Use larger prime for better distribution
    }

    /**
     * Search for multiple patterns simultaneously
     */
    searchMultiple(text: string, patterns: string[]): PatternMatch[] {
        const results: PatternMatch[] = [];
        
        // Precompute hashes for all patterns
        const patternHashes = new Map<string, number>();
        for (const pattern of patterns) {
            patternHashes.set(pattern, this.computeHash(pattern, 0, pattern.length));
        }

        // Process each pattern length separately for efficiency
        const patternsByLength = this.groupPatternsByLength(patterns);
        
        for (const [length, patternGroup] of patternsByLength) {
            if (text.length < length) continue;
            
            const matches = this.searchPatternsOfLength(text, patternGroup, length);
            results.push(...matches);
        }

        return results;
    }

    private groupPatternsByLength(patterns: string[]): Map<number, string[]> {
        const groups = new Map<number, string[]>();
        
        for (const pattern of patterns) {
            const length = pattern.length;
            if (!groups.has(length)) {
                groups.set(length, []);
            }
            groups.get(length)!.push(pattern);
        }
        
        return groups;
    }

    private searchPatternsOfLength(
        text: string, 
        patterns: string[], 
        patternLength: number
    ): PatternMatch[] {
        const n = text.length;
        const m = patternLength;
        const results: PatternMatch[] = [];
        
        // Initialize result objects
        const patternMatches = new Map<string, number[]>();
        for (const pattern of patterns) {
            patternMatches.set(pattern, []);
        }

        // Precompute hashes for patterns of this length
        const patternHashes = new Map<string, number>();
        for (const pattern of patterns) {
            patternHashes.set(pattern, this.computeHash(pattern, 0, m));
        }

        // Precompute base^(m-1) mod modulus
        let highestPower = 1;
        for (let i = 0; i < m - 1; i++) {
            highestPower = (highestPower * this.base) % this.modulus;
        }

        // Compute initial window hash
        let textHash = this.computeHash(text, 0, m);

        // Slide window through text
        for (let i = 0; i <= n - m; i++) {
            // Check all patterns for hash match
            for (const [pattern, pHash] of patternHashes) {
                if (pHash === textHash) {
                    // Verify actual match
                    let match = true;
                    for (let j = 0; j < m; j++) {
                        if (text[i + j] !== pattern[j]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        patternMatches.get(pattern)!.push(i);
                    }
                }
            }

            // Update hash for next window
            if (i < n - m) {
                textHash = this.computeRollingHash(
                    textHash,
                    text.charCodeAt(i),
                    text.charCodeAt(i + m),
                    highestPower
                );
            }
        }

        // Convert to PatternMatch objects
        for (const [pattern, indices] of patternMatches) {
            if (indices.length > 0) {
                results.push({ pattern, indices });
            }
        }

        return results;
    }

    private computeHash(str: string, start: number, length: number): number {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (hash * this.base + str.charCodeAt(start + i)) % this.modulus;
        }
        return hash;
    }

    private computeRollingHash(
        currentHash: number,
        removeCharCode: number,
        addCharCode: number,
        highestPower: number
    ): number {
        let hash = (currentHash - removeCharCode * highestPower) % this.modulus;
        if (hash < 0) hash += this.modulus;
        hash = (hash * this.base + addCharCode) % this.modulus;
        return hash;
    }
}
// Basic usage
const rk = new RabinKarp();
const text = "ABCCDABDABCEABC";
const pattern = "ABC";

const results = rk.search(text, pattern);
console.log(`Pattern found at indices: ${results}`); // [0, 5, 9, 12]

// Multiple pattern search
const advancedRk = new AdvancedRabinKarp();
const patterns = ["ABC", "ABD", "ABCE"];
const multipleResults = advancedRk.searchMultiple(text, patterns);

multipleResults.forEach(result => {
    console.log(`Pattern "${result.pattern}" found at: ${result.indices}`);
});
