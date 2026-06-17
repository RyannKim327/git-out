function countChar(str: string, target: string): number {
  // guard against empty target (avoids throwing on .split(''))
  if (target.length !== 1) throw new Error('target must be a single character');

  return str.split(target).length - 1;
}
console.log(countChar('hello world', 'l')); // 3
function countCharRegEx(str: string, target: string): number {
  const re = new RegExp(target, 'g');
  const matches = str.match(re);
  return matches ? matches.length : 0;
}
console.log(countCharRegEx('banana', 'a')); // 3
function countCharLoop(str: string, target: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === target) count++;
  }
  return count;
}
console.log(countCharLoop('Mississippi', 'i')); // 4
