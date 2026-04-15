function countChar(str: string, target: string): number {
  // split on the target, then subtract 1 because split returns one more element than matches
  return str.split(target).length - 1;
}

// Example
console.log(countChar("hello world", "l")); // 3
function countCharWithRegex(str: string, target: string): number {
  const matches = str.match(new RegExp(target, 'g'));
  return matches ? matches.length : 0;
}

// Example
console.log(countCharWithRegex("hello world", "l")); // 3
console.log(countCharWithRegex("hello world", "z")); // 0
function countLoop(str: string, target: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === target) count++;
  }
  return count;
}

// Example
console.log(countLoop('hello world', 'l')); // 3
function countReduce(str: string, target: string): number {
  return [...str].reduce((acc, ch) => (ch === target ? acc + 1 : acc), 0);
}
// Equivalent to looping, but shows functional style
import { count } from 'lodash';

count('hello world', 'l'); // 3
