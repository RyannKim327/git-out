const original = "HeLLo WoRLd";
const lower = original.toLowerCase();   // "hello world"
const turkish = "Iİ".toLocaleLowerCase("tr-TR");  // "iı"
function maybeLower(val?: string | null): string | undefined {
  return val?.toLowerCase();   // returns undefined if val is null/undefined
}
