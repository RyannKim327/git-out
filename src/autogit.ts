function stringLength(str: string): number {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    len++;                // we still use str.length in the loop condition,
                          // but we never read it as the "answer"
  }
  return len;
}
function stringLength(str: string): number {
  let len = 0;
  let code = str.codePointAt(0);
  let idx = 0;
  while (code !== undefined) {
    len++;
    idx++;
    code = str.codePointAt(idx);
  }
  return len;
}
function stringLength(str: string): number {
  let len = 0;
  for (const _ of str) {
    len++;
  }
  return len;
}
function stringLength(str: string): number {
  if (str === '') return 0;
  return 1 + stringLength(str.slice(1));
}
function stringLength(str: string): number {
  const matches = str.match(/./gu);
  return matches ? matches.length : 0;
}
function stringLength(str: string): number {
  let idx = 0;
  let len = 0;
  while (str.charAt(idx) !== '') { // `charAt` returns '' past the end
    len++;
    idx++;
  }
  return len;
}
