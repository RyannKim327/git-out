function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Example
console.log(reverseString('hello')); // 'olleh'
const reverse = (s: string): string => [...s].reverse().join('');

console.log(reverse('typescript')); // 'tpircysrat'
const chars = ['a', 'b', 'c', 'd'];
chars.reverse(); // ['d', 'c', 'b', 'a']
