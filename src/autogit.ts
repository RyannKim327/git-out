function countWordOccurrences(text: string, word: string): number {
    return text.split(/\s+/).filter(w => w === word).length;
}

// Usage
console.log(countWordOccurrences("apple banana apple", "apple")); // 2
console.log(countWordOccurrences("Apple apple", "apple"));       // 1 (case sensitive)
function countWordOccurrencesAdvanced(text: string, word: string): number {
    // Escape special regex characters and create pattern
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Usage
console.log(countWordOccurrencesAdvanced("Apple apple! APPLE.", "apple")); // 3
console.log(countWordOccurrencesAdvanced("A test of boundary.", "test"));  // 1
