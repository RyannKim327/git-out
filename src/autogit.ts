function stringLength(str: string): number {
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}
function stringLength(str: string): number {
  let index = 0;
  while (true) {
    // if the index is beyond the end, we’re done
    if (str.charAt(index) === '') break;
    index++;
  }
  return index;
}
function stringLength(str: string): number {
  return str === '' ? 0 : 1 + stringLength(str.slice(1));
}
function stringLength(str: string): number {
  let count = 0;
  [...str].forEach(() => count++);
  return count;
}
const msg = 'Hello 🌍!';

console.log(stringLength(msg)); // 8  (H,e,l,l,o,space,🌍,!)
