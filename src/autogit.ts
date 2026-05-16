// src/utils/http.ts
import { knownFolders, File } from '@nativescript/core';

// ──────────────────────────────────────────────────────────────────
// Step 1 – A friendly async helper that does the fetch
// ──────────────────────────────────────────────────────────────────
export async function getJson<T>(url: string, timeoutMs = 5000): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        // add any custom headers you need
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} – ${resp.statusText}`);
    }

    const json = await resp.json() as T;
    return json;
  } finally {
    clearTimeout(id);
  }
}

// ──────────────────────────────────────────────────────────────────
// Step 2 – Call it from an Android Activity / Page, e.g.
// ──────────────────────────────────────────────────────────────────
export async function demoFetch() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

  try {
    const data = await getJson<any>(apiUrl);
    console.log('Data received:', data);

    // If you want to touch the UI, do it on the UI thread
    // (in NativeScript you can simply update a component property,
    // or use a dispatcher if you’re outside a component)
  } catch (err) {
    console.error('fetch error:', err);
    // In an Android UI you might show a toast:
    const Toast = android.widget.Toast;
    const ctx = android.content.Context;
    const activity = /** get the current activity from your page **/;
    Toast.makeText(activity, `Error: ${err.message}`, Toast.LENGTH_LONG).show();
  }
}

/*
  Usage (e.g. in your Page's onNavigatedTo or an Android Activity):

  import { demoFetch } from '~/utils/http';

  export function pageLoaded(args) {
    demoFetch();
  }
*/
const HttpGetTask = android.os.AsyncTask.extend({
  doInBackground: function (params) {
    try {
      const url = new java.net.URL('https://jsonplaceholder.typicode.com/todos/1');
      const conn = url.openConnection() as java.net.HttpURLConnection;
      conn.setRequestMethod('GET');
      conn.setConnectTimeout(5000);
      conn.setReadTimeout(5000);

      const reader = new java.io.BufferedReader(

