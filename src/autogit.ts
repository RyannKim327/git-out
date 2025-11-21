function countCharLoop(text: string, charToFind: string): number {
  if (charToFind.length !== 1) {
    console.warn("Please provide a single character to count.");
    return 0;
  }

  let count = 0;
  for (const char of text) {
    if (char === charToFind) {
      count++;
    }
  }
  return count;
}

// Example usage:
const myString = "hello world, how are you?";
console.log(`'o' appears: ${countCharLoop(myString, 'o')} times`); // Output: 'o' appears: 3 times
console.log(`'l' appears: ${countCharLoop(myString, 'l')} times`); // Output: 'l' appears: 3 times
console.log(`'z' appears: ${countCharLoop(myString, 'z')} times`); // Output: 'z' appears: 0 times
console.log(`' ' appears: ${countCharLoop(myString, ' ')} times`); // Output: ' ' appears: 4 times
function countCharSplit(text: string, charToFind: string): number {
  if (charToFind.length !== 1) {
    console.warn("Please provide a single character to count.");
    return 0;
  }
  // The split method returns an array.
  // Example: "banana".split('a') -> ["b", "n", "n", ""] (length 4, 3 'a's)
  // Example: "hello".split('l') -> ["he", "", "o"] (length 3, 2 'l's)
  return text.split(charToFind).length - 1;
}

// Example usage:
const anotherString = "programming is fun";
console.log(`'g' appears: ${countCharSplit(anotherString, 'g')} times`); // Output: 'g' appears: 2 times
console.log(`'i' appears: ${countCharSplit(anotherString, 'i')} times`); // Output: 'i' appears: 2 times
function countCharRegexMatch(text: string, charToFind: string): number {
  if (charToFind.length !== 1) {
    console.warn("Please provide a single character to count.");
    return 0;
  }
  // Escape special regex characters in case charToFind is one of them (e.g., '.', '*', '+')
  const escapedChar = charToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedChar, 'g'); // 'g' flag for global match (find all occurrences)

  const matches = text.match(regex);
  return matches ? matches.length : 0; // .match() returns null if no matches
}

// Example usage:
const regexString = "Mississippi";
console.log(`'s' appears: ${countCharRegexMatch(regexString, 's')} times`); // Output: 's' appears: 4 times
console.log(`'i' appears: ${countCharRegexMatch(regexString, 'i')} times`); // Output: 'i' appears: 4 times
console.log(`'M' appears: ${countCharRegexMatch(regexString, 'M')} times`); // Output: 'M' appears: 1 times
console.log(`'.' appears: ${countCharRegexMatch("abc.def.gh", '.')} times`); // Output: '.' appears: 2 times (escaped char works!)
function countCharFilter(text: string, charToFind: string): number {
  if (charToFind.length !== 1) {
    console.warn("Please provide a single character to count.");
    return 0;
  }
  return text.split('').filter(char => char === charToFind).length;
}

// Example usage:
const filterString = "banana split";
console.log(`'a' appears: ${countCharFilter(filterString, 'a')} times`); // Output: 'a' appears: 3 times
console.log(`'t' appears: ${countCharFilter(filterString, 't')} times`); // Output: 't' appears: 1 times
function countCharReplaceDiff(text: string, charToFind: string): number {
  if (charToFind.length !== 1) {
    console.warn("Please provide a single character to count.");
    return 0;
  }
  // Escape special regex characters for replace
  const escapedChar = charToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedChar, 'g'); // Global flag is crucial

  return (text.length - text.replace(regex, '').length);
}

// Example usage:
const replaceString = "abracadabra";
console.log(`'a' appears: ${countCharReplaceDiff(replaceString, 'a')} times`); // Output: 'a' appears: 5 times
console.log(`'b' appears: ${countCharReplaceDiff(replaceString, 'b')} times`); // Output: 'b' appears: 2 times
