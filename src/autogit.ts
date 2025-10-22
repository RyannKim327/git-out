function buildShiftTable(pattern: string): Map<string, number> {
    const patternLength = pattern.length;
    const shiftTable = new Map<string, number>();
    
    // Precompute the shift table
    for (let i = 0; i < patternLength - 1; i++) {
        const char = pattern[i];
        const shift = patternLength - i - 1;
        shiftTable.set(char, shift);
    }
    
    // Default shift for characters not in pattern
    const defaultShift = patternLength;
    shiftTable.set('*', defaultShift); // Using '*' as key for default
    
    return shiftTable;
}

function horspoolSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const results: number[] = [];
    
    if (m === 0 || n === 0 || m > n) {
        return results;
    }
    
    // Build shift table
    const shiftTable = buildShiftTable(pattern);
    
    let i = 0;
    while (i <= n - m) {
        let j = m - 1;
        
        // Compare from right to left
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            // Match found
            results.push(i);
            i += m; // Shift by pattern length for next search
        } else {
            // Get shift amount from table (or use default)
            const currentChar = text[i + m - 1];
            const shiftAmount = shiftTable.get(currentChar) || shiftTable.get('*')!;
            i += shiftAmount;
        }
    }
    
    return results;
}

// Enhanced version with better type safety and options
interface SearchOptions {
    caseSensitive?: boolean;
    findAll?: boolean;
}

function horspoolSearchAdvanced(
    text: string, 
    pattern: string, 
    options: SearchOptions = {}
): number[] {
    const {
        caseSensitive = true,
        findAll = true
    } = options;
    
    let processedText = text;
    let processedPattern = pattern;
    
    if (!caseSensitive) {
        processedText = text.toLowerCase();
        processedPattern = pattern.toLowerCase();
    }
    
    const n = processedText.length;
    const m = processedPattern.length;
    const results: number[] = [];
    
    if (m === 0 || n === 0 || m > n) {
        return results;
    }
    
    const shiftTable = buildShiftTable(processedPattern);
    
    let i = 0;
    while (i <= n - m) {
        let j = m - 1;
        
        while (j >= 0 && processedPattern[j] === processedText[i + j]) {
            j--;
        }
        
        if (j < 0) {
            results.push(i);
            if (!findAll) {
                break; // Return after first match
            }
            i += m; // Continue searching
        } else {
            const currentChar = processedText[i + m - 1];
            const shiftAmount = shiftTable.get(currentChar) || shiftTable.get('*')!;
            i += shiftAmount;
        }
    }
    
    return results;
}

// Example usage and test cases
function testHorspoolAlgorithm() {
    const text = "ABAAABCDBBABCDEFGABCD";
    const pattern = "ABCD";
    
    console.log("Basic search:");
    console.log("Text:", text);
    console.log("Pattern:", pattern);
    
    const results = horspoolSearch(text, pattern);
    console.log("Matches found at indices:", results);
    
    console.log("\nAdvanced search (case insensitive):");
    const results2 = horspoolSearchAdvanced("Hello World", "hello", { caseSensitive: false });
    console.log("Matches:", results2);
    
    console.log("\nAdvanced search (first match only):");
    const results3 = horspoolSearchAdvanced("banana", "ana", { findAll: false });
    console.log("First match:", results3);
    
    // Edge cases
    console.log("\nEdge cases:");
    console.log("Empty pattern:", horspoolSearch("test", ""));
    console.log("Pattern longer than text:", horspoolSearch("short", "verylongpattern"));
    console.log("No matches:", horspoolSearch("abc", "xyz"));
}

// Run tests
testHorspoolAlgorithm();
