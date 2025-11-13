function naiveStringMatch(text: string, pattern: string): number[] {
  const matches: number[] = [];
  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === m) {
      matches.push(i);
    }
  }
  return matches;
}
function buildKMPTable(pattern: string): number[] {
  const m = pattern.length;
  const table: number[] = new Array(m).fill(0);
  let length = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[length]) {
      length++;
      table[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = table[length - 1];
      } else {
        table[i] = 0;
        i++;
      }
    }
  }
  return table;
}

function kmpSearch(text: string, pattern: string): number[] {
  const matches: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  if (m === 0) return matches;
  
  const kmpTable = buildKMPTable(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < n) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === m) {
      matches.push(i - j);
      j = kmpTable[j - 1];
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = kmpTable[j - 1];
      } else {
        i++;
      }
    }
  }
  return matches;
}
function buildBadCharTable(pattern: string): Map<string, number> {
  const table = new Map<string, number>();
  const m = pattern.length;
  
  for (let i = 0; i < m - 1; i++) {
    table.set(pattern[i], m - 1 - i);
  }
  return table;
}

function boyerMooreSearch(text: string, pattern: string): number[] {
  const matches: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  if (m === 0) return matches;
  
  const badCharTable = buildBadCharTable(pattern);
  let i = 0;

  while (i <= n - m) {
    let j = m - 1;
    
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }

    if (j < 0) {
      matches.push(i);
      i += (i + m < n) ? m - (badCharTable.get(text[i + m]) || m) : 1;
    } else {
      const shift = badCharTable.get(text[i + j]) || m;
      i += Math.max(1, shift - (m - 1 - j));
    }
  }
  return matches;
}
function rabinKarpSearch(text: string, pattern: string): number[] {
  const matches: number[] = [];
  const n = text.length;
  const m = pattern.length;
  
  if (m === 0 || n < m) return matches;

  // Prime number for hash calculation
  const prime = 101;
  let patternHash = 0;
  let textHash = 0;
  let h = 1;

  // Calculate hash multiplier
  for (let i = 0; i < m - 1; i++) {
    h = (h * 256) % prime;
  }

  // Calculate initial hashes
  for (let i = 0; i < m; i++) {
    patternHash = (256 * patternHash + pattern.charCodeAt(i)) % prime;
    textHash = (256 * textHash + text.charCodeAt(i)) % prime;
  }

  for (let i = 0; i <= n - m; i++) {
    if (textHash === patternHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) {
        j++;
      }
      if (j === m) {
        matches.push(i);
      }
    }

    if (i < n - m) {
      textHash = (256 * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
      if (textHash < 0) {
        textHash += prime;
      }
    }
  }
  return matches;
}
class StringMatcher {
  static search(text: string, pattern: string, algorithm: 'kmp' | 'boyer-moore' | 'rabin-karp' | 'naive' = 'kmp'): number[] {
    switch (algorithm) {
      case 'kmp':
        return this.kmpSearch(text, pattern);
      case 'boyer-moore':
        return this.boyerMooreSearch(text, pattern);
      case 'rabin-karp':
        return this.rabinKarpSearch(text, pattern);
      default:
        return this.naiveSearch(text, pattern);
    }
  }

  private static naiveSearch = naiveStringMatch;
  private static kmpSearch = kmpSearch;
  private static boyerMooreSearch = boyerMooreSearch;
  private static rabinKarpSearch = rabinKarpSearch;
}

// Usage
const text = "ababcabcabababd";
const pattern = "ababd";

console.log(StringMatcher.search(text, pattern, 'kmp')); // [10]
console.log(StringMatcher.search(text, pattern, 'boyer-moore')); // [10]
