function reverseString(str: string): string {
  return str.split('').reverse().join('');
}
function reverseStringNoArray(str: string): string {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
function reverseStringRecursive(str: string): string {
  if (str === '') return '';
  return reverseStringRecursive(str.slice(1)) + str[0];
}
function reverseStringFlatMap(str: string): string {
  return [...str.matchAll(/./gu)].flatMap(ch => [ch[0]]).reverse().join('');
}
function reverseUnicodeString(str: string): string {
  // splitIntoGraphemes could be a library function; here’s a simple UX:
  const graphemes = [...str];
  return graphemes.reverse().join('');
}
console.log(reverseString('hello'));          // 'olleh'
console.log(reverseStringNoArray('world'));   // 'dlrow'
console.log(reverseStringRecursive('foo'));   // 'oof'
