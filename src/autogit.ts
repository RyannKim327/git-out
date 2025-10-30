function naiveSearch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === m) {
      positions.push(i);
    }
  }

  return positions;
}
function boyerMooreSearch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;

  // Create bad character table
  const badChar: Record<string, number> = {};
  for (let i = 0; i < m; i++) {
    badChar[pattern[i]] = i;
  }

  let shift = 0;
  while (shift <= n - m) {
    let j = m - 1;

    // Find mismatch from right
    while (j >= 0 && pattern[j] === text[shift + j]) {
      j--;
    }

    if (j < 0) {
      positions.push(shift);
      shift += (shift + m < n) ? m - (badChar[text[shift + m]] ?? -1) : 1;
    } else {
      const badCharShift = j - (badChar[text[shift + j]] ?? -1);
      shift += Math.max(1, badCharShift);
    }
  }

  return positions;
}
function kmpSearch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;

  // Build prefix table (longest proper prefix which is also suffix)
  const lps: number[] = new Array(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  // Perform search
  let j = 0; // index for pattern
  i = 0;     // index for text

  while (i < n) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === m) {
      positions.push(i - j);
      j = lps[j - 1];
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return positions;
}
function rabinKarpSearch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  // Prime number for hash calculation
  const prime = 101;
  
  // Calculate pattern hash and initial text hash
  let patternHash = 0;
  let textHash = 0;
  let h = 1;
  
  for (let i = 0; i < m - 1; i++) {
    h = (h * 256) % prime;
  }
  
  for (let i = 0; i < m; i++) {
    patternHash = (256 * patternHash + pattern.charCodeAt(i)) % prime;
    textHash = (256 * textHash + text.charCodeAt(i)) % prime;
  }
  
  // Slide the pattern over text
  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
      let j = 0;
      for (; j < m; j++) {
        if (text[i + j] !== pattern[j]) break;
      }
      if (j === m) {
        positions.push(i);
      }
    }
    
    // Calculate hash for next window
    if (i < n - m) {
      textHash = (256 * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
      if (textHash < 0) {
        textHash += prime;
      }
    }
  }
  
  return positions;
}
class StringMatcher {
  static search(text: string, pattern: string, algorithm: 'naive' | 'boyermoore' | 'kmp' | 'rabinkarp' = 'boyermoore'): number[] {
    switch (algorithm) {
      case 'naive': return naiveSearch(text, pattern);
      case 'boyermoore': return boyerMooreSearch(text, pattern);
      case 'kmp': return kmpSearch(text, pattern);
      case 'rabinkarp': return rabinKarpSearch(text, pattern);
      default: return naiveSearch(text, pattern);
    }
  }

  // Case-insensitive search
  static searchCaseInsensitive(text: string, pattern: string, algorithm: string = 'boyermoore'): number[] {
    return this.search(text.toLowerCase(), pattern.toLowerCase(), algorithm);
  }
}
// Example usage
const text = "This is a sample text for string matching algorithms";
const pattern = "text";

// Using Boyer-Moore (default)
const positions = StringMatcher.search(text, pattern);
console.log("Positions:", positions); // [10]

// Case-insensitive search
const positionsCI = StringMatcher.searchCaseInsensitive("TEXT sample Text", "text");
console.log("Case-insensitive positions:", positionsCI); // [0, 11]

// Using specific algorithm
const kmpPositions = StringMatcher.search(text, pattern, 'kmp');
console.log("KMP positions:", kmpPositions);
