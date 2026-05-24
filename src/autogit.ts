function countOccurrences(text: string, word: string): number {
  // Normalize the case if you want a case‑insensitive count
  const normalizedText = text.toLowerCase();
  const normalizedWord = word.toLowerCase();

  // Split on any non‑word character so “hello,” and “hello” both match.
  const words = normalizedText.split(/\b/).filter(Boolean);

  return words.filter(w => w === normalizedWord).length;
}
