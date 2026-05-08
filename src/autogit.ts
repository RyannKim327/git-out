function reverseSimple(str: string): string {
  return str.split('').reverse().join('');
}
console.log(reverseSimple('hello')); // "olleh"
function reverseWithSpread(str: string): string {
  return [...str].reverse().join('');
}
function reverseManual(str: string): string {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
function reverseUnicode(str: string): string {
  return Array.from(str).reverse().join('');
}
console.log(reverseUnicode('👩‍👧‍👦')); // 👦🏽‍👧‍👩
