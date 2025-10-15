function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  
  return strings.reduce((prev, current) => {
    let i = 0;
    while (i < prev.length && i < current.length && prev[i] === current[i]) {
      i++;
    }
    return prev.substring(0, i);
  });
}

// Example usage
const words = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(words)); // "fl"
function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  
  let prefix = strings[0];
  
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  
  return prefix;
}

// Example usage
const words = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(words)); // "fl"
function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  
  for (let i = 0; i < strings[0].length; i++) {
    const char = strings[0][i];
    
    for (let j = 1; j < strings.length; j++) {
      if (i === strings[j].length || strings[j][i] !== char) {
        return strings[0].substring(0, i);
      }
    }
  }
  
  return strings[0];
}

// Example usage
const words = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(words)); // "fl"
function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  
  function commonPrefix(left: string, right: string): string {
    const minLength = Math.min(left.length, right.length);
    for (let i = 0; i < minLength; i++) {
      if (left[i] !== right[i]) {
        return left.substring(0, i);
      }
    }
    return left.substring(0, minLength);
  }
  
  function divideAndConquer(low: number, high: number): string {
    if (low === high) {
      return strings[low];
    }
    
    const mid = Math.floor((low + high) / 2);
    const leftPrefix = divideAndConquer(low, mid);
    const rightPrefix = divideAndConquer(mid + 1, high);
    
    return commonPrefix(leftPrefix, rightPrefix);
  }
  
  return divideAndConquer(0, strings.length - 1);
}

// Example usage
const words = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(words)); // "fl"
function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  
  let prefix = "";
  
  for (let i = 0; i < strings[0].length; i++) {
    const char = strings[0][i];
    
    // Check if all strings have the same character at position i
    const allMatch = strings.every(str => str[i] === char);
    
    if (allMatch) {
      prefix += char;
    } else {
      break;
    }
  }
  
  return prefix;
}

// Example usage
const words = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(words)); // "fl"
function longestCommonPrefixSafe(strings: string[]): string {
  // Handle edge cases
  if (strings.length === 0) return "";
  if (strings.length === 1) return strings[0];
  
  // Remove empty strings if needed
  const nonEmptyStrings = strings.filter(str => str.length > 0);
  if (nonEmptyStrings.length === 0) return "";
  
  return nonEmptyStrings.reduce((prev, current) => {
    let i = 0;
    while (i < prev.length && i < current.length && prev[i] === current[i]) {
      i++;
    }
    return prev.substring(0, i);
  });
}

// Example usage with various cases
console.log(longestCommonPrefixSafe([])); // ""
console.log(longestCommonPrefixSafe(["abc"])); // "abc"
console.log(longestCommonPrefixSafe(["", "abc"])); // ""
console.log(longestCommonPrefixSafe(["abc", "abd", "abe"])); // "ab"
