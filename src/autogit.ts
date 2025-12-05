class RabinKarp {
    private readonly base: number;
    private readonly modulus: number;
    
    constructor(base: number = 256, modulus: number = 101) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Search for all occurrences of pattern in text using Rabin-Karp algorithm
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

        // Compute initial hash values for pattern and first window of text
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
                // If hash matches, check characters one by one
                let match = true;
                for (let j = 0; j < m; j++) {
                    if (text.charAt(i + j) !== pattern.charAt(j)) {
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
                
                // Handle negative hash values
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }
}
interface RabinKarpConfig {
    base?: number;
    modulus?: number;
    caseSensitive?: boolean;
}

class EnhancedRabinKarp {
    private readonly base: number;
    private readonly modulus: number;
    private readonly caseSensitive: boolean;
    
    constructor(config: RabinKarpConfig = {}) {
        this.base = config.base || 256;
        this.modulus = config.modulus || 101;
        this.caseSensitive = config.caseSensitive || false;
    }

    private normalizeText(text: string): string {
        return this.caseSensitive ? text : text.toLowerCase();
    }

    private charCodeAt(text: string, index: number): number {
        return this.normalizeText(text).charCodeAt(index);
    }

    /**
     * Search for single pattern
     */
    search(text: string, pattern: string): number[] {
        const normalizedText = this.normalizeText(text);
        const normalizedPattern = this.normalizeText(pattern);
        
        return this.internalSearch(normalizedText, normalizedPattern);
    }

    /**
     * Search for multiple patterns
     */
    searchMultiple(text: string, patterns: string[]): Map<string, number[]> {
        const normalizedText = this.normalizeText(text);
        const results = new Map<string, number[]>();
        
        patterns.forEach(pattern => {
            const normalizedPattern = this.normalizeText(pattern);
            const positions = this.internalSearch(normalizedText, normalizedPattern);
            if (positions.length > 0) {
                results.set(pattern, positions);
            }
        });
        
        return results;
    }

    private internalSearch(text: string, pattern: string): number[] {
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

        // Compute hash values
        let patternHash = 0;
        let textHash = 0;
        
        for (let i = 0; i < m; i++) {
            patternHash = (this.base * patternHash + pattern.charCodeAt(i)) % this.modulus;
            textHash = (this.base * textHash + text.charCodeAt(i)) % this.modulus;
        }

        // Slide window
        for (let i = 0; i <= n - m; i++) {
            if (patternHash === textHash) {
                let match = true;
                for (let j = 0; j < m; j++) {
                    if (text.charAt(i + j) !== pattern.charAt(j)) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    results.push(i);
                }
            }

            if (i < n - m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % this.modulus;
                
                if (textHash < 0) {
                    textHash += this.modulus;
                }
            }
        }

        return results;
    }
}
// Basic usage
const rk = new RabinKarp();
const text = "hello world, hello universe";
const pattern = "hello";

const positions = rk.search(text, pattern);
console.log("Positions:", positions); // [0, 13]

// Enhanced usage with configuration
const enhancedRk = new EnhancedRabinKarp({
    base: 256,
    modulus: 101,
    caseSensitive: false
});

// Single pattern search
const result1 = enhancedRk.search("Hello World", "hello");
console.log("Case-insensitive search:", result1); // [0]

// Multiple patterns search
const result2 = enhancedRk.searchMultiple(
    "The quick brown fox jumps over the lazy dog",
    ["quick", "fox", "lazy"]
);
console.log("Multiple patterns:", Object.fromEntries(result2));

// Performance comparison
function benchmark() {
    const longText = "a".repeat(1000000) + "needle" + "a".repeat(1000000);
    const pattern = "needle";
    
    console.time("RabinKarp");
    const rk = new RabinKarp();
    rk.search(longText, pattern);
    console.timeEnd("RabinKarp");
    
    console.time("String.includes");
    longText.includes(pattern);
    console.timeEnd("String.includes");
}

// benchmark();
// Test suite
function testRabinKarp() {
    const testCases = [
        { text: "hello world", pattern: "hello", expected: [0] },
        { text: "ababcabcabababd", pattern: "ababd", expected: [10] },
        { text: "aaaaa", pattern: "aa", expected: [0, 1, 2, 3] },
        { text: "abc", pattern: "d", expected: [] },
        { text: "", pattern: "test", expected: [] },
        { text: "test", pattern: "", expected: [] },
    ];

    const rk = new RabinKarp();
    
    testCases.forEach((testCase, index) => {
        const result = rk.search(testCase.text, testCase.pattern);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        console.log(`Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
        if (!passed) {
            console.log(`  Expected: ${testCase.expected}`);
            console.log(`  Got: ${result}`);
        }
    });
}

testRabinKarp();
