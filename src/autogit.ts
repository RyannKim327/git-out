function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}

const input = "Hello world this is TypeScript";
const output = reverseWords(input);

console.log(output); 
// "TypeScript is this world Hello"
function reverseWordsClean(str: string): string {
  return str.trim().split(/\s+/).reverse().join(' ');
}

console.log(reverseWordsClean("   Hello    world   this is   TypeScript   "));
// "TypeScript is this world Hello"
