const str = "42";
const num = Number(str);   // 42 (a number)

const maybeNum = Number("3.14"); // 3.14
const invalid = Number("foo");   // NaN
const str = "42";
const num = +str;   // 42
const intStr   = "42";
const intVal   = parseInt(intStr, 10);  // 42

const floatStr = "3.14";
const truncated = parseInt(floatStr, 10); // 3
function toInteger(value: string): number {
  const result = Number(value);
  if (!Number.isNaN(result) && Number.isInteger(result)) {
    return result;
  }
  throw new Error(`"${value}" is not a valid integer`);
}
const asNumber  = Number("42");      // 42
const asInteger = parseInt("42", 10); // 42
// or the shorthand
const asNumberShorthand = +"42";      // 42
