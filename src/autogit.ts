/**
 * Random API – picks a random fact from https://uselessfacts.jsph.pl
 * Returns an object: { id, text, source, permalink }
 */
async function fetchRandomFact(): Promise<{
  id: string;
  text: string;
  source: string;
  permalink: string;
}> {
  const apiUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // If you’re inside an Android NativeScript environment you could
    // show a Toast or log the result with Android SDK.
    console.log("Random fact fetched:", data);
    return data;
  } catch (err) {
    console.error("Failed to fetch random fact:", err);
    throw err;
  }
}

/**
 * Example usage – you’d call this from anywhere, e.g. on a button tap.
 */
async function runDemo() {
  try {
    const fact = await fetchRandomFact();
    // In Android, for a quick visual you could use:
    // import { Toast } from "tns-core-modules/ui/toast";
    // Toast.makeText(fact.text, 2000).show();
    console.log("Fact text:", fact.text);
  } catch {
    // error handling already done in fetchRandomFact
  }
}

runDemo();
