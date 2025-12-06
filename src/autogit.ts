function countCharacter(str: string, char: string): number {
  return str.split(char).length - 1;
}
console.log(countCharacter("hello world", "l")); // Output: 3
console.log(countCharacter("typescript", "t"));  // Output: 2
function countCharacter(str: string, char: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) count++;
  }
  return count;
}
function countCharacter(str: string, char: string): number {
  return [...str].reduce((acc, c) => c === char ? acc + 1 : acc, 0);
}
