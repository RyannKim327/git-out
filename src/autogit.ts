npm i -g @nativescript/cli
ns create MyAsyncDemo --template @nativescript/template-blank-ts
cd MyAsyncDemo
ns platform add android
// src/app/async-demo.service.ts
import { Application } from '@nativescript/core';
import { Http } from '@nativescript/core/http';

/**
 * Helper that mimics Android's AsyncTask pattern.
 *
 *   new AsyncTask<string, void, string>()
 *       .execute('https://jsonplaceholder.typicode.com/todos/1')
 *       .then(result => console.log(result));
 *
 * The generic parameters are:
 *   Params – type of the input argument(s) to doInBackground()
 *   Progress – type used for intermediate progress updates (unused here)
 *   Result – type returned from doInBackground() and delivered to onPostExecute()
 */
export class AsyncTask<Params, Progress, Result> {
    /** Override this to run heavy work on a background thread */
    protected async doInBackground(...params: Params[]): Promise<Result> {
        throw new Error('doInBackground must be overridden');
    }

    /** Runs on the UI thread after doInBackground resolves */
    protected onPostExecute(result: Result): void {
        // default: no‑op
    }

    /** Optional: runs on UI thread to report progress */
    protected onProgressUpdate?(progress: Progress): void;

    /** Public entry point – returns a Promise that resolves with the final result */
    public async execute(...params: Params[]): Promise<Result> {
        // 1️⃣ Run the heavy work on a background thread (via a native Java thread)
        const bgPromise = new Promise<Result>((resolve, reject) => {
            const Runnable = java.lang.Runnable.extend({
                run: () => {
                    this.doInBackground(...params)
                        .then(resolve)
                        .catch(reject);
                },
            });
            // Use Android's thread pool (or just a new Thread)
            new java.lang.Thread(new Runnable()).start();
        });

        // 2️⃣ When the background work finishes, post the result back to the UI thread
        const result = await bgPromise;
        const handler = new android.os.Handler(android.os.Looper.getMainLooper());

        // Post a runnable that calls onPostExecute on the UI thread
        handler.post(
            new java.lang.Runnable({
                run: () => this.onPostExecute(result),
            })
        );

        // Also resolve the outer promise so callers can `await` it
        return result;
    }

    /** Helper to publish progress (optional) */
    protected publishProgress(progress: Progress): void {
        if (!this.onProgressUpdate) return;
        const handler = new android.os.Handler(android.os.Looper.getMainLooper());
        handler.post(
            new java.lang.Runnable({
                run: () => this.onProgressUpdate!(progress),
            })
        );
    }
}

/* -------------------------------------------------------------------------- */
/* Example concrete task: fetch JSON from a URL and show a Toast on Android   */
/* -------------------------------------------------------------------------- */
export class FetchJsonTask extends AsyncTask<string, void, any> {
    // ----------------------------------------------------------------------
    // 1️⃣ Background work – fetch the JSON using NativeScript's Http module
    // ----------------------------------------------------------------------
    protected async doInBackground(url: string): Promise<any> {
        // `Http.getJSON` already returns a Promise, so we just await it.
        const json = await Http.getJSON<any>(url);
        return json;
    }

    // ----------------------------------------------------------------------
    // 2️⃣ UI thread – show the result in a native Android Toast
    // ----------------------------------------------------------------------
    protected onPostExecute(result: any): void {
        const context = Application.android.context;
        if (!context) {
            console.warn('No Android context – cannot show Toast');
            return;
        }

        const toastText = `Fetched title: ${result.title ?? 'N/A'}`;
        android.widget.Toast.makeText(
            context,
            toastText,
            android.widget.Toast.LENGTH_LONG
        ).show();
    }
}

/* -------------------------------------------------------------------------- */
/* How to use it from any component / page                                    */
/* -------------------------------------------------------------------------- */
export async function demoFetchAndToast() {
    const task = new FetchJsonTask();
    // The returned promise resolves *after* onPostExecute has been queued.
    // You can still `await` it if you need to know when everything is done.
    await task.execute('https://jsonplaceholder.typicode.com/todos/1');
}
<!-- app.component.html -->
<ActionBar title="AsyncTask Demo"></ActionBar>

<StackLayout class="p-20">
    <Button text="Fetch JSON (AsyncTask)" (tap)="onFetchTap()" class="btn btn-primary"></Button>
</StackLayout>
// app.component.ts
import { Component } from '@angular/core';
import { demoFetchAndToast } from './async-demo.service';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    async onFetchTap(): Promise<void> {
        try {
            await demoFetchAndToast();
            console.log('Task finished');
        } catch (e) {
            console.error('AsyncTask error:', e);
        }
    }
}
// src/app/home/home-page.ts
import { EventData, Page } from '@nativescript/core';
import { demoFetchAndToast } from '../async-demo.service';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = {};
}

export async function onFetchTap(args: EventData) {
    try {
        await demoFetchAndToast();
    } catch (e) {
        console.error(e);
    }
}
<!-- src/app/home/home-page.xml -->
<Page navigatingTo="onNavigatingTo" class="page">
    <ActionBar title="AsyncTask Demo" />
    <StackLayout class="p-20">
        <Button text="Fetch JSON (AsyncTask)" tap="onFetchTap" class="btn btn-primary" />
    </StackLayout>
</Page>
ns run android --bundle
Fetched title: delectus aut autem
import { Application } from '@nativescript/core';
import { Http } from '@nativescript/core/http';

export async function simpleAsyncTaskDemo() {
    // 1️⃣ Background work (fetch JSON)
    const json = await Http.getJSON<any>('https://jsonplaceholder.typicode.com/todos/1');

    // 2️⃣ Switch to UI thread to show a Toast
    const ctx = Application.android.context;
    if (ctx) {
        const msg = `Title: ${json.title}`;
        android.widget.Toast.makeText(ctx, msg, android.widget.Toast.LENGTH_LONG).show();
    }
}
