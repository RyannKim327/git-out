const sentence = "The quick brown fox jumps over the lazy dog";
const needle = "brown";

const hasBrown = sentence.includes(needle); // true
const hasBrownCaseInsensitive = sentence
  .toLowerCase()
  .includes(needle.toLowerCase()); // true
const hasBrownIdx = sentence.indexOf(needle) !== -1; // true
const hasVowelPattern = /[aeiou]/.test(sentence); // true
