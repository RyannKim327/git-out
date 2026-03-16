const original = "HeLLo WoRLd!";
const lower = original.toLowerCase();   // "hello world!"
const maybeString: string | undefined = /* … */;
const lower = maybeString?.toLowerCase() ?? "default";
const spanish = "ÁÉÍÓÚ".toLowerCase('es');  // "áéíóú"
