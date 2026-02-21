function longestCommonPrefixVertical(strs: string[]): string {
  if (!strs.length) return "";

  // The longest possible prefix is bounded by the first string’s length
  const first = strs[0];

  for (let i = 0; i < first.length; i++) {
    const ch = first[i];
    for (let j = 1; j < strs.length; j++) {
      // If any string is shorter or the current char differs: stop
      if (i >= strs[j].length || strs[j][i] !== ch) {
        return first.slice(0, i);
      }
    }
  }

  // All strings matched the entire first string
  return first;
}
console.log(longestCommonPrefixVertical(["flower", "flow", "flight"])); // "fl"
function lcpMerge(a: string, b: string): string {
  let i = 0;
  const limit = Math.min(a.length, b.length);
  while (i < limit && a[i] === b[i]) i++;
  return a.slice(0, i);
}

function longestCommonPrefixDivide(strs: string[]): string {
  if (!strs.length) return "";

  const helper = (l: number, r: number): string => {
    if (l === r) return strs[l];
    const mid = Math.floor((l + r) / 2);
    const left = helper(l, mid);
    const right = helper(mid + 1, r);
    return lcpMerge(left, right);
  };

  return helper(0, strs.length - 1);
}
class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

function buildTrie(strs: string[]): TrieNode {
  const root = new TrieNode();
  for (const s of strs) {
    let node = root;
    for (const ch of s) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }
  return root;
}

function longestCommonPrefixTrie(strs: string[]): string {
  if (!strs.length) return "";
  const root = buildTrie(strs);
  let node = root;
  let prefix = "";
  while (node.children.size === 1 && !node.isEnd) {
    const [ch, next] = node.children.entries().next().value;
    prefix += ch;
    node = next;
  }
  return prefix;
}
const data = ["algorithm", "algo", "algorithms", "all"]; 
console.log(longestCommonPrefixVertical(data)); // "alg"
